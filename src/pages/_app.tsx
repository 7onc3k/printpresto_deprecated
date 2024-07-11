import '../app/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { AuthProvider } from '../components/auth/AuthProvider'
import React from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Kontrola, zda se jedná o zaměstnaneckou stránku
  const isEmployeePage = router.pathname.startsWith('/employee');

  // Pro zaměstnanecké stránky nepoužívat Layout
  if (isEmployeePage) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }

  // Pro ostatní stránky použít Layout
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
