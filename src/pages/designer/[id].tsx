import React from 'react';
import { useRouter } from 'next/router';
import ProductDesignerLayout from '../../components/products/ProductDesignerLayout';
import { useProductDesigner } from '../../hooks/useProductDesigner';
import { ProductDesignerProps } from '../../types/productDesigner';

const ProductDesignerPage: React.FC = () => {
  const router = useRouter();
  const productDesignerProps = useProductDesigner();

  const combinedProps: ProductDesignerProps = {
    ...productDesignerProps,
    onGoToCart: () => router.push('/cart')
  };

  return <ProductDesignerLayout {...combinedProps} />;
};

export default ProductDesignerPage;