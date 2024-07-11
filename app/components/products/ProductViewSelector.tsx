import React from 'react';
import Image from 'next/image';
import { ProductViewSelectorProps } from '../../types/productDesigner';

const ProductViewSelector: React.FC<ProductViewSelectorProps> = ({
  productViews,
  currentView,
  setCurrentView,
}) => {
  return (
    <div className="flex flex-wrap -mx-2 mb-6">
      {Object.entries(productViews).map(([key, value]) =>
        value && (
          <div key={key} className="px-2 mb-4">
            <Image 
              src={value}
              alt={`Náhled ${key}`}
              width={100}
              height={100}
              className={`cursor-pointer border-2 hover:border-blue-500 transition-colors ${
                currentView === key ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => setCurrentView(key)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ProductViewSelector;