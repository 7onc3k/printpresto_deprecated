export interface Product {
  id: number;
  name: string;
  description?: string;  // ? značí, že pole je volitelné
  image_url: string;
}

interface Params {
  id: string;
}

export interface Design {
  id: number;
  product_id: string;
  view_1_images: string[];
  view_2_images: string[];
  view_3_images: string[];
  view_4_images: string[];
  [key: string]: any; // Přidáme indexový podpis
}

export interface CartItem {
  designId: string;
  productId: string;
  quantity: number;
  size: string;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
}