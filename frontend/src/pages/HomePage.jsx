import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroBanner } from '../components/home/HeroBanner';
import { LiveRateWidget } from '../components/home/LiveRateWidget';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { BridalShowcase } from '../components/home/BridalShowcase';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { BrandStory } from '../components/home/BrandStory';
import { Testimonials } from '../components/home/Testimonials';
import { StoreInfo } from '../components/home/StoreInfo';
import { ProductCard } from '../components/common/ProductCard';
import { INITIAL_PRODUCTS } from '../data/mockData';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'bestsellers' | 'new'

  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'new') return p.isNewArrival;
    return true;
  });

  return (
    <div className="bg-ivory/30">
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Live Metal Rates Bar */}
      <LiveRateWidget />

      {/* 3. Shop by Category */}
      <ShopByCategory />

      {/* 4. Curated Showcase: Bestsellers & New Arrivals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark block mb-2">
                Handcrafted Brilliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
                Curated Jewellery Highlights
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0 p-1.5 bg-ivory rounded-xl border border-borderLuxury">
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'featured'
                  ? 'bg-emeraldTheme text-white shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
                  }`}
              >
                Featured Icons
              </button>
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'bestsellers'
                  ? 'bg-emeraldTheme text-white shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
                  }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'new'
                  ? 'bg-emeraldTheme text-white shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
                  }`}
              >
                New Additions
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3.5 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs uppercase font-bold tracking-widest rounded-xl shadow-luxury transition group border border-gold/30"
            >
              <span>Explore Complete Catalog ({INITIAL_PRODUCTS.length}+ Designs)</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-gold-light" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Featured Signature Collections */}
      <FeaturedCollections />

      {/* 6. Bridal Heritage Suite */}
      <BridalShowcase />

      {/* 7. Why Patrons Choose Us */}
      <WhyChooseUs />

      {/* 8. Brand Heritage Story */}
      <BrandStory />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Physical Boutiques */}
      <StoreInfo />
    </div>
  );
};
