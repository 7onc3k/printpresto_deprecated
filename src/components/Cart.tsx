import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { CartItem, Order } from '../types/types';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('Uživatel není přihlášen');
      return;
    }

    const total_price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({ user_id: user.id, total_price })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: (order as Order).id,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      console.log('Objednávka byla úspěšně vytvořena');
      setCartItems([]);
      localStorage.removeItem('cartItems');
    } catch (error) {
      console.error('Chyba při vytváření objednávky:', error);
    }
  };

  return (
    <div>
      <h2>Košík</h2>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <p>Produkt ID: {item.productId}</p>
                <p>Velikost: {item.size}</p>
                <p>Počet: {item.quantity}</p>
                <p>Cena: {item.price}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Dokončit nákup</button>
        </>
      ) : (
        <p>Košík je prázdný</p>
      )}
    </div>
  );
};

export default Cart;