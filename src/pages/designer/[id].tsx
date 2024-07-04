import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Designér produktů</h1>
      <div className="flex flex-wrap -mx-2 mb-6">
        {Object.entries(productViews).map(([key, value]) =>
          value && (
            <div key={key} className="px-2 mb-4">
              <Image 
                src={value}
                alt={`Náhled ${key}`}
                width={100}
                height={100}
                className="cursor-pointer border-2 hover:border-blue-500 transition-colors"
                onClick={() => setCurrentView(key)}
              />
            </div>
          )
        )}
      </div>
      <div className="mb-6">
        <CanvasComponent
          uploadedImages={uploadedImages}
          currentView={currentView}
          productViews={productViews}
          setUploadedImages={setUploadedImages}
          readOnly={false}
        />
      </div>
      <div className="flex space-x-4">
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