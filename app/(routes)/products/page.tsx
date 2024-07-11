"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../store';
import { supabase } from '../../utils/supabaseClient';
import { Product } from '../../types/types';

const Products: React.FC = () => {
  const { products, setProducts } = useStore();

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

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Načítání produktů...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Naše Produkty</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <Link href={`/designer/${product.id}`} key={product.id} passHref>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image 
                src={product.image_url} 
                alt={product.name} 
                width={300} 
                height={300} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600">{product.price} Kč</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
