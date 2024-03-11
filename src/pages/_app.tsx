// src/pages/_app.tsx
import '../app/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  // Předpokládáme, že onDesignSelect je funkce, kterou Layout očekává
  const handleDesignSelect = () => {
    // zde by byla implementace
  };

  return (
    <Layout onDesignSelect={handleDesignSelect}>
      <Component {...pageProps} />
    </Layout>
  );
}
