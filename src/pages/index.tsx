// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Vítejte na naší stránce</h1>
      <Link href="/products" passHref>
        <button style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>Začít</button>
      </Link>
    </div>
  );
};

export default Home;
