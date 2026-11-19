import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock,
  Tag,
  Lock,
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
  const { user } = useAuth();

  const [couponInput, setCouponInput] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

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
      <div className="bg-ivory min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border-2 border-borderLuxury p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-gold-50 mx-auto flex items-center justify-center text-gold-dark border border-gold/30">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-black text-gray-950">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Discover our hallmarked gold necklaces, solitaire diamond rings, and royal bridal sets to add your desired bespoke pieces.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3.5 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs sm:text-sm uppercase font-extrabold tracking-widest rounded-xl shadow-luxury transition"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark">
            Order Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-gray-950 mt-1">
            Bespoke Shopping Bag ({cartSummary.totalQuantity} {cartSummary.totalQuantity === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {/* 15-Minute Price Lock Banner */}
        <div className="bg-white rounded-2xl border-2 border-gold/50 p-5 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-gold-50 text-gold-dark rounded-xl border border-gold/30">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-emeraldTheme block">
                Live Price Quote Locked
              </span>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Your cart total is locked against intraday bullion rate fluctuations for:
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-emeraldTheme-50 px-5 py-2.5 rounded-xl border border-emeraldTheme/30">
            <span className="text-xs font-bold text-emeraldTheme">Quote Expiry:</span>
            <span className="text-lg font-mono font-black text-emeraldTheme">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Layout (Items Table & Order Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => {
              const priceDetails = calculatePrice(item.product);
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="bg-white rounded-2xl border-2 border-borderLuxury p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Product Media & Information */}
                  <div className="flex items-start space-x-4 flex-1 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover bg-ivory border-2 border-borderLuxury flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <span className="inline-block text-xs uppercase font-extrabold text-gold-dark tracking-wider">
                        {item.product.purity} {item.product.metalType}
                      </span>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 hover:text-emeraldTheme transition-colors leading-snug">
                          {item.product.name}
                        </h3>
                      </Link>

                      {/* Meta Information Tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-700 font-semibold">
                        <span className="bg-ivory border border-borderLuxury px-2.5 py-1 rounded-md">
                          Size: <strong className="text-gray-950 font-bold">{item.selectedSize}</strong>
                        </span>
                        <span className="bg-ivory border border-borderLuxury px-2.5 py-1 rounded-md">
                          Net Wt: <strong className="text-gray-950 font-bold">{formatWeight(item.product.netMetalWeight)}</strong>
                        </span>
                        <span className="text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-bold">
                          Live Rate: {formatINR(priceDetails.rateUsed)}/g
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper, Total Price & Remove Button */}
                  <div className="flex items-center justify-between md:justify-end gap-5 sm:gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-borderLuxury flex-shrink-0">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border-2 border-borderLuxury rounded-xl bg-ivory shadow-sm overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center text-gray-900 hover:bg-white text-sm font-black transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-black text-gray-950 select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center text-gray-900 hover:bg-white text-sm font-black transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Price Block */}
                    <div className="text-right whitespace-nowrap min-w-[110px]">
                      <div className="text-xl sm:text-2xl font-black font-sans text-emeraldTheme">
                        {formatINR(priceDetails.finalPrice * item.quantity)}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {formatINR(priceDetails.finalPrice)} each
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition cursor-pointer"
                      title="Remove from bag"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Clear Bag Button */}
            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="text-xs sm:text-sm uppercase font-extrabold tracking-wider text-emeraldTheme hover:underline flex items-center"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs sm:text-sm text-red-600 font-bold hover:underline cursor-pointer"
              >
                Empty Entire Bag
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-borderLuxury p-6 shadow-sm space-y-5">
              <h3 className="font-serif font-black text-xl text-gray-950 pb-3 border-b border-borderLuxury">
                Order Value Summary
              </h3>

              {/* Coupon Form */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-gray-700 mb-2">
                  Apply Privilege Voucher
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs sm:text-sm text-emerald-900">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <strong>{appliedCoupon.code}</strong>
                        <span className="block text-xs text-emerald-700 font-medium">
                          {appliedCoupon.description}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 font-bold hover:underline"
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
                      className="bg-ivory border-2 border-borderLuxury rounded-l-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-950 font-bold uppercase placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-gold flex-grow"
                    />
                    <button
                      type="submit"
                      className="bg-emeraldTheme hover:bg-emeraldTheme-light text-white px-5 text-xs uppercase font-extrabold rounded-r-xl transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Breakdown Table */}
              <div className="space-y-2.5 text-xs sm:text-sm pt-2 border-t border-borderLuxury">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Pure Precious Metal Value:</span>
                  <span className="text-gray-950 font-bold">{formatINR(cartSummary.totalMetalValue)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Craftsmanship & Making Charges:</span>
                  <span className="text-gray-950 font-bold">{formatINR(cartSummary.totalMakingCharges)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Applicable GST (3% Precious Metal):</span>
                  <span className="text-gray-950 font-bold">{formatINR(cartSummary.totalTax)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Insured Pan-India Vault Courier:</span>
                  <span className="text-emerald-700 font-black">FREE (Complimentary)</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Privilege Coupon Discount:</span>
                    <span>- {formatINR(cartSummary.discountAmount)}</span>
                  </div>
                )}

                <div className="pt-3.5 border-t-2 border-borderLuxury flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-gray-900">Net Payable:</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black font-sans text-emeraldTheme">
                      {formatINR(cartSummary.netPayable)}
                    </span>
                    <span className="block text-xs text-gray-500 font-semibold">
                      Price locked based on live bullion index
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-gold-glow transition flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4 text-gray-950" />
                <span>Proceed to Secure Checkout</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-gray-600 font-semibold flex items-center justify-center">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border-2 border-gold overflow-hidden animate-scaleUp">
            <div className="bg-emeraldTheme text-white p-5 flex items-center justify-between border-b border-gold/40">
              <div>
                <h3 className="text-lg font-serif font-black text-amber-300 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-amber-300" />
                  Secure Checkout Confirmation
                </h3>
                <p className="text-xs text-white/90 font-medium">
                  Confirm delivery destination & payment mode
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-white hover:text-amber-300 p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Delivery Address */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-800 mb-2">
                  Delivery Address
                </h4>
                <div className="p-4 bg-ivory rounded-xl border border-borderLuxury text-xs sm:text-sm text-gray-800 space-y-1">
                  <p className="font-bold text-gray-950 text-sm">
                    {user?.name || 'Priyanka Sharma'} (+91 98450 12345)
                  </p>
                  <p className="text-gray-600 font-medium">
                    Villa 14, Prestige Silver Springs, Outer Ring Road
                  </p>
                  <p className="text-gray-600 font-medium">
                    Bengaluru, Karnataka - 560037
                  </p>
                </div>
              </div>

              {/* Price Snapshot */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-800 mb-2">
                  Immutable Price Snapshot
                </h4>
                <div className="p-4 bg-gold-50 rounded-xl border border-gold/60 text-xs sm:text-sm flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-950">
                      Total Order Amount ({cartSummary.totalQuantity} items):
                    </span>
                    <span className="block text-xs text-gray-600 font-medium mt-0.5">
                      Locked at rate: Gold 22K {formatINR(rates.gold22k)}/g
                    </span>
                  </div>
                  <span className="text-2xl font-black font-sans text-emeraldTheme">
                    {formatINR(cartSummary.netPayable)}
                  </span>
                </div>
              </div>

              {/* Payment Gateways Option */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-800 mb-2">
                  Select Payment Method
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <label className="flex items-center justify-between p-3.5 border-2 border-gold rounded-xl bg-gold-50/40 cursor-pointer">
                    <div className="flex items-center space-x-2.5">
                      <input type="radio" name="paymentOption" defaultChecked className="text-emeraldTheme" />
                      <span className="font-bold text-gray-950">Razorpay Online Gateway</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Cards, UPI, NetBanking
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-3.5 border-2 border-borderLuxury rounded-xl hover:bg-ivory cursor-pointer">
                    <div className="flex items-center space-x-2.5">
                      <input type="radio" name="paymentOption" className="text-emeraldTheme" />
                      <span className="font-bold text-gray-950">Bank Wire Transfer (NEFT/RTGS)</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">For high-value orders</span>
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
                  className="w-full py-4 bg-emeraldTheme hover:bg-emeraldTheme-light text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-luxury transition border border-gold"
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
