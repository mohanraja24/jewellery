import { STANDARD_TAX_RATE, PURITY_FACTORS } from '../config/constants.js';

/**
 * Decimal-Safe Indian Rupee Calculation Utility
 * Converts INR to Paise (integers) to prevent floating-point inaccuracies
 */
const toPaise = (amount) => Math.round(Number(amount || 0) * 100);
const toRupees = (paise) => Math.round(Number(paise || 0)) / 100;

export class PricingEngine {
  /**
   * Calculate exact breakdown for a single jewellery item based on current metal rates
   * All internal calculations operate in paise (integers)
   *
   * @param {Object} product - Product specification
   * @param {Object} currentRates - Current active metal rates
   * @returns {Object} Full breakdown object with exact values
   */
  static calculateItemPrice(product, currentRates) {
    if (!product) throw new Error('Product specification is required');

    // 1. Fixed Price items (e.g. fashion brass or fixed artificial sets)
    if (product.pricingType === 'FIXED') {
      const finalPricePaise = toPaise(product.fixedPrice || 0);
      const taxRate = product.taxRate !== undefined ? product.taxRate : STANDARD_TAX_RATE;
      const taxPaise = Math.round(finalPricePaise * taxRate);

      return {
        isFixedPrice: true,
        metalType: product.metalType || 'FIXED',
        purity: product.purity || 'N/A',
        netWeightGrams: 0,
        ratePerGram: 0,
        metalValuePaise: 0,
        metalValueINR: 0,
        makingChargePaise: 0,
        makingChargeINR: 0,
        wastageChargePaise: 0,
        wastageChargeINR: 0,
        stoneValuePaise: 0,
        stoneValueINR: 0,
        subtotalPaise: finalPricePaise,
        subtotalINR: toRupees(finalPricePaise),
        taxRatePct: taxRate * 100,
        taxPaise,
        taxINR: toRupees(taxPaise),
        finalPricePaise: finalPricePaise,
        finalPriceINR: toRupees(finalPricePaise),
        calculatedAt: new Date().toISOString()
      };
    }

    // 2. Determine per-gram rate based on metal type & purity
    const metalType = (product.metalType || '').toUpperCase();
    const purity = (product.purity || '').toUpperCase();
    let ratePerGram = 0;

    if (metalType === 'GOLD') {
      if (purity.includes('24K')) ratePerGram = currentRates.gold24k;
      else if (purity.includes('22K') || purity.includes('916')) ratePerGram = currentRates.gold22k;
      else if (purity.includes('18K') || purity.includes('750')) ratePerGram = currentRates.gold18k;
      else if (purity.includes('14K') || purity.includes('585')) ratePerGram = currentRates.gold14k;
      else ratePerGram = currentRates.gold22k;
    } else if (metalType === 'SILVER') {
      if (purity.includes('999') || purity.includes('FINE')) ratePerGram = currentRates.silver999;
      else ratePerGram = currentRates.silver925;
    } else if (metalType === 'PLATINUM') {
      ratePerGram = currentRates.platinum950;
    }

    if (!ratePerGram || ratePerGram <= 0) {
      throw new Error(`Unable to determine valid metal rate for ${metalType} ${purity}`);
    }

    // 3. Metal Value = Net Metal Weight * Applicable Metal Rate
    const netWeight = Number(product.netMetalWeight || product.grossWeight || 0);
    const metalValuePaise = Math.round(netWeight * toPaise(ratePerGram));

    // 4. Making Charges (Percent of metal value, or Fixed INR, or Per Gram)
    let makingChargePaise = 0;
    if (product.makingChargeType === 'PERCENT') {
      const pct = Number(product.makingCharge || 0) / 100;
      makingChargePaise = Math.round(metalValuePaise * pct);
    } else if (product.makingChargeType === 'PER_GRAM') {
      const chargePerGram = Number(product.makingCharge || 0);
      const grossWt = Number(product.grossWeight || netWeight);
      makingChargePaise = Math.round(grossWt * toPaise(chargePerGram));
    } else {
      makingChargePaise = toPaise(product.makingCharge || 0);
    }

    // 5. Wastage Charges = Configured percentage of metal value
    const wastagePct = Number(product.wastagePercentage || 0) / 100;
    const wastageChargePaise = Math.round(metalValuePaise * wastagePct);

    // 6. Stone Value (Diamond or Gemstones component)
    const stoneValuePaise = toPaise(product.stoneValue || 0);

    // 7. Subtotal
    const subtotalPaise = metalValuePaise + makingChargePaise + wastageChargePaise + stoneValuePaise;

    // 8. Tax (3% GST on precious metals)
    const taxRate = product.taxRate !== undefined ? product.taxRate : STANDARD_TAX_RATE;
    const taxPaise = Math.round(subtotalPaise * taxRate);

    // 9. Final Product Price
    const finalPricePaise = subtotalPaise + taxPaise;

    return {
      isFixedPrice: false,
      metalType,
      purity,
      netWeightGrams: netWeight,
      ratePerGram,
      rateSource: currentRates.source || 'Bullion Benchmark',
      rateStatus: currentRates.status || 'LIVE',
      metalValuePaise,
      metalValueINR: toRupees(metalValuePaise),
      makingChargeType: product.makingChargeType || 'PERCENT',
      makingChargeRate: product.makingCharge || 0,
      makingChargePaise,
      makingChargeINR: toRupees(makingChargePaise),
      wastagePercentage: product.wastagePercentage || 0,
      wastageChargePaise,
      wastageChargeINR: toRupees(wastageChargePaise),
      stoneValuePaise,
      stoneValueINR: toRupees(stoneValuePaise),
      subtotalPaise,
      subtotalINR: toRupees(subtotalPaise),
      taxRatePct: taxRate * 100,
      taxPaise,
      taxINR: toRupees(taxPaise),
      finalPricePaise,
      finalPriceINR: Math.round(toRupees(finalPricePaise)), // Rounded to nearest Rupee
      calculatedAt: new Date().toISOString()
    };
  }
}
