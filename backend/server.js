import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { metalRateService } from './services/metalRate.service.js';
import { PricingEngine } from './services/pricingEngine.service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & utility middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());

// 1. Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Aurelia Fine Jewellery E-Commerce API',
    bullionEngine: 'ACTIVE',
    timestamp: new Date().toISOString()
  });
});

// 2. Metal Rates Endpoints
app.get('/api/rates/current', (req, res) => {
  const rates = metalRateService.getCurrentRates();
  res.json({ success: true, rates });
});

app.post('/api/rates/refresh', async (req, res) => {
  try {
    const updated = await metalRateService.fetchLiveRates();
    res.json({ success: true, rates: updated, message: 'Bullion rates refreshed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/admin/rates/manual', (req, res) => {
  try {
    const { rates, adminUser } = req.body;
    const updated = metalRateService.setManualRates(rates, adminUser);
    res.json({ success: true, rates: updated, message: 'Manual bullion rates applied' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 3. Pricing Engine Endpoints
app.post('/api/pricing/calculate', (req, res) => {
  try {
    const { product } = req.body;
    const currentRates = metalRateService.getCurrentRates();
    const breakdown = PricingEngine.calculateItemPrice(product, currentRates);
    res.json({ success: true, breakdown });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.post('/api/pricing/quote', (req, res) => {
  try {
    const { items } = req.body; // array of { product, quantity, selectedSize }
    const currentRates = metalRateService.getCurrentRates();

    const quoteItems = (items || []).map((item) => {
      const breakdown = PricingEngine.calculateItemPrice(item.product, currentRates);
      return {
        ...item,
        breakdown,
        itemTotalINR: breakdown.finalPriceINR * (item.quantity || 1)
      };
    });

    const grossTotalINR = quoteItems.reduce((sum, item) => sum + item.itemTotalINR, 0);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    res.json({
      success: true,
      quote: {
        quoteId: `QTE-${Date.now()}`,
        items: quoteItems,
        grossTotalINR,
        rateSnapshot: currentRates,
        createdAt: new Date().toISOString(),
        expiresAt
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server & Connect to DB
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Aurelia Jewellery Backend running on http://localhost:${PORT}`);
    console.log(`💎 Live Pricing Engine initialized with benchmark bullion rates.`);
  });
};

startServer();
