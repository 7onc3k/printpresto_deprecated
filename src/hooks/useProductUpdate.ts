import { supabase } from '../utils/supabaseClient';
import { Product } from '../types/types';

export const useProductUpdate = () => {
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id).select();
    if (error) {
      console.error('Chyba při aktualizaci produktu:', error);
      return null;
    } else {
      return data[0];
    }
  };

  return { updateProduct };
};
