import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Product } from '../types/types';
import { useImageUpload } from '../hooks/useImageUpload';

export const useProductAdd = () => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const { uploadImage, uploadViewImage } = useImageUpload();

  const addProduct = async (product: Partial<Product>, imageFile: File | null, viewFiles: any) => {
    let imageUrl: string = '';
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }

    const viewUrls: { [key: string]: string } = {};
    for (const view in viewFiles) {
      if (viewFiles[view]) {
        const uploadedViewUrl = await uploadViewImage(viewFiles[view]!, view);
        if (uploadedViewUrl) {
          viewUrls[view] = uploadedViewUrl;
        }
      }
    }

    const productToAdd = { ...product, image_url: imageUrl, ...viewUrls };
    const { data, error } = await supabase.from('products').insert([productToAdd]).select();
    if (error) {
      console.error('Chyba při přidávání produktu:', error);
      return null;
    } else {
      setNewProduct({});
      return data[0];
    }
  };

  return { newProduct, setNewProduct, addProduct };
};
