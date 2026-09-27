"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Parcel {
  id: string;
  name: string;
  category: string;
  price: number;
  pickup: string;
  dropoff: string;
}

interface CartContextType {
  cart: Parcel[];
  addToCart: (parcel: Parcel) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Parcel[]>([]);

  const addToCart = (parcel: Parcel) => {
    setCart((prev) => {
      // Avoid duplicates
      if (prev.some((p) => p.id === parcel.id)) return prev;
      return [...prev, parcel];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((parcel) => parcel.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
