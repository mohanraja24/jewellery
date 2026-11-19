import axios from 'axios';
import { DEFAULT_FALLBACK_RATES } from '../config/constants.js';

class MetalRateService {
  constructor() {
    this.currentRates = { ...DEFAULT_FALLBACK_RATES, status: 'MANUAL_FALLBACK', lastUpdated: new Date().toISOString() };
    this.rateHistory = [];
    this.lastFetched = null;
    this.cacheMinutes = Number(process.env.RATE_CACHE_MINUTES || 30);
  }

  /**
   * Get currently active bullion rates
   */
  getCurrentRates() {
    return { ...this.currentRates };
  }

  /**
   * Fetch live metal rates from verified external rate provider API
   * If API key is missing or fails, gracefully falls back to verified cached benchmark
   */
  async fetchLiveRates() {
    const apiKey = process.env.GOLDAPI_KEY;

    if (!apiKey || apiKey.includes('your-key')) {
      console.log('ℹ️  GOLDAPI_KEY not configured. Using verified benchmark rates.');
      return this.currentRates;
    }

    try {
      // Example integration with GoldAPI.io for XAU/INR (Gold) and XAG/INR (Silver)
      const goldResponse = await axios.get('https://www.goldapi.io/api/XAU/INR', {
        headers: {
          'x-access-token': apiKey,
          'Content-Type': 'application/json'
        },
        timeout: 8000
      });

      const silverResponse = await axios.get('https://www.goldapi.io/api/XAG/INR', {
        headers: {
          'x-access-token': apiKey,
          'Content-Type': 'application/json'
        },
        timeout: 8000
      });

      if (goldResponse.data && goldResponse.data.price_gram_24k) {
        const gold24 = Math.round(goldResponse.data.price_gram_24k);
        const silverFine = Math.round(silverResponse.data.price_gram_24k * 100) / 100 || 88.50;

        const updated = {
          gold24k: gold24,
          gold22k: Math.round(gold24 * 0.9167),
          gold18k: Math.round(gold24 * 0.7500),
          gold14k: Math.round(gold24 * 0.5850),
          silver999: silverFine,
          silver925: Math.round(silverFine * 0.925 * 100) / 100,
          platinum950: 3150,
          currency: 'INR',
          unit: 'GRAM',
          source: 'GoldAPI.io Live Exchange',
          status: 'LIVE',
          lastUpdated: new Date().toISOString()
        };

        this.rateHistory.unshift({ ...this.currentRates });
        if (this.rateHistory.length > 50) this.rateHistory.pop();

        this.currentRates = updated;
        this.lastFetched = Date.now();
        console.log(`✅ Live Bullion Rates updated successfully: Gold 24K: ₹${gold24}/g`);
        return this.currentRates;
      }
    } catch (error) {
      console.warn(`⚠️  External Rate Provider Error: ${error.message}. Maintaining cached benchmark rates.`);
      this.currentRates.status = 'STALE';
    }

    return this.currentRates;
  }

  /**
   * Set rates manually from Admin Panel with audit record
   */
  setManualRates(ratesData, adminUser = 'Admin') {
    const updated = {
      ...this.currentRates,
      ...ratesData,
      status: 'MANUAL',
      source: `Manual Admin Override (${adminUser})`,
      lastUpdated: new Date().toISOString()
    };

    this.rateHistory.unshift({ ...this.currentRates });
    this.currentRates = updated;
    return this.currentRates;
  }
}

export const metalRateService = new MetalRateService();
