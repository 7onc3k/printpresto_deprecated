// src/hooks/useProductDesigner.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fabric } from 'fabric';
import useUser from './useUser';
import useProductViews from './useProductViews';
import { loadDesign, saveDesign } from '../services/designService';
import { useStore } from '../store';
import { CartItem } from '../types/types';

export const useProductDesigner = () => {
  const router = useRouter();
  const { id, designData } = router.query;
  const productViews = useProductViews(id as string);
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: fabric.Image[] }>({ view_1: [], view_2: [], view_3: [], view_4: [] });
  const [currentView, setCurrentView] = useState<string>('view_1');
  const user = useUser();
  const addToCart = useStore(state => state.addToCart);

  useEffect(() => {
    if (designData) {
      const decodedDesignData = JSON.parse(decodeURIComponent(designData as string));
      handleDesignSelect(id as string, decodedDesignData);
    }
  }, [id, designData]);

  const handleSaveDesign = async () => {
    const designId = await saveDesign(user, id as string, uploadedImages);
    return designId;
  };

  const handleDesignSelect = async (productId: string, uploadedImagesData: any) => {
    const updatedImages = await loadDesign(productId, uploadedImagesData);
    if (updatedImages) {
      setUploadedImages(updatedImages);
    }
  };

  const addToCartHandler = async () => {
    const designId = await handleSaveDesign();

    const newItem: CartItem = {
      designId,
      productId: id as string,
      quantity: 1,
      size: 'M', // Default size, you might want to make this configurable
      price: 100, // Example price, should be fetched from product data
    };
    addToCart(newItem);
  };

  return {
    productViews,
    uploadedImages,
    setUploadedImages,
    currentView,
    setCurrentView,
    handleSaveDesign,
    addToCartHandler,
  };
};