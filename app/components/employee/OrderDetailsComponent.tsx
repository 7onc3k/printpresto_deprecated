import React from 'react';
import { Order, OrderItem } from '../../types/types';

interface OrderDetailsComponentProps {
  order: Order;
  orderItems: OrderItem[];
}

const OrderDetailsComponent: React.FC<OrderDetailsComponentProps> = ({ order, orderItems }) => {
  return (
    <div>
      <h3>Detail objednávky</h3>
      <p>ID objednávky: {order.id}</p>
      <p>Celková cena: {order.total_price}</p>
      <h4>Položky objednávky:</h4>
      <ul>
        {orderItems.map((item) => (
          <li key={item.id}>
            <p>Produkt ID: {item.product_id}</p>
            <p>Množství: {item.quantity}</p>
            <p>Cena: {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsComponent;
