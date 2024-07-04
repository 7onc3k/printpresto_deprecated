import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Vítejte na PrintPresto</h1>
      <Link href="/products" passHref>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Prohlédnout produkty
        </button>
      </Link>
    </div>
  );
};

export default Home;
