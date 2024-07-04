import React from 'react';
import Link from 'next/link';
import { useStore } from '../../store';
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useStore();
  const router = useRouter();
  const isDesignerPage = router.pathname.startsWith('/designer');

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">PrintPresto</Link>
          <div className="space-x-4">
            <Link href="/products" className="hover:text-gray-300">Produkty</Link>
            <Link href="/cart" className="hover:text-gray-300">Košík</Link>
            {user ? (
              <Link href="/profile" className="hover:text-gray-300">Profil</Link>
            ) : (
              <Link href="/login" className="hover:text-gray-300">Přihlásit se</Link>
            )}
          </div>
        </div>
      </nav>
      <main className={`flex-grow container mx-auto ${isDesignerPage ? '' : 'mt-4 p-4'}`}>
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          &copy; 2024 PrintPresto. Všechna práva vyhrazena.
        </div>
      </footer>
    </div>
  );
};

export default Layout;