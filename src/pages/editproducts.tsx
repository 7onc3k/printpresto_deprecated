import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Product, ViewFiles } from '../components/EditProducts/types';
import AddProductForm from '../components/EditProducts/AddProductForm';
import ProductList from '../components/EditProducts/ProductList';

const EditProducts: React.FC = () => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [viewFiles, setViewFiles] = useState<ViewFiles>({
    view_1: null,
    view_2: null,
    view_3: null,
    view_4: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Chyba při načítání produktů:', error);
    } else {
      setProducts(data);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
    const value = field === 'price' ? parseFloat(e.target.value) : e.target.value;
    setNewProduct({ ...newProduct, [field]: value });
  };

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

  const handleAddProduct = async () => {
    let imageUrl: string = '';
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }

    const viewUrls: { [key: string]: string } = {};
    for (const view in viewFiles) {
      if (viewFiles[view]) {
        const uploadedViewUrl = await uploadViewImage(viewFiles[view]!, view);
        if (uploadedViewUrl) {
          viewUrls[view] = uploadedViewUrl;
        }
      }
    }

    const productToAdd = { ...newProduct, image_url: imageUrl, ...viewUrls };
    const { data, error } = await supabase.from('products').insert([productToAdd]).select();
    if (error) {
      console.error('Chyba při přidávání produktu:', error);
    } else {
      setProducts([...products, data[0]]);
      setNewProduct({});
      setImageFile(null);
      setViewFiles({ view_1: null, view_2: null, view_3: null, view_4: null });
    }
  };

  const handleUpdateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id).select();
    if (error) {
      console.error('Chyba při aktualizaci produktu:', error);
    } else {
      setProducts(products.map(product => (product.id === id ? data[0] : product)));
    }
  };

  return (
    <div>
      <h1>Upravit Produkty</h1>
      <AddProductForm
        newProduct={newProduct}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onViewImageChange={handleViewImageChange}
        onAddProduct={handleAddProduct}
      />
      <ProductList products={products} onUpdateProduct={handleUpdateProduct} />
    </div>
  );
};

export default EditProducts;