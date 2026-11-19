import React from 'react';
import { ShieldCheck, TrendingUp, Award, Truck, RefreshCw, Feather } from 'lucide-react';

const REASONS = [
  {
    icon: ShieldCheck,
    title: '100% BIS Hallmarked',
    desc: 'Mandatory 6-digit HUID inscribed on every gold ornament, verifying purity at government-approved assaying centres.'
  },
  {
    icon: TrendingUp,
    title: 'Live Bullion Pricing',
    desc: 'Uncompromising transparency. Pay the exact market rate for precious metal with clear itemized making charges.'
  },
  {
    icon: Award,
    title: 'Certified Solitaires',
    desc: 'Natural, conflict-free diamonds certified by internationally accredited gemological laboratories IGI and GIA.'
  },
  {
    icon: Truck,
    title: 'Tamper-Proof Insured Transit',
    desc: 'Direct vault-to-doorstep transit with 100% insurance and secret OTP verification upon delivery.'
  },
  {
    icon: RefreshCw,
    title: 'Lifetime Exchange & Buyback',
    desc: 'Guaranteed 100% gold value return based on prevailing market rates at any time across all stores.'
  },
  {
    icon: Feather,
    title: 'Artisanal Karigari',
    desc: 'Over 40 years of handcrafting legacy, supporting generational Indian artisan families.'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-ivory border-b border-borderLuxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block mb-2">
            The Aurelia Benchmark
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
            Why Discerning Patrons Choose Us
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto my-4 rounded-full"></div>
          <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
            Jewellery is not merely an ornament; it is a sacred investment of affection, heritage and wealth. Here is our unwavering pledge to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-borderLuxury hover:border-gold/80 shadow-sm hover:shadow-luxury transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold-50 flex items-center justify-center text-gold-dark group-hover:bg-emeraldTheme group-hover:text-amber-300 transition-colors mb-5 border border-gold/30">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900 mb-2 group-hover:text-emeraldTheme transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
