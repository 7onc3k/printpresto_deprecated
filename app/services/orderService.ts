import { supabase } from '../utils/supabaseClient';
import { Order, OrderItem } from '../types/types';

export const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (error) throw error;
  return data || [];
};

export const fetchDesign = async (designId: string) => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('id', designId)
    .single();

  if (error) throw error;
  return data;
};
