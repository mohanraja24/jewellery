import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Upload,
  AlertCircle,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  Clock,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useBrand } from '../context/BrandContext';
import { useMetalRate } from '../context/MetalRateContext';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/mockData';
import { formatINR, formatINRDecimal, formatWeight, formatDate } from '../utils/formatters';
import toast from 'react-hot-toast';

const REVENUE_DATA = [
  { month: 'Jun', revenue: 1450000, orders: 18 },
  { month: 'Jul', revenue: 1820000, orders: 24 },
  { month: 'Aug', revenue: 2150000, orders: 28 },
  { month: 'Sep', revenue: 2980000, orders: 36 },
  { month: 'Oct', revenue: 4520000, orders: 54 },
  { month: 'Nov', revenue: 3840000, orders: 48 }
];

export const AdminPage = () => {
  const { brand, updateBrandSettings } = useBrand();
  const { rates, updateRates, calculatePrice } = useMetalRate();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'rates' | 'products' | 'migration' | 'orders'

  // Admin Rate Management Form States
  const [manualGold24, setManualGold24] = useState(rates.gold24k);
  const [manualGold22, setManualGold22] = useState(rates.gold22k);
  const [manualGold18, setManualGold18] = useState(rates.gold18k);
  const [manualSilver, setManualSilver] = useState(rates.silver999);
  const [markupPercent, setMarkupPercent] = useState(rates.markupPercentage || 0);

  // Brand Migration Form State
  const [brandForm, setBrandForm] = useState({
    brandName: brand.brandName,
    tagline: brand.tagline,
    establishedYear: brand.establishedYear,
    phone: brand.phone,
    whatsapp: brand.whatsapp,
    email: brand.email,
    gstin: brand.gstin,
    bisLicenseNumber: brand.bisLicenseNumber,
    addressLine1: brand.headquarters.addressLine1,
    city: brand.headquarters.city,
    state: brand.headquarters.state,
    postalCode: brand.headquarters.postalCode,
  });

  // Products state for management
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'gold',
    metalType: 'GOLD',
    purity: '22K',
    pricingType: 'RATE_BASED',
    grossWeight: 10,
    netMetalWeight: 10,
    makingChargeType: 'PERCENT',
    makingCharge: 12,
    wastagePercentage: 2,
    stock: 5,
    description: '',
    certification: 'BIS Hallmark 916 HUID',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
  });

  // Save manual rates
  const handleSaveRates = (e) => {
    e.preventDefault();
    updateRates(
      {
        gold24k: Number(manualGold24),
        gold22k: Number(manualGold22),
        gold18k: Number(manualGold18),
        silver999: Number(manualSilver),
        silver925: Math.round(Number(manualSilver) * 0.925 * 100) / 100,
        markupPercentage: Number(markupPercent)
      },
      true
    );
    toast.success('Metal rates updated with manual admin audit record!');
  };

  // Save brand migration settings
  const handleSaveBrand = (e) => {
    e.preventDefault();
    updateBrandSettings({
      brandName: brandForm.brandName,
      tagline: brandForm.tagline,
      establishedYear: brandForm.establishedYear,
      phone: brandForm.phone,
      whatsapp: brandForm.whatsapp,
      email: brandForm.email,
      gstin: brandForm.gstin,
      bisLicenseNumber: brandForm.bisLicenseNumber,
      headquarters: {
        ...brand.headquarters,
        addressLine1: brandForm.addressLine1,
        city: brandForm.city,
        state: brandForm.state,
        postalCode: brandForm.postalCode
      }
    });
    toast.success('Existing business settings and branding updated!');
  };

  // Add Product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const created = {
      ...newProduct,
      id: `PROD-${Date.now()}`,
      images: [newProduct.image],
      grossWeight: Number(newProduct.grossWeight),
      netMetalWeight: Number(newProduct.netMetalWeight),
      makingCharge: Number(newProduct.makingCharge),
      stock: Number(newProduct.stock),
      isFeatured: true
    };
    setProductsList([created, ...productsList]);
    setProductModalOpen(false);
    toast.success(`Product "${created.name}" created with SKU ${created.sku}`);
  };

  // CSV Template download simulation
  const handleDownloadCsvTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,SKU,Name,Category,MetalType,Purity,GrossWeight,NetMetalWeight,StoneValue,MakingChargeType,MakingCharge,WastagePct,Stock,Certification\n' +
      'AUR-GLD-010,Heritage Royal Kangan,gold,GOLD,22K,28.400,28.400,0,PERCENT,12,2.0,8,BIS Hallmark 916\n' +
      'AUR-DIA-020,Solitaire Pendant,diamond,GOLD,18K,4.500,4.200,45000,FIXED,4500,0,4,IGI Certified';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'aurelia_jewellery_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Sample jewellery CSV import template downloaded!');
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      toast.success(`Validated "${file.name}": 2 products ready for inventory sync!`);
    }
  };

  return (
    <div className="bg-ivory/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-burgundy text-white rounded-2xl p-6 mb-8 shadow-luxury flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-gold text-charcoal-dark text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                Admin Control Room
              </span>
              <span className="text-xs text-gold-light">v2.4 Live Pricing Active</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-ivory mt-1">
              {brand.brandName} Store Management
            </h1>
            <p className="text-xs text-ivory/80">
              Live Bullion Engine • Inventory & Catalog • Business Migration Settings
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-ivory/80 hidden sm:inline">
              Rate Status: <strong className="text-gold-light">{rates.status}</strong>
            </span>
            <button
              onClick={() => {
                updateRates(rates, false);
                toast.success('Synced with live bullion API provider');
              }}
              className="px-4 py-2 bg-gold hover:bg-gold-light text-charcoal-dark font-semibold text-xs rounded-lg transition flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Bullion Rates</span>
            </button>
          </div>
        </div>

        {/* Admin Tab Switcher */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl border border-borderLuxury">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'dashboard' ? 'bg-burgundy text-white shadow-sm' : 'text-charcoal hover:bg-ivory'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'rates' ? 'bg-burgundy text-white shadow-sm' : 'text-charcoal hover:bg-ivory'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Live Rate & Pricing Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'products' ? 'bg-burgundy text-white shadow-sm' : 'text-charcoal hover:bg-ivory'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog ({productsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('migration')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === 'migration' ? 'bg-burgundy text-white shadow-sm' : 'text-charcoal hover:bg-ivory'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Onboarding & CSV Migration</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-xl border border-borderLuxury shadow-sm">
                <span className="text-[11px] uppercase font-bold text-charcoal-muted tracking-wider block">
                  Total Revenue (Nov)
                </span>
                <div className="text-2xl font-serif font-bold text-burgundy mt-1">
                  ₹38,40,000
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                  +18.4% vs last month
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-borderLuxury shadow-sm">
                <span className="text-[11px] uppercase font-bold text-charcoal-muted tracking-wider block">
                  Total Orders
                </span>
                <div className="text-2xl font-serif font-bold text-charcoal mt-1">
                  48 Orders
                </div>
                <div className="text-[10px] text-charcoal-muted mt-1">
                  4 pending dispatch
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-borderLuxury shadow-sm">
                <span className="text-[11px] uppercase font-bold text-charcoal-muted tracking-wider block">
                  Live Gold 22K (916)
                </span>
                <div className="text-2xl font-serif font-bold text-gold-dark mt-1">
                  {formatINR(rates.gold22k)} / g
                </div>
                <div className="text-[10px] text-charcoal-muted mt-1">
                  Benchmark: {rates.source}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-borderLuxury shadow-sm">
                <span className="text-[11px] uppercase font-bold text-charcoal-muted tracking-wider block">
                  Active SKUs
                </span>
                <div className="text-2xl font-serif font-bold text-charcoal mt-1">
                  {productsList.length} Designs
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                  All BIS Hallmarked
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-white p-6 rounded-2xl border border-borderLuxury shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-charcoal">
                    Precious Jewellery Sales & Revenue Velocity
                  </h3>
                  <p className="text-xs text-charcoal-muted">Monthly gross revenue in INR</p>
                </div>
                <span className="text-xs font-bold text-burgundy bg-burgundy/10 px-3 py-1 rounded-full">
                  FY 2026-27
                </span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C6A15B" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#C6A15B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8E1D7" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
                    <YAxis
                      stroke="#666"
                      fontSize={11}
                      tickFormatter={(val) => `₹${val / 100000}L`}
                    />
                    <Tooltip
                      formatter={(val) => [formatINR(val), 'Revenue']}
                      contentStyle={{ backgroundColor: '#FAF7F0', borderColor: '#E8E1D7' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#5A1825"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE RATE & PRICING ENGINE */}
        {activeTab === 'rates' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-borderLuxury shadow-sm space-y-6">
              <div className="border-b border-borderLuxury pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-serif font-bold text-charcoal flex items-center">
                    <DollarSign className="w-5 h-5 mr-1.5 text-gold-dark" />
                    Bullion Benchmark & Rate Override Controls
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Configure real-time per-gram bullion rates. Overriding rates updates all product prices instantly.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded bg-gold-50 text-gold-dark border border-gold/40">
                  Last Updated: {formatDate(rates.lastUpdated)}
                </span>
              </div>

              <form onSubmit={handleSaveRates} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Gold 24K (99.9% Pure) ₹/g
                    </label>
                    <input
                      type="number"
                      value={manualGold24}
                      onChange={(e) => setManualGold24(e.target.value)}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-sm font-bold text-charcoal focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Gold 22K (91.6% Hallmark 916) ₹/g
                    </label>
                    <input
                      type="number"
                      value={manualGold22}
                      onChange={(e) => setManualGold22(e.target.value)}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-sm font-bold text-burgundy focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Gold 18K (75.0% Hallmark 750) ₹/g
                    </label>
                    <input
                      type="number"
                      value={manualGold18}
                      onChange={(e) => setManualGold18(e.target.value)}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-sm font-bold text-charcoal focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Fine Silver 999 ₹/g
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={manualSilver}
                      onChange={(e) => setManualSilver(e.target.value)}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-sm font-bold text-charcoal focus:border-gold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-borderLuxury">
                  <div className="text-xs text-charcoal-muted flex items-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 mr-1.5" />
                    <span>Every rate change creates an immutable entry in the audit log.</span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase font-bold tracking-wider rounded-lg shadow-luxury transition"
                  >
                    Commit Rate Updates
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT CATALOG */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-charcoal">
                Active Product Inventory ({productsList.length})
              </h2>
              <button
                onClick={() => setProductModalOpen(true)}
                className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-white text-xs font-semibold rounded-lg transition flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Jewellery Piece</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-borderLuxury overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-ivory border-b border-borderLuxury text-charcoal-muted uppercase text-[10px] tracking-wider">
                    <th className="p-3">Piece Details</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Metal & Purity</th>
                    <th className="p-3">Net Wt</th>
                    <th className="p-3">Making Charge</th>
                    <th className="p-3">Live Final Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderLuxury">
                  {productsList.map((item) => {
                    const priceDetails = calculatePrice(item);
                    return (
                      <tr key={item.id} className="hover:bg-ivory/40">
                        <td className="p-3 flex items-center space-x-3">
                          <img
                            src={item.images[0]}
                            alt=""
                            className="w-10 h-10 rounded object-cover bg-ivory"
                          />
                          <span className="font-semibold text-charcoal">{item.name}</span>
                        </td>
                        <td className="p-3 text-charcoal-muted font-mono">{item.sku}</td>
                        <td className="p-3">
                          <span className="font-bold text-burgundy">{item.purity}</span> {item.metalType}
                        </td>
                        <td className="p-3 font-semibold">{formatWeight(item.netMetalWeight)}</td>
                        <td className="p-3 text-charcoal-muted">
                          {item.makingChargeType === 'PERCENT' ? `${item.makingCharge}%` : `₹${item.makingCharge}`}
                        </td>
                        <td className="p-3 font-bold font-serif text-burgundy">
                          {formatINR(priceDetails.finalPrice)}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.stock > 3 ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                          }`}>
                            {item.stock} in stock
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setProductsList(productsList.filter((p) => p.id !== item.id));
                              toast.success(`Deleted ${item.name}`);
                            }}
                            className="text-red-600 hover:text-red-800"
                            title="Delete SKU"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: STORE ONBOARDING & CSV MIGRATION */}
        {activeTab === 'migration' && (
          <div className="space-y-8">
            {/* CSV Import Module */}
            <div className="bg-white p-8 rounded-2xl border border-borderLuxury shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-borderLuxury">
                <div>
                  <h3 className="font-serif font-bold text-lg text-charcoal flex items-center">
                    <FileSpreadsheet className="w-5 h-5 mr-2 text-gold-dark" />
                    Existing Business Product & Stock CSV Migration
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Bulk import existing jewellery items, purities, weights, and stock figures without manual re-entry.
                  </p>
                </div>
                <button
                  onClick={handleDownloadCsvTemplate}
                  className="px-4 py-2 border border-gold hover:bg-gold-50 text-gold-dark rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sample CSV Template</span>
                </button>
              </div>

              <div className="border-2 border-dashed border-borderLuxury rounded-xl p-8 text-center bg-ivory/40 space-y-3">
                <Upload className="w-8 h-8 text-gold-dark mx-auto" />
                <h4 className="font-semibold text-sm text-charcoal">
                  Upload Completed Jewellery CSV File
                </h4>
                <p className="text-xs text-charcoal-muted max-w-md mx-auto">
                  Upload your completed CSV containing SKU, metal purity, gross weight, making charges, and initial stock.
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="text-xs text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-burgundy file:text-white hover:file:bg-burgundy-light cursor-pointer"
                />
              </div>
            </div>

            {/* Brand Settings Form */}
            <div className="bg-white p-8 rounded-2xl border border-borderLuxury shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-lg text-charcoal pb-3 border-b border-borderLuxury">
                Configurable Brand & Store Details
              </h3>
              <form onSubmit={handleSaveBrand} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={brandForm.brandName}
                      onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal font-semibold focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Tagline / Motto
                    </label>
                    <input
                      type="text"
                      value={brandForm.tagline}
                      onChange={(e) => setBrandForm({ ...brandForm, tagline: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Official Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={brandForm.phone}
                      onChange={(e) => setBrandForm({ ...brandForm, phone: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Official Concierge Email
                    </label>
                    <input
                      type="email"
                      value={brandForm.email}
                      onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      BIS Hallmark License No.
                    </label>
                    <input
                      type="text"
                      value={brandForm.bisLicenseNumber}
                      onChange={(e) => setBrandForm({ ...brandForm, bisLicenseNumber: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      GSTIN Identification Number
                    </label>
                    <input
                      type="text"
                      value={brandForm.gstin}
                      onChange={(e) => setBrandForm({ ...brandForm, gstin: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:border-gold"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                    Headquarters Store Address
                  </label>
                  <input
                    type="text"
                    value={brandForm.addressLine1}
                    onChange={(e) => setBrandForm({ ...brandForm, addressLine1: e.target.value })}
                    className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-semibold rounded-lg transition"
                >
                  Save Store Details
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add New Product */}
        {productModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gold/40 max-h-[90vh] overflow-y-auto animate-scaleUp">
              <div className="bg-burgundy text-white p-5 flex items-center justify-between sticky top-0 z-10">
                <h3 className="font-serif font-bold text-lg text-gold-light">
                  Add New Jewellery Design
                </h3>
                <button
                  onClick={() => setProductModalOpen(false)}
                  className="text-ivory hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Nizam Emerald Necklace"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      SKU Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AUR-GLD-NK-010"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Metal Type
                    </label>
                    <select
                      value={newProduct.metalType}
                      onChange={(e) => setNewProduct({ ...newProduct, metalType: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    >
                      <option value="GOLD">Gold</option>
                      <option value="SILVER">Silver</option>
                      <option value="PLATINUM">Platinum</option>
                      <option value="BRASS_GOLD_PLATED">Fashion Brass / CZ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Purity
                    </label>
                    <select
                      value={newProduct.purity}
                      onChange={(e) => setNewProduct({ ...newProduct, purity: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    >
                      <option value="24K">24K (99.9%)</option>
                      <option value="22K">22K (91.6% Hallmark)</option>
                      <option value="18K">18K (75.0% Hallmark)</option>
                      <option value="14K">14K (58.5% Hallmark)</option>
                      <option value="925">925 Sterling Silver</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Gross Weight (g)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProduct.grossWeight}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          grossWeight: e.target.value,
                          netMetalWeight: e.target.value
                        })
                      }
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Net Metal Weight (g)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProduct.netMetalWeight}
                      onChange={(e) => setNewProduct({ ...newProduct, netMetalWeight: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Making Charge (%)
                    </label>
                    <input
                      type="number"
                      value={newProduct.makingCharge}
                      onChange={(e) => setNewProduct({ ...newProduct, makingCharge: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                      Stock Units
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-ivory border border-borderLuxury rounded-lg p-2.5 text-xs text-charcoal"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase font-bold tracking-wider rounded-lg shadow-luxury transition"
                  >
                    Save SKU to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
