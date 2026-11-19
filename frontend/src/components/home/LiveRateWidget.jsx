import React, { useState } from 'react';
import { TrendingUp, Clock, ShieldCheck, Calculator } from 'lucide-react';
import { useMetalRate } from '../../context/MetalRateContext';
import { formatINR, formatINRDecimal, formatDate } from '../../utils/formatters';

export const LiveRateWidget = () => {
  const { rates } = useMetalRate();
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calcWeight, setCalcWeight] = useState(10);
  const [calcPurity, setCalcPurity] = useState('22K');
  const [calcMakingType, setCalcMakingType] = useState('PERCENT');
  const [calcMakingValue, setCalcMakingValue] = useState(12);

  const getRateForPurity = (purity) => {
    switch (purity) {
      case '24K': return rates.gold24k;
      case '22K': return rates.gold22k;
      case '18K': return rates.gold18k;
      case '14K': return rates.gold14k;
      case 'SILVER999': return rates.silver999;
      case 'SILVER925': return rates.silver925;
      case 'PLATINUM': return rates.platinum950;
      default: return rates.gold22k;
    }
  };

  const selectedRate = getRateForPurity(calcPurity);
  const metalVal = Math.round(Number(calcWeight || 0) * selectedRate);
  const makingCharge = calcMakingType === 'PERCENT'
    ? Math.round(metalVal * (Number(calcMakingValue || 0) / 100))
    : Math.round(Number(calcMakingValue || 0) * Number(calcWeight || 0));
  const subTotal = metalVal + makingCharge;
  const gst = Math.round(subTotal * 0.03);
  const totalSimulated = subTotal + gst;

  return (
    <section className="bg-white border-y border-borderLuxury py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Column: Live Benchmark Indicator & Source Metadata */}
          <div className="lg:w-1/3 space-y-3">
            {/* Clean, Single Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="tracking-wider uppercase text-[11px] font-extrabold">Verified Live Bullion Board</span>
            </div>

            {/* Elegant Serif Title in Proportional Mixed Case */}
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 tracking-tight leading-snug">
              Today's Precious Metal Rates
            </h2>

            {/* Clean, Non-wrapping Metadata Grid */}
            <div className="space-y-1.5 text-xs text-gray-600 font-medium pt-0.5">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
                <span>Last Updated: <strong className="text-gray-950 font-semibold">{formatDate(rates.lastUpdated)}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <span className="w-3.5 flex justify-center text-gold-dark font-black">•</span>
                <span>Benchmark: <strong className="text-gray-900 font-semibold">IBJA & Verified Spot Index</strong></span>
              </div>
            </div>
          </div>

          {/* Center Column: Rate Ticker Cards */}
          <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Gold 22K (916) */}
            <div className="bg-gold-50 border-2 border-gold rounded-2xl p-4 relative overflow-hidden group hover:border-gold-dark transition shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-gray-800">
                Gold 22K (916)
              </div>
              <div className="text-xl sm:text-2xl font-black font-sans text-emeraldTheme mt-1">
                {formatINR(rates.gold22k)}
              </div>
              <div className="text-xs text-gray-600 font-bold mt-0.5">
                per 1.0 gram
              </div>
              <div className="absolute top-3 right-3 text-gold-dark">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            {/* Gold 24K */}
            <div className="bg-ivory border-2 border-borderLuxury rounded-2xl p-4 relative overflow-hidden group hover:border-gold transition shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-gray-800">
                Gold 24K (999)
              </div>
              <div className="text-xl sm:text-2xl font-black font-sans text-gray-950 mt-1">
                {formatINR(rates.gold24k)}
              </div>
              <div className="text-xs text-gray-600 font-bold mt-0.5">
                per 1.0 gram
              </div>
            </div>

            {/* Gold 18K */}
            <div className="bg-ivory border-2 border-borderLuxury rounded-2xl p-4 relative overflow-hidden group hover:border-gold transition shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-gray-800">
                Gold 18K (750)
              </div>
              <div className="text-xl sm:text-2xl font-black font-sans text-gray-950 mt-1">
                {formatINR(rates.gold18k)}
              </div>
              <div className="text-xs text-gray-600 font-bold mt-0.5">
                per 1.0 gram
              </div>
            </div>

            {/* Silver 999 */}
            <div className="bg-ivory border-2 border-borderLuxury rounded-2xl p-4 relative overflow-hidden group hover:border-gold transition shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-gray-800">
                Silver 999 (Pure)
              </div>
              <div className="text-xl sm:text-2xl font-black font-sans text-gray-950 mt-1">
                {formatINRDecimal(rates.silver999)}
              </div>
              <div className="text-xs text-gray-600 font-bold mt-0.5">
                per 1.0 gram
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculation Guarantee Strip */}
        <div className="mt-5 pt-4 border-t border-borderLuxury flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <span>
              <strong className="text-gray-950">Zero Hidden Markups:</strong> All jewellery prices recalculate automatically based on prevailing daily bullion benchmark rates.
            </span>
          </div>
          <button
            onClick={() => setCalculatorOpen(!calculatorOpen)}
            className="flex items-center text-xs sm:text-sm font-extrabold text-emeraldTheme hover:text-gold-dark transition cursor-pointer"
          >
            <Calculator className="w-4 h-4 mr-1.5 text-gold-dark" />
            {calculatorOpen ? 'Hide Price Simulator' : 'Simulate Custom Rate Price'}
          </button>
        </div>

        {/* Expandable Price Simulator */}
        {calculatorOpen && (
          <div className="mt-5 p-6 bg-ivory rounded-2xl border-2 border-gold/40 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-gray-950 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-gold-dark" />
                Live Gold & Silver Price Calculator (Interactive Simulator)
              </h4>
              <span className="text-xs sm:text-sm text-gray-600 font-semibold">
                Simulate exact pricing breakdown for any net weight
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
                  Metal & Purity
                </label>
                <select
                  value={calcPurity}
                  onChange={(e) => setCalcPurity(e.target.value)}
                  className="w-full bg-white border-2 border-borderLuxury rounded-xl p-3 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:border-gold"
                >
                  <option value="24K">Gold 24K (99.9%) - {formatINR(rates.gold24k)}/g</option>
                  <option value="22K">Gold 22K (91.6%) - {formatINR(rates.gold22k)}/g</option>
                  <option value="18K">Gold 18K (75.0%) - {formatINR(rates.gold18k)}/g</option>
                  <option value="14K">Gold 14K (58.5%) - {formatINR(rates.gold14k)}/g</option>
                  <option value="SILVER999">Silver 999 (Pure) - {formatINRDecimal(rates.silver999)}/g</option>
                  <option value="SILVER925">Silver 925 (Sterling) - {formatINRDecimal(rates.silver925)}/g</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
                  Net Metal Weight (Grams)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  className="w-full bg-white border-2 border-borderLuxury rounded-xl p-3 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
                  Making Charges
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    value={calcMakingValue}
                    onChange={(e) => setCalcMakingValue(e.target.value)}
                    className="w-2/3 bg-white border-2 border-borderLuxury rounded-xl p-3 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:border-gold"
                  />
                  <select
                    value={calcMakingType}
                    onChange={(e) => setCalcMakingType(e.target.value)}
                    className="w-1/3 bg-white border-2 border-borderLuxury rounded-xl p-3 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:border-gold"
                  >
                    <option value="PERCENT">%</option>
                    <option value="FIXED">₹/g</option>
                  </select>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border-2 border-gold flex flex-col justify-center shadow-sm">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-600">
                  Simulated Price (Incl. 3% GST)
                </span>
                <span className="text-2xl font-black font-sans text-emeraldTheme mt-0.5">
                  {formatINR(totalSimulated)}
                </span>
                <span className="text-xs text-gray-600 font-bold mt-1">
                  Metal: {formatINR(metalVal)} + Making: {formatINR(makingCharge)} + GST: {formatINR(gst)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
