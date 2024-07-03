import { supabase } from '../utils/supabaseClient';
import { fabric } from 'fabric';

function mapImages(images: fabric.Image[]) {
  return images.map(img => ({
    ...img.toObject(),
    left: img.left,
    top: img.top,
    scaleX: img.scaleX,
    scaleY: img.scaleY,
    angle: img.angle
  }));
}

async function loadImages(imagesData: any) {
  if (!imagesData) return [];
  console.log('Loading images:', imagesData);
  return await Promise.all(imagesData.map((imgData: any) =>
    new Promise<fabric.Image>((resolve) => {
      fabric.Image.fromURL(imgData.src, (img) => {
        console.log('Loaded image:', img);
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
}

export const saveDesign = async (user: any, id: string | string[] | undefined, uploadedImages: { [key: string]: fabric.Image[] }) => {
  if (!user) {
    console.error('Uživatel není přihlášen');
    return null;
  }

  const designData = {
    user_id: user.id,
    product_id: id,
    view_1_images: mapImages(uploadedImages.view_1),
    view_2_images: mapImages(uploadedImages.view_2),
    view_3_images: mapImages(uploadedImages.view_3),
    view_4_images: mapImages(uploadedImages.view_4)
  };

  try {
    const { data, error } = await supabase.from('designs').insert(designData).select().single();

    if (error) {
      console.error('Chyba při ukládání návrhu:', error);
      return null;
    } else {
      console.log('Návrh byl úspěšně uložen');
      return data.id;
    }
  } catch (error) {
    console.error('Neočekávaná chyba při ukládání návrhu:', error);
    return null;
  }
};

export const loadDesign = async (productId: string, design: any) => {
  try {
    const { data: productData, error } = await supabase
      .from('products')
      .select('view_1, view_2, view_3, view_4')
      .eq('id', productId)
      .single();

    if (error) throw error;

    if (productData) {
      const updatedImages = {
        view_1: await loadImages(design.view_1_images),
        view_2: await loadImages(design.view_2_images),
        view_3: await loadImages(design.view_3_images),
        view_4: await loadImages(design.view_4_images),
      };

      console.log('Loaded images:', updatedImages);

      return updatedImages;
    }

    return null;
  } catch (error) {
    console.error('Chyba při načítání designu:', error);
    return null;
  }
};