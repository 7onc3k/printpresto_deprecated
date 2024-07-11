import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Product } from '../types/types';

export const useProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Chyba při načítání produktů:', error);
    } else {
      setProducts(data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, fetchProducts };
};
