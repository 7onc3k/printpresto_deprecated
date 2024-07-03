import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

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
  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const newCanvas = new fabric.Canvas(canvasRef.current);
      setCanvas(newCanvas);
    }
  }, [canvas]);

  useEffect(() => {
    if (canvas && productViews && productViews[currentView]) {
      const imageUrl = productViews[currentView];
      canvas.clear();

      fabric.Image.fromURL(imageUrl, (imgObj) => {
        if (imgObj) {
          imgObj.selectable = false;
          canvas.add(imgObj);
          canvas.sendToBack(imgObj);

          const maxSize = 256; // Tailwind třída w-64 a h-48
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
            img.selectable = !readOnly; // Set selectable to false if readOnly
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
      canvas.selection = false; // Disable multiple object selection
      canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false; // Disable object interaction
      });
      canvas.renderAll();
    }
  }, [canvas, readOnly]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;

    const file = event.target.files && event.target.files[0];
    if (file && canvas) {
      const reader = new FileReader();

      reader.onload = (fEvent) => {
        fabric.Image.fromURL(fEvent.target!.result as string, (img) => {
          const maxSize = 256; // Tailwind třída w-64 a h-48
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

  const removeSelectedImages = () => {
    if (readOnly) return;

    if (!canvas) return;

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

  return (
    <div>
      <canvas ref={canvasRef} className="w-64 h-64" />
      {!readOnly && <input type="file" onChange={handleUpload} />}
      {!readOnly && <button onClick={removeSelectedImages}>Odstranit označené obrázky</button>}
    </div>
  );
};

export default CanvasComponent;