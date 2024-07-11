import React from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '../../components/auth/AuthGuard';
import { useStore } from '../../store';
import OrdersList from '../../components/employee/OrdersList';
import OrderDetails from '../../components/employee/OrderDetails';
import { useOrders } from '../../hooks/useOrders';
import { useDesign } from '../../hooks/useDesign';
import useProductViews from '../../hooks/useProductViews';

const EmployeeDashboard: React.FC = () => {
  const router = useRouter();
  const { user } = useStore();
  const { orders, selectedOrder, orderItems, handleViewOrder } = useOrders();
  const { uploadedImages, selectedProductId, handleViewOrderItem } = useDesign();
  const productViews = useProductViews(selectedProductId || undefined);
  const [currentView, setCurrentView] = React.useState('view_1');

  React.useEffect(() => {
    if (user && !user.user_metadata?.is_employee) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <AuthGuard>
      <div>
        <h1>Dashboard zaměstnance</h1>
        <OrdersList orders={orders} onViewOrder={handleViewOrder} />
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            orderItems={orderItems}
            productViews={productViews}
            uploadedImages={uploadedImages}
            currentView={currentView}
            setCurrentView={setCurrentView}
            onViewOrderItem={handleViewOrderItem}
          />
        )}
      </div>
    </AuthGuard>
  );
};

export default EmployeeDashboard;
