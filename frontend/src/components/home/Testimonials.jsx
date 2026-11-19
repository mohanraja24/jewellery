import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../data/mockData';

export const Testimonials = () => {
  return (
    <section className="py-20 bg-ivory border-t border-borderLuxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block mb-2">
            Verified Patron Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
            Cherished by Families Across Generations
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto my-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl border border-borderLuxury shadow-sm hover:shadow-luxury transition flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-gold-dark/40 mb-4" />
                <div className="flex items-center space-x-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-borderLuxury">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-gray-950">{item.name}</h4>
                    <p className="text-xs text-gray-600 font-semibold">{item.city}</p>
                  </div>
                  <span className="flex items-center text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                    <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Verified Purchase
                  </span>
                </div>
                <p className="text-xs text-gold-dark mt-2 font-bold">
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
