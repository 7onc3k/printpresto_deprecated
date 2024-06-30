import React from 'react';
import { Product } from './types';

interface ProductItemProps {
  product: Product;
  onUpdate: (id: string, updatedProduct: Partial<Product>) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onUpdate }) => (
  <div>
    <input
      type="text"
      value={product.name}
      onChange={(e) => onUpdate(product.id, { name: e.target.value })}
    />
    <input
      type="text"
      value={product.description}
      onChange={(e) => onUpdate(product.id, { description: e.target.value })}
    />
    <input
      type="number"
      value={product.price}
      onChange={(e) => onUpdate(product.id, { price: parseFloat(e.target.value) })}
    />
    <input
      type="text"
      value={product.image_url}
      onChange={(e) => onUpdate(product.id, { image_url: e.target.value })}
    />
    {['view_1', 'view_2', 'view_3', 'view_4'].map((view) => (
      <input
        key={view}
        type="text"
        value={product[view as keyof Product]}
        onChange={(e) => onUpdate(product.id, { [view]: e.target.value })}
      />
    ))}
  </div>
);

export default ProductItem;