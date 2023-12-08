import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { fabric } from 'fabric';
import { supabase } from '../../utils/supabaseClient';

interface UploadedImages {
  [key: string]: fabric.Image[];
}

const ProductDesigner = () => {
  const router = useRouter();
  const { id } = router.query;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [productViews, setProductViews] = useState({ view_1: '', view_2: '', view_3: '', view_4: '' });
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({ view_1: [], view_2: [], view_3: [], view_4: [] });
  const [currentView, setCurrentView] = useState('view_1');




  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const newCanvas = new fabric.Canvas(canvasRef.current);
      setCanvas(newCanvas);
    }
  }, [canvas]);

  // ... (ostatní kód)

  useEffect(() => {
    const getProductViews = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('view_1, view_2, view_3, view_4')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Chyba při načítání obrázků produktu:', error);
      } else if (data) {
        setProductViews({
          view_1: data.view_1,
          view_2: data.view_2,
          view_3: data.view_3,
          view_4: data.view_4
        });
      }
    };

    if (id) {
      getProductViews();
    }
  }, [id]);


  const displayImageOnCanvas = (imageUrl: string, view: string) => {
    if (canvas && imageUrl) {
      setCurrentView(view);
      canvas.clear();

      // Přidání obrázku produktu a poslání na pozadí
      fabric.Image.fromURL(imageUrl, (img) => {
        img.selectable = false;
        canvas.add(img);
        canvas.sendToBack(img); // Zajistí, že obrázek produktu je vždy na pozadí
        img.center();
        img.setCoords();
      });

      // Přidání nahraných obrázků pro aktuální view
      uploadedImages[view].forEach(img => {
        if (!canvas.contains(img)) {
          img.selectable = true;
          canvas.add(img);
          img.bringToFront(); // Zajistí, že nahrávané obrázky jsou na vrcholu
          img.setCoords();
        }
      });

      canvas.renderAll(); // Znovu vykreslí všechny objekty na plátně
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && canvas) {
      const reader = new FileReader();

      reader.onload = (fEvent) => {
        fabric.Image.fromURL(fEvent.target!.result as string, (img) => {
          // Získání rozměrů obrázku produktu
          let productImage = canvas.backgroundImage;
          let maxImgWidth, maxImgHeight;

          if (productImage instanceof fabric.Image) {
            maxImgWidth = productImage.getScaledWidth() * 0.75;
            maxImgHeight = productImage.getScaledHeight() * 0.75;
          } else {
            maxImgWidth = canvas.getWidth() * 0.75;
            maxImgHeight = canvas.getHeight() * 0.75;
          }

          // Kontrola a případná úprava velikosti nahraného obrázku
          if (img.getScaledWidth() > maxImgWidth || img.getScaledHeight() > maxImgHeight) {
            img.scaleToWidth(Math.min(img.getScaledWidth(), maxImgWidth));
            img.scaleToHeight(Math.min(img.getScaledHeight(), maxImgHeight));
          }

          img.selectable = true;
          canvas.add(img);
          img.bringToFront(); // Přidání nahraného obrázku na vrchol
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




  return (
    <div>
      <h1>Designér produktů</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.entries(productViews).map(([key, value]) =>
          value && (
            <img
              key={key}
              src={value}
              alt={`Náhled ${key}`}
              style={{ width: '100px', cursor: 'pointer' }}
              onClick={() => displayImageOnCanvas(value, key)}
            />
          )
        )}
      </div>
      <canvas ref={canvasRef} width={800} height={600} />
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default ProductDesigner;
