/**
 * Gold & Precious Metal Standard Karatage & Purity Factors
 * Based on Bureau of Indian Standards (BIS) and International Standards
 */
export const PURITY_FACTORS = {
  '24K': 1.000,   // 99.9% fine pure bullion gold
  '22K': 0.9167,  // 91.6% hallmarked gold (Standard 916)
  '18K': 0.7500,  // 75.0% diamond jewellery gold (Standard 750)
  '14K': 0.5850,  // 58.5% modern lightweight gold (Standard 585)
  '9K':  0.3750,  // 37.5% lightweight affordable gold (Standard 375)
  'SILVER_FINE': 1.000, // 99.9% fine pure silver
  'SILVER_925':  0.9250 // 92.5% sterling silver
};

export const DEFAULT_FALLBACK_RATES = {
  gold24k: 7450,       // INR per gram
  gold22k: 6829,       // INR per gram
  gold18k: 5588,       // INR per gram
  gold14k: 4358,       // INR per gram
  silver999: 88.50,    // INR per gram
  silver925: 81.86,    // INR per gram
  platinum950: 3150,   // INR per gram
  currency: 'INR',
  unit: 'GRAM',
  source: 'IBJA Bullion Index (Fallback Benchmark)'
};

export const STANDARD_TAX_RATE = 0.03; // 3% GST on precious jewellery in India
export const QUOTE_EXPIRY_MINUTES = 15; // 15-minute price lock during checkout
