import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
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
import { formatINR, formatWeight, formatDate } from '../utils/formatters';
import toast from 'react-hot-toast';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { calculatePrice, rates } = useMetalRate();
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
        <nav className="flex items-center space-x-2 text-xs text-charcoal-muted mb-8">
          <Link to="/" className="hover:text-burgundy">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-burgundy">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-burgundy capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Gallery: Image view with thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Primary View */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ivory border border-borderLuxury shadow-sm group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-charcoal/90 text-gold-light text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm backdrop-blur-sm">
                  {product.purity} {product.metalType}
                </span>
                <span className="bg-emerald-800 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                  {product.pricingType === 'RATE_BASED' ? 'Live Rate Price' : 'Fixed Price'}
                </span>
              </div>

              {/* Share & Wishlist quick actions */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 hover:bg-white text-charcoal hover:text-burgundy shadow-sm transition"
                  title="Share piece"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full shadow-sm transition ${
                    isWishlisted ? 'bg-burgundy text-white' : 'bg-white/90 hover:bg-white text-charcoal'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? 'border-burgundy shadow-md' : 'border-borderLuxury opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Certification & Assaying Assurance Box */}
            <div className="bg-ivory/60 p-5 rounded-xl border border-borderLuxury space-y-3">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-charcoal tracking-wider">
                    Assayed & Hallmarked Guarantee
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    {product.certification}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-charcoal-muted border-t border-borderLuxury/60">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" />
                  <span>100% Purity Certified</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Tamper-Proof Vault Packing</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Lifetime Exchangeable</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Fully Insured Doorstep Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing Engine Breakdown & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-gold-dark">
                  SKU: {product.sku}
                </span>
                <div className="flex items-center space-x-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-charcoal">{product.rating || 4.9}</span>
                  <span className="text-charcoal-muted">({product.reviewCount || 24} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mt-2">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Live Rate Price Card */}
            <div className="bg-ivory rounded-2xl p-6 border border-gold/40 shadow-sm relative overflow-hidden">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-charcoal-muted uppercase tracking-wider block">
                    Calculated Live Price
                  </span>
                  <div className="text-3xl font-serif font-bold text-burgundy mt-1">
                    {formatINR(priceDetails.finalPrice)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center text-[10px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3 mr-1" />
                    Live Rate Synced
                  </span>
                  <p className="text-[10px] text-charcoal-muted mt-1">
                    Rate: {formatINR(priceDetails.rateUsed)}/g
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-charcoal-muted mt-2">
                Price is dynamically computed based on today's official bullion benchmark and net metal weight. Includes 3% GST.
              </p>

              {/* Price Breakdown Toggle */}
              <div className="mt-4 pt-4 border-t border-borderLuxury">
                <button
                  onClick={() => setBreakdownOpen(!breakdownOpen)}
                  className="flex items-center justify-between w-full text-xs font-bold text-charcoal hover:text-burgundy"
                >
                  <span className="flex items-center">
                    <Info className="w-3.5 h-3.5 mr-1.5 text-gold-dark" />
                    Transparent Price Breakdown
                  </span>
                  <span>{breakdownOpen ? '▲ Hide' : '▼ View Breakdown'}</span>
                </button>

                {breakdownOpen && (
                  <div className="mt-3 space-y-2 text-xs bg-white p-4 rounded-xl border border-borderLuxury">
                    <div className="flex justify-between py-1 border-b border-borderLuxury/40">
                      <span className="text-charcoal-muted">
                        Metal Value ({formatWeight(product.netMetalWeight)} × {formatINR(priceDetails.rateUsed)}/g):
                      </span>
                      <strong className="text-charcoal font-semibold">{formatINR(priceDetails.metalValue)}</strong>
                    </div>

                    <div className="flex justify-between py-1 border-b border-borderLuxury/40">
                      <span className="text-charcoal-muted">
                        Making Charges ({product.makingChargeType === 'PERCENT' ? `${product.makingCharge}%` : `₹${product.makingCharge}`}):
                      </span>
                      <strong className="text-charcoal font-semibold">{formatINR(priceDetails.makingCharge)}</strong>
                    </div>

                    {priceDetails.wastageCharge > 0 && (
                      <div className="flex justify-between py-1 border-b border-borderLuxury/40">
                        <span className="text-charcoal-muted">
                          Wastage Allowance ({product.wastagePercentage}%):
                        </span>
                        <strong className="text-charcoal font-semibold">{formatINR(priceDetails.wastageCharge)}</strong>
                      </div>
                    )}

                    {priceDetails.stoneValue > 0 && (
                      <div className="flex justify-between py-1 border-b border-borderLuxury/40">
                        <span className="text-charcoal-muted">
                          Precious Stones / Diamonds Value:
                        </span>
                        <strong className="text-charcoal font-semibold">{formatINR(priceDetails.stoneValue)}</strong>
                      </div>
                    )}

                    <div className="flex justify-between py-1 border-b border-borderLuxury/40 font-medium">
                      <span className="text-charcoal">Subtotal:</span>
                      <span className="text-charcoal">{formatINR(priceDetails.subtotal)}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-borderLuxury/40">
                      <span className="text-charcoal-muted">
                        Applicable GST ({priceDetails.taxRate}%):
                      </span>
                      <strong className="text-charcoal font-semibold">{formatINR(priceDetails.tax)}</strong>
                    </div>

                    <div className="flex justify-between pt-1 text-sm font-bold text-burgundy">
                      <span>Total Final Price:</span>
                      <span>{formatINR(priceDetails.finalPrice)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Matrix Table */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2.5">
                Metal & Gemstone Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-ivory/50 rounded-lg border border-borderLuxury">
                  <span className="text-charcoal-muted block text-[11px]">Gross Weight</span>
                  <strong className="text-charcoal text-sm">{formatWeight(product.grossWeight)}</strong>
                </div>
                <div className="p-3 bg-ivory/50 rounded-lg border border-borderLuxury">
                  <span className="text-charcoal-muted block text-[11px]">Net Metal Weight</span>
                  <strong className="text-charcoal text-sm">{formatWeight(product.netMetalWeight)}</strong>
                </div>
                <div className="p-3 bg-ivory/50 rounded-lg border border-borderLuxury">
                  <span className="text-charcoal-muted block text-[11px]">Metal & Purity</span>
                  <strong className="text-charcoal text-sm">{product.metalType} • {product.purity}</strong>
                </div>
                <div className="p-3 bg-ivory/50 rounded-lg border border-borderLuxury">
                  <span className="text-charcoal-muted block text-[11px]">Stone Weight</span>
                  <strong className="text-charcoal text-sm">
                    {product.stoneWeight ? `${product.stoneWeight} ${product.category === 'diamond' ? 'ct' : 'g'}` : 'Zero Stones'}
                  </strong>
                </div>
              </div>

              {product.diamondDetails && (
                <div className="mt-3 p-3 bg-white border border-borderLuxury rounded-lg text-xs space-y-1">
                  <div className="font-bold text-charcoal flex items-center">
                    <Award className="w-3.5 h-3.5 mr-1 text-gold-dark" />
                    Diamond Grading Specs:
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-charcoal-muted pt-1">
                    <div>Carat: <strong className="text-charcoal">{product.diamondDetails.carat} ct</strong></div>
                    <div>Cut: <strong className="text-charcoal">{product.diamondDetails.cut}</strong></div>
                    <div>Clarity: <strong className="text-charcoal">{product.diamondDetails.clarity}</strong></div>
                    <div>Color: <strong className="text-charcoal">{product.diamondDetails.color}</strong></div>
                  </div>
                </div>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-charcoal-muted">
                    Select Size / Length
                  </label>
                  <span className="text-[11px] text-burgundy hover:underline cursor-pointer">
                    Size Consultation Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                        selectedSize === sz
                          ? 'border-burgundy bg-burgundy text-white shadow-sm'
                          : 'border-borderLuxury bg-white text-charcoal hover:border-gold'
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
              <div className="flex items-center border border-borderLuxury rounded-lg overflow-hidden bg-ivory">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-charcoal hover:bg-white text-xs font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2.5 text-xs font-bold text-charcoal w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-charcoal hover:bg-white text-xs font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="flex-grow py-3.5 px-6 bg-burgundy hover:bg-burgundy-light text-white font-semibold text-xs uppercase tracking-widest rounded-lg shadow-luxury transition flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4 text-gold-light" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Shipping & Delivery Notice */}
            <div className="pt-4 border-t border-borderLuxury flex items-center space-x-3 text-xs text-charcoal-muted">
              <Truck className="w-5 h-5 text-gold-dark flex-shrink-0" />
              <span>
                Dispatch within <strong>{product.deliveryTime || '2-4 business days'}</strong> via high-value insured transit.
              </span>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-borderLuxury">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-dark">
                Complementary Adornments
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mt-1">
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
