// src/store/index.ts
import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { CartItem, Product, Order } from '../types/types'
import { supabase } from '../utils/supabaseClient'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AppState extends AuthState {
  cart: CartItem[]
  products: Product[]
  orders: Order[]
  setUser: (user: User | null) => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  setProducts: (products: Product[]) => void
  setOrders: (orders: Order[]) => void
  clearCart: () => void
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  cart: [],
  products: [],
  orders: [],
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
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