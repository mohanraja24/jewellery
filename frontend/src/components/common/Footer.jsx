import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle2
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import toast from 'react-hot-toast';

export const Footer = () => {
  const { brand } = useBrand();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      toast.success('Thank you for subscribing to Aurelia Privé updates!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  return (
    <footer className="bg-charcoal text-ivory/80 pt-16 pb-8 border-t-2 border-gold/40">
      {/* 1. Value Proposition Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-charcoal-light">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-8 h-8 text-gold flex-shrink-0" />
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">100% BIS Hallmarked</h4>
              <p className="text-xs text-ivory/60 mt-1">Every gold ornament carries official 6-digit HUID certification.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Award className="w-8 h-8 text-gold flex-shrink-0" />
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">Certified Diamonds</h4>
              <p className="text-xs text-ivory/60 mt-1">Natural, ethically sourced solitaires certified by IGI & GIA.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Truck className="w-8 h-8 text-gold flex-shrink-0" />
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">Insured Vault Transit</h4>
              <p className="text-xs text-ivory/60 mt-1">100% transit insurance with OTP delivery across all Indian pin codes.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <RotateCcw className="w-8 h-8 text-gold flex-shrink-0" />
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">Lifetime Exchange</h4>
              <p className="text-xs text-ivory/60 mt-1">Transparent buyback and lifetime exchange at prevailing gold rates.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif font-bold tracking-widest text-white">
              {brand.brandName}
            </span>
            <p className="text-xs text-gold-light uppercase tracking-widest">
              {brand.tagline}
            </p>
            <p className="text-xs text-ivory/70 leading-relaxed pr-6">
              Founded in {brand.establishedYear}, {brand.brandName} crafts heirloom fine jewellery that marries centuries of royal Indian craftsmanship with modern precision and transparent live-rate billing.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-xs uppercase font-semibold text-white tracking-wider mb-2">
                Join Aurelia Privé
              </h5>
              <p className="text-xs text-ivory/60 mb-3">
                Receive private showcase invitations, bullion rate alerts and bridal previews.
              </p>
              {subscribed ? (
                <div className="flex items-center text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  You are now subscribed to Aurelia Privé.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-charcoal-light border border-charcoal-light rounded-l-md px-3 py-2 text-xs text-white placeholder:text-ivory/40 focus:outline-none focus:border-gold flex-grow"
                  />
                  <button
                    type="submit"
                    className="bg-burgundy hover:bg-burgundy-light text-white px-4 rounded-r-md text-xs font-medium flex items-center transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-xs uppercase font-semibold text-gold tracking-widest mb-4">
              Collections
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/shop?category=gold" className="hover:text-white transition">22K Gold Jewellery</Link></li>
              <li><Link to="/shop?category=diamond" className="hover:text-white transition">Solitaire Diamonds</Link></li>
              <li><Link to="/shop?category=bridal" className="hover:text-white transition">Bridal Troussier</Link></li>
              <li><Link to="/shop?category=traditional" className="hover:text-white transition">Temple Jewellery</Link></li>
              <li><Link to="/shop?category=silver" className="hover:text-white transition">925 Sterling Silver</Link></li>
              <li><Link to="/shop?category=gemstone" className="hover:text-white transition">Precious Gemstones</Link></li>
              <li><Link to="/shop?category=dailywear" className="hover:text-white transition">Everyday 14K Gold</Link></li>
              <li><Link to="/shop?category=artificial" className="hover:text-white transition">Artisanal CZ Jewelry</Link></li>
            </ul>
          </div>

          {/* Client Care & Policies */}
          <div>
            <h5 className="text-xs uppercase font-semibold text-gold tracking-widest mb-4">
              Client Care & Trust
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-white transition">About Our Legacy</Link></li>
              <li><Link to="/care-guide" className="hover:text-white transition">Jewellery Care Guide</Link></li>
              <li><Link to="/stores" className="hover:text-white transition">Boutique Locations</Link></li>
              <li><Link to="/policies?tab=shipping" className="hover:text-white transition">Insured Shipping Policy</Link></li>
              <li><Link to="/policies?tab=returns" className="hover:text-white transition">Returns & Exchange</Link></li>
              <li><Link to="/policies?tab=privacy" className="hover:text-white transition">Privacy & Data Security</Link></li>
              <li><Link to="/policies?tab=terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/admin" className="text-gold-light hover:underline font-semibold transition">Staff & Admin Login</Link></li>
            </ul>
          </div>

          {/* Concierge & Store Details */}
          <div>
            <h5 className="text-xs uppercase font-semibold text-gold tracking-widest mb-4">
              Bespoke Concierge
            </h5>
            <div className="space-y-3 text-xs text-ivory/70">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  {brand.headquarters.addressLine1}, {brand.headquarters.addressLine2}, {brand.headquarters.city} - {brand.headquarters.postalCode}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`tel:${brand.phone}`} className="hover:text-white">{brand.phone}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`mailto:${brand.email}`} className="hover:text-white">{brand.email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{brand.operatingHours}</span>
              </div>
              <div className="pt-2">
                <p className="text-[11px] text-ivory/50">BIS License: {brand.bisLicenseNumber}</p>
                <p className="text-[11px] text-ivory/50">GSTIN: {brand.gstin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-charcoal-light flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-ivory/50">
        <div>
          © {new Date().getFullYear()} {brand.legalEntityName || brand.brandName}. All Rights Reserved. Hallmarked & Certified in India.
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-gold-soft">Secure 256-Bit SSL Checkout</span>
          <span>•</span>
          <Link to="/policies?tab=privacy" className="hover:text-ivory">Privacy</Link>
          <Link to="/policies?tab=terms" className="hover:text-ivory">Terms</Link>
          <Link to="/policies?tab=returns" className="hover:text-ivory">Returns</Link>
        </div>
      </div>
    </footer>
  );
};
