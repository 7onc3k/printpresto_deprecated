import React, { useEffect } from 'react';
import { useStore } from '../../store';
import { loadCartFromLocalStorage } from './cartService';
import CartItem from './CartItem';
import CheckoutButton from './CheckoutButton';

const Cart: React.FC = () => {
  const { cart } = useStore();

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Košík</h2>
      {cart.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} index={index} />
            ))}
          </ul>
          <CheckoutButton />
        </>
      ) : (
        <p>Košík je prázdný</p>
      )}
    </div>
  );
};

export default Cart;