import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { fabric } from 'fabric';
import { supabase } from '../../utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import Layout from '../../components/Layout';

interface UploadedImageData {
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  // další vlastnosti objektu fabric.Image
}

const ProductDesigner = () => {
  const router = useRouter();
  const { id, designData } = router.query;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [productViews, setProductViews] = useState({ view_1: '', view_2: '', view_3: '', view_4: '' });
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: fabric.Image[] }>({ view_1: [], view_2: [], view_3: [], view_4: [] });
  const [currentView, setCurrentView] = useState('view_1');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Chyba při načítání uživatele:', error);
      } else {
        setUser(data.user || null);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (designData) {
      const decodedDesignData = JSON.parse(decodeURIComponent(designData as string));
      handleDesignSelect(id as string, decodedDesignData);
    }
  }, [id, designData]);



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
      fabric.Image.fromURL(imageUrl, (imgObj) => {
        imgObj.selectable = false;
        canvas.add(imgObj);
        canvas.sendToBack(imgObj);
  
        // Nastavení rozměrů plátna podle obrázku pro view
        if (imgObj.width !== undefined && imgObj.height !== undefined) {
          // Nastavení rozměrů plátna podle obrázku pro view
          canvas.setDimensions({ width: imgObj.width, height: imgObj.height });
        }
  
        imgObj.setCoords(); // Aktualizace souřadnic obrázku
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
  

  const removeSelectedImages = () => {
    if (!canvas) return;
  
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;
  
    // Odstranění všech vybraných objektů z plátna
    activeObjects.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject(); // Opravený způsob, jak zrušit výběr
    canvas.requestRenderAll(); // Doporučená metoda pro vyvolání překreslení
  
    // Aktualizace stavu uploadedImages po odstranění obrázků
    const updatedImages = uploadedImages[currentView].filter(img => !activeObjects.includes(img));
    setUploadedImages({
      ...uploadedImages,
      [currentView]: updatedImages
    });
  };


  const handleSaveDesign = async () => {
    if (!user) {
      console.error('Uživatel není přihlášen');
      return;
    }
  
    const designData = {
      user_id: user.id,
      product_id: id,
      view_1_images: uploadedImages.view_1.map(img => ({
        ...img.toObject(),
        left: img.left,
        top: img.top,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
        angle: img.angle
      })),
      view_2_images: uploadedImages.view_2.map(img => ({
        ...img.toObject(),
        left: img.left,
        top: img.top,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
        angle: img.angle
      })),
      view_3_images: uploadedImages.view_3.map(img => ({
        ...img.toObject(),
        left: img.left,
        top: img.top,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
        angle: img.angle
      })),
      view_4_images: uploadedImages.view_4.map(img => ({
        ...img.toObject(),
        left: img.left,
        top: img.top,
        scaleX: img.scaleX,
        scaleY: img.scaleY,
        angle: img.angle
      }))
    };
  
    const { error } = await supabase.from('designs').insert(designData);
  
    if (error) {
      console.error('Chyba při ukládání návrhu:', error);
    } else {
      console.log('Návrh byl úspěšně uložen');
    }
  };
  
  const handleDesignSelect = async (productId: string, uploadedImagesData: any) => {
    const { data: productData, error } = await supabase
      .from('products')
      .select('view_1, view_2, view_3, view_4')
      .eq('id', productId)
      .single();
  
    if (error) {
      console.error('Chyba při načítání obrázků produktu:', error);
      return;
    }
  
    if (productData) {
      setProductViews({
        view_1: productData.view_1,
        view_2: productData.view_2,
        view_3: productData.view_3,
        view_4: productData.view_4,
      });
  
      const loadImages = async (imagesData: any) => {
        return await Promise.all(imagesData.map((imgData: any) => 
          new Promise((resolve) => {
            fabric.Image.fromURL(imgData.src, (img) => {
              img.set({
                left: imgData.left,
                top: imgData.top,
                scaleX: imgData.scaleX,
                scaleY: imgData.scaleY,
                angle: imgData.angle,
                // Add any other properties you've saved and need to apply
              });
              resolve(img);
            });
          })
        ));
      };
  
      // Update state with loaded images for each view
      const updatedImages = {
        view_1: await loadImages(uploadedImagesData.view_1_images),
        view_2: await loadImages(uploadedImagesData.view_2_images),
        view_3: await loadImages(uploadedImagesData.view_3_images),
        view_4: await loadImages(uploadedImagesData.view_4_images),
      };
  
      setUploadedImages(updatedImages);
  
      // Optionally, display the first view or another action
      canvas?.clear();
    }

    
  };
  useEffect(() => {
    if (canvas && Object.values(productViews).some(view => view !== '') && uploadedImages) {
      displayImageOnCanvas(productViews.view_1, 'view_1');
    }
  }, [canvas, productViews, uploadedImages]);
  
  

  return (
    <Layout onDesignSelect={handleDesignSelect}>
    {<div>
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
      <button onClick={removeSelectedImages}>Odstranit označené obrázky</button>
      <button onClick={handleSaveDesign}>Uložit návrh</button>
    </div>}
  </Layout>
    
    
  );
};

export default ProductDesigner;
