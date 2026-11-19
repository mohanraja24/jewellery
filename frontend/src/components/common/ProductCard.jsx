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
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-borderLuxury hover:border-gold/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
      {/* 1. Top Badges & Wishlist Action */}
      <div className="relative aspect-square w-full overflow-hidden bg-ivory">
        {/* Purity & Metal Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          <span className="bg-gray-950/95 text-amber-300 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-gold/40">
            {product.purity} {product.metalType}
          </span>
          {product.isBestSeller && (
            <span className="bg-emeraldTheme text-white text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-amber-400 text-gray-950 text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
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
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${isWishlisted
            ? 'bg-emeraldTheme text-amber-300'
            : 'bg-white/90 hover:bg-white text-gray-900 hover:text-emeraldTheme border border-borderLuxury/40'
            }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
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
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Weight & Specification Specs */}
          <div className="text-xs text-gray-600 font-bold flex items-center justify-between mb-2">
            <span>
              Net: <strong className="text-gray-950 text-sm">{formatWeight(product.netMetalWeight)}</strong>
            </span>
            {product.stoneWeight > 0 && (
              <span className="text-gray-700">Stone: {product.stoneWeight} {product.metalType === 'GOLD' && product.category === 'diamond' ? 'ct' : 'g'}</span>
            )}
            <span className="text-xs text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full font-extrabold">
              {product.pricingType === 'RATE_BASED' ? 'Live Price' : 'Fixed'}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-emeraldTheme line-clamp-1 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 font-semibold line-clamp-1 mt-1">
            SKU: {product.sku}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3.5 border-t border-borderLuxury flex items-center justify-between">
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-emeraldTheme font-sans">
              {formatINR(priceDetails.finalPrice)}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Incl. making & 3% GST
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-3.5 py-2 bg-ivory hover:bg-emeraldTheme text-gray-900 hover:text-white rounded-xl border border-borderLuxury hover:border-emeraldTheme transition-all flex items-center space-x-2 text-xs font-semibold shadow-xs group/btn cursor-pointer"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-gold-dark group-hover/btn:text-amber-300 transition-colors" strokeWidth={1.5} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
