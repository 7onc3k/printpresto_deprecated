import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Product } from '../components/EditProducts/types';
import { useImageUpload } from './useImageUpload';

export const useProductState = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
    } else {
      setProducts([...products, data[0]]);
      setNewProduct({});
    }
  };

  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id).select();
    if (error) {
      console.error('Chyba při aktualizaci produktu:', error);
    } else {
      setProducts(products.map(product => (product.id === id ? data[0] : product)));
    }
  };

  return { products, newProduct, setNewProduct, addProduct, updateProduct };
};