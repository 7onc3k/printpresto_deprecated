import { useState } from 'react';
import { fabric } from 'fabric';
import { loadDesign } from '../services/designService';
import { fetchDesign } from '../services/orderService';
import { OrderItem } from '../types/types';

export const useDesign = () => {
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: fabric.Image[] }>({ view_1: [], view_2: [], view_3: [], view_4: [] });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleViewOrderItem = async (item: OrderItem) => {
    setSelectedProductId(item.product_id);
    if (item.design_id) {
      try {
        const design = await fetchDesign(item.design_id);
        if (design) {
          const loadedImages = await loadDesign(item.product_id, design);
          if (loadedImages) {
            setUploadedImages(loadedImages);
          }
        }
      } catch (error) {
        console.error('Chyba při načítání designu:', error);
      }
    }
  };

  return { uploadedImages, selectedProductId, handleViewOrderItem };
};
