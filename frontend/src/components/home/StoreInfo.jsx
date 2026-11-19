import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight, Calendar } from 'lucide-react';
import { STORE_LOCATIONS } from '../../data/mockData';

export const StoreInfo = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark block mb-2">
              Physical Boutiques
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950">
              Experience Bespoke Luxury In-Store
            </h2>
          </div>
          <Link
            to="/stores"
            className="mt-4 md:mt-0 text-xs sm:text-sm uppercase font-extrabold tracking-widest text-emeraldTheme hover:text-gold-dark transition flex items-center"
          >
            <span>All Store Locations</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="bg-ivory/60 rounded-2xl overflow-hidden border border-borderLuxury shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={store.image}
                  alt={store.city}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 bg-gray-950/90 text-amber-300 text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full backdrop-blur-sm border border-gold/40">
                  {store.city.split(' ')[0]}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="font-bold text-lg text-gray-950">
                    {store.city}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                    <p className="flex items-start">
                      <MapPin className="w-4 h-4 text-gold-dark mr-2 flex-shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 text-gold-dark mr-2 flex-shrink-0" />
                      <span className="font-bold text-gray-900">{store.phone}</span>
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
                    className="text-xs sm:text-sm font-bold text-emeraldTheme hover:underline"
                  >
                    View Map Directions →
                  </a>
                  <Link
                    to="/stores"
                    className="px-4 py-2 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs font-bold rounded-xl flex items-center transition shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-light" />
                    Book Visit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
