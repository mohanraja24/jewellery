import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  TrendingUp,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Clock,
  Crown
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { useMetalRate } from '../../context/MetalRateContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { formatINR, formatINRDecimal, formatDate } from '../../utils/formatters';

export const Header = () => {
  const navigate = useNavigate();
  const { brand } = useBrand();
  const { rates } = useMetalRate();
  const { cartSummary } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'All Jewellery', path: '/shop' },
    { name: 'Gold', path: '/shop?category=gold' },
    { name: 'Diamond Solitaires', path: '/shop?category=diamond' },
    { name: 'Bridal Heritage', path: '/shop?category=bridal' },
    { name: 'Silver 925', path: '/shop?category=silver' },
    { name: 'Temple & Traditional', path: '/shop?category=traditional' },
    { name: 'Precious Gemstones', path: '/shop?category=gemstone' },
    { name: 'Daily Wear', path: '/shop?category=dailywear' },
    { name: 'Showrooms', path: '/stores' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-borderLuxury shadow-sm transition-all">
      {/* 1. Top Luxury Announcement Bar */}
      <div className="bg-emeraldTheme-dark text-gold-soft text-xs py-2 px-4 border-b border-gold/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Rate Ticker Headline */}
          <div className="flex items-center space-x-3 overflow-x-auto whitespace-nowrap">
            <span className="flex items-center text-gold font-bold tracking-wider uppercase text-[10px] bg-emeraldTheme-deep px-2.5 py-0.5 rounded border border-gold/30">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-gold" />
              Live Rates:
            </span>
            <span className="text-white font-medium text-[11px]">
              Gold 22K (916): <strong className="text-gold-light">{formatINR(rates.gold22k)}/g</strong>
            </span>
            <span className="text-gold/40">•</span>
            <span className="text-white font-medium text-[11px]">
              Gold 24K: <strong className="text-gold-light">{formatINR(rates.gold24k)}/g</strong>
            </span>
            <span className="text-gold/40">•</span>
            <span className="text-white font-medium text-[11px]">
              Silver 999: <strong className="text-gold-light">{formatINRDecimal(rates.silver999)}/g</strong>
            </span>
            <button
              onClick={() => setRateModalOpen(true)}
              className="text-[11px] font-semibold text-gold hover:text-white underline transition-colors ml-2"
            >
              Rate Board
            </button>
          </div>

          {/* Quick links & contact */}
          <div className="hidden md:flex items-center space-x-6 text-[11px] text-ivory/80">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gold" />
              100% BIS Hallmarked & Certified
            </span>
            <Link to="/stores" className="hover:text-gold transition-colors flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-gold" />
              Store Locations
            </Link>
            <a href={`tel:${brand.phone}`} className="hover:text-gold transition-colors flex items-center font-medium">
              <Phone className="w-3.5 h-3.5 mr-1 text-gold" />
              {brand.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-charcoal hover:text-emeraldTheme focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Luxury Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-emeraldTheme flex items-center justify-center text-gold shadow-sm group-hover:scale-105 transition-transform border border-gold/40">
              <Crown className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.15em] text-charcoal group-hover:text-emeraldTheme transition-colors">
                {brand.brandName}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-charcoal-muted uppercase font-sans">
                Fine Jewellery • Est. {brand.establishedYear}
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center w-80 relative bg-ivory rounded-full px-4 py-2 border border-borderLuxury focus-within:border-gold focus-within:bg-white transition-all shadow-sm"
          >
            <Search className="w-4 h-4 text-charcoal-muted mr-2.5" />
            <input
              type="text"
              placeholder="Search bridal, solitaires, gold bangles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-charcoal placeholder:text-charcoal-muted"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-charcoal-muted hover:text-charcoal"
              >
                Clear
              </button>
            )}
          </form>

          {/* Right Action Icons: Live Rates Button, User Account, Wishlist, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Live Rate Pill (Desktop) */}
            <button
              onClick={() => setRateModalOpen(true)}
              className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full border border-gold/50 bg-gold-50/70 hover:bg-gold-100/60 text-emeraldTheme text-xs font-semibold transition-all group shadow-sm"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Bullion</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-gold-dark" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-charcoal hover:text-emeraldTheme transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-emeraldTheme text-gold-light text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart / Bag */}
            <Link
              to="/cart"
              className="relative p-2 text-charcoal hover:text-emeraldTheme transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartSummary.totalQuantity > 0 && (
                <span className="absolute top-1 right-1 bg-gold-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartSummary.totalQuantity}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-1.5 p-2 text-charcoal hover:text-emeraldTheme transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-ivory border border-borderLuxury flex items-center justify-center text-charcoal">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline text-xs font-semibold">
                  {isAuthenticated ? (user.name.split(' ')[0]) : 'Sign In'}
                </span>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-luxury-lg border border-borderLuxury py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-borderLuxury">
                        <p className="text-xs text-charcoal-muted">Signed in as</p>
                        <p className="text-sm font-semibold text-charcoal truncate">{user.name}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emeraldTheme-50 text-emeraldTheme font-medium">
                          {user.role}
                        </span>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-charcoal hover:bg-ivory hover:text-emeraldTheme"
                      >
                        My Profile & Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-charcoal hover:bg-ivory hover:text-emeraldTheme"
                      >
                        Saved Wishlist ({wishlistCount})
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-emeraldTheme hover:bg-emeraldTheme-50"
                      >
                        Admin Portal
                      </Link>
                      <div className="border-t border-borderLuxury my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-3 text-center border-b border-borderLuxury">
                        <p className="text-xs text-charcoal-muted mb-2">Access your bespoke bag and orders</p>
                        <Link
                          to="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block w-full py-2 px-3 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs font-semibold rounded-lg shadow-sm transition"
                        >
                          Customer Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block mt-2 text-xs text-emeraldTheme font-medium hover:underline"
                        >
                          New to Aurelia? Register
                        </Link>
                      </div>
                      <div className="px-3 py-2 bg-ivory/50">
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="text-[11px] font-semibold text-charcoal-muted hover:text-emeraldTheme flex items-center justify-between"
                        >
                          <span>Store Admin Login</span>
                          <span className="text-[10px] text-gold-dark">→</span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Category Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center justify-center space-x-8 py-3.5 border-t border-borderLuxury text-xs tracking-wider uppercase font-medium text-charcoal">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-emeraldTheme transition-colors hover:border-b-2 hover:border-emeraldTheme pb-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-borderLuxury px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ivory border border-borderLuxury rounded-lg px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-muted"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-charcoal-muted">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase font-medium text-charcoal hover:text-emeraldTheme py-2 border-b border-borderLuxury/40"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-borderLuxury flex items-center justify-between">
            <button
              onClick={() => {
                setRateModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-emeraldTheme font-bold flex items-center"
            >
              <TrendingUp className="w-4 h-4 mr-1 text-gold" />
              Check Live Bullion Rates
            </button>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-charcoal-muted underline"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}

      {/* 4. Live Metal Rate Breakdown Modal */}
      {rateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gold/40 overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-emeraldTheme text-white p-5 flex items-center justify-between border-b border-gold/30">
              <div>
                <h3 className="text-xl font-serif font-bold text-gold-light flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-gold" />
                  Live Bullion Rate Board
                </h3>
                <p className="text-xs text-ivory/80 mt-0.5">
                  Official benchmark rates applied to dynamic jewellery pricing
                </p>
              </div>
              <button
                onClick={() => setRateModalOpen(false)}
                className="text-ivory/70 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Status and Source Banner */}
              <div className="flex items-center justify-between text-xs bg-ivory p-3.5 rounded-xl border border-borderLuxury">
                <div>
                  <span className="text-charcoal-muted block text-[10px] uppercase font-bold tracking-wider">Rate Provider / Source</span>
                  <strong className="text-charcoal font-semibold">{rates.source}</strong>
                </div>
                <div className="text-right">
                  <span className="text-charcoal-muted block text-[10px] uppercase font-bold tracking-wider">Last Rate Sync</span>
                  <span className="text-charcoal flex items-center font-medium">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gold-dark" />
                    {formatDate(rates.lastUpdated)}
                  </span>
                </div>
              </div>

              {/* Gold Rates Table */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2">
                  Gold Purities (Per Gram)
                </h4>
                <div className="divide-y divide-borderLuxury border border-borderLuxury rounded-xl overflow-hidden shadow-sm">
                  <div className="flex justify-between items-center p-3.5 bg-white">
                    <div>
                      <span className="font-semibold text-charcoal text-sm">24K Fine Gold</span>
                      <span className="text-xs text-charcoal-muted block">99.9% Purity (Pure Bullion)</span>
                    </div>
                    <span className="text-base font-bold text-emeraldTheme">{formatINR(rates.gold24k)} / g</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-gold-50/50">
                    <div>
                      <span className="font-semibold text-charcoal text-sm">22K Hallmarked Gold</span>
                      <span className="text-xs text-charcoal-muted block">91.6% Purity (BIS Hallmark 916)</span>
                    </div>
                    <span className="text-base font-bold text-gold-dark">{formatINR(rates.gold22k)} / g</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-white">
                    <div>
                      <span className="font-semibold text-charcoal text-sm">18K Diamond Jewellery Gold</span>
                      <span className="text-xs text-charcoal-muted block">75.0% Purity (BIS Hallmark 750)</span>
                    </div>
                    <span className="text-base font-bold text-charcoal">{formatINR(rates.gold18k)} / g</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-white">
                    <div>
                      <span className="font-semibold text-charcoal text-sm">14K Modern Everyday Gold</span>
                      <span className="text-xs text-charcoal-muted block">58.5% Purity (BIS Hallmark 585)</span>
                    </div>
                    <span className="text-base font-bold text-charcoal">{formatINR(rates.gold14k)} / g</span>
                  </div>
                </div>
              </div>

              {/* Silver & Platinum */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-muted mb-2">
                  Silver & Platinum (Per Gram)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-borderLuxury rounded-xl bg-ivory">
                    <span className="text-xs text-charcoal-muted block">Silver 999 (Pure)</span>
                    <span className="text-base font-bold text-charcoal">{formatINRDecimal(rates.silver999)} / g</span>
                  </div>
                  <div className="p-3 border border-borderLuxury rounded-xl bg-ivory">
                    <span className="text-xs text-charcoal-muted block">Silver 925 (Sterling)</span>
                    <span className="text-base font-bold text-charcoal">{formatINRDecimal(rates.silver925)} / g</span>
                  </div>
                </div>
              </div>

              {/* Pricing Transparency Note */}
              <div className="p-3.5 rounded-xl bg-emeraldTheme-50 text-[11px] text-charcoal border border-emeraldTheme/20">
                <p className="font-semibold text-emeraldTheme mb-1">Transparent Billing Guarantee:</p>
                <p className="text-charcoal-muted">
                  <code className="text-emeraldTheme font-mono font-bold">
                    (Net Weight × Live Bullion Rate) + Making Charges + Wastage + Stones + 3% GST
                  </code>
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setRateModalOpen(false)}
                  className="w-full py-3 bg-emeraldTheme hover:bg-emeraldTheme-light text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition shadow-luxury"
                >
                  Continue Shopping with Live Rates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
