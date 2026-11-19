import React, { useState } from 'react';
import { TrendingUp, Clock, ShieldCheck, RefreshCw, Info, Calculator } from 'lucide-react';
import { useMetalRate } from '../../context/MetalRateContext';
import { formatINR, formatINRDecimal, formatDate } from '../../utils/formatters';

export const LiveRateWidget = () => {
  const { rates, updateRates } = useMetalRate();
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calcWeight, setCalcWeight] = useState(10);
  const [calcPurity, setCalcPurity] = useState('22K');
  const [calcMakingType, setCalcMakingType] = useState('PERCENT');
  const [calcMakingValue, setCalcMakingValue] = useState(12);

  // Quick live rate simulation on the fly
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
    <section className="bg-white border-y border-borderLuxury py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Column: Live Indicator & Source */}
          <div className="lg:w-1/3 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-burgundy">
                Verified Bullion Board
              </span>
              <span className="bg-gold-50 text-gold-dark text-[10px] uppercase font-semibold px-2 py-0.5 rounded border border-gold/40">
                {rates.status === 'LIVE' ? 'Live Market Rate' : 'Manual Admin Fallback'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal">
              Today's Live Precious Metal Rates
            </h3>
            <p className="text-xs text-charcoal-muted flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-gold-dark" />
              Benchmark: <strong className="text-charcoal ml-1">{rates.source}</strong>
              <span className="mx-2">•</span>
              Last updated: {formatDate(rates.lastUpdated)}
            </p>
          </div>

          {/* Center Column: Rate Ticker Cards */}
          <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Gold 22K (916) */}
            <div className="bg-gold-50/60 border border-gold/40 rounded-xl p-3.5 relative overflow-hidden group hover:border-gold transition">
              <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                Gold 22K (916)
              </div>
              <div className="text-lg sm:text-xl font-bold font-serif text-burgundy mt-1">
                {formatINR(rates.gold22k)}
              </div>
              <div className="text-[10px] text-charcoal-muted mt-0.5">
                per 1.0 gram
              </div>
              <div className="absolute top-2 right-2 text-gold">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Gold 24K */}
            <div className="bg-ivory border border-borderLuxury rounded-xl p-3.5 relative overflow-hidden group hover:border-gold transition">
              <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                Gold 24K (999)
              </div>
              <div className="text-lg sm:text-xl font-bold font-serif text-charcoal mt-1">
                {formatINR(rates.gold24k)}
              </div>
              <div className="text-[10px] text-charcoal-muted mt-0.5">
                per 1.0 gram
              </div>
            </div>

            {/* Gold 18K */}
            <div className="bg-ivory border border-borderLuxury rounded-xl p-3.5 relative overflow-hidden group hover:border-gold transition">
              <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                Gold 18K (750)
              </div>
              <div className="text-lg sm:text-xl font-bold font-serif text-charcoal mt-1">
                {formatINR(rates.gold18k)}
              </div>
              <div className="text-[10px] text-charcoal-muted mt-0.5">
                per 1.0 gram
              </div>
            </div>

            {/* Silver 999 */}
            <div className="bg-ivory border border-borderLuxury rounded-xl p-3.5 relative overflow-hidden group hover:border-gold transition">
              <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                Silver 999 (Pure)
              </div>
              <div className="text-lg sm:text-xl font-bold font-serif text-charcoal mt-1">
                {formatINRDecimal(rates.silver999)}
              </div>
              <div className="text-[10px] text-charcoal-muted mt-0.5">
                per 1.0 gram
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculation Guarantee Strip */}
        <div className="mt-4 pt-4 border-t border-borderLuxury/60 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-muted">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Zero Hidden Markups:</strong> All jewellery prices recalculate automatically based on prevailing daily bullion benchmark rates.
            </span>
          </div>
          <button
            onClick={() => setCalculatorOpen(!calculatorOpen)}
            className="flex items-center text-xs font-semibold text-burgundy hover:text-gold-dark transition"
          >
            <Calculator className="w-3.5 h-3.5 mr-1 text-gold" />
            {calculatorOpen ? 'Hide Price Simulator' : 'Simulate Custom Rate Price'}
          </button>
        </div>

        {/* Expandable Price Simulator */}
        {calculatorOpen && (
          <div className="mt-4 p-5 bg-ivory rounded-xl border border-gold/40 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-serif font-bold text-charcoal flex items-center">
                <Calculator className="w-4 h-4 mr-2 text-gold-dark" />
                Live Gold & Silver Price Calculator (Interactive Simulator)
              </h4>
              <span className="text-xs text-charcoal-muted">
                Simulate exact pricing breakdown for any net weight
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">
                  Metal & Purity
                </label>
                <select
                  value={calcPurity}
                  onChange={(e) => setCalcPurity(e.target.value)}
                  className="w-full bg-white border border-borderLuxury rounded-lg p-2 text-xs font-medium text-charcoal focus:outline-none focus:border-gold"
                >
                  <option value="24K">Gold 24K (99.9%) - {formatINR(rates.gold24k)}/g</option>
                  <option value="22K">Gold 22K (91.6%) - {formatINR(rates.gold22k)}/g</option>
                  <option value="18K">Gold 18K (75.0%) - {formatINR(rates.gold18k)}/g</option>
                  <option value="14K">Gold 14K (58.5%) - {formatINR(rates.gold14k)}/g</option>
                  <option value="SILVER999">Silver 999 (Pure) - {formatINRDecimal(rates.silver999)}/g</option>
                  <option value="SILVER925">Silver 925 (Sterling) - {formatINRDecimal(rates.silver925)}/g</option>
                  <option value="PLATINUM">Platinum 950 - {formatINR(rates.platinum950)}/g</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">
                  Net Metal Weight (Grams)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  className="w-full bg-white border border-borderLuxury rounded-lg p-2 text-xs font-medium text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">
                  Making Charges
                </label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={calcMakingValue}
                    onChange={(e) => setCalcMakingValue(e.target.value)}
                    className="w-2/3 bg-white border border-borderLuxury rounded-lg p-2 text-xs font-medium text-charcoal focus:outline-none focus:border-gold"
                  />
                  <select
                    value={calcMakingType}
                    onChange={(e) => setCalcMakingType(e.target.value)}
                    className="w-1/3 bg-white border border-borderLuxury rounded-lg p-2 text-xs font-medium text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option value="PERCENT">%</option>
                    <option value="FIXED">₹/g</option>
                  </select>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gold/50 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted">
                  Simulated Price (Incl. 3% GST)
                </span>
                <span className="text-xl font-bold font-serif text-burgundy mt-0.5">
                  {formatINR(totalSimulated)}
                </span>
                <span className="text-[10px] text-charcoal-muted">
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
