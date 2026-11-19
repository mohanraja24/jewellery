import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'col-heritage',
    title: 'The Royal Heritage',
    subtitle: 'Kasu Malas, Temple Chokers & 22K Grandeur',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=gold',
    badge: 'Signature Craft'
  },
  {
    id: 'col-solitaire',
    title: 'Solitaire Symphony',
    subtitle: 'Rare VVS Diamonds in 18K White & Rose Gold',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=diamond',
    badge: 'IGI Certified'
  },
  {
    id: 'col-bridal',
    title: 'Imperial Bridal Troussier',
    subtitle: 'Heirloom Sets Handcrafted for Royal Celebrations',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=bridal',
    badge: 'Limited Edition'
  }
];

export const FeaturedCollections = () => {
  return (
    <section className="py-20 bg-white border-b border-borderLuxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block mb-2">
              Bespoke Lineage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
              Featured Signature Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs sm:text-sm uppercase font-extrabold tracking-widest text-emeraldTheme hover:text-gold-dark transition flex items-center"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={col.link}
              className="group relative rounded-2xl overflow-hidden shadow-lg border border-borderLuxury h-[440px] flex flex-col justify-end p-8"
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/50 to-transparent"></div>

              <div className="relative z-10 text-white space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-gray-950 text-xs uppercase font-extrabold tracking-wider shadow-sm">
                  {col.badge}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 font-medium">
                  {col.subtitle}
                </p>
                <div className="pt-2 flex items-center text-xs sm:text-sm font-bold text-amber-300 group-hover:translate-x-1.5 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
