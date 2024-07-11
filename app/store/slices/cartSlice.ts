import { StateCreator } from 'zustand';
import { CartItem } from '../../types/types';

export interface CartSlice {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
  cart: [],
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
  clearCart: () => {
    localStorage.removeItem('cartItems');
    set({ cart: [] });
  },
});
