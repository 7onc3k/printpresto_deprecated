import { useState, useEffect } from 'react';
import { Order, OrderItem } from '../types/types';
import { fetchOrders, fetchOrderItems } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetchOrders().then(setOrders).catch(console.error);
  }, []);

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    try {
      const items = await fetchOrderItems(order.id);
      setOrderItems(items);
    } catch (error) {
      console.error('Chyba při načítání položek objednávky:', error);
    }
  };

  return { orders, selectedOrder, orderItems, handleViewOrder };
};
