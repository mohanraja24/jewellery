import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, ShieldCheck } from 'lucide-react';
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
    <div className="bg-ivory/50 min-h-[85vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-borderLuxury p-8 shadow-luxury space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-dark">
            Join The Lineage
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
            Register as a Patron
          </h1>
          <p className="text-xs text-charcoal-muted">
            Enjoy personalized bespoke concierge service and live bullion quotation locks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maharani Gayatri Devi"
                required
                className="w-full bg-ivory border border-borderLuxury rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
              <User className="w-4 h-4 text-charcoal-muted absolute right-3 top-3" />
            </div>
          </div>

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
            <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
              Mobile Number (for OTP & Insured Delivery)
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-ivory border border-borderLuxury rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
              <Phone className="w-4 h-4 text-charcoal-muted absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-charcoal-muted mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
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
            Create My Account
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-charcoal-muted">
          Already registered?{' '}
          <Link to="/login" className="text-burgundy font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
