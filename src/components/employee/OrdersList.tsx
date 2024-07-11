import React from 'react';
import { Order } from '../../types/types';

interface OrdersListProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onViewOrder }) => (
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

export default OrdersList;
