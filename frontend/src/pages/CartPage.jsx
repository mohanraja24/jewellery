import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Tag,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMetalRate } from '../context/MetalRateContext';
import { useAuth } from '../context/AuthContext';
import { formatINR, formatWeight } from '../utils/formatters';
import toast from 'react-hot-toast';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSummary,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    quoteExpiry,
    lockPriceQuote
  } = useCart();
  const { rates, calculatePrice } = useMetalRate();
  const { user, isAuthenticated } = useAuth();

  const [couponInput, setCouponInput] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Handle price quote timer (15 minutes locked price)
  useEffect(() => {
    if (cartItems.length > 0 && !quoteExpiry) {
      lockPriceQuote();
    }
  }, [cartItems, quoteExpiry, lockPriceQuote]);

  useEffect(() => {
    if (!quoteExpiry) return;
    const interval = setInterval(() => {
      const diff = Math.floor((new Date(quoteExpiry).getTime() - Date.now()) / 1000);
      if (diff <= 0) {
        setSecondsRemaining(0);
        clearInterval(interval);
      } else {
        setSecondsRemaining(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [quoteExpiry]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const minutes = secondsRemaining !== null ? Math.floor(secondsRemaining / 60) : 15;
  const seconds = secondsRemaining !== null ? secondsRemaining % 60 : 0;

  if (cartItems.length === 0) {
    return (
      <div className="bg-ivory/40 min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-borderLuxury p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-gold-50 mx-auto flex items-center justify-center text-gold-dark">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-charcoal">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Discover our hallmarked gold necklaces, solitaire diamond rings, and royal bridal sets to add your desired bespoke pieces.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase font-bold tracking-widest rounded-lg shadow-luxury transition"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-6">
          <span className="text-[11px] uppercase font-bold tracking-widest text-gold-dark">
            Order Review
          </span>
          <h1 className="text-3xl font-serif font-bold text-charcoal mt-1">
            Bespoke Shopping Bag ({cartSummary.totalQuantity} {cartSummary.totalQuantity === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {/* 15-Minute Price Lock Banner */}
        <div className="bg-white rounded-xl border border-gold/40 p-4 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gold-50 text-gold-dark rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-burgundy block">
                Live Price Quote Locked
              </span>
              <p className="text-xs text-charcoal-muted">
                Your cart total is locked against bullion rate fluctuations for:
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-burgundy/10 px-4 py-2 rounded-lg border border-burgundy/20">
            <span className="text-xs font-semibold text-burgundy">Quote Expiry:</span>
            <span className="text-base font-mono font-bold text-burgundy">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Layout (Items Table & Order Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item, index) => {
              const priceDetails = calculatePrice(item.product);
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="bg-white rounded-xl border border-borderLuxury p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-ivory border border-borderLuxury flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider">
                        {item.product.purity} {item.product.metalType}
                      </span>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-serif font-bold text-sm text-charcoal hover:text-burgundy line-clamp-1">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        Size: <strong className="text-charcoal">{item.selectedSize}</strong> • Net Wt: {formatWeight(item.product.netMetalWeight)}
                      </p>
                      <p className="text-[11px] text-charcoal-muted">
                        Live Rate: {formatINR(priceDetails.rateUsed)}/g
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-borderLuxury/60">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-borderLuxury rounded-lg bg-ivory">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                        }
                        className="px-2.5 py-1 text-charcoal hover:bg-white text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                        }
                        className="px-2.5 py-1 text-charcoal hover:bg-white text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Total for this item */}
                    <div className="text-right">
                      <div className="text-base font-serif font-bold text-burgundy">
                        {formatINR(priceDetails.finalPrice * item.quantity)}
                      </div>
                      <div className="text-[10px] text-charcoal-muted">
                        {formatINR(priceDetails.finalPrice)} each
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-charcoal-muted hover:text-red-600 transition p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Clear Bag Button */}
            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="text-xs uppercase font-bold tracking-wider text-burgundy hover:underline flex items-center"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-charcoal-muted hover:text-red-600 underline"
              >
                Empty Entire Bag
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-borderLuxury p-6 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-charcoal pb-3 border-b border-borderLuxury">
                Order Value Summary
              </h3>

              {/* Coupon Form */}
              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-charcoal-muted mb-2">
                  Apply Privilege Voucher
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-900">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <strong>{appliedCoupon.code}</strong>
                        <span className="block text-[10px] text-emerald-700">
                          {appliedCoupon.description}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex">
                    <input
                      type="text"
                      placeholder="e.g. AURELIA10 or WELCOME2000"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="bg-ivory border border-borderLuxury rounded-l-lg px-3 py-2 text-xs text-charcoal uppercase placeholder:normal-case focus:outline-none focus:border-gold flex-grow"
                    />
                    <button
                      type="submit"
                      className="bg-burgundy hover:bg-burgundy-light text-white px-4 text-xs font-semibold rounded-r-lg transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Breakdown Table */}
              <div className="space-y-2 text-xs pt-2 border-t border-borderLuxury/60">
                <div className="flex justify-between text-charcoal-muted">
                  <span>Pure Precious Metal Value:</span>
                  <span className="text-charcoal font-semibold">{formatINR(cartSummary.totalMetalValue)}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Craftsmanship & Making Charges:</span>
                  <span className="text-charcoal font-semibold">{formatINR(cartSummary.totalMakingCharges)}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Applicable GST (3% Precious Metal):</span>
                  <span className="text-charcoal font-semibold">{formatINR(cartSummary.totalTax)}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Insured Pan-India Vault Courier:</span>
                  <span className="text-emerald-700 font-bold">FREE (Complimentary)</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Privilege Coupon Discount:</span>
                    <span>- {formatINR(cartSummary.discountAmount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-borderLuxury flex justify-between items-baseline">
                  <span className="text-sm font-bold text-charcoal">Net Payable:</span>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-burgundy">
                      {formatINR(cartSummary.netPayable)}
                    </span>
                    <span className="block text-[10px] text-charcoal-muted">
                      Price locked based on live bullion index
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal-dark font-bold text-xs uppercase tracking-widest rounded-lg shadow-luxury transition flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4 text-charcoal-dark" />
                <span>Proceed to Secure Checkout</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-charcoal-muted flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 mr-1" />
                  Razorpay 256-bit Encrypted • 100% Insured Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Preview Modal / Drawer */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-gold/40 overflow-hidden animate-scaleUp">
            <div className="bg-burgundy text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-gold-light flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-gold" />
                  Secure Checkout Confirmation
                </h3>
                <p className="text-xs text-ivory/80">
                  Step 1 of 2: Confirm delivery destination & payment mode
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-ivory/70 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Delivery Address */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2">
                  Delivery Address
                </h4>
                <div className="p-3 bg-ivory rounded-lg border border-borderLuxury text-xs text-charcoal space-y-1">
                  <p className="font-bold text-charcoal">
                    {user?.name || 'Priyanka Sharma'} (+91 98450 12345)
                  </p>
                  <p className="text-charcoal-muted">
                    Villa 14, Prestige Silver Springs, Outer Ring Road
                  </p>
                  <p className="text-charcoal-muted">
                    Bengaluru, Karnataka - 560037
                  </p>
                </div>
              </div>

              {/* Price Snapshot */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2">
                  Immutable Price Snapshot
                </h4>
                <div className="p-3 bg-gold-50/50 rounded-lg border border-gold/40 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-charcoal">
                      Total Order Amount ({cartSummary.totalQuantity} items):
                    </span>
                    <span className="block text-[10px] text-charcoal-muted">
                      Locked at rate: Gold 22K {formatINR(rates.gold22k)}/g
                    </span>
                  </div>
                  <span className="text-xl font-serif font-bold text-burgundy">
                    {formatINR(cartSummary.netPayable)}
                  </span>
                </div>
              </div>

              {/* Payment Gateways Option */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2">
                  Select Payment Method
                </h4>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between p-3 border-2 border-gold rounded-lg bg-gold-50/20 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input type="radio" name="paymentOption" defaultChecked className="text-burgundy" />
                      <span className="font-semibold text-charcoal">Razorpay Online Gateway</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Cards, UPI, NetBanking
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-3 border border-borderLuxury rounded-lg hover:bg-ivory cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input type="radio" name="paymentOption" className="text-burgundy" />
                      <span className="font-semibold text-charcoal">Bank Wire Transfer (NEFT/RTGS)</span>
                    </div>
                    <span className="text-[10px] text-charcoal-muted">For high-value orders</span>
                  </label>
                </div>
              </div>

              {/* Confirm & Place Order Simulation */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    toast.success('Order placed successfully with locked live rates! Invoice dispatched to email.');
                    clearCart();
                    setCheckoutModalOpen(false);
                    navigate('/account');
                  }}
                  className="w-full py-3.5 bg-burgundy hover:bg-burgundy-light text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-luxury transition"
                >
                  Pay {formatINR(cartSummary.netPayable)} & Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
