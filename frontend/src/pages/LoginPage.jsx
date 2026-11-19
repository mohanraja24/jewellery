import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
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
    <div className="bg-ivory/50 min-h-[85vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-borderLuxury p-8 shadow-luxury space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-dark">
            Privé Access
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
            Welcome to {brand.brandName}
          </h1>
          <p className="text-xs text-charcoal-muted">
            Sign in to track orders, manage your wishlist, and lock live bullion quotes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-ivory border border-borderLuxury rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
              <Mail className="w-4 h-4 text-charcoal-muted absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs uppercase font-bold text-charcoal-muted">
                Password
              </label>
              <button
                type="button"
                onClick={() => toast.success('Password reset link dispatched to email!')}
                className="text-[11px] text-burgundy hover:underline"
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
                className="w-full bg-ivory border border-borderLuxury rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
              <Lock className="w-4 h-4 text-charcoal-muted absolute right-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase font-bold tracking-widest rounded-lg shadow-luxury transition"
          >
            Sign In to Account
          </button>
        </form>

        {/* Quick Demo Switcher */}
        <div className="pt-4 border-t border-borderLuxury space-y-2">
          <p className="text-[11px] text-charcoal-muted text-center font-medium">
            Quick Testing Credentials:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setEmail('priyanka@example.com');
                setPassword('password123');
              }}
              className="py-1.5 px-2 bg-ivory hover:bg-gold-50 border border-borderLuxury text-[11px] font-semibold text-charcoal rounded text-center transition"
            >
              Demo Customer
            </button>
            <button
              onClick={handleAdminDemoLogin}
              className="py-1.5 px-2 bg-burgundy-50 hover:bg-burgundy-100/60 border border-burgundy/30 text-[11px] font-semibold text-burgundy rounded text-center transition"
            >
              Demo Admin Portal
            </button>
          </div>
        </div>

        <div className="text-center pt-2 text-xs text-charcoal-muted">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-burgundy font-bold hover:underline">
            Register as New Patron
          </Link>
        </div>
      </div>
    </div>
  );
};
