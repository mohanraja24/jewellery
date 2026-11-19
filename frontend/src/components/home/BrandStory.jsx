import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const BrandStory = () => {
  const { brand } = useBrand();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-luxury border border-borderLuxury">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
                alt="Master Artisan Handcrafting Fine Gold Jewellery"
                className="w-full h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-light">
                  Legacy Atelier
                </span>
                <p className="font-serif text-lg font-bold text-ivory mt-1">
                  Four Decades of Master Artisanal Lineage
                </p>
                <p className="text-xs text-ivory/70">
                  Every jewel undergoes 38 rigorous quality checks before being hallmarked.
                </p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark block">
              The Atelier Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal leading-tight">
              Honouring the Sacred Art of Indian Karigari Since {brand.establishedYear}
            </h2>
            <div className="w-16 h-0.5 bg-gold"></div>

            <p className="text-sm text-charcoal-muted leading-relaxed">
              In an era of mass-manufactured, soulless castings, {brand.brandName} preserves the devotional patience of ancient goldsmithing. From intricate nakshi carving and jadau stone settings to precision laser-soldered lightweight daily gold, our workshops bring generational savoir-faire to the modern connoisseur.
            </p>

            <p className="text-sm text-charcoal-muted leading-relaxed">
              Our business was born on trust. That is why we pioneered direct live-rate bullion pricing, ensuring every family who walks into our showroom or shops on our online platform receives complete, unadulterated clarity.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center text-xs uppercase font-bold tracking-widest text-burgundy hover:text-gold-dark transition"
              >
                <span>Read Our Full Heritage Journey</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
