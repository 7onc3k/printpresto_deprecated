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
    if (canvas && productViews[currentView]) {
      const imageUrl = productViews[currentView];
      canvas.clear();

      fabric.Image.fromURL(imageUrl, (imgObj) => {
        imgObj.selectable = false;
        canvas.add(imgObj);
        canvas.sendToBack(imgObj);

        if (imgObj.width !== undefined && imgObj.height !== undefined) {
          canvas.setDimensions({ width: imgObj.width, height: imgObj.height });
        }

        imgObj.setCoords();
      });

      if (uploadedImages[currentView]) {
        uploadedImages[currentView].forEach(img => {
          if (!canvas.contains(img)) {
            img.selectable = true;
            canvas.add(img);
            img.bringToFront();
            img.setCoords();
          }
        });
      }

      canvas.renderAll();
    }
  }, [canvas, productViews, currentView, uploadedImages]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;

    const file = event.target.files && event.target.files[0];
    if (file && canvas) {
      const reader = new FileReader();

      reader.onload = (fEvent) => {
        fabric.Image.fromURL(fEvent.target!.result as string, (img) => {
          let productImage = canvas.backgroundImage;
          let maxImgWidth, maxImgHeight;

          if (productImage instanceof fabric.Image) {
            maxImgWidth = productImage.getScaledWidth() * 0.75;
            maxImgHeight = productImage.getScaledHeight() * 0.75;
          } else {
            maxImgWidth = canvas.getWidth() * 0.75;
            maxImgHeight = canvas.getHeight() * 0.75;
          }

          if (img.getScaledWidth() > maxImgWidth || img.getScaledHeight() > maxImgHeight) {
            img.scaleToWidth(Math.min(img.getScaledWidth(), maxImgWidth));
            img.scaleToHeight(Math.min(img.getScaledHeight(), maxImgHeight));
          }

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
      <canvas ref={canvasRef} width={800} height={600} />
      {!readOnly && <input type="file" onChange={handleUpload} />}
      {!readOnly && <button onClick={removeSelectedImages}>Odstranit označené obrázky</button>}
    </div>
  );
};

export default CanvasComponent;