import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setSearchOpen(false);
    }
  };

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Stores', path: '/stores' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-borderLuxury shadow-sm transition-all max-w-full overflow-hidden">
      {/* 1. Top Luxury Announcement Bar - High Readability & Fully Responsive */}
      <div className="bg-emeraldTheme-dark text-white text-xs py-2 px-3 sm:px-4 border-b border-gold/30 overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 min-w-0">
          {/* Rate Ticker Headline - Never forces page width */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto whitespace-nowrap min-w-0 flex-1 no-scrollbar py-0.5">
            <span className="flex items-center text-amber-300 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs bg-emeraldTheme-deep px-2.5 py-0.5 rounded border border-gold/40 flex-shrink-0">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-amber-300" />
              LIVE BULLION:
            </span>
            <span className="text-white font-medium text-xs flex-shrink-0">
              Gold 22K (916): <strong className="text-amber-300 font-extrabold text-xs ml-1">{formatINR(rates.gold22k)}/g</strong>
            </span>
            <span className="text-gold/50 font-bold flex-shrink-0">•</span>
            <span className="text-white font-medium text-xs flex-shrink-0">
              Gold 24K: <strong className="text-amber-300 font-extrabold text-xs ml-1">{formatINR(rates.gold24k)}/g</strong>
            </span>
            <span className="text-gold/50 font-bold flex-shrink-0">•</span>
            <span className="text-white font-medium text-xs flex-shrink-0">
              Silver 999: <strong className="text-amber-300 font-extrabold text-xs ml-1">{formatINRDecimal(rates.silver999)}/g</strong>
            </span>
            <button
              onClick={() => setRateModalOpen(true)}
              className="text-xs font-bold text-amber-300 hover:text-white underline transition-colors ml-1 sm:ml-2 cursor-pointer flex-shrink-0"
            >
              Rate Card
            </button>
          </div>

          {/* Quick links & contact (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-white/90 font-medium flex-shrink-0">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-amber-300" />
              100% BIS Hallmarked
            </span>
            <Link to="/stores" className="hover:text-amber-300 transition-colors flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-amber-300" />
              Stores
            </Link>
            <a href={`tel:${brand.phone}`} className="hover:text-amber-300 transition-colors flex items-center font-bold">
              <Phone className="w-4 h-4 mr-1 text-amber-300" />
              {brand.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 lg:h-22">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 -ml-1 text-charcoal hover:text-emeraldTheme focus:outline-none flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left: Luxury Brand Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3.5 group py-1">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emeraldTheme flex items-center justify-center text-amber-300 shadow-sm group-hover:scale-105 transition-transform border border-gold/40 flex-shrink-0">
                <Crown className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-lg sm:text-2xl font-serif font-black tracking-[0.15em] sm:tracking-[0.2em] text-gray-950 group-hover:text-emeraldTheme transition-colors leading-tight truncate">
                  {brand.brandName}
                </span>
                <span className="hidden sm:block text-[10px] font-bold tracking-[0.25em] text-charcoal-muted uppercase font-sans leading-none mt-1">
                  Fine Jewellery • Est. {brand.establishedYear}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Main Navigation Links (Visible on XL screens 1280px+) */}
          <nav className="hidden xl:flex items-center justify-center space-x-6 2xl:space-x-9 flex-1 px-4 min-w-0">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative text-xs xl:text-[13px] font-serif tracking-[0.2em] uppercase font-bold py-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-emeraldTheme'
                      : 'text-gray-700 hover:text-emeraldTheme'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative pb-1 inline-block">
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gold rounded-full" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons: Search, Live Rates, Wishlist, Cart, Account */}
          <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
            {/* Search Icon Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 sm:p-2.5 rounded-full text-charcoal hover:text-emeraldTheme hover:bg-ivory transition-colors cursor-pointer"
              title="Search jewellery"
              aria-label="Toggle search input"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-1.5 sm:p-2.5 text-charcoal hover:text-emeraldTheme hover:bg-ivory rounded-full transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-emeraldTheme text-amber-300 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-extrabold border border-gold shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart / Bag */}
            <Link
              to="/cart"
              className="relative p-1.5 sm:p-2.5 text-charcoal hover:text-emeraldTheme hover:bg-ivory rounded-full transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartSummary.totalQuantity > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-amber-600 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-extrabold shadow-sm">
                  {cartSummary.totalQuantity}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-1.5 p-1 sm:p-1.5 sm:pl-2 sm:pr-2.5 rounded-full hover:bg-ivory text-charcoal hover:text-emeraldTheme transition-colors border border-transparent hover:border-borderLuxury cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emeraldTheme-50 border border-emeraldTheme/20 flex items-center justify-center text-emeraldTheme font-bold flex-shrink-0">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="hidden sm:inline text-xs font-bold text-gray-900 whitespace-nowrap">
                  {isAuthenticated ? (user.name.split(' ')[0]) : 'Sign In'}
                </span>
                <ChevronDown className="hidden sm:inline w-3 h-3 text-charcoal-muted" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-luxury-lg border border-borderLuxury py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-borderLuxury">
                        <p className="text-xs text-charcoal-muted font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-charcoal truncate">{user.name}</p>
                        <span className="inline-block mt-1 text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded bg-emeraldTheme-50 text-emeraldTheme">
                          {user.role}
                        </span>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2.5 text-xs sm:text-sm font-semibold text-charcoal hover:bg-ivory hover:text-emeraldTheme"
                      >
                        My Profile & Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2.5 text-xs sm:text-sm font-semibold text-charcoal hover:bg-ivory hover:text-emeraldTheme"
                      >
                        Saved Wishlist ({wishlistCount})
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2.5 text-xs sm:text-sm font-bold text-emeraldTheme hover:bg-emeraldTheme-50"
                      >
                        Admin Portal
                      </Link>
                      <div className="border-t border-borderLuxury my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-4 text-center border-b border-borderLuxury">
                        <p className="text-xs text-charcoal-muted mb-2.5 font-medium">Access your bespoke bag and orders</p>
                        <Link
                          to="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block w-full py-2.5 px-3 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs uppercase tracking-wider font-bold rounded-lg shadow-sm transition"
                        >
                          Customer Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block mt-2.5 text-xs text-emeraldTheme font-bold hover:underline"
                        >
                          New to Aurelia? Register
                        </Link>
                      </div>
                      <div className="px-4 py-2.5 bg-ivory/60">
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="text-xs font-bold text-charcoal-muted hover:text-emeraldTheme flex items-center justify-between"
                        >
                          <span>Store Admin Portal</span>
                          <span className="text-xs text-gold-dark font-extrabold">→</span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Search Bar for Tablet & Small Laptops when Search icon clicked */}
      {searchOpen && (
        <div className="bg-ivory border-b border-borderLuxury px-4 py-3 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative flex items-center">
            <input
              type="text"
              autoFocus
              placeholder="Search bridal, solitaires, gold bangles, silver 925..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-gold/60 rounded-xl px-4 py-2 text-sm text-charcoal placeholder:text-charcoal-muted shadow-sm focus:outline-none focus:border-emeraldTheme"
            />
            <button
              type="submit"
              className="absolute right-2.5 px-3 py-1 bg-emeraldTheme hover:bg-emeraldTheme-light text-white rounded-lg text-xs font-bold transition"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-borderLuxury px-4 pt-4 pb-6 space-y-4 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search jewellery, solitaires..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ivory border border-borderLuxury rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-gold"
            />
            <button type="submit" className="absolute right-3.5 top-3 text-charcoal-muted">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Clean Main Navigation in Mobile */}
          <div className="flex flex-col space-y-1 pt-2">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm uppercase font-serif font-bold py-3 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emeraldTheme/10 text-emeraldTheme font-black'
                      : 'text-gray-900 hover:bg-ivory hover:text-emeraldTheme'
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="text-xs text-gold-dark font-black">→</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-borderLuxury flex items-center justify-between">
            <button
              onClick={() => {
                setRateModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-emeraldTheme font-bold flex items-center py-1"
            >
              <TrendingUp className="w-4 h-4 mr-1 text-gold" />
              Check Live Bullion Rates
            </button>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-charcoal-muted hover:text-emeraldTheme underline font-semibold"
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
                <h3 className="text-xl font-serif font-bold text-amber-300 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-amber-300" />
                  Live Bullion Rate Board
                </h3>
                <p className="text-xs text-ivory/90 mt-0.5 font-medium">
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
                  <span className="text-charcoal-muted block text-xs uppercase font-bold tracking-wider">Rate Provider / Source</span>
                  <strong className="text-charcoal font-bold text-sm">{rates.source}</strong>
                </div>
                <div className="text-right">
                  <span className="text-charcoal-muted block text-xs uppercase font-bold tracking-wider">Last Rate Sync</span>
                  <span className="text-charcoal flex items-center font-bold text-xs mt-0.5">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gold-dark" />
                    {formatDate(rates.lastUpdated)}
                  </span>
                </div>
              </div>

              {/* Gold Rates Table */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-charcoal mb-2">
                  Gold Purities (Per Gram)
                </h4>
                <div className="divide-y divide-borderLuxury border border-borderLuxury rounded-xl overflow-hidden shadow-sm">
                  <div className="flex justify-between items-center p-3.5 bg-white">
                    <div>
                      <span className="font-bold text-charcoal text-sm">24K Fine Gold</span>
                      <span className="text-xs text-charcoal-muted block font-medium">99.9% Purity (Pure Bullion)</span>
                    </div>
                    <span className="text-lg font-bold text-emeraldTheme">{formatINR(rates.gold24k)} / g</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-gold-50">
                    <div>
                      <span className="font-bold text-charcoal text-sm">22K Hallmarked Gold</span>
                      <span className="text-xs text-charcoal-muted block font-medium">91.6% Purity (BIS Hallmark 916)</span>
                    </div>
                    <span className="text-lg font-bold text-gold-dark">{formatINR(rates.gold22k)} / g</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-white">
                    <div>
                      <span className="font-bold text-charcoal text-sm">18K Diamond Jewellery Gold</span>
                      <span className="text-xs text-charcoal-muted block font-medium">75.0% Purity (BIS Hallmark 750)</span>
                    </div>
                    <span className="text-lg font-bold text-charcoal">{formatINR(rates.gold18k)} / g</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-white">
                    <div>
                      <span className="font-bold text-charcoal text-sm">14K Modern Everyday Gold</span>
                      <span className="text-xs text-charcoal-muted block font-medium">58.5% Purity (BIS Hallmark 585)</span>
                    </div>
                    <span className="text-lg font-bold text-charcoal">{formatINR(rates.gold14k)} / g</span>
                  </div>
                </div>
              </div>

              {/* Silver & Platinum */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-charcoal mb-2">
                  Silver & Platinum (Per Gram)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 border border-borderLuxury rounded-xl bg-ivory">
                    <span className="text-xs text-charcoal-muted block font-bold">Silver 999 (Pure)</span>
                    <span className="text-lg font-bold text-charcoal">{formatINRDecimal(rates.silver999)} / g</span>
                  </div>
                  <div className="p-3.5 border border-borderLuxury rounded-xl bg-ivory">
                    <span className="text-xs text-charcoal-muted block font-bold">Silver 925 (Sterling)</span>
                    <span className="text-lg font-bold text-charcoal">{formatINRDecimal(rates.silver925)} / g</span>
                  </div>
                </div>
              </div>

              {/* Pricing Transparency Note */}
              <div className="p-3.5 rounded-xl bg-emeraldTheme-50 text-xs text-charcoal border border-emeraldTheme/20">
                <p className="font-bold text-emeraldTheme mb-1">Transparent Billing Guarantee:</p>
                <p className="text-charcoal font-medium">
                  <code className="text-emeraldTheme font-mono font-bold">
                    (Net Weight × Live Bullion Rate) + Making Charges + Wastage + Stones + 3% GST
                  </code>
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setRateModalOpen(false)}
                  className="w-full py-3 bg-emeraldTheme hover:bg-emeraldTheme-light text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-luxury"
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
