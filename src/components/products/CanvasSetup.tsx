import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';

interface CanvasSetupProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentView: string;
  productViews: { [key: string]: string };
  uploadedImages: { [key: string]: fabric.Image[] };
  readOnly: boolean;
}

const CanvasSetup: React.FC<CanvasSetupProps> = ({
  canvasRef,
  currentView,
  productViews,
  uploadedImages,
  readOnly,
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const newCanvas = new fabric.Canvas(canvasRef.current);
      setCanvas(newCanvas);
    }
  }, [canvasRef, canvas]);

  useEffect(() => {
    if (canvas && productViews && productViews[currentView]) {
      const imageUrl = productViews[currentView];
      canvas.clear();

      fabric.Image.fromURL(imageUrl, (imgObj) => {
        if (imgObj) {
          imgObj.selectable = false;
          canvas.add(imgObj);
          canvas.sendToBack(imgObj);

          const maxSize = 256;
          const scale = Math.min(maxSize / imgObj.width!, maxSize / imgObj.height!);
          imgObj.scale(scale);

          canvas.setDimensions({ width: maxSize, height: maxSize });

          imgObj.setCoords();
          canvas.renderAll();
        }
      });

      if (uploadedImages[currentView]) {
        uploadedImages[currentView].forEach(img => {
          if (!canvas.contains(img)) {
            img.selectable = !readOnly;
            canvas.add(img);
            img.bringToFront();
            img.setCoords();
          }
        });
      }

      canvas.renderAll();
    }
  }, [canvas, productViews, currentView, uploadedImages, readOnly]);

  useEffect(() => {
    if (canvas && readOnly) {
      canvas.selection = false;
      canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
      canvas.renderAll();
    }
  }, [canvas, readOnly]);

  return null;
};

export default CanvasSetup;