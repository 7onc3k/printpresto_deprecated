import React from 'react';
import { Order } from '../types/types';

interface OrdersListProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onViewOrder }) => (
  <div>
    <h2>Objednávky zákazníků</h2>
    {orders.length > 0 ? (
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>ID objednávky: {order.id}</p>
            <p>Celková cena: {order.total_price}</p>
            <button onClick={() => onViewOrder(order)}>Zobrazit objednávku</button>
          </li>
        ))}
      </ul>
    ) : (
      <p>Žádné objednávky nenalezeny</p>
    )}
  </div>
);

export default OrdersList;
