// src/types/types.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  view_1: string;
  view_2: string;
  view_3: string;
  view_4: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  design_id: string;
  size: string;
}

export interface Design {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  view_1_images: DesignImage[];
  view_2_images: DesignImage[];
  view_3_images: DesignImage[];
  view_4_images: DesignImage[];
}

export interface DesignImage {
  src: string;
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
  angle: number;
}

export interface CartItem {
  designId: string | null;
  productId: string;
  quantity: number;
  size: 'S' | 'M' | 'L' | 'XL';
  price: number;
}

export type ProductView = 'view_1' | 'view_2' | 'view_3' | 'view_4';

export type ProductViews = {
  [K in ProductView]: string;
};