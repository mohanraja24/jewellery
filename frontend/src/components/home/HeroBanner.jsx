import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown, ShieldCheck } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const HeroBanner = () => {
  const { brand } = useBrand();

  return (
    <div className="relative bg-emeraldTheme-dark overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center border-b border-gold/40">
      {/* Background Subtle Gradient & Luxury Texture */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80')`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column - Ultra-Readable Typography */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            {/* Super Header Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emeraldTheme-deep border border-gold/50 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-sm">
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Royal Lineage • Imperial Karigari</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-normal leading-[1.15] text-white">
              Where Royal Lineage Meets <br className="hidden sm:inline" />
              <span className="text-amber-300 underline decoration-gold/40 underline-offset-8">Artisanal Splendour</span>
            </h1>

            {/* Subtitle - Increased size & readability */}
            <p className="text-base sm:text-lg text-white font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Discover opulent 22K hallmarked gold, certified solitaire diamonds, and regal bridal sets crafted by generational master karigars. Experience pure transparency with live bullion pricing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-gold-glow transition-all flex items-center justify-center group"
              >
                <span>Explore Fine Collections</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                to="/shop?category=bridal"
                className="w-full sm:w-auto px-7 py-4 border-2 border-amber-300/80 hover:bg-white/10 text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl transition flex items-center justify-center"
              >
                <span>The Bridal Heritage 2026</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/20 text-center sm:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-sans font-black text-amber-300">100%</p>
                <p className="text-xs sm:text-sm text-white font-semibold leading-tight mt-0.5">BIS 916 Hallmarked with HUID</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-sans font-black text-amber-300">IGI & GIA</p>
                <p className="text-xs sm:text-sm text-white font-semibold leading-tight mt-0.5">Certified Solitaires</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-sans font-black text-amber-300">Live Rate</p>
                <p className="text-xs sm:text-sm text-white font-semibold leading-tight mt-0.5">Zero-Markup Bullion Billing</p>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Luxury Jewellery Spotlight Card */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative mx-auto max-w-sm lg:max-w-none w-full">
              {/* Outer Decorative Gold Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 blur-sm pointer-events-none"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/50 bg-charcoal w-full">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Aurelia Maharani Royal Heritage Gold Jewellery"
                  className="w-full h-80 sm:h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Glass Pill */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-gray-950/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-gold/50 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-amber-300 block truncate">
                        Signature Masterpiece
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                        The Maharani Kasu Mala
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-300 font-medium truncate">
                        22K Solid Gold • 42.500 g Net Wt
                      </p>
                    </div>
                    <Link
                      to="/product/PROD-001"
                      className="px-3 sm:px-4 py-2 sm:py-2.5 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs font-bold rounded-lg transition shadow-sm border border-gold flex-shrink-0"
                    >
                      View Piece
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
