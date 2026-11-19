import React, { useState } from 'react';
import {
  User,
  Package,
  MapPin,
  Lock,
  LogOut,
  Clock,
  ShieldCheck,
  FileText,
  Truck,
  CheckCircle2,
  ExternalLink
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
    <div className="bg-ivory/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border border-borderLuxury p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-burgundy text-white flex items-center justify-center font-serif text-xl font-bold shadow-md">
              {(user?.name || 'P')[0]}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-dark">
                Aurelia Privé Patron
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-charcoal">
                {user?.name || 'Priyanka Sharma'}
              </h1>
              <p className="text-xs text-charcoal-muted">{user?.email || 'priyanka@example.com'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-1.5 px-4 py-2 border border-borderLuxury hover:border-red-500 rounded-lg text-xs font-semibold text-charcoal hover:text-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                activeTab === 'orders'
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-borderLuxury'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders & Invoices</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-borderLuxury'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Information</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                activeTab === 'addresses'
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-borderLuxury'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery Addresses</span>
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="lg:col-span-9">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif font-bold text-charcoal">
                    Order History & Transit Status
                  </h2>
                  <span className="text-xs text-charcoal-muted">
                    Showing {MOCK_ORDERS.length} past orders
                  </span>
                </div>

                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-xl border border-borderLuxury overflow-hidden shadow-sm"
                  >
                    {/* Order Bar */}
                    <div className="bg-ivory/80 px-6 py-4 border-b border-borderLuxury flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-charcoal-muted block text-[10px] uppercase font-bold tracking-wider">
                          Order Reference
                        </span>
                        <strong className="text-charcoal font-semibold">{order.orderId}</strong>
                        <span className="text-charcoal-muted ml-2">
                          placed on {formatDate(order.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs uppercase font-bold px-2.5 py-1 rounded bg-gold-50 text-gold-dark border border-gold/40">
                          {order.status}
                        </span>
                        <button
                          onClick={() => toast.success(`Downloading Tax Invoice for ${order.orderId}`)}
                          className="flex items-center text-xs font-semibold text-burgundy hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5 mr-1" />
                          Download Invoice
                        </button>
                      </div>
                    </div>

                    {/* Order Details & Items */}
                    <div className="p-6 space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover bg-ivory border border-borderLuxury"
                            />
                            <div>
                              <h4 className="font-serif font-bold text-sm text-charcoal">
                                {item.name}
                              </h4>
                              <p className="text-xs text-charcoal-muted mt-0.5">
                                SKU: {item.sku} • {item.purity} • Net Wt: {item.weight} • Size: {item.size}
                              </p>
                              <p className="text-[11px] text-emerald-700 font-medium">
                                Locked Bullion Rate: {order.lockedRate}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-serif font-bold text-burgundy">
                              {formatINR(item.price)}
                            </span>
                            <span className="block text-[10px] text-charcoal-muted">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}

                      {/* Transit Tracker Strip */}
                      <div className="mt-4 pt-4 border-t border-borderLuxury/60 flex items-center justify-between text-xs text-charcoal-muted">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-gold-dark" />
                          <span>
                            Carrier: <strong>{order.carrier}</strong> (AWB: {order.trackingNumber})
                          </span>
                        </div>
                        <span className="text-emerald-700 flex items-center font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
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
              <div className="bg-white rounded-xl border border-borderLuxury p-6 shadow-sm">
                <h2 className="text-xl font-serif font-bold text-charcoal mb-4">
                  Edit Personal Information
                </h2>
                <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || 'priyanka@example.com'}
                      disabled
                      className="w-full bg-ivory/50 border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal-muted cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-semibold rounded-lg transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl border border-borderLuxury p-6 shadow-sm space-y-4">
                <h2 className="text-xl font-serif font-bold text-charcoal mb-4">
                  Saved Vault Shipping Addresses
                </h2>
                <div className="border border-gold rounded-xl p-4 bg-gold-50/20 max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold-50 px-2 py-0.5 rounded border border-gold/40">
                      Default Delivery
                    </span>
                    <span className="text-xs text-burgundy font-semibold cursor-pointer">
                      Edit
                    </span>
                  </div>
                  <p className="font-bold text-sm text-charcoal">Priyanka Sharma</p>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Villa 14, Prestige Silver Springs, Outer Ring Road
                  </p>
                  <p className="text-xs text-charcoal-muted">
                    Bengaluru, Karnataka - 560037
                  </p>
                  <p className="text-xs text-charcoal-muted mt-2">
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
