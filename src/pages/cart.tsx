import React from 'react';
import Cart from '../features/cart/cart';

const CartPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Košík</h2>
      <Cart />
    </div>
  );
};

export default CartPage;