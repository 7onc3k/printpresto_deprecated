import React from 'react';
import { Product } from './types';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (id: string, updatedProduct: Partial<Product>) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onUpdateProduct }) => (
  <div>
    <h2>Seznam produktů</h2>
    {products.length > 0 ? (
      products.map((product) => (
        <ProductItem key={product.id} product={product} onUpdate={onUpdateProduct} />
      ))
    ) : (
      <p>Žádné produkty nebyly nalezeny.</p>
    )}
  </div>
);

export default ProductList;