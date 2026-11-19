import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/mockData';

export const ShopByCategory = () => {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block mb-2">
            Curated Expressions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
            Explore By Category
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto my-4 rounded-full"></div>
          <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
            From majestic 22K bridal adornments to featherlight daily wear solitaires, discover our expansive catalog tailored to every milestone.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {INITIAL_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 border border-borderLuxury hover:border-gold/80 flex flex-col"
            >
              {/* Image Container */}
              <div className="aspect-square w-full overflow-hidden bg-ivory relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Text Info */}
              <div className="p-4 text-center flex-grow flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-emeraldTheme transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium line-clamp-1 mt-1">
                    {category.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-borderLuxury flex items-center justify-center text-xs font-extrabold text-gold-dark group-hover:text-emeraldTheme transition-colors">
                  <span>Explore Designs</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
