import React from 'react';
import { Product, ViewFiles } from '../../types/types';
import ImageUpload from './ImageUpload';

interface AddProductFormProps {
  newProduct: Partial<Product>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onViewImageChange: (e: React.ChangeEvent<HTMLInputElement>, view: string) => void;
  onAddProduct: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  newProduct,
  onInputChange,
  onImageChange,
  onViewImageChange,
  onAddProduct
}) => (
  <div>
    <h2>Přidat nový produkt</h2>
    <input
      type="text"
      placeholder="Název"
      value={newProduct.name || ''}
      onChange={(e) => onInputChange(e, 'name')}
    />
    <input
      type="text"
      placeholder="Popis"
      value={newProduct.description || ''}
      onChange={(e) => onInputChange(e, 'description')}
    />
    <input
      type="number"
      placeholder="Cena"
      value={newProduct.price as number || ''}
      onChange={(e) => onInputChange(e, 'price')}
    />
    <ImageUpload onChange={onImageChange} label="Hlavní obrázek" />
    {['view_1', 'view_2', 'view_3', 'view_4'].map((view) => (
      <ImageUpload
        key={view}
        onChange={(e) => onViewImageChange(e, view)}
        label={`Obrázek pro ${view}`}
      />
    ))}
    <button onClick={onAddProduct}>Přidat Produkt</button>
  </div>
);

export default AddProductForm;