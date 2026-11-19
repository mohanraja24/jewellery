import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
  Info,
  Clock,
  CheckCircle2,
  ChevronRight,
  Share2,
  Star
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { useMetalRate } from '../context/MetalRateContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';
import { formatINR, formatWeight } from '../utils/formatters';
import toast from 'react-hot-toast';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { calculatePrice } = useMetalRate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product
  const product = INITIAL_PRODUCTS.find((p) => p.id === id) || INITIAL_PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [breakdownOpen, setBreakdownOpen] = useState(true);

  const priceDetails = calculatePrice(product);
  const isWishlisted = isInWishlist(product.id);

  // Related products from same category
  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this exquisite piece from Aurelia: ${product.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-gray-500 mb-8">
          <Link to="/" className="hover:text-emeraldTheme">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/shop" className="hover:text-emeraldTheme">Shop</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-emeraldTheme capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Gallery: Image view with thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Primary View */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ivory border-2 border-borderLuxury shadow-sm group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-gray-950/95 text-amber-300 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md backdrop-blur-sm border border-gold/40">
                  {product.purity} {product.metalType}
                </span>
                <span className="bg-emerald-800 text-white text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  {product.pricingType === 'RATE_BASED' ? 'Live Rate Price' : 'Fixed Price'}
                </span>
              </div>

              {/* Share & Wishlist quick actions */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/95 hover:bg-white text-gray-900 hover:text-emeraldTheme shadow-md transition"
                  title="Share piece"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full shadow-md transition ${
                    isWishlisted ? 'bg-emeraldTheme text-amber-300' : 'bg-white/95 hover:bg-white text-gray-900'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar max-w-full">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? 'border-emeraldTheme shadow-md' : 'border-borderLuxury opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Certification & Assaying Assurance Box */}
            <div className="bg-ivory p-5 rounded-2xl border-2 border-borderLuxury space-y-3">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-7 h-7 text-emerald-800 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm uppercase font-extrabold text-gray-900 tracking-wider">
                    Assayed & Hallmarked Guarantee
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">
                    {product.certification}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 text-xs sm:text-sm text-gray-700 font-bold border-t border-borderLuxury">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>100% Purity Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Vault Insured Transit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Lifetime Exchangeable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>OTP Delivery Verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing Engine Breakdown & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark">
                  SKU: {product.sku}
                </span>
                <div className="flex items-center space-x-1 text-amber-400 text-xs sm:text-sm font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-extrabold text-gray-950">{product.rating || 4.9}</span>
                  <span className="text-gray-500">({product.reviewCount || 24} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-black text-gray-950 mt-2">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-gray-700 mt-3 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Live Rate Price Card */}
            <div className="bg-ivory rounded-2xl p-6 border-2 border-gold/50 shadow-sm relative overflow-hidden">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-600 font-extrabold uppercase tracking-wider block">
                    Calculated Live Price
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-sans text-emeraldTheme mt-1">
                    {formatINR(priceDetails.finalPrice)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center text-xs text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full font-extrabold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Live Rate Synced
                  </span>
                  <p className="text-xs font-bold text-gray-700 mt-1">
                    Rate: {formatINR(priceDetails.rateUsed)}/g
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2">
                Price is dynamically computed based on today's official bullion benchmark and net metal weight. Includes 3% GST.
              </p>

              {/* Price Breakdown Toggle */}
              <div className="mt-5 pt-4 border-t border-borderLuxury">
                <button
                  onClick={() => setBreakdownOpen(!breakdownOpen)}
                  className="flex items-center justify-between w-full text-xs sm:text-sm font-extrabold text-gray-900 hover:text-emeraldTheme cursor-pointer"
                >
                  <span className="flex items-center">
                    <Info className="w-4 h-4 mr-1.5 text-gold-dark" />
                    Transparent Price Breakdown
                  </span>
                  <span>{breakdownOpen ? '▲ Hide Breakdown' : '▼ View Breakdown'}</span>
                </button>

                {breakdownOpen && (
                  <div className="mt-3.5 space-y-2 text-xs sm:text-sm bg-white p-5 rounded-xl border border-borderLuxury shadow-sm">
                    <div className="flex justify-between py-1.5 border-b border-borderLuxury">
                      <span className="text-gray-600 font-medium">
                        Metal Value ({formatWeight(product.netMetalWeight)} × {formatINR(priceDetails.rateUsed)}/g):
                      </span>
                      <strong className="text-gray-950 font-bold">{formatINR(priceDetails.metalValue)}</strong>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-borderLuxury">
                      <span className="text-gray-600 font-medium">
                        Making Charges ({product.makingChargeType === 'PERCENT' ? `${product.makingCharge}%` : `₹${product.makingCharge}`}):
                      </span>
                      <strong className="text-gray-950 font-bold">{formatINR(priceDetails.makingCharge)}</strong>
                    </div>

                    {priceDetails.wastageCharge > 0 && (
                      <div className="flex justify-between py-1.5 border-b border-borderLuxury">
                        <span className="text-gray-600 font-medium">
                          Wastage Allowance ({product.wastagePercentage}%):
                        </span>
                        <strong className="text-gray-950 font-bold">{formatINR(priceDetails.wastageCharge)}</strong>
                      </div>
                    )}

                    {priceDetails.stoneValue > 0 && (
                      <div className="flex justify-between py-1.5 border-b border-borderLuxury">
                        <span className="text-gray-600 font-medium">
                          Precious Stones / Diamonds Value:
                        </span>
                        <strong className="text-gray-950 font-bold">{formatINR(priceDetails.stoneValue)}</strong>
                      </div>
                    )}

                    <div className="flex justify-between py-1.5 border-b border-borderLuxury font-bold">
                      <span className="text-gray-900">Subtotal:</span>
                      <span className="text-gray-900">{formatINR(priceDetails.subtotal)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-borderLuxury">
                      <span className="text-gray-600 font-medium">
                        Applicable GST ({priceDetails.taxRate}%):
                      </span>
                      <strong className="text-gray-950 font-bold">{formatINR(priceDetails.tax)}</strong>
                    </div>

                    <div className="flex justify-between pt-2 text-base font-black text-emeraldTheme">
                      <span>Total Final Price:</span>
                      <span>{formatINR(priceDetails.finalPrice)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Matrix Table */}
            <div>
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-gray-800 mb-3">
                Metal & Gemstone Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-ivory rounded-xl border border-borderLuxury">
                  <span className="text-gray-600 font-medium block text-xs">Gross Weight</span>
                  <strong className="text-gray-950 text-base font-bold">{formatWeight(product.grossWeight)}</strong>
                </div>
                <div className="p-3.5 bg-ivory rounded-xl border border-borderLuxury">
                  <span className="text-gray-600 font-medium block text-xs">Net Metal Weight</span>
                  <strong className="text-gray-950 text-base font-bold">{formatWeight(product.netMetalWeight)}</strong>
                </div>
                <div className="p-3.5 bg-ivory rounded-xl border border-borderLuxury">
                  <span className="text-gray-600 font-medium block text-xs">Metal & Purity</span>
                  <strong className="text-gray-950 text-base font-bold">{product.metalType} • {product.purity}</strong>
                </div>
                <div className="p-3.5 bg-ivory rounded-xl border border-borderLuxury">
                  <span className="text-gray-600 font-medium block text-xs">Stone Weight</span>
                  <strong className="text-gray-950 text-base font-bold">
                    {product.stoneWeight ? `${product.stoneWeight} ${product.category === 'diamond' ? 'ct' : 'g'}` : 'Zero Stones'}
                  </strong>
                </div>
              </div>

              {product.diamondDetails && (
                <div className="mt-3.5 p-4 bg-white border-2 border-borderLuxury rounded-xl text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-gray-950 flex items-center">
                    <Award className="w-4 h-4 mr-1.5 text-gold-dark" />
                    Diamond Grading Specs:
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-gray-700 font-medium pt-1">
                    <div>Carat: <strong className="text-gray-950 font-bold">{product.diamondDetails.carat} ct</strong></div>
                    <div>Cut: <strong className="text-gray-950 font-bold">{product.diamondDetails.cut}</strong></div>
                    <div>Clarity: <strong className="text-gray-950 font-bold">{product.diamondDetails.clarity}</strong></div>
                    <div>Color: <strong className="text-gray-950 font-bold">{product.diamondDetails.color}</strong></div>
                  </div>
                </div>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase font-extrabold tracking-wider text-gray-800">
                    Select Size / Length
                  </label>
                  <span className="text-xs font-bold text-emeraldTheme hover:underline cursor-pointer">
                    Size Consultation Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border-2 transition ${
                        selectedSize === sz
                          ? 'border-emeraldTheme bg-emeraldTheme text-white shadow-sm'
                          : 'border-borderLuxury bg-white text-gray-800 hover:border-gold'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart Action */}
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center border-2 border-borderLuxury rounded-xl overflow-hidden bg-ivory">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-900 hover:bg-white text-sm font-black"
                >
                  -
                </button>
                <span className="px-3 py-3 text-sm font-extrabold text-gray-950 w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-900 hover:bg-white text-sm font-black"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="flex-grow py-4 px-6 bg-emeraldTheme hover:bg-emeraldTheme-light text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-luxury transition flex items-center justify-center space-x-2 border border-gold/40"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Shipping & Delivery Notice */}
            <div className="pt-4 border-t border-borderLuxury flex items-center space-x-3 text-xs sm:text-sm text-gray-700 font-medium">
              <Truck className="w-5 h-5 text-gold-dark flex-shrink-0" />
              <span>
                Dispatch within <strong className="text-gray-950">{product.deliveryTime || '2-4 business days'}</strong> via high-value insured transit.
              </span>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-borderLuxury">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark">
                Complementary Adornments
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-950 mt-1">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
