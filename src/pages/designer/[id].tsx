import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CanvasComponent from '../../components/CanvasComponent';
import useUser from '../../hooks/useUser';
import useProductViews from '../../hooks/useProductViews';
import { loadDesign, saveDesign } from '../../services/designService';
import { fabric } from 'fabric';

interface CartItem {
  designId: string | string[] | undefined;
  productId: string | string[] | undefined;
  quantity: number;
  size: string;
  price: number;
}

const ProductDesigner = () => {
  const router = useRouter();
  const { id, designData } = router.query;
  const productViews = useProductViews(id);
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: fabric.Image[] }>({ view_1: [], view_2: [], view_3: [], view_4: [] });
  const [currentView, setCurrentView] = useState('view_1');
  const user = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (designData) {
      const decodedDesignData = JSON.parse(decodeURIComponent(designData as string));
      handleDesignSelect(id as string, decodedDesignData);
    }
  }, [id, designData]);

  const handleSaveDesign = async () => {
    await saveDesign(user, id, uploadedImages);
  };

  const handleDesignSelect = async (productId: string, uploadedImagesData: any) => {
    const updatedImages = await loadDesign(productId, uploadedImagesData);
    if (updatedImages) {
      setUploadedImages(updatedImages);
    }
  };

  const addToCart = () => {
    const newItem: CartItem = {
      designId: id,
      productId: id,
      quantity: 1,
      size: '', // Velikost bude vybrána později
      price: 100, // Example price, should be fetched from product data
    };
    setCartItems([...cartItems, newItem]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItem])); // Uložit do localStorage
  };

  return (
    <Layout onDesignSelect={handleDesignSelect}>
      <div>
        <h1>Designér produktů</h1>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {Object.entries(productViews).map(([key, value]) =>
            value && (
              <img
                key={key}
                src={value}
                alt={`Náhled ${key}`}
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={() => setCurrentView(key)}
              />
            )
          )}
        </div>
        <CanvasComponent
          uploadedImages={uploadedImages}
          currentView={currentView}
          productViews={productViews}
          setUploadedImages={setUploadedImages}
          readOnly={false} // Added readOnly prop
        />
        <button onClick={handleSaveDesign}>Uložit návrh</button>
        <button onClick={addToCart}>Přidat do košíku</button>
        <button onClick={() => router.push('/cart')}>Přejít do košíku</button> {/* Přidáno tlačítko */}
      </div>
    </Layout>
  );
};

export default ProductDesigner;