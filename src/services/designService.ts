import { supabase } from '../utils/supabaseClient';
import { fabric } from 'fabric';

export const loadDesign = async (productId: string, design: any) => {
  const { data: productData, error } = await supabase
    .from('products')
    .select('view_1, view_2, view_3, view_4')
    .eq('id', productId)
    .single();

  if (error) {
    console.error('Chyba při načítání obrázků produktu:', error);
    return null;
  }

  if (productData) {
    const loadImages = async (imagesData: any) => {
      if (!imagesData) return [];
      return await Promise.all(imagesData.map((imgData: any) => 
        new Promise((resolve) => {
          fabric.Image.fromURL(imgData.src, (img) => {
            img.set({
              left: imgData.left,
              top: imgData.top,
              scaleX: imgData.scaleX,
              scaleY: imgData.scaleY,
              angle: imgData.angle,
            });
            resolve(img);
          });
        })
      ));
    };

    const updatedImages = {
      view_1: await loadImages(design.view_1_images),
      view_2: await loadImages(design.view_2_images),
      view_3: await loadImages(design.view_3_images),
      view_4: await loadImages(design.view_4_images),
    };

    return updatedImages;
  }

  return null;
};

export const saveDesign = async (user: any, id: string | string[] | undefined, uploadedImages: { [key: string]: fabric.Image[] }) => {
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

  const { data, error } = await supabase.from('designs').insert(designData).select().single();

  if (error) {
    console.error('Chyba při ukládání návrhu:', error);
    return;
  } else {
    console.log('Návrh byl úspěšně uložen');
    return data.id; // Vrátíme ID uloženého designu
  }
};

