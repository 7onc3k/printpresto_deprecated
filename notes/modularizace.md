Vzhledem k velikosti a komplexnosti vašeho projektu doporučuji začít s následujícími kroky:

1. Začněte s hlavními stránkami:
   Zaměřte se na soubory v adresáři [src/pages](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/src/pages/_app.tsx#1%2C4-1%2C4), zejména:


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



```1:50:src/pages/products.tsx
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { supabase } from '../utils/supabaseClient';
import { Product } from '../types/types';

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h1>Naše Produkty</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ margin: '10px' }}>
            <Link href={`/designer/${product.id}`} passHref>
              <Image 
                src={product.image_url} 
                alt={product.name} 
                width={100} 
                height={100} 
                style={{ objectFit: 'cover' }} 
              />
              <button>{product.name}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (): Promise<{ props: ProductsProps }> => {
  let products: Product[] = [];
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Chyba při načítání produktů:', error);
  } else {
    products = data || [];
  }

  return { props: { products } };
}
```



```1:95:src/pages/designer/[id].tsx
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CanvasComponent from '../../components/CanvasComponent';
import useUser from '../../hooks/useUser';
import useProductViews from '../../hooks/useProductViews';
import { loadDesign, saveDesign } from '../../services/designService';
import { fabric } from 'fabric';

interface CartItem {
  designId: string | null;
  productId: string;
  quantity: number;
  size: string;
  price: number;
}

const ProductDesigner
```


2. Rozdělte velké komponenty:
   Například `CanvasComponent` je dobrý kandidát na rozdělení:


```1:146:src/components/CanvasComponent.tsx
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface CanvasComponentProps {
  uploadedImages: { [key: string]: fabric.Image[] };
  currentView: string;
  productViews: { [key: string]: string };
  setUploadedImages: React.Dispatch<React.SetStateAction<{ [key: string]: fabric.Image[] }>>;
  readOnly: boolean;
}

const CanvasComponent
```


Můžete jej rozdělit na menší komponenty, jako jsou `CanvasToolbar`, `CanvasView`, a `ImageUploader`.

3. Vytvořte sdílené komponenty:
   Identifikujte opakující se prvky UI a vytvořte z nich sdílené komponenty. Například `Layout` komponenta už existuje, ale můžete ji dále vylepšit:


```1:98:src/components/Layout.tsx
// src/components/Layout.tsx
import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UserProfile from './UserProfile';

interface LayoutProps {
  children: ReactNode;
  onDesignSelect: (productId: string, uploadedImages: any) => void;
}

const Layout
```


4. Oddělte logiku:
   Přesuňte business logiku do samostatných souborů. Například funkce pro práci s designem můžete přesunout do samostatného souboru `src/services/designService.ts`.

5. Použijte hooks:
   Vytvořte vlastní hooks pro opakující se logiku. Už máte `useUser` a `useProductViews`, můžete vytvořit další, například `useCart` pro práci s košíkem.

6. Strukturujte API routes:
   Pokud používáte API routes, organizujte je do logických skupin v `pages/api`.

7. Implementujte správu stavu:
   Zvažte použití Context API nebo Redux pro globální správu stavu, zejména pro košík a uživatelské informace.

8. Stylizace:
   Používáte Tailwind CSS, ale můžete vytvořit vlastní komponenty pro často používané styly.

Začněte s těmito kroky a postupně procházejte projekt. Pamatujte, že modularizace je postupný proces, takže se nebojte dělat malé změny a postupně je rozšiřovat.