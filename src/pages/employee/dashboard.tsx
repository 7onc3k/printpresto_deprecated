import React from 'react';
import AuthGuard from '../../components/auth/AuthGuard';
import OrderListComponent from '../../components/employee/OrderListComponent';
import OrderDetailsComponent from '../../components/employee/OrderDetailsComponent';
import DesignViewerComponent from '../../components/employee/DesignViewerComponent';
import { useOrders } from '../../hooks/useOrders';
import { useDesign } from '../../hooks/useDesign';
import { useEmployeeAuth } from '../../hooks/useEmployeeAuth';

const EmployeeDashboard: React.FC = () => {
  useEmployeeAuth();
  const { orders, selectedOrder, orderItems, handleViewOrder } = useOrders();
  const { uploadedImages, selectedProductId, handleViewOrderItem } = useDesign();

  return (
    <AuthGuard>
      <div>
        <h1>Dashboard zaměstnance</h1>
        <OrderListComponent orders={orders} onViewOrder={handleViewOrder} />
        {selectedOrder && (
          <>
            <OrderDetailsComponent order={selectedOrder} orderItems={orderItems} />
            <DesignViewerComponent
              productId={selectedProductId}
              uploadedImages={uploadedImages}
              onViewOrderItem={handleViewOrderItem}
            />
          </>
        )}
      </div>
    </AuthGuard>
  );
};

export default EmployeeDashboard;
