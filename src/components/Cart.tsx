import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { CartItem, Order } from '../types/types'; // Importujeme typy

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('Uživatel není přihlášen');
      return;
    }

    const total_price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total_price })
      .single();

    if (orderError) {
      console.error('Chyba při vytváření objednávky:', orderError);
      return;
    }

    const orderItems = cartItems.map(item => ({
      order_id: (order as Order).id, // Opraveno
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (orderItemsError) {
      console.error('Chyba při přidávání položek do objednávky:', orderItemsError);
    } else {
      console.log('Objednávka byla úspěšně vytvořena');
      setCartItems([]);
    }
  };

  return (
    <div>
      <h2>Košík</h2>
      {cartItems.length > 0 ? (
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
      ) : (
        <p>Košík je prázdný</p>
      )}
      <button onClick={handleCheckout}>Dokončit nákup</button>
    </div>
  );
};

export default Cart;