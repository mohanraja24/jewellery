import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const HeroBanner = () => {
  const { brand } = useBrand();

  return (
    <div className="relative bg-burgundy overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Subtle Gradient & Luxury Texture */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none"></div>
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
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-burgundy-dark/80 border border-gold/40 text-gold-light text-xs font-medium tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Timeless Heritage • Handcrafted Splendour</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.15] text-ivory">
              Where Royal Heritage Meets <br className="hidden sm:inline" />
              <span className="text-gold-gradient italic font-normal">Artisanal Perfection</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-ivory/80 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Discover opulent 22K hallmarked gold, certified solitaire diamonds, and regal bridal sets crafted by fourth-generation master karigars. Experience pure transparency with live bullion pricing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-semibold text-xs tracking-widest uppercase rounded shadow-luxury hover:shadow-gold-glow transition-all flex items-center justify-center group"
              >
                <span>Explore Fine Collections</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/shop?category=bridal"
                className="w-full sm:w-auto px-7 py-3.5 border border-gold/60 hover:bg-white/10 text-ivory font-medium text-xs tracking-widest uppercase rounded transition flex items-center justify-center"
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
                <p className="text-[11px] text-ivory/70 leading-tight">Independently Certified Diamonds</p>
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
              {/* Outer Decorative Gold Border */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-gold/30 via-transparent to-gold/30 blur-sm"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gold/40 bg-charcoal">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Aurelia Maharani Royal Heritage Gold Jewellery"
                  className="w-full h-[400px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Glass Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
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
                      className="px-3.5 py-1.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-medium rounded transition"
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
