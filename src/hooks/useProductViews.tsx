import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const useProductViews = (id: string | string[] | undefined) => {
  const [productViews, setProductViews] = useState<{ [key: string]: string }>({ view_1: '', view_2: '', view_3: '', view_4: '' });

  useEffect(() => {
    const getProductViews = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('view_1, view_2, view_3, view_4')
        .eq('id', id)
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

    if (id) {
      getProductViews();
    }
  }, [id]);

  return productViews;
};

export default useProductViews;