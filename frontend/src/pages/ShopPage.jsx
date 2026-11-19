import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ArrowUpDown, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/mockData';
import { useMetalRate } from '../context/MetalRateContext';
import { formatINR } from '../utils/formatters';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { calculatePrice } = useMetalRate();

  const activeCategoryParam = searchParams.get('category') || 'all';
  const activeSearchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(activeCategoryParam);
  const [selectedMetal, setSelectedMetal] = useState('ALL');
  const [selectedPurity, setSelectedPurity] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category param if url changes
  React.useEffect(() => {
    if (activeCategoryParam) {
      setSelectedCategory(activeCategoryParam);
    }
  }, [activeCategoryParam]);

  // Compute live price for each product and filter/sort
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.map((prod) => ({
      ...prod,
      currentPrice: calculatePrice(prod).finalPrice
    }))
      .filter((prod) => {
        // Category filter
        if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
          return false;
        }

        // Search filter
        if (activeSearchParam) {
          const q = activeSearchParam.toLowerCase();
          const match =
            prod.name.toLowerCase().includes(q) ||
            prod.sku.toLowerCase().includes(q) ||
            prod.category.toLowerCase().includes(q) ||
            (prod.metalType && prod.metalType.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Metal filter
        if (selectedMetal !== 'ALL' && prod.metalType !== selectedMetal) {
          return false;
        }

        // Purity filter
        if (selectedPurity !== 'ALL' && !prod.purity.includes(selectedPurity)) {
          return false;
        }

        // Price filter
        if (prod.currentPrice > maxPrice) {
          return false;
        }

        // Stock filter
        if (onlyInStock && prod.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.currentPrice - b.currentPrice;
        if (sortBy === 'price-desc') return b.currentPrice - a.currentPrice;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0; // Default
      });
  }, [
    selectedCategory,
    activeSearchParam,
    selectedMetal,
    selectedPurity,
    maxPrice,
    onlyInStock,
    sortBy,
    calculatePrice
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedMetal('ALL');
    setSelectedPurity('ALL');
    setMaxPrice(500000);
    setOnlyInStock(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="bg-ivory/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8">
          <span className="text-[11px] uppercase font-bold tracking-widest text-gold-dark">
            Artisanal Collections
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-1">
            {selectedCategory === 'all'
              ? 'All Fine Jewellery'
              : INITIAL_CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Jewellery Catalog'}
          </h1>
          {activeSearchParam && (
            <p className="text-xs text-charcoal-muted mt-1">
              Search results for: <strong className="text-charcoal">"{activeSearchParam}"</strong>
            </p>
          )}
        </div>

        {/* Action Bar (Total Count, Sort, Mobile Filter Button) */}
        <div className="bg-white p-4 rounded-xl border border-borderLuxury mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center space-x-2 px-3 py-2 bg-ivory border border-borderLuxury rounded-lg text-xs font-semibold text-charcoal"
            >
              <Filter className="w-4 h-4 text-gold-dark" />
              <span>Filters</span>
            </button>
            <span className="text-xs text-charcoal-muted">
              Showing <strong className="text-charcoal">{filteredProducts.length}</strong> heirloom designs
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-charcoal-muted hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-ivory border border-borderLuxury rounded-lg px-3 py-1.5 text-xs font-medium text-charcoal focus:outline-none focus:border-gold"
            >
              <option value="featured">Featured Curations</option>
              <option value="bestseller">Bestselling Popularity</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-xl border border-borderLuxury h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-borderLuxury">
              <h3 className="font-serif font-bold text-base text-charcoal flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-gold-dark" />
                Refine Selection
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-burgundy hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2.5">
                Category
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left px-2.5 py-1.5 rounded transition ${
                    selectedCategory === 'all'
                      ? 'bg-burgundy text-white font-medium'
                      : 'text-charcoal hover:bg-ivory'
                  }`}
                >
                  All Categories ({INITIAL_PRODUCTS.length})
                </button>
                {INITIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`block w-full text-left px-2.5 py-1.5 rounded transition ${
                      selectedCategory === cat.slug
                        ? 'bg-burgundy text-white font-medium'
                        : 'text-charcoal hover:bg-ivory'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Type Filter */}
            <div className="pt-4 border-t border-borderLuxury">
              <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2.5">
                Precious Metal
              </h4>
              <div className="space-y-1.5 text-xs">
                {['ALL', 'GOLD', 'SILVER', 'PLATINUM', 'BRASS_GOLD_PLATED'].map((metal) => (
                  <label key={metal} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="metalFilter"
                      checked={selectedMetal === metal}
                      onChange={() => setSelectedMetal(metal)}
                      className="text-burgundy focus:ring-gold"
                    />
                    <span className="text-charcoal">
                      {metal === 'ALL'
                        ? 'All Metals'
                        : metal === 'BRASS_GOLD_PLATED'
                        ? 'Fashion / CZ'
                        : metal}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Purity Filter */}
            <div className="pt-4 border-t border-borderLuxury">
              <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2.5">
                Gold Purity
              </h4>
              <div className="space-y-1.5 text-xs">
                {['ALL', '24K', '22K', '18K', '14K'].map((purity) => (
                  <label key={purity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="purityFilter"
                      checked={selectedPurity === purity}
                      onChange={() => setSelectedPurity(purity)}
                      className="text-burgundy focus:ring-gold"
                    />
                    <span className="text-charcoal">
                      {purity === 'ALL' ? 'All Purities' : `${purity} Hallmarked`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div className="pt-4 border-t border-borderLuxury">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-charcoal-muted uppercase text-[11px]">Max Price</span>
                <span className="font-bold text-burgundy">{formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-burgundy"
              />
              <div className="flex justify-between text-[10px] text-charcoal-muted mt-1">
                <span>₹5,000</span>
                <span>₹5,00,000+</span>
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-4 border-t border-borderLuxury">
              <label className="flex items-center space-x-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-burgundy focus:ring-gold"
                />
                <span className="text-charcoal font-medium">In Stock Designs Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-borderLuxury p-12 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-gold mx-auto" />
                <h3 className="text-lg font-serif font-bold text-charcoal">
                  No jewellery matches your current filters
                </h3>
                <p className="text-xs text-charcoal-muted max-w-md mx-auto">
                  Try adjusting your price range, metal type, or clear active category filters to explore more heirloom pieces.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-semibold rounded-lg transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
