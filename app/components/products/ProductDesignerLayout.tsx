import React from 'react';
import ProductViewSelector from './ProductViewSelector';
import CanvasComponent from './CanvasComponent';
import ActionButtons from './ActionButtons';
import { ProductDesignerProps } from '../../types/productDesigner';

const ProductDesignerLayout: React.FC<ProductDesignerProps> = ({
  productViews,
  uploadedImages,
  setUploadedImages,
  currentView,
  setCurrentView,
  handleSaveDesign,
  addToCartHandler,
  onGoToCart,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Designér produktů</h1>
      <ProductViewSelector
        productViews={productViews}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div className="mb-6">
        <CanvasComponent
          uploadedImages={uploadedImages}
          currentView={currentView}
          productViews={productViews}
          setUploadedImages={setUploadedImages}
          readOnly={false}
        />
      </div>
      <ActionButtons
        onSaveDesign={handleSaveDesign}
        onAddToCart={addToCartHandler}
        onGoToCart={onGoToCart}
      />
    </div>
  );
};

export default ProductDesignerLayout;