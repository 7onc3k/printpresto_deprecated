export interface Product {
  id: number;
  name: string;
  description?: string;  // ? značí, že pole je volitelné
  image_url: string;
}

interface Params {
  id: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  created_at: string;
  updated_at?: string;
  status?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  design_id?: string;  // Přidáno design_id
}

export interface Design {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  view_1_images?: any;
  view_2_images?: any;
  view_3_images?: any;
  view_4_images?: any;
}

export interface CartItem {
  designId: string;
  productId: string;
  quantity: number;
  size: string;
  price: number;
  view_1_images?: any[]; // Přidáno
  view_2_images?: any[]; // Přidáno
  view_3_images?: any[]; // Přidáno
  view_4_images?: any[]; // Přidáno
}
