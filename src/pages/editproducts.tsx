import React from 'react';
import { useProductState } from '../hooks/useProductState';
import { useImageUpload } from '../hooks/useImageUpload';
import AddProductForm from '../components/EditProducts/AddProductForm';
import ProductList from '../components/EditProducts/ProductList';

const EditProducts: React.FC = () => {
  const { products, newProduct, setNewProduct, addProduct, updateProduct } = useProductState();
  const { imageFile, viewFiles, handleImageChange, handleViewImageChange } = useImageUpload();

  return (
    <div>
      <h1>Upravit Produkty</h1>
      <AddProductForm
        newProduct={newProduct}
        onInputChange={(e, field) => setNewProduct({ ...newProduct, [field]: e.target.value })}
        onImageChange={handleImageChange}
        onViewImageChange={handleViewImageChange}
        onAddProduct={() => addProduct(newProduct, imageFile, viewFiles)}
      />
      <ProductList products={products} onUpdateProduct={updateProduct} />
    </div>
  );
};

export default EditProducts;