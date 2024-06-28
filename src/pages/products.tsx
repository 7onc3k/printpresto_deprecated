import Image from 'next/image';
// src/pages/products.tsx
import React from 'react';
import Link from 'next/link';
import { supabase } from '../utils/supabaseClient'; // Upravte cestu, pokud je potřeba
import { Product } from '../types/types'; // Upravte cestu, pokud je potřeba

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h1>Naše Produkty</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ margin: '10px' }}>
            <Link href={`/designer/${product.id}`} passHref>
              <Image 
                src={product.image_url} 
                alt={product.name} 
                width={100} 
                height={100} 
                style={{ objectFit: 'cover' }} 
              />
              <button>{product.name}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(): Promise<{ props: ProductsProps }> {
  let products: Product[] = [];
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Chyba při načítání produktů:', error);
  } else {
    console.log(data)
    products = data || [];
  }

  return { props: { products } };
}

export default Products;
