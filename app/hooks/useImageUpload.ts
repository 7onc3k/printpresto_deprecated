import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export const useImageUpload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [viewFiles, setViewFiles] = useState<any>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleViewImageChange = (e: React.ChangeEvent<HTMLInputElement>, view: string) => {
    if (e.target.files && e.target.files[0]) {
      setViewFiles({ ...viewFiles, [view]: e.target.files[0] });
    }
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('products').upload(fileName, file);
    if (uploadError) {
      console.error('Chyba při nahrávání obrázku:', uploadError);
      return null;
    }
    const { data: urlData } = await supabase.storage.from('products').getPublicUrl(fileName);
    if (!urlData) {
      console.error('Chyba při získávání veřejného URL');
      return null;
    }
    return urlData.publicUrl;
  };

  const uploadViewImage = async (file: File, view: string) => {
    const fileName = `${Date.now()}_${view}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('product_views').upload(fileName, file);
    if (uploadError) {
      console.error(`Chyba při nahrávání obrázku pro ${view}:`, uploadError);
      return null;
    }
    const { data: urlData } = await supabase.storage.from('product_views').getPublicUrl(fileName);
    if (!urlData) {
      console.error(`Chyba při získávání veřejného URL pro ${view}`);
      return null;
    }
    return urlData.publicUrl;
  };

  return { imageFile, viewFiles, handleImageChange, handleViewImageChange, uploadImage, uploadViewImage };
};