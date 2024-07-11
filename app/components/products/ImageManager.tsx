import React from 'react';
import { fabric } from 'fabric';

interface ImageManagerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentView: string;
  uploadedImages: { [key: string]: fabric.Image[] };
  setUploadedImages: React.Dispatch<React.SetStateAction<{ [key: string]: fabric.Image[] }>>;
}

const ImageManager: React.FC<ImageManagerProps> = ({
  canvasRef,
  currentView,
  uploadedImages,
  setUploadedImages,
}) => {
  const removeSelectedImages = () => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    activeObjects.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.requestRenderAll();

    const updatedImages = uploadedImages[currentView].filter(img => !activeObjects.includes(img));
    setUploadedImages({
      ...uploadedImages,
      [currentView]: updatedImages
    });
  };

  return <button onClick={removeSelectedImages}>Odstranit označené obrázky</button>;
};

export default ImageManager;