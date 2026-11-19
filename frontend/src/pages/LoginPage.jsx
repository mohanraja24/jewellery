import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBrand } from '../context/BrandContext';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { brand } = useBrand();

  const [email, setEmail] = useState('priyanka@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    const res = await login(email, password, 'customer');
    if (res.success) {
      navigate('/account');
    }
  };

  const handleAdminDemoLogin = async () => {
    const res = await login('admin@aureliajewels.com', 'admin123', 'admin');
    if (res.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="bg-ivory min-h-[85vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border-2 border-borderLuxury p-8 sm:p-10 shadow-luxury space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emeraldTheme mx-auto flex items-center justify-center text-amber-300 shadow-sm border border-gold/40 mb-3">
            <Crown className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold-dark">
            Privé Access
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-gray-950">
            Welcome to {brand.brandName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Sign in to track orders, manage your wishlist, and lock live bullion quotes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-medium">
          <div>
            <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-ivory border-2 border-borderLuxury rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-gray-950 focus:outline-none focus:border-gold"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs uppercase font-extrabold text-gray-800">
                Password
              </label>
              <button
                type="button"
                onClick={() => toast.success('Password reset link dispatched to email!')}
                className="text-xs font-bold text-emeraldTheme hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-ivory border-2 border-borderLuxury rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-gray-950 focus:outline-none focus:border-gold"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emeraldTheme hover:bg-emeraldTheme-light text-white text-xs sm:text-sm uppercase font-extrabold tracking-widest rounded-xl shadow-luxury transition border border-gold/40"
          >
            Sign In to Account
          </button>
        </form>

        {/* Quick Demo Switcher */}
        <div className="pt-4 border-t border-borderLuxury space-y-2.5">
          <p className="text-xs text-gray-700 text-center font-bold">
            One-Click Quick Testing Access:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setEmail('priyanka@example.com');
                setPassword('password123');
              }}
              className="py-2.5 px-3 bg-ivory hover:bg-gold-50 border-2 border-borderLuxury text-xs font-bold text-gray-900 rounded-xl text-center transition"
            >
              Demo Customer
            </button>
            <button
              onClick={handleAdminDemoLogin}
              className="py-2.5 px-3 bg-emeraldTheme-50 hover:bg-emeraldTheme-100 border-2 border-emeraldTheme/40 text-xs font-extrabold text-emeraldTheme rounded-xl text-center transition"
            >
              Demo Admin Portal
            </button>
          </div>
        </div>

        <div className="text-center pt-2 text-xs sm:text-sm text-gray-600 font-medium">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-emeraldTheme font-extrabold hover:underline">
            Register as New Patron
          </Link>
        </div>
      </div>
    </div>
  );
};
