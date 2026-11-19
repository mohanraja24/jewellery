import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMetalRate } from './MetalRateContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { calculatePrice } = useMetalRate();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aurelia_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading cart', e);
      }
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [quoteExpiry, setQuoteExpiry] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('aurelia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size = null, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        toast.success(`Updated quantity of "${product.name}" in bag`);
        return updated;
      } else {
        toast.success(`Added "${product.name}" to your shopping bag`);
        return [...prevItems, { product, selectedSize, quantity }];
      }
    });
  };

  const updateQuantity = (productId, selectedSize, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
    toast.success('Item removed from shopping bag');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setQuoteExpiry(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'AURELIA10') {
      setAppliedCoupon({
        code: 'AURELIA10',
        discountType: 'PERCENT',
        discountValue: 10,
        description: '10% off making charges or order subtotal'
      });
      toast.success('Coupon "AURELIA10" applied successfully!');
      return true;
    } else if (cleanCode === 'WELCOME2000') {
      setAppliedCoupon({
        code: 'WELCOME2000',
        discountType: 'FLAT',
        discountValue: 2000,
        description: 'Flat ₹2,000 off on bridal & gold sets'
      });
      toast.success('Coupon "WELCOME2000" applied successfully!');
      return true;
    } else {
      toast.error('Invalid coupon code. Try AURELIA10 or WELCOME2000');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  // Generate a 15-minute price lock quote for checkout
  const lockPriceQuote = () => {
    const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    setQuoteExpiry(expiry);
    return expiry;
  };

  // Compute live cart totals dynamically using current metal rates
  const cartSummary = cartItems.reduce(
    (acc, item) => {
      const priceDetails = calculatePrice(item.product);
      const itemTotal = priceDetails.finalPrice * item.quantity;
      const metalTotal = priceDetails.metalValue * item.quantity;
      const makingTotal = priceDetails.makingCharge * item.quantity;
      const taxTotal = priceDetails.tax * item.quantity;

      acc.totalQuantity += item.quantity;
      acc.subtotal += priceDetails.subtotal * item.quantity;
      acc.totalMetalValue += metalTotal;
      acc.totalMakingCharges += makingTotal;
      acc.totalTax += taxTotal;
      acc.grossTotal += itemTotal;
      return acc;
    },
    {
      totalQuantity: 0,
      subtotal: 0,
      totalMetalValue: 0,
      totalMakingCharges: 0,
      totalTax: 0,
      grossTotal: 0
    }
  );

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENT') {
      discountAmount = Math.round(cartSummary.grossTotal * (appliedCoupon.discountValue / 100));
    } else {
      discountAmount = Math.min(appliedCoupon.discountValue, cartSummary.grossTotal);
    }
  }

  const netPayable = Math.max(0, cartSummary.grossTotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSummary: {
          ...cartSummary,
          discountAmount,
          netPayable
        },
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        quoteExpiry,
        lockPriceQuote
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
