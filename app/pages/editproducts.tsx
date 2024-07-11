import React from 'react';
import { useProductList } from '../hooks/useProductList';
import { useProductAdd } from '../hooks/useProductAdd';
import { useProductUpdate } from '../hooks/useProductUpdate';
import { useImageUpload } from '../hooks/useImageUpload';
import AddProductForm from '../components/EditProducts/AddProductForm';
import ProductList from '../components/EditProducts/ProductList';

const EditProducts: React.FC = () => {
  const { products, fetchProducts } = useProductList();
  const { newProduct, setNewProduct, addProduct } = useProductAdd();
  const { updateProduct } = useProductUpdate();
  const { imageFile, viewFiles, handleImageChange, handleViewImageChange } = useImageUpload();

  const handleAddProduct = async () => {
    const addedProduct = await addProduct(newProduct, imageFile, viewFiles);
    if (addedProduct) {
      fetchProducts();
    }
  };

  const handleUpdateProduct = async (id: string, updatedProduct: Partial<any>) => {
    const updated = await updateProduct(id, updatedProduct);
    if (updated) {
      fetchProducts();
    }
  };

  return (
    <div>
      <h1>Upravit Produkty</h1>
      <AddProductForm
        newProduct={newProduct}
        onInputChange={(e, field) => setNewProduct({ ...newProduct, [field]: e.target.value })}
        onImageChange={handleImageChange}
        onViewImageChange={handleViewImageChange}
        onAddProduct={handleAddProduct}
      />
      <ProductList products={products} onUpdateProduct={handleUpdateProduct} />
    </div>
  );
};

export default EditProducts;
