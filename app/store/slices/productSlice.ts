import { StateCreator } from 'zustand';
import { Product } from '../../types/types';

export interface ProductSlice {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const createProductSlice: StateCreator<ProductSlice> = (set) => ({
  products: [],
  setProducts: (products) => set({ products }),
});
