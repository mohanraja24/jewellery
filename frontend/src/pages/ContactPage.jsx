import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import toast from 'react-hot-toast';

export const ContactPage = () => {
  const { brand } = useBrand();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bridal Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been received! Our concierge will contact you within 4 hours.');
    setFormData({ name: '', email: '', phone: '', subject: 'Bridal Enquiry', message: '' });
  };

  return (
    <div className="bg-ivory/40 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark">
            Direct Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-1">
            Connect With Our Jewellery Curators
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Whether inquiring about custom bridal bespoke designs, bullion billing queries, or in-store showroom appointments, our specialists await your pleasure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-borderLuxury shadow-sm">
            <h2 className="text-xl font-serif font-bold text-charcoal mb-6">
              Send a Bespoke Enquiry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                    Nature of Consultation
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option value="Bridal Enquiry">Bridal Troussier Consultation</option>
                    <option value="Solitaire Custom">Solitaire Diamond Custom Ring</option>
                    <option value="Live Bullion Query">Live Bullion Billing & Gold Rates</option>
                    <option value="Order Tracking">Existing Order Inquiry</option>
                    <option value="Lifetime Exchange">Lifetime Exchange / Buyback Valuation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                  Message Details
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your requirements, wedding dates, or design inspirations..."
                  className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase font-bold tracking-widest rounded-lg shadow-luxury transition flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 text-gold-light" />
                <span>Submit Concierge Request</span>
              </button>
            </form>
          </div>

          {/* Right Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-borderLuxury shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-charcoal">
                Headquarters Atelier
              </h3>
              <div className="space-y-3 text-xs text-charcoal-muted">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                  <span>
                    {brand.headquarters.addressLine1}, {brand.headquarters.addressLine2}, {brand.headquarters.city}, {brand.headquarters.state} - {brand.headquarters.postalCode}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold-dark flex-shrink-0" />
                  <a href={`tel:${brand.phone}`} className="hover:text-burgundy font-medium text-charcoal">
                    {brand.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-dark flex-shrink-0" />
                  <a href={`mailto:${brand.email}`} className="hover:text-burgundy font-medium text-charcoal">
                    {brand.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gold-dark flex-shrink-0" />
                  <span>{brand.operatingHours}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Connect */}
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-luxury space-y-3">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
                <div>
                  <h4 className="font-serif font-bold text-base text-white">
                    Instant WhatsApp Concierge
                  </h4>
                  <p className="text-xs text-emerald-200">
                    Connect with a senior jewellery stylist on WhatsApp
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-charcoal-dark font-bold text-xs uppercase tracking-wider rounded-lg transition"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
