kde je potřeba dodělat tohle image width

- products
- canvas component
- cart
- design service
- user profile
- dashboard
- layout
- id


Dobře, pojďme se do toho pustit. Zde jsou kroky, které byste měli následovat pro reorganizaci a vylepšení vašeho projektu:

1. Vytvořte novou strukturu složek:

   ```
   src/
   ├── components/
   ├── features/
   │   ├── auth/
   │   ├── products/
   │   ├── cart/
   │   ├── design/
   │   └── user/
   ├── hooks/
   ├── pages/
   ├── services/
   ├── styles/
   ├── types/
   └── utils/
   ```

2. Přesuňte existující soubory do nové struktury:

   - Přesuňte `src/pages/cart.tsx` do `src/features/cart/Cart.tsx`
   - Přesuňte `src/pages/designer/[id].tsx` do `src/features/design/ProductDesigner.tsx`
   - Přesuňte `src/pages/editproducts.tsx` do `src/features/products/EditProducts.tsx`
   - Přesuňte `src/pages/employee/dashboard.tsx` do `src/features/user/EmployeeDashboard.tsx`
   - Přesuňte `src/pages/products.tsx` do `src/features/products/ProductList.tsx`
   - Přesuňte `src/components/Cart.tsx` do `src/features/cart/CartComponent.tsx`
   - Přesuňte `src/components/CanvasComponent.tsx` do `src/features/design/CanvasComponent.tsx`
   - Přesuňte `src/components/SavedDesigns.tsx` do `src/features/design/SavedDesigns.tsx`
   - Přesuňte `src/components/UserProfile.tsx` do `src/features/user/UserProfile.tsx`

3. Aktualizujte importy v přesunutých souborech, aby odpovídaly nové struktuře.

4. Vytvořte nový soubor `src/types/index.ts` a přesuňte do něj všechny typy z `src/types/types.ts`. Poté odstraňte `src/types/types.ts`.

5. Vytvořte nový soubor `src/services/api.ts` pro centralizaci API volání.

6. Vytvořte nový soubor `src/config.ts` pro konstanty a konfigurační hodnoty.

7. Aktualizujte `src/pages/_app.tsx`:


```1:17:src/pages/_app.tsx
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
```


Změňte tento soubor tak, aby používal novou strukturu a přidejte globální state management (například pomocí React Context nebo Redux).

8. Aktualizujte `src/pages/index.tsx`:


```1:16:src/pages/index.tsx
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
```


Upravte tento soubor, aby používal nové komponenty a strukturu.

9. Přesuňte logiku pro načítání produktů z `src/pages/products.tsx` do nového custom hooku `src/hooks/useProducts.ts`.

10. Vytvořte nový soubor `src/styles/globals.css` pro globální styly a importujte ho v `src/pages/_app.tsx`.

11. Aktualizujte `README.md` s novými instrukcemi pro spuštění projektu a popisem nové struktury.

Toto jsou základní kroky pro reorganizaci vašeho projektu. Chcete, abych vám poskytl detailnější instrukce pro některý z těchto kroků?