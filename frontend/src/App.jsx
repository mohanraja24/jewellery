import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { BrandProvider } from './context/BrandContext';
import { MetalRateProvider } from './context/MetalRateContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { StoreLocationsPage } from './pages/StoreLocationsPage';
import { JewelleryCarePage } from './pages/JewelleryCarePage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <BrandProvider>
      <MetalRateProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <Router>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: '#5A1825',
                      color: '#FAF7F0',
                      border: '1px solid #C6A15B',
                      fontSize: '12px',
                      fontWeight: 500,
                    },
                    success: {
                      iconTheme: {
                        primary: '#C6A15B',
                        secondary: '#5A1825',
                      },
                    },
                  }}
                />

                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/account" element={<CustomerAccountPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/stores" element={<StoreLocationsPage />} />
                    <Route path="/care-guide" element={<JewelleryCarePage />} />
                    <Route path="/policies" element={<PoliciesPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </Router>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </MetalRateProvider>
    </BrandProvider>
  );
}

export default App;
