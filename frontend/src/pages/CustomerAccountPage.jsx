import React, { useState } from 'react';
import {
  User,
  Package,
  MapPin,
  LogOut,
  FileText,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatINR, formatDate } from '../utils/formatters';
import toast from 'react-hot-toast';

const MOCK_ORDERS = [
  {
    orderId: 'AUR-ORD-98421',
    createdAt: '2026-11-14T10:30:00.000Z',
    status: 'Shipped',
    trackingNumber: 'SEQL-IN-889921',
    carrier: 'Sequel Secure Vault Logistics',
    totalAmount: 182400,
    lockedRate: 'Gold 22K @ ₹6,810/g',
    items: [
      {
        name: 'The Maharani Kasu Mala Necklace',
        sku: 'AUR-GLD-NK-001',
        purity: '22K Gold',
        weight: '42.500 g',
        size: '18 inches',
        quantity: 1,
        price: 182400,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    orderId: 'AUR-ORD-94112',
    createdAt: '2026-10-22T14:15:00.000Z',
    status: 'Delivered',
    trackingNumber: 'BLUEDT-APEX-1120',
    carrier: 'Blue Dart Apex Vault',
    totalAmount: 148500,
    lockedRate: 'Gold 18K @ ₹5,520/g',
    items: [
      {
        name: 'Celestial Empress Solitaire Diamond Ring',
        sku: 'AUR-DIA-RG-002',
        purity: '18K White Gold',
        weight: '4.600 g',
        size: '14',
        quantity: 1,
        price: 148500,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const CustomerAccountPage = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses'

  const [editName, setEditName] = useState(user?.name || 'Priyanka Sharma');
  const [editPhone, setEditPhone] = useState(user?.phone || '+91 98450 12345');

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({ name: editName, phone: editPhone });
  };

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border-2 border-borderLuxury p-6 sm:p-8 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emeraldTheme text-amber-300 flex items-center justify-center font-serif text-2xl font-black shadow-md border border-gold/40">
              {(user?.name || 'P')[0]}
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-gold-dark">
                Aurelia Privé Patron
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-gray-950 mt-0.5">
                {user?.name || 'Priyanka Sharma'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold">{user?.email || 'priyanka@example.com'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-2 px-5 py-2.5 border-2 border-borderLuxury hover:border-red-500 rounded-xl text-xs sm:text-sm font-bold text-gray-800 hover:text-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-2.5">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition ${
                activeTab === 'orders'
                  ? 'bg-emeraldTheme text-white shadow-sm'
                  : 'bg-white text-gray-800 hover:bg-ivory border-2 border-borderLuxury'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>My Orders & Invoices</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition ${
                activeTab === 'profile'
                  ? 'bg-emeraldTheme text-white shadow-sm'
                  : 'bg-white text-gray-800 hover:bg-ivory border-2 border-borderLuxury'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile Information</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition ${
                activeTab === 'addresses'
                  ? 'bg-emeraldTheme text-white shadow-sm'
                  : 'bg-white text-gray-800 hover:bg-ivory border-2 border-borderLuxury'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Delivery Addresses</span>
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="lg:col-span-9">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-black text-gray-950">
                    Order History & Transit Status
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-600 font-bold">
                    Showing {MOCK_ORDERS.length} past orders
                  </span>
                </div>

                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-2xl border-2 border-borderLuxury overflow-hidden shadow-sm"
                  >
                    {/* Order Bar */}
                    <div className="bg-ivory px-6 py-4 border-b border-borderLuxury flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-500 block text-xs uppercase font-extrabold tracking-wider">
                          Order Reference
                        </span>
                        <strong className="text-gray-950 font-bold text-base">{order.orderId}</strong>
                        <span className="text-gray-600 ml-2 font-medium">
                          placed on {formatDate(order.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-emeraldTheme-50 text-emeraldTheme border border-emeraldTheme/30">
                          {order.status}
                        </span>
                        <button
                          onClick={() => toast.success(`Downloading Tax Invoice for ${order.orderId}`)}
                          className="flex items-center text-xs sm:text-sm font-bold text-emeraldTheme hover:underline cursor-pointer"
                        >
                          <FileText className="w-4 h-4 mr-1 text-gold-dark" />
                          Download Invoice
                        </button>
                      </div>
                    </div>

                    {/* Order Details & Items */}
                    <div className="p-6 space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center space-x-4 min-w-0 flex-1">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover bg-ivory border-2 border-borderLuxury flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-base text-gray-950 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">
                                SKU: {item.sku} • {item.purity} • Net Wt: {item.weight} • Size: {item.size}
                              </p>
                              <p className="text-xs text-emerald-800 font-bold mt-1">
                                Locked Bullion Rate: {order.lockedRate}
                              </p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-borderLuxury">
                            <span className="text-lg font-black font-sans text-emeraldTheme">
                              {formatINR(item.price)}
                            </span>
                            <span className="block text-xs text-gray-500 font-medium">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}

                      {/* Transit Tracker Strip */}
                      <div className="mt-4 pt-4 border-t border-borderLuxury flex items-center justify-between text-xs sm:text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-5 h-5 text-gold-dark" />
                          <span>
                            Carrier: <strong className="text-gray-950">{order.carrier}</strong> (AWB: {order.trackingNumber})
                          </span>
                        </div>
                        <span className="text-emerald-800 flex items-center font-bold">
                          <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                          Tamper-Evident Insured Vault
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border-2 border-borderLuxury p-8 shadow-sm">
                <h2 className="text-2xl font-serif font-black text-gray-950 mb-6">
                  Edit Personal Information
                </h2>
                <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg font-medium">
                  <div>
                    <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-ivory border-2 border-borderLuxury rounded-xl p-3 text-xs sm:text-sm text-gray-950 font-bold focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || 'priyanka@example.com'}
                      disabled
                      className="w-full bg-ivory/60 border-2 border-borderLuxury rounded-xl p-3 text-xs sm:text-sm text-gray-500 font-bold cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-ivory border-2 border-borderLuxury rounded-xl p-3 text-xs sm:text-sm text-gray-950 font-bold focus:outline-none focus:border-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs sm:text-sm font-extrabold rounded-xl transition shadow-sm"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border-2 border-borderLuxury p-8 shadow-sm space-y-4">
                <h2 className="text-2xl font-serif font-black text-gray-950 mb-4">
                  Saved Vault Shipping Addresses
                </h2>
                <div className="border-2 border-gold rounded-2xl p-5 bg-gold-50/30 max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-gold-dark bg-gold-50 px-3 py-1 rounded-full border border-gold/40">
                      Default Delivery
                    </span>
                    <span className="text-xs font-bold text-emeraldTheme hover:underline cursor-pointer">
                      Edit
                    </span>
                  </div>
                  <p className="font-bold text-base text-gray-950">Priyanka Sharma</p>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                    Villa 14, Prestige Silver Springs, Outer Ring Road
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">
                    Bengaluru, Karnataka - 560037
                  </p>
                  <p className="text-xs sm:text-sm text-gray-900 font-bold mt-2">
                    Mobile: +91 98450 12345
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
