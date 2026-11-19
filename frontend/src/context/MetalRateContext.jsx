import React, { createContext, useContext, useState, useEffect } from 'react';

const MetalRateContext = createContext();

// Benchmark standard rates per gram in INR
const INITIAL_RATES = {
  gold24k: 7450, // 24 Karat 99.9% fine gold per gram
  gold22k: 6829, // 22 Karat 91.6% hallmarked gold per gram (7450 * 0.9166)
  gold18k: 5588, // 18 Karat 75.0% gold per gram (7450 * 0.75)
  gold14k: 4358, // 14 Karat 58.5% gold per gram (7450 * 0.585)
  silver999: 88.50, // Fine Silver 99.9% per gram
  silver925: 81.86, // Sterling Silver 92.5% per gram (88.50 * 0.925)
  platinum950: 3150, // Platinum 950 per gram
  currency: 'INR',
  unit: 'GRAM',
  source: 'IBJA Bullion Index / GoldAPI Provider',
  status: 'LIVE', // 'LIVE' | 'MANUAL' | 'STALE'
  lastUpdated: new Date().toISOString(),
  autoUpdateEnabled: true,
  markupPercentage: 0 // Optional admin retail markup
};

export const MetalRateProvider = ({ children }) => {
  const [rates, setRates] = useState(() => {
    const saved = localStorage.getItem('aurelia_metal_rates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading saved rates', e);
      }
    }
    return INITIAL_RATES;
  });

  const [history, setHistory] = useState([
    {
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      gold24k: 7410,
      gold22k: 6792,
      silver999: 87.80,
      source: 'IBJA Market Close'
    },
    {
      timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
      gold24k: 7380,
      gold22k: 6765,
      silver999: 87.20,
      source: 'IBJA Market Close'
    }
  ]);

  // Update rates when admin modifies manually or automatic refresh happens
  const updateRates = (newRates, isManual = false) => {
    setRates((prev) => {
      const updated = {
        ...prev,
        ...newRates,
        status: isManual ? 'MANUAL' : 'LIVE',
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('aurelia_metal_rates', JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * Core Pricing Engine: Computes exact transparent pricing breakdown
   * @param {Object} product - Product specification object
   * @returns {Object} Full breakdown: metalValue, makingCharge, wastage, stoneValue, subtotal, tax, finalPrice
   */
  const calculatePrice = (product) => {
    if (!product) return { finalPrice: 0, breakdown: null };

    // Fixed price products (e.g. artificial jewellery or fixed promotional gifts)
    if (product.pricingType === 'FIXED') {
      const finalPrice = product.fixedPrice || 0;
      const tax = Math.round(finalPrice * 0.03);
      return {
        metalValue: 0,
        rateUsed: 0,
        makingCharge: 0,
        wastageCharge: 0,
        stoneValue: 0,
        subtotal: finalPrice,
        tax: tax,
        finalPrice: finalPrice,
        isFixedPrice: true,
        calculatedAt: rates.lastUpdated
      };
    }

    // Rate-based products: Determine metal rate per gram based on metal type & purity
    let ratePerGram = 0;
    const metalType = (product.metalType || '').toUpperCase();
    const purity = (product.purity || '').toUpperCase();

    if (metalType === 'GOLD') {
      if (purity.includes('24K')) ratePerGram = rates.gold24k;
      else if (purity.includes('22K') || purity.includes('916')) ratePerGram = rates.gold22k;
      else if (purity.includes('18K') || purity.includes('750')) ratePerGram = rates.gold18k;
      else if (purity.includes('14K') || purity.includes('585')) ratePerGram = rates.gold14k;
      else ratePerGram = rates.gold22k;
    } else if (metalType === 'SILVER') {
      if (purity.includes('999') || purity.includes('FINE')) ratePerGram = rates.silver999;
      else ratePerGram = rates.silver925;
    } else if (metalType === 'PLATINUM') {
      ratePerGram = rates.platinum950;
    }

    const netWeight = Number(product.netMetalWeight || product.grossWeight || 0);
    const metalValue = Math.round(netWeight * ratePerGram);

    // Making Charges: Percentage or Fixed or Per Gram
    let makingCharge = 0;
    if (product.makingChargeType === 'PERCENT') {
      makingCharge = Math.round(metalValue * ((product.makingCharge || 0) / 100));
    } else if (product.makingChargeType === 'PER_GRAM') {
      makingCharge = Math.round((product.makingCharge || 0) * (product.grossWeight || netWeight));
    } else {
      makingCharge = Number(product.makingCharge || 0);
    }

    // Wastage Charges: Percentage of metal value
    const wastageCharge = Math.round(metalValue * ((product.wastagePercentage || 0) / 100));

    // Stone and diamond value
    const stoneValue = Number(product.stoneValue || 0);

    // Subtotal
    const subtotal = metalValue + makingCharge + wastageCharge + stoneValue;

    // GST (3% on precious jewellery in India)
    const taxRate = product.taxRate !== undefined ? product.taxRate : 0.03;
    const tax = Math.round(subtotal * taxRate);

    // Final consumer price
    const finalPrice = subtotal + tax;

    return {
      metalType,
      purity,
      netWeight,
      rateUsed: ratePerGram,
      metalValue,
      makingCharge,
      makingChargeType: product.makingChargeType || 'PERCENT',
      makingChargeRate: product.makingCharge || 0,
      wastagePercentage: product.wastagePercentage || 0,
      wastageCharge,
      stoneValue,
      subtotal,
      taxRate: taxRate * 100,
      tax,
      finalPrice,
      isFixedPrice: false,
      calculatedAt: rates.lastUpdated,
      rateStatus: rates.status
    };
  };

  return (
    <MetalRateContext.Provider value={{ rates, updateRates, calculatePrice, history }}>
      {children}
    </MetalRateContext.Provider>
  );
};

export const useMetalRate = () => useContext(MetalRateContext);
