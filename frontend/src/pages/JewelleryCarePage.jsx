import React from 'react';
import { Sparkles, ShieldCheck, Droplets, Sun, AlertTriangle } from 'lucide-react';

export const JewelleryCarePage = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark">
            Atelier Preservation Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Caring for Your Precious Jewellery
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4"></div>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Fine jewellery is designed to endure for centuries. With attentive care and proper storage, your heirlooms will retain their scintillating lustre and structural integrity for generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 22K Gold Care */}
          <div className="bg-ivory p-6 rounded-2xl border border-borderLuxury space-y-3">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center">
              <Sparkles className="w-4 h-4 text-gold-dark mr-2" />
              22K & 18K Solid Gold
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Gold is a noble metal that does not tarnish, but high-karat gold (22K) is relatively soft and prone to surface abrasions.
            </p>
            <ul className="text-xs text-charcoal-muted space-y-1.5 list-disc pl-4">
              <li>Soak occasionally in lukewarm water with a drop of gentle, pH-neutral soap.</li>
              <li>Clean delicate crevices with an ultra-soft bristle brush.</li>
              <li>Pat dry with a soft microfiber cloth; avoid paper towels which may scratch fine polish.</li>
              <li>Store separately in velvet-lined slots to prevent friction with harder diamond ornaments.</li>
            </ul>
          </div>

          {/* Diamonds & Solitaires */}
          <div className="bg-ivory p-6 rounded-2xl border border-borderLuxury space-y-3">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center">
              <ShieldCheck className="w-4 h-4 text-gold-dark mr-2" />
              Certified Solitaire Diamonds
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Diamonds are the hardest mineral on earth, yet their brilliance is easily dulled by natural skin oils, lotions, and soaps.
            </p>
            <ul className="text-xs text-charcoal-muted space-y-1.5 list-disc pl-4">
              <li>Always wear jewellery as the final step after applying cosmetics, perfumes, and hairsprays.</li>
              <li>Regularly check prong settings by gently touching the stone under bright light.</li>
              <li>Visit our boutiques annually for complimentary professional ultrasonic and steam cleansing.</li>
            </ul>
          </div>

          {/* Polki & Kundan */}
          <div className="bg-ivory p-6 rounded-2xl border border-borderLuxury space-y-3">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center">
              <Sun className="w-4 h-4 text-gold-dark mr-2" />
              Heritage Jadau & Uncut Polki
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Kundan and Polki jewellery utilize pure 24K foil enclosures and hand-painted Meenakari enamel. Moisture is their biggest enemy.
            </p>
            <ul className="text-xs text-charcoal-muted space-y-1.5 list-disc pl-4">
              <li><strong>Never immerse Polki or Kundan in water or ultrasonic cleaners.</strong></li>
              <li>Wipe gently only with a dry lint-free cotton cloth.</li>
              <li>Store wrapped in air-tight plastic zip pouches with soft acid-free butter paper.</li>
            </ul>
          </div>

          {/* 925 Sterling Silver */}
          <div className="bg-ivory p-6 rounded-2xl border border-borderLuxury space-y-3">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center">
              <Droplets className="w-4 h-4 text-gold-dark mr-2" />
              925 Sterling Silver
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Sterling silver naturally reacts with airborne sulphur compounds over time, producing a subtle patina.
            </p>
            <ul className="text-xs text-charcoal-muted space-y-1.5 list-disc pl-4">
              <li>Wear silver often; your skin's natural oils help maintain its natural sheen.</li>
              <li>Use the complimentary anti-tarnish polishing cloth included with your order.</li>
              <li>Store with silica gel packets in dry, sealed containers away from humidity.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
