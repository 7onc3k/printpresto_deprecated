import '../app/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../store';
import { getUser } from '../services/authService';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      setUser(user);

      if (!user && !['/', '/login', '/register'].includes(router.pathname)) {
        router.push('/login');
      }
    };

    checkUser();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}