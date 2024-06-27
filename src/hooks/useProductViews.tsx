import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const useProductViews = (productId: string | string[] | undefined) => {
  const [productViews, setProductViews] = useState<{ [key: string]: string }>({ view_1: '', view_2: '', view_3: '', view_4: '' });

  useEffect(() => {
    const getProductViews = async () => {
      if (!productId) return;

      const { data, error } = await supabase
        .from('products')
        .select('view_1, view_2, view_3, view_4')
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Chyba při načítání obrázků produktu:', error);
      } else if (data) {
        setProductViews({
          view_1: data.view_1,
          view_2: data.view_2,
          view_3: data.view_3,
          view_4: data.view_4
        });
      }
    };

    getProductViews();
  }, [productId]);

  return productViews;
};

export default useProductViews;