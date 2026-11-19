import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const DEMO_CUSTOMER = {
  id: 'CUST-101',
  name: 'Priyanka Sharma',
  email: 'priyanka@example.com',
  phone: '+91 98450 12345',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Priyanka Sharma',
      phone: '+91 98450 12345',
      addressLine1: 'Villa 14, Prestige Silver Springs',
      addressLine2: 'Outer Ring Road, Marathahalli',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560037',
      isDefault: true
    }
  ]
};

const DEMO_ADMIN = {
  id: 'ADM-001',
  name: 'Shop Owner / Administrator',
  email: 'admin@aureliajewels.com',
  role: 'admin'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aurelia_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing user', e);
      }
    }
    return null; // Guest by default
  });

  const [token, setToken] = useState(() => localStorage.getItem('aurelia_auth_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aurelia_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aurelia_auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('aurelia_auth_token', token);
    } else {
      localStorage.removeItem('aurelia_auth_token');
    }
  }, [token]);

  const login = async (email, password, role = 'customer') => {
    // Client-side quick login or connected to backend
    if (email === 'admin@aureliajewels.com' || role === 'admin') {
      setUser(DEMO_ADMIN);
      setToken('mock_admin_jwt_token');
      toast.success('Logged in as Administrator');
      return { success: true, user: DEMO_ADMIN };
    } else {
      const customerUser = {
        ...DEMO_CUSTOMER,
        email: email || DEMO_CUSTOMER.email
      };
      setUser(customerUser);
      setToken('mock_customer_jwt_token');
      toast.success(`Welcome back, ${customerUser.name}!`);
      return { success: true, user: customerUser };
    }
  };

  const register = async (name, email, phone, password) => {
    const newUser = {
      id: `CUST-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      addresses: []
    };
    setUser(newUser);
    setToken(`token_${Date.now()}`);
    toast.success('Account created successfully! Welcome to Aurelia.');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      return updated;
    });
    toast.success('Profile updated');
  };

  const addAddress = (newAddr) => {
    setUser((prev) => {
      const addresses = [...(prev.addresses || []), { ...newAddr, id: `addr-${Date.now()}` }];
      return { ...prev, addresses };
    });
    toast.success('New delivery address added');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        addAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
