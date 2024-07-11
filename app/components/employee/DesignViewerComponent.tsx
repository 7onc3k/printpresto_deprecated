import React from 'react';
import { fabric } from 'fabric';
import CanvasComponent from '../products/CanvasComponent';
import useProductViews from '../../hooks/useProductViews';

interface DesignViewerComponentProps {
  productId: string | null;
  uploadedImages: { [key: string]: fabric.Image[] };
  onViewOrderItem: (item: any) => void;
}

const DesignViewerComponent: React.FC<DesignViewerComponentProps> = ({
  productId,
  uploadedImages,
  onViewOrderItem,
}) => {
  const [currentView, setCurrentView] = React.useState('view_1');
  const productViews = useProductViews(productId || undefined);

  if (!productId) return null;

  return (
    <div>
      <h3>Náhled designu</h3>
      <CanvasComponent
        uploadedImages={uploadedImages}
        currentView={currentView}
        productViews={productViews}
        setUploadedImages={() => {}}
        readOnly={true}
      />
      <div>
        {Object.keys(productViews).map((view) => (
          <button key={view} onClick={() => setCurrentView(view)}>
            {view}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesignViewerComponent;
