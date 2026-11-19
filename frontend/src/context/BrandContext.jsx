import React, { createContext, useContext, useState, useEffect } from 'react';

const BrandContext = createContext();

const DEFAULT_BRAND_CONFIG = {
  brandName: 'AURELIA JEWELLERS',
  legalEntityName: 'Aurelia Fine Jewels Private Limited',
  tagline: 'Heritage Craftsmanship & Timeless Splendour',
  establishedYear: 1984,
  logoUrl: '', // Fallbacks to elegant SVG monogram
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'concierge@aureliajewels.com',
  gstin: '29AAAAA0000A1Z5',
  bisLicenseNumber: 'BIS/HM/L-9876543210',
  headquarters: {
    addressLine1: '42, Heritage Palace Lane',
    addressLine2: 'Near Commercial Street, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'India'
  },
  operatingHours: 'Monday - Sunday: 10:30 AM to 9:00 PM IST',
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    pinterest: 'https://pinterest.com',
    youtube: 'https://youtube.com'
  },
  shippingPolicySummary: 'Complimentary Pan-India Insured Shipping on all orders above ₹5,000.',
  returnPolicySummary: '15-Day Hassle-Free Returns & Lifetime Buyback/Exchange Guarantee.'
};

export const BrandProvider = ({ children }) => {
  const [brand, setBrand] = useState(() => {
    const saved = localStorage.getItem('aurelia_brand_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing brand settings', e);
      }
    }
    return DEFAULT_BRAND_CONFIG;
  });

  const updateBrandSettings = (newSettings) => {
    setBrand((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('aurelia_brand_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefaultBrand = () => {
    localStorage.removeItem('aurelia_brand_settings');
    setBrand(DEFAULT_BRAND_CONFIG);
  };

  return (
    <BrandContext.Provider value={{ brand, updateBrandSettings, resetToDefaultBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
