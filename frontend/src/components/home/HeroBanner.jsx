import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Crown,
  ShieldCheck,
  Gem,
  Sparkles,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { useMetalRate } from '../../context/MetalRateContext';
import { formatINR } from '../../utils/formatters';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Imperial Bridal Troussier 2026',
    titleLine1: 'Heirloom Splendour,',
    titleLine2: 'Crafted for Eternity.',
    description:
      'Immerse in bespoke 22K hallmarked gold, royal temple nakshi carvings, and certified polki choker sets handcrafted for your most sacred celebration.',
    primaryBtn: { text: 'Explore Bridal Suite', link: '/shop?category=bridal' },
    secondaryBtn: { text: 'Book In-Store Viewing', link: '/stores' },
    bgImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1800&q=80',
    spotlight: {
      productId: 'PROD-003',
      name: 'Padmavati Antique Temple Choker',
      purity: '22K Gold • Antique Nakshi',
      weight: '58.200 g Net Wt',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
      badge: 'Imperial Bridal Masterpiece',
    }
  },
  {
    id: 2,
    tag: 'Natural Certified Solitaires',
    titleLine1: 'Pure Celestial Fire,',
    titleLine2: 'Rare & Untamed.',
    description:
      'Hand-selected conflict-free solitaires set in 18K white and rose gold, certified with international GIA and IGI laser-inscribed pedigree reports.',
    primaryBtn: { text: 'Discover Solitaires', link: '/shop?category=diamond' },
    secondaryBtn: { text: 'Custom Solitaire Design', link: '/contact' },
    bgImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=80',
    spotlight: {
      productId: 'PROD-002',
      name: 'Royal Solitaire Symphony Ring',
      purity: '18K White Gold • 1.50ct VVS Diamond',
      weight: '6.400 g Net Wt',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      badge: 'GIA & IGI Certified Solitaire',
    }
  },
  {
    id: 3,
    tag: 'Royal Heritage 22K Solid Gold',
    titleLine1: 'The Maharani Lineage,',
    titleLine2: 'Transparent Bullion Billing.',
    description:
      'Honouring four decades of master Indian goldsmithing with zero-markup live bullion pricing, 100% BIS 916 hallmarking, and unconditional lifetime buyback.',
    primaryBtn: { text: 'Explore Fine Collections', link: '/shop' },
    secondaryBtn: { text: 'Check Live Bullion Rates', link: '/shop?category=gold' },
    bgImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1800&q=80',
    spotlight: {
      productId: 'PROD-001',
      name: 'The Maharani Kasu Mala',
      purity: '22K Solid Gold • 916 Hallmark',
      weight: '42.500 g Net Wt',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      badge: 'Signature Royal Kasu Mala',
    }
  }
];

export const HeroBanner = () => {
  const { brand } = useBrand();
  const { rates } = useMetalRate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div
      className="relative bg-[#061D16] text-white overflow-hidden border-b border-gold/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Crossfade Images */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            index === currentSlide ? 'opacity-35' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${s.bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Atmospheric Luxury Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061D16] via-[#061D16]/90 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column: Royal Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emeraldTheme/70 border border-gold/50 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>{slide.tag}</span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-normal leading-[1.12] text-white">
              {slide.titleLine1} <br />
              <span className="text-gold-light italic font-serif font-normal">
                {slide.titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {slide.description}
            </p>

            {/* Luxury Call-to-Action Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to={slide.primaryBtn.link}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#E5C158] via-[#D4AF37] to-[#B08823] hover:brightness-110 text-gray-950 font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-luxury transition-all flex items-center justify-center group"
              >
                <span>{slide.primaryBtn.text}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                to={slide.secondaryBtn.link}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 border border-gold/60 hover:bg-white/10 text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl transition flex items-center justify-center backdrop-blur-sm"
              >
                <span>{slide.secondaryBtn.text}</span>
              </Link>
            </div>

            {/* Slide Navigation Pill Selectors */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 pt-4">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-10 bg-gold'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <span className="text-xs font-mono text-gray-400 font-bold ml-2">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>
          </div>

          {/* Right Visual Column: Luxury Showcase Card */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            {/* Outer Glow & Metallic Border */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold/60 bg-[#0B2F24]/90 shadow-2xl backdrop-blur-md">
              {/* Product Media */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black/40">
                <img
                  src={slide.spotlight.image}
                  alt={slide.spotlight.name}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Purity & Hallmark Floating Badge */}
                <div className="absolute top-3.5 left-3.5 bg-gray-950/90 border border-gold/50 rounded-full px-3 py-1 flex items-center space-x-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                    100% BIS 916 HUID
                  </span>
                </div>

                {/* Arrow Controls on Image */}
                <div className="absolute bottom-3.5 right-3.5 flex items-center space-x-2">
                  <button
                    onClick={prevSlide}
                    className="w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-gold/40 transition cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-gold/40 transition cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Meta & Action */}
              <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0B2F24] to-[#061D16] border-t border-gold/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-300 block truncate">
                      {slide.spotlight.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5 truncate">
                      {slide.spotlight.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-300 mt-1">
                      <span>{slide.spotlight.purity}</span>
                      <span>•</span>
                      <span className="font-semibold">{slide.spotlight.weight}</span>
                    </div>
                  </div>

                  <Link
                    to={`/product/${slide.spotlight.productId}`}
                    className="px-4 py-2.5 bg-emeraldTheme hover:bg-emeraldTheme-light border border-gold text-amber-300 hover:text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm flex-shrink-0"
                  >
                    View Piece
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Assurance Pillars */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 text-amber-300 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">100% BIS Hallmarked</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Government Assayed with HUID</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Gem className="w-6 h-6 text-amber-300 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">Certified Solitaires</p>
              <p className="text-[11px] text-gray-400 mt-0.5">IGI & GIA Laser Inscribed</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-amber-300 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">Live Bullion Billing</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Zero-Markup Daily Market Rates</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-amber-300 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">Insured Vault Transit</p>
              <p className="text-[11px] text-gray-400 mt-0.5">100% Secure Doorstep Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};