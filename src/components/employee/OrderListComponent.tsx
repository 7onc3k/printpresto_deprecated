import React from 'react';
import { Order } from '../../types/types';

interface OrderListComponentProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

const OrderListComponent: React.FC<OrderListComponentProps> = ({ orders, onViewOrder }) => {
  return (
    <div>
      <h2>Seznam objednávek</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <span>ID objednávky: {order.id}</span>
            <span>Celková cena: {order.total_price}</span>
            <button onClick={() => onViewOrder(order)}>Zobrazit detail</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderListComponent;
