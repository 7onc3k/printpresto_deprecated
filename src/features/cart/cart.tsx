import React from 'react';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import CheckoutButton from './CheckoutButton';

const Cart: React.FC = () => {
  const { cart, removeFromCart, handleQuantityChange, handleSizeChange, handleCheckout } = useCart();

  return (
    <div>
      {cart.length > 0 ? (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <CartItem 
                key={index} 
                item={item} 
                index={index}
                onQuantityChange={handleQuantityChange}
                onSizeChange={handleSizeChange}
                onRemove={removeFromCart}
              />
            ))}
          </ul>
          <CheckoutButton onCheckout={handleCheckout} />
        </>
      ) : (
        <p>Košík je prázdný</p>
      )}
    </div>
  );
};

export default Cart;
