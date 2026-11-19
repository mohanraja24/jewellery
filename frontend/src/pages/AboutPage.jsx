import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart, Users } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

export const AboutPage = () => {
  const { brand } = useBrand();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark">
            Our Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
            The Chronicle of {brand.brandName}
          </h1>
          <div className="w-20 h-0.5 bg-gold mx-auto my-4"></div>
          <p className="text-sm text-charcoal-muted leading-relaxed font-light">
            Founded in {brand.establishedYear}, our atelier was established with a singular conviction: fine jewellery must represent unvarnished purity, immortal craftsmanship, and absolute pricing transparency.
          </p>
        </div>

        {/* Feature Image & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-luxury border border-borderLuxury">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal Jewellery Workshop"
              className="w-full h-[450px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
              Preserving Indian Temple & Royal Court Karigari
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Every creation starts as hand-drawn botanical and geometric sketches inspired by temple architecture, royal Mughal courts, and South Indian dynasties. Our karigars employ age-old techniques such as Nakshi, Kundan Jadau, Meenakari, and filigree work passed down over centuries.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              While our craftsmanship honours ancestral traditions, our customer commitment is radically forward-thinking: we are among India's first jewellery houses to introduce transparent live bullion billing, where product metal pricing directly reflects daily market benchmarks with zero hidden costs.
            </p>
          </div>
        </div>

        {/* Four Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          <div className="p-6 bg-ivory rounded-xl border border-borderLuxury text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-gold-dark mx-auto" />
            <h3 className="font-serif font-bold text-base text-charcoal">Purity Guarantee</h3>
            <p className="text-xs text-charcoal-muted">100% BIS Hallmarked gold with unique 6-digit HUID laser inscription.</p>
          </div>
          <div className="p-6 bg-ivory rounded-xl border border-borderLuxury text-center space-y-2">
            <Award className="w-8 h-8 text-gold-dark mx-auto" />
            <h3 className="font-serif font-bold text-base text-charcoal">Certified Stones</h3>
            <p className="text-xs text-charcoal-muted">Natural conflict-free solitaires with IGI & GIA grading reports.</p>
          </div>
          <div className="p-6 bg-ivory rounded-xl border border-borderLuxury text-center space-y-2">
            <Heart className="w-8 h-8 text-gold-dark mx-auto" />
            <h3 className="font-serif font-bold text-base text-charcoal">Artisan Welfare</h3>
            <p className="text-xs text-charcoal-muted">Supporting over 400 generational karigar families with fair wages.</p>
          </div>
          <div className="p-6 bg-ivory rounded-xl border border-borderLuxury text-center space-y-2">
            <Users className="w-8 h-8 text-gold-dark mx-auto" />
            <h3 className="font-serif font-bold text-base text-charcoal">Lifelong Bond</h3>
            <p className="text-xs text-charcoal-muted">Complimentary ultrasonic cleaning, resizing and lifetime exchange.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
