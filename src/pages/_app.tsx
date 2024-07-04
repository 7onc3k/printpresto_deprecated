import '../app/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../store';
import { supabase } from '../utils/supabaseClient';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setUser } = useStore();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  // Zkontrolujte, zda se jedná o zaměstnaneckou stránku
  const isEmployeePage = router.pathname.startsWith('/employee');

  // Pokud se jedná o zaměstnaneckou stránku, nepoužívejte Layout
  if (isEmployeePage) {
    return <Component {...pageProps} />;
  }

  // Pro ostatní stránky použijte Layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}