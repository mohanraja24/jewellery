import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBrand } from '../context/BrandContext';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { brand } = useBrand();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please complete all mandatory fields');
      return;
    }
    const res = await register(name, email, phone, password);
    if (res.success) {
      navigate('/account');
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
            Join The Lineage
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-gray-950">
            Register as a Patron
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Enjoy personalized bespoke concierge service and live bullion quotation locks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-medium">
          <div>
            <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gayatri Devi"
                required
                className="w-full bg-ivory border-2 border-borderLuxury rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-gray-950 focus:outline-none focus:border-gold"
              />
              <User className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

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
            <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
              Mobile Number (for OTP & Insured Delivery)
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-ivory border-2 border-borderLuxury rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-gray-950 focus:outline-none focus:border-gold"
              />
              <Phone className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-extrabold text-gray-800 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
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
            Create My Account
          </button>
        </form>

        <div className="text-center pt-2 text-xs sm:text-sm text-gray-600 font-medium">
          Already registered?{' '}
          <Link to="/login" className="text-emeraldTheme font-extrabold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
