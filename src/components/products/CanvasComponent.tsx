import React, { useRef } from 'react';
import { fabric } from 'fabric';
import CanvasSetup from './CanvasSetup';
import ImageUploader from './ImageUploader';
import ImageManager from './ImageManager';

interface CanvasComponentProps {
  uploadedImages: { [key: string]: fabric.Image[] };
  currentView: string;
  productViews: { [key: string]: string };
  setUploadedImages: React.Dispatch<React.SetStateAction<{ [key: string]: fabric.Image[] }>>;
  readOnly: boolean;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  uploadedImages,
  currentView,
  productViews,
  setUploadedImages,
  readOnly,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div>
      <canvas ref={canvasRef} className="w-64 h-64" />
      <CanvasSetup
        canvasRef={canvasRef}
        currentView={currentView}
        productViews={productViews}
        uploadedImages={uploadedImages}
        readOnly={readOnly}
      />
      {!readOnly && (
        <>
          <ImageUploader
            canvasRef={canvasRef}
            currentView={currentView}
            setUploadedImages={setUploadedImages}
          />
          <ImageManager
            canvasRef={canvasRef}
            currentView={currentView}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        </>
      )}
    </div>
  );
};

export default CanvasComponent;