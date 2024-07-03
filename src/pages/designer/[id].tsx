import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import CanvasComponent from '../../components/products/CanvasComponent';
import { useProductDesigner } from '../../hooks/useProductDesigner';

const ProductDesigner: React.FC = () => {
  const router = useRouter();
  const {
    productViews,
    uploadedImages,
    setUploadedImages,
    currentView,
    setCurrentView,
    handleSaveDesign,
    addToCartHandler,
  } = useProductDesigner();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Designér produktů</h1>
      <div className="flex gap-4 flex-wrap">
        {Object.entries(productViews).map(([key, value]) =>
          value && (
            <Image 
              key={key}
              src={value}
              alt={`Náhled ${key}`}
              width={100}
              height={100}
              className="cursor-pointer"
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
        readOnly={false}
      />
      <div className="flex gap-4">
        <button 
          onClick={handleSaveDesign}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Uložit návrh
        </button>
        <button 
          onClick={addToCartHandler}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Přidat do košíku
        </button>
        <button 
          onClick={() => router.push('/cart')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Přejít do košíku
        </button>
      </div>
    </div>
  );
};

export default ProductDesigner;