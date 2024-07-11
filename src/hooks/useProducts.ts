import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Product } from '../components/EditProducts/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Chyba při načítání produktů:', error);
    } else {
      setProducts(data);
    }
  };

  return { products, setProducts, fetchProducts };
};