import { StateCreator } from 'zustand';
import { Order } from '../../types/types';

export interface OrderSlice {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

export const createOrderSlice: StateCreator<OrderSlice> = (set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
});
