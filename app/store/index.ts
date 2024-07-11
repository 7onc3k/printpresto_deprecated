import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { CartSlice, createCartSlice } from './slices/cartSlice';
import { ProductSlice, createProductSlice } from './slices/productSlice';
import { OrderSlice, createOrderSlice } from './slices/orderSlice';

type StoreState = AuthSlice & CartSlice & ProductSlice & OrderSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
  ...createProductSlice(...a),
  ...createOrderSlice(...a),
}));
