import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useMetalRate } from '../context/MetalRateContext';
import { formatINR, formatWeight } from '../utils/formatters';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { calculatePrice } = useMetalRate();

  if (wishlist.length === 0) {
    return (
      <div className="bg-ivory/40 min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-borderLuxury p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emeraldTheme/10 mx-auto flex items-center justify-center text-emeraldTheme">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-charcoal">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Save your favourite bridal sets, solitaire rings and gold necklaces here to keep track of their live bullion prices.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs uppercase font-bold tracking-widest rounded-lg shadow-luxury transition"
          >
            <span>Browse Fine Jewellery</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[11px] uppercase font-bold tracking-widest text-gold-dark">
            Saved Adornments
          </span>
          <h1 className="text-3xl font-serif font-bold text-charcoal mt-1">
            My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const priceDetails = calculatePrice(product);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-borderLuxury overflow-hidden shadow-sm hover:shadow-luxury transition flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full bg-ivory">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-red-600 shadow-sm transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="absolute top-2.5 left-2.5 bg-charcoal/90 text-gold-light text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {product.purity} {product.metalType}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-[11px] text-charcoal-muted">
                      Net: {formatWeight(product.netMetalWeight)}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif font-bold text-sm text-charcoal hover:text-emeraldTheme mt-1 line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="text-base font-serif font-bold text-emeraldTheme mt-2">
                      {formatINR(priceDetails.finalPrice)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="mt-4 w-full py-2.5 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs font-semibold rounded-lg transition flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-gold-light" strokeWidth={1.5} />
                    <span>Move to Shopping Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
