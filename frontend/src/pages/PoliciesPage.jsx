import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, FileText } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

export const PoliciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { brand } = useBrand();
  const activeTabParam = searchParams.get('tab') || 'shipping';
  const [activeTab, setActiveTab] = useState(activeTabParam);

  useEffect(() => {
    if (activeTabParam) {
      setActiveTab(activeTabParam);
    }
  }, [activeTabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="bg-ivory/40 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark">
            Trust & Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-1">
            Store Policies & Legal Terms
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Clear, transparent policies governed in compliance with Indian consumer protection and Bureau of Indian Standards laws.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => handleTabChange('shipping')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'shipping'
                ? 'bg-burgundy text-white shadow-sm'
                : 'bg-white text-charcoal border border-borderLuxury hover:bg-ivory'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Insured Shipping</span>
          </button>
          <button
            onClick={() => handleTabChange('returns')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'returns'
                ? 'bg-burgundy text-white shadow-sm'
                : 'bg-white text-charcoal border border-borderLuxury hover:bg-ivory'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Returns & Lifetime Exchange</span>
          </button>
          <button
            onClick={() => handleTabChange('privacy')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'privacy'
                ? 'bg-burgundy text-white shadow-sm'
                : 'bg-white text-charcoal border border-borderLuxury hover:bg-ivory'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => handleTabChange('terms')}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'terms'
                ? 'bg-burgundy text-white shadow-sm'
                : 'bg-white text-charcoal border border-borderLuxury hover:bg-ivory'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-borderLuxury p-8 sm:p-10 shadow-sm leading-relaxed text-xs sm:text-sm text-charcoal space-y-6">
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-burgundy">
                100% Insured Pan-India Shipping Policy
              </h2>
              <p>
                Every ornament dispatched from {brand.brandName} is packed in high-security, tamper-evident vault packaging and shipped through specialized high-value armored logistics carriers (Sequel Logistics, BVC Logistics, and Blue Dart Apex).
              </p>
              <h3 className="font-bold text-charcoal text-sm mt-4">Key Shipping Terms:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
                <li><strong>Transit Insurance:</strong> All packages are 100% insured against loss, theft or damage during transit until safe physical handover.</li>
                <li><strong>Delivery Timeline:</strong> Ready-to-ship jewellery is delivered within 2-4 business days across metro cities. Customized bridal orders require 7-12 business days.</li>
                <li><strong>OTP Handover:</strong> High-value orders are released by the courier agent only upon entering a secret 4-digit OTP sent to your registered mobile number.</li>
                <li><strong>Complimentary Shipping:</strong> We provide free shipping on all orders nationwide.</li>
              </ul>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-burgundy">
                15-Day Return & Lifetime Exchange Policy
              </h2>
              <p>
                We stand behind every piece of hallmarked jewellery we create with an unconditional lifetime buyback guarantee.
              </p>
              <h3 className="font-bold text-charcoal text-sm mt-4">Return Guidelines:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
                <li><strong>15-Day Return:</strong> Unused, unworn jewellery with original security tags and certificates intact can be returned within 15 days of delivery for a 100% refund.</li>
                <li><strong>Lifetime Gold Exchange:</strong> Gold is valued at 100% of the prevailing live market rate of the net metal weight at any of our boutiques.</li>
                <li><strong>Diamond Exchange:</strong> Natural certified solitaires carry up to 90% exchange value and 80% buyback value based on prevailing diamond market rates.</li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-burgundy">
                Privacy & Data Security Policy
              </h2>
              <p>
                {brand.legalEntityName || brand.brandName} is committed to safeguarding your personal data, order histories, and financial privacy in full accordance with the Information Technology Act.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
                <li>We never sell, rent, or lease patron contact details to third-party marketing networks.</li>
                <li>Payment transactions are handled exclusively via PCI-DSS Level 1 compliant gateways (Razorpay). We never store credit/debit card credentials.</li>
                <li>Delivery addresses are shared strictly with contracted vault logistics partners for shipping purposes only.</li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-burgundy">
                Terms and Conditions of Sale
              </h2>
              <p>
                By placing an order on this website or purchasing in our showrooms, you agree to the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
                <li><strong>Live Rate Pricing:</strong> The final payable amount is determined by the rate locked during checkout. Rates quoted prior to checkout are subject to intraday market updates.</li>
                <li><strong>Hallmarking:</strong> In compliance with BIS regulations, all gold items carry official BIS Hallmark and laser-inscribed HUID.</li>
                <li><strong>Taxes:</strong> All listed prices for precious jewellery incorporate mandatory 3% Goods and Services Tax (GST).</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
