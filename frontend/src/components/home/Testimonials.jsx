import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../data/mockData';

export const Testimonials = () => {
  return (
    <section className="py-20 bg-ivory border-t border-borderLuxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark block mb-2">
            Verified Patron Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Cherished by Families Across Generations
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-xl border border-borderLuxury shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-gold-light/40 mb-4" />
                <div className="flex items-center space-x-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-charcoal leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-borderLuxury/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-charcoal">{item.name}</h4>
                    <p className="text-[11px] text-charcoal-muted">{item.city}</p>
                  </div>
                  <span className="flex items-center text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Purchase
                  </span>
                </div>
                <p className="text-[10px] text-gold-dark mt-2 font-medium">
                  Bought: {item.productBought}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
