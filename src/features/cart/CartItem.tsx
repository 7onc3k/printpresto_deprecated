import React from 'react';
import { CartItem as CartItemType } from '../../types/types';
import { handleQuantityChange, handleSizeChange } from './cartService';
import { useStore } from '../../store';

interface CartItemProps {
  item: CartItemType;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { removeFromCart } = useStore();

  return (
    <li className="border p-4 rounded">
      <p>Produkt ID: {item.productId}</p>
      <p>Design ID: {item.designId}</p>
      <label className="block mb-2">
        Velikost:
        <select 
          value={item.size} 
          onChange={(e) => handleSizeChange(index, e.target.value as 'S' | 'M' | 'L' | 'XL')}
          className="ml-2 border rounded"
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label>
      <label className="block mb-2">
        Počet:
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
          min="1"
          className="ml-2 border rounded w-16 text-center"
        />
      </label>
      <p>Cena: {item.price} Kč</p>
      <button 
        onClick={() => removeFromCart(item.productId)}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Odstranit
      </button>
    </li>
  );
};

export default CartItem;