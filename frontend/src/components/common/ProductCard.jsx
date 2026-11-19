import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useMetalRate } from '../../context/MetalRateContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR, formatWeight } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const { calculatePrice } = useMetalRate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const priceDetails = calculatePrice(product);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-borderLuxury hover:border-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
      {/* 1. Top Badges & Wishlist Action */}
      <div className="relative aspect-square w-full overflow-hidden bg-ivory">
        {/* Purity & Metal Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          <span className="bg-charcoal/90 text-gold-light text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm border border-gold/30">
            {product.purity} {product.metalType}
          </span>
          {product.isBestSeller && (
            <span className="bg-emeraldTheme text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-gold text-charcoal-dark text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted
              ? 'bg-emeraldTheme text-gold'
              : 'bg-white/85 hover:bg-white text-charcoal hover:text-emeraldTheme'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
      </div>

      {/* 2. Product Meta & Pricing */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Weight & Specification Specs */}
          <div className="text-[11px] text-charcoal-muted flex items-center justify-between mb-1.5">
            <span>
              Net: <strong className="text-charcoal font-semibold">{formatWeight(product.netMetalWeight)}</strong>
            </span>
            {product.stoneWeight > 0 && (
              <span>Stone: {product.stoneWeight} {product.metalType === 'GOLD' && product.category === 'diamond' ? 'ct' : 'g'}</span>
            )}
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              {product.pricingType === 'RATE_BASED' ? 'Live Rate' : 'Fixed'}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif font-bold text-sm sm:text-base text-charcoal group-hover:text-emeraldTheme line-clamp-1 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-charcoal-muted line-clamp-1 mt-0.5">
            SKU: {product.sku}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3.5 border-t border-borderLuxury flex items-center justify-between">
          <div>
            <div className="text-base sm:text-lg font-bold font-serif text-emeraldTheme">
              {formatINR(priceDetails.finalPrice)}
            </div>
            <div className="text-[10px] text-charcoal-muted">
              Incl. making & 3% GST
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2 sm:px-3.5 sm:py-2 bg-ivory hover:bg-emeraldTheme text-charcoal hover:text-white rounded-xl border border-borderLuxury hover:border-emeraldTheme transition-all flex items-center space-x-1.5 text-xs font-semibold shadow-sm"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-dark" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
