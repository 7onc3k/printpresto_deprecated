import React from 'react';
import { fabric } from 'fabric';

interface ImageUploaderProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentView: string;
  setUploadedImages: React.Dispatch<React.SetStateAction<{ [key: string]: fabric.Image[] }>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  canvasRef,
  currentView,
  setUploadedImages,
}) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      const reader = new FileReader();

      reader.onload = (fEvent) => {
        fabric.Image.fromURL(fEvent.target!.result as string, (img) => {
          const maxSize = 256;
          const scale = Math.min(maxSize / img.width!, maxSize / img.height!);
          img.scale(scale);

          img.selectable = true;
          canvas.add(img);
          img.bringToFront();
          img.setCoords();
          canvas.renderAll();

          setUploadedImages(prev => ({
            ...prev,
            [currentView]: [...prev[currentView], img]
          }));
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return <input type="file" onChange={handleUpload} />;
};

export default ImageUploader;