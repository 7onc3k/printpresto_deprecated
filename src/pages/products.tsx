import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../store';
import { supabase } from '../utils/supabaseClient';
import { Product } from '../types/types';

const Products: React.FC = () => {
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Chyba při načítání produktů:', error);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, [setProducts]);

  console.log('Products:', products); // Pro debugging

  if (products.length === 0) {
    return <div>Načítání produktů...</div>;
  }

  return (
    <div>
      <h1>Naše Produkty</h1>
      <div>
        {products.map((product: Product) => (
          <div key={product.id} style={{ margin: '10px' }}>
            <Link href={`/designer/${product.id}`} passHref>
              <div>
                <Image 
                  src={product.image_url} 
                  alt={product.name} 
                  width={100} 
                  height={100} 
                  style={{ objectFit: 'cover' }} 
                />
                <button>{product.name}</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;