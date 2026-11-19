import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Heart,
  Users,
  Crown,
  Gem,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  Feather,
  Compass,
  MapPin
} from 'lucide-react';
import { useBrand } from '../context/BrandContext';

export const AboutPage = () => {
  const { brand } = useBrand();

  const MILESTONES = [
    {
      year: '1984',
      title: 'The Sacred Inception',
      desc: `Founded as a boutique atelier dedicated to the devotional art of South Indian temple jewellery and hand-carved nakshi craftsmanship.`
    },
    {
      year: '1996',
      title: 'Artisan Guild Formation',
      desc: 'Established our proprietary master karigar guild, uniting over 200 generational goldsmith families across Rajasthan, Bengal, and Tamil Nadu.'
    },
    {
      year: '2008',
      title: 'BIS & Diamond Certification Pioneers',
      desc: 'Became early adopters of mandatory government laser assaying and partnered with IGI & GIA for conflict-free solitaire transparency.'
    },
    {
      year: '2019',
      title: 'Heritage Boutique Showrooms',
      desc: 'Inaugurated flagship luxury experiential boutiques in Mumbai, New Delhi, Bengaluru, and Chennai featuring private bridal suites.'
    },
    {
      year: '2026',
      title: 'The Modern Digital Maison',
      desc: 'Pioneered zero-markup live bullion pricing technology, bringing real-time intraday market rates and insured vault logistics nationwide.'
    }
  ];

  const CRAFTSMANSHIP_STAGES = [
    {
      step: '01',
      title: 'Vedic & Botanical Design',
      desc: 'Every jewel begins with original hand-painted gouache illustrations inspired by Indian temple frescoes, royal dynasties, and natural floral geometries.',
      icon: Feather
    },
    {
      step: '02',
      title: 'Pure Bullion Alloying',
      desc: 'Pure 24K gold is compounded with fine master metals to achieve robust, ductile 22 Karat (91.6% purity) gold with rich, warm lustre.',
      icon: Flame
    },
    {
      step: '03',
      title: 'Ancestral Hand Karigari',
      desc: 'Master karigars hand-chisel relief sculptures, intricate nakshi foliage, and filigree work using hand-tools passed down through generations.',
      icon: Crown
    },
    {
      step: '04',
      title: 'Solitaire & Gemstone Setting',
      desc: 'Flawless VVS natural solitaires, Burmese rubies, and Zambian emeralds are precisely set using micro-prong and kundan jadau techniques.',
      icon: Gem
    },
    {
      step: '05',
      title: 'BIS Assaying & Laser HUID',
      desc: 'Each finished piece undergoes 38 rigorous quality checks before being inscribed with an immutable 6-digit laser HUID at BIS assay centres.',
      icon: ShieldCheck
    }
  ];

  const PILLARS = [
    {
      icon: ShieldCheck,
      title: '100% BIS Hallmarking',
      desc: 'Every gold jewel carries official government assaying with a tamper-proof 6-digit laser HUID.'
    },
    {
      icon: Gem,
      title: 'Certified Natural Solitaires',
      desc: 'Conflict-free natural diamonds accompanied by internationally recognized IGI & GIA grading reports.'
    },
    {
      icon: Sparkles,
      title: 'Live Bullion Pricing',
      desc: 'Zero-markup metal billing. Product prices recalculate dynamically with intraday market rates.'
    },
    {
      icon: Heart,
      title: 'Artisan Heritage Welfare',
      desc: 'Proudly empowering over 400 generational karigar families with fair wages and healthcare.'
    },
    {
      icon: Award,
      title: 'Lifetime Exchange & Buyback',
      desc: '100% gold weight value guaranteed at prevailing market bullion rates at any time across all boutiques.'
    },
    {
      icon: Compass,
      title: 'Insured Armored Transit',
      desc: 'Direct vault-to-doorstep transit insured to 100% value with secret OTP handover nationwide.'
    }
  ];

  return (
    <div className="bg-ivory/30 min-h-screen">
      {/* 1. Grand Hero Banner */}
      <section className="relative bg-[#061D16] text-white py-20 lg:py-28 overflow-hidden border-b border-gold/40">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061D16]/80 via-transparent to-[#061D16] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emeraldTheme/80 border border-gold/50 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase shadow-sm">
            <Crown className="w-4 h-4 text-amber-300" />
            <span>The Heritage Chronicle</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-normal leading-[1.15] text-white">
            Honouring Four Decades of <br />
            <span className="text-gold-light italic font-normal">Royal Indian Goldsmithing</span>
          </h1>

          <div className="w-24 h-1 bg-gold mx-auto my-4 rounded-full" />

          <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed max-w-2xl mx-auto">
            Founded in {brand.establishedYear}, {brand.brandName} was established on a sacred promise: to preserve the devotional patience of traditional Indian karigari while pioneering complete price transparency for modern connoisseurs.
          </p>
        </div>
      </section>

      {/* 2. Key Numbers Showcase */}
      <section className="bg-white border-b border-borderLuxury py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif font-black text-emeraldTheme">40+</span>
              <p className="text-xs uppercase font-extrabold text-gold-dark tracking-wider">Years of Mastery</p>
              <p className="text-xs text-gray-600">Preserving ancient karigari since {brand.establishedYear}</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif font-black text-emeraldTheme">100%</span>
              <p className="text-xs uppercase font-extrabold text-gold-dark tracking-wider">BIS 916 Hallmark</p>
              <p className="text-xs text-gray-600">Laser-inscribed government HUID on every gram</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif font-black text-emeraldTheme">400+</span>
              <p className="text-xs uppercase font-extrabold text-gold-dark tracking-wider">Master Karigars</p>
              <p className="text-xs text-gray-600">Ancestral artisan families empowered</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif font-black text-emeraldTheme">120k+</span>
              <p className="text-xs uppercase font-extrabold text-gold-dark tracking-wider">Patron Families</p>
              <p className="text-xs text-gray-600">Cherishing bespoke heirlooms across generations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Atelier Story & Karigari Preservation */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/40">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Ancestral Gold Karigari"
                  className="w-full h-[480px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300">
                    Sacred Craftsmanship
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white">
                    Living Art of Handcrafted Goldsmithing
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200">
                    Each Kasu Mala and Temple Choker is carved entirely by hand with precision steel gravers.
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block">
                Preserving Sacred Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950 leading-tight">
                Where Devotional Patience Transcends Mass Production
              </h2>
              <div className="w-20 h-1 bg-gold rounded-full" />

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                In an era dominated by computerized 3D printing and hollow machine castings, {brand.brandName} maintains a steadfast commitment to the human touch. True fine jewellery is an alchemical marriage of fire, metal, devotion, and centuries of inherited instinct.
              </p>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                Our workshops specialize in four classic schools of Indian adornment: South Indian <strong>Temple Nakshi</strong> carving, royal Rajasthan <strong>Kundan Jadau</strong>, vibrant <strong>Benares Meenakari</strong> enamel, and high-precision modern <strong>solitaire diamond settings</strong>.
              </p>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center px-6 py-3.5 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs uppercase font-extrabold tracking-widest rounded-xl shadow-luxury transition group border border-gold/40"
                >
                  <span>Explore Masterpiece Catalog</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform text-gold-light" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 5-Stage Craftsmanship Journey */}
      <section className="py-20 bg-white border-y border-borderLuxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block">
              From Mine to Masterpiece
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
              The Five Stages of Handcrafted Creation
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto my-4 rounded-full" />
            <p className="text-sm text-gray-600 font-medium">
              Every bespoke ornament undergoes an unhurried, multi-week journey through the hands of specialized master craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CRAFTSMANSHIP_STAGES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-ivory/60 p-6 rounded-2xl border-2 border-borderLuxury hover:border-gold/80 transition-all flex flex-col justify-between group shadow-sm hover:shadow-luxury"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-serif font-black text-gold-dark">{s.step}</span>
                      <div className="w-10 h-10 rounded-xl bg-white border border-borderLuxury flex items-center justify-center text-emeraldTheme group-hover:bg-emeraldTheme group-hover:text-amber-300 transition-colors shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-bold text-base text-gray-950 group-hover:text-emeraldTheme transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Master Artisan & Founder's Philosophy Quote */}
      <section className="py-20 bg-[#0B2F24] text-white relative overflow-hidden border-b border-gold/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <Crown className="w-10 h-10 text-amber-300 mx-auto" />
          
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium leading-relaxed italic text-gray-100">
            "A fine jewellery piece is never merely an ornament. It is an immutable archive of family blessings, a celebration of unconditional love, and an enduring sovereign store of wealth meant to transcend generations."
          </blockquote>

          <div className="pt-2">
            <p className="text-base font-serif font-bold text-amber-300 tracking-wider">
              {brand.brandName} Atelier Council
            </p>
            <p className="text-xs text-gray-300 tracking-widest uppercase mt-0.5">
              Generational Master Goldsmiths • Est. {brand.establishedYear}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Historic Milestones Timeline */}
      <section className="py-20 bg-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block">
              Four Decades of Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
              The Milestones of Our Heritage
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto my-4 rounded-full" />
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-gold/40 before:-ml-px">
            {MILESTONES.map((m, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emeraldTheme border-2 border-gold shadow-md z-10" />

                  {/* Content Card */}
                  <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                    <div className="bg-white p-6 rounded-2xl border-2 border-borderLuxury shadow-sm hover:shadow-luxury transition-all">
                      <span className="inline-block px-3 py-1 rounded-full bg-gold-50 text-gold-dark text-xs font-black tracking-wider uppercase mb-2 border border-gold/30">
                        {m.year}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-gray-950 mb-1">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. The Six Aurelia Pillars */}
      <section className="py-20 bg-white border-y border-borderLuxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block">
              The Patron Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
              Our Uncompromising Commitments
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto my-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLARS.map((p, index) => {
              const Icon = p.icon;
              return (
                <div
                  key={index}
                  className="bg-ivory/50 p-7 rounded-2xl border-2 border-borderLuxury hover:border-gold/80 transition-all flex flex-col space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emeraldTheme text-amber-300 flex items-center justify-center border border-gold/40 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-gray-950 group-hover:text-emeraldTheme transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Visit Atelier Boutiques CTA */}
      <section className="py-20 bg-emeraldTheme-deep text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <MapPin className="w-10 h-10 text-amber-300 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Experience Bespoke Royal Karigari In-Person
          </h2>
          <p className="text-sm sm:text-base text-gray-200 font-medium max-w-xl mx-auto leading-relaxed">
            We invite you and your family to our private showroom suites in Mumbai, New Delhi, Bengaluru, and Chennai for personalized bridal trials and bullion consultations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/stores"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#E5C158] via-[#D4AF37] to-[#B08823] hover:brightness-110 text-gray-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-luxury transition"
            >
              Book In-Store Bridal Trial
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 border border-gold/60 hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition"
            >
              Contact Atelier Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};