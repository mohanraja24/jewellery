import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Gem, Crown } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const BridalShowcase = () => {
  const { brand } = useBrand();

  return (
    <section className="py-20 bg-emeraldTheme-deep text-white relative overflow-hidden border-y border-gold/40">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1600&q=80')`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emeraldTheme border border-gold/50 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Imperial Wedding Troussier</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black leading-tight text-white">
              Crafted for Your Most <br />
              <span className="text-amber-300 underline decoration-gold/40 underline-offset-8">Sacred Chapter</span>
            </h2>

            <p className="text-base text-gray-100 leading-relaxed font-medium">
              Every bride deserves an immortal aura. Aurelia Bridal Troussier brings together ancestral South Indian temple jewellery, North Indian Jadau Polki, and brilliant diamond tiaras, customized to the millimeter for your wedding ensemble.
            </p>

            <div className="space-y-3 pt-2 text-sm text-gray-200 font-semibold">
              <div className="flex items-center space-x-3">
                <Gem className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span>Custom Gold Weight & Gemstone Tailoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span>100% BIS Hallmarked 916 & Certified Natural Polki</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span>Private 1-on-1 Bridal Consultation with Master Stylists</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/shop?category=bridal"
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-gold-glow transition"
              >
                Browse Bridal Suite
              </Link>
              <Link
                to="/stores"
                className="px-7 py-4 border-2 border-amber-300/80 hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition"
              >
                Book In-Store Bridal Suite
              </Link>
            </div>
          </div>

          {/* Right Imagery Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=80"
                alt="Bridal Set"
                className="rounded-2xl shadow-xl object-cover h-64 w-full border-2 border-gold/40"
              />
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80"
                alt="Gold Necklace"
                className="rounded-2xl shadow-xl object-cover h-48 w-full border-2 border-gold/40"
              />
            </div>
            <div className="space-y-4 pt-6">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80"
                alt="Temple Jhumkas"
                className="rounded-2xl shadow-xl object-cover h-48 w-full border-2 border-gold/40"
              />
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80"
                alt="Diamond Ring"
                className="rounded-2xl shadow-xl object-cover h-64 w-full border-2 border-gold/40"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
