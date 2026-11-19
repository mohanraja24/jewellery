import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Crown } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const HeroBanner = () => {
  const { brand } = useBrand();

  return (
    <div className="relative bg-emeraldTheme-dark overflow-hidden min-h-[600px] lg:min-h-[680px] flex items-center border-b border-gold/30">
      {/* Background Subtle Gradient & Luxury Texture */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80')`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            {/* Super Header Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emeraldTheme border border-gold/40 text-gold-light text-xs font-semibold tracking-widest uppercase shadow-sm">
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span>Royal Lineage • Imperial Karigari</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.12] text-ivory">
              Where Royal Lineage Meets <br className="hidden sm:inline" />
              <span className="text-gold-gradient italic font-normal">Artisanal Splendour</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-ivory/80 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Discover opulent 22K hallmarked gold, certified solitaire diamonds, and regal bridal sets crafted by generational master karigars. Experience pure transparency with live bullion pricing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-bold text-xs tracking-widest uppercase rounded-lg shadow-gold-glow transition-all flex items-center justify-center group"
              >
                <span>Explore Fine Collections</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/shop?category=bridal"
                className="w-full sm:w-auto px-7 py-3.5 border border-gold/70 hover:bg-white/10 text-ivory font-semibold text-xs tracking-widest uppercase rounded-lg transition flex items-center justify-center"
              >
                <span>The Bridal Heritage 2026</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-left">
              <div>
                <p className="text-lg sm:text-xl font-serif font-bold text-gold-light">100%</p>
                <p className="text-[11px] text-ivory/70 leading-tight">BIS 916 Hallmarked with HUID</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-serif font-bold text-gold-light">IGI & GIA</p>
                <p className="text-[11px] text-ivory/70 leading-tight">Certified Solitaires</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-serif font-bold text-gold-light">Live Rate</p>
                <p className="text-[11px] text-ivory/70 leading-tight">Zero-Markup Bullion Billing</p>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Luxury Jewellery Spotlight Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Outer Decorative Gold Glow */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 blur-md"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gold/40 bg-charcoal">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Aurelia Maharani Royal Heritage Gold Jewellery"
                  className="w-full h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Glass Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal/85 backdrop-blur-md p-4 rounded-xl border border-gold/30 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold">
                        Signature Masterpiece
                      </span>
                      <h4 className="text-sm font-serif font-bold text-ivory mt-0.5">
                        The Maharani Kasu Mala
                      </h4>
                      <p className="text-[11px] text-ivory/60">
                        22K Solid Gold • 42.500 g Net Wt
                      </p>
                    </div>
                    <Link
                      to="/product/PROD-001"
                      className="px-4 py-2 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs font-semibold rounded-lg transition shadow-sm border border-gold/40"
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
