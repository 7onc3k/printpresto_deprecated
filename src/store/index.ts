// src/store/index.ts
import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { CartItem, Product, Order } from '../types/types'

interface AppState {
  user: User | null
  cart: CartItem[]
  products: Product[]
  orders: Order[]
  setUser: (user: User | null) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  setProducts: (products: Product[]) => void
  setOrders: (orders: Order[]) => void
  clearCart: () => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  cart: [],
  products: [],
  orders: [],
  setUser: (user) => set({ user }),
  addToCart: (item) => set((state) => {
    const existingItemIndex = state.cart.findIndex(
      (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
    );
    
    if (existingItemIndex > -1) {
      const updatedCart = [...state.cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    } else {
      const updatedCart = [...state.cart, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }
  }),
  removeFromCart: (productId) => set((state) => {
    const updatedCart = state.cart.filter((item) => item.productId !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),
  setProducts: (products) => set({ products }),
  setOrders: (orders) => set({ orders }),
  clearCart: () => set({ cart: [] }),
}))