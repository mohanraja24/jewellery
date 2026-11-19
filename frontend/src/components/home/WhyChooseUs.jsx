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
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark block mb-2">
            The Aurelia Benchmark
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Why Discerning Patrons Choose Us
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4"></div>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Jewellery is not merely an ornament; it is a sacred investment of affection, heritage and wealth. Here is our unwavering pledge to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-borderLuxury hover:border-gold/60 shadow-sm hover:shadow-luxury transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center text-gold-dark group-hover:bg-burgundy group-hover:text-gold transition-colors mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-charcoal mb-2 group-hover:text-burgundy transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
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
