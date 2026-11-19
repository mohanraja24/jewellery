import React, { useState } from 'react';
import { MapPin, Phone, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/mockData';
import toast from 'react-hot-toast';

export const StoreLocationsPage = () => {
  const [selectedStore, setSelectedStore] = useState(STORE_LOCATIONS[0].city);
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('11:00 AM');
  const [appointmentPhone, setAppointmentPhone] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    if (!appointmentName || !appointmentDate || !appointmentPhone) {
      toast.error('Please enter name, date and phone number');
      return;
    }
    toast.success(`Appointment confirmed for ${appointmentName} at ${selectedStore} on ${appointmentDate} at ${appointmentTime}!`);
    setAppointmentName('');
    setAppointmentDate('');
    setAppointmentPhone('');
  };

  return (
    <div className="bg-ivory/40 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-gold-dark">
            Physical Showrooms
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-1">
            Visit Our Flagship Boutiques
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Immerse yourself in our private bridal viewing lounges, examine live bullion karatage instruments, and experience imperial jewellery trial sessions.
          </p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl overflow-hidden border border-borderLuxury shadow-sm flex flex-col justify-between"
            >
              <img
                src={store.image}
                alt={store.city}
                className="w-full h-52 object-cover object-center"
              />
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-charcoal">
                    {store.city}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs text-charcoal-muted">
                    <p className="flex items-start">
                      <MapPin className="w-4 h-4 text-gold-dark mr-2 flex-shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 text-gold-dark mr-2 flex-shrink-0" />
                      <span>{store.phone}</span>
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 text-gold-dark mr-2 flex-shrink-0" />
                      <span>{store.hours}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-borderLuxury flex items-center justify-between">
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-emeraldTheme hover:underline"
                  >
                    Google Maps Directions →
                  </a>
                  <button
                    onClick={() => {
                      setSelectedStore(store.city);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs font-medium rounded-lg transition"
                  >
                    Select Store
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* In-Store Appointment Booking Form */}
        <div className="bg-white rounded-2xl border border-gold/40 p-8 shadow-luxury max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark">
              VIP Experience
            </span>
            <h2 className="text-2xl font-serif font-bold text-charcoal mt-1">
              Book a Private In-Store Bridal & Solitaire Trial
            </h2>
            <p className="text-xs text-charcoal-muted mt-1">
              Currently selected: <strong className="text-emeraldTheme">{selectedStore}</strong>
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={appointmentName}
                  onChange={(e) => setAppointmentName(e.target.value)}
                  className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={appointmentPhone}
                  onChange={(e) => setAppointmentPhone(e.target.value)}
                  className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                >
                  <option value="11:00 AM">11:00 AM - 12:30 PM</option>
                  <option value="02:00 PM">02:00 PM - 03:30 PM</option>
                  <option value="04:30 PM">04:30 PM - 06:00 PM</option>
                  <option value="06:30 PM">06:30 PM - 08:00 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs uppercase font-bold tracking-widest rounded-lg shadow-luxury transition flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-gold-light" />
              <span>Confirm VIP Appointment</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
