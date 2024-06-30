Jistě, pojďme společně vytvořit novou strukturu složek pro váš projekt. Budu vám dávat instrukce krok po kroku. Začneme vytvořením hlavní složky [features](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/note.md#15%2C23-15%2C23) a pak budeme postupně přidávat jednotlivé funkcionality.

1. Vytvořte novou složku [features](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/note.md#15%2C23-15%2C23) v adresáři [src](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/note.md#15%2C252-15%2C252):
```
mkdir src/features
```

2. Vytvořte podsložky pro hlavní funkcionality:
```
mkdir src/features/auth
mkdir src/features/products
mkdir src/features/cart
mkdir src/features/design
```

3. V každé z těchto složek vytvořte podsložky `components`, `hooks`, `services` a `types`:
```
for dir in auth products cart design; do
  mkdir src/features/$dir/components
  mkdir src/features/$dir/hooks
  mkdir src/features/$dir/services
  mkdir src/features/$dir/types
done
```

4. Nyní přesuneme existující soubory do nové struktury. Začneme s autentizací:
```
mv src/components/LoginModal.tsx src/features/auth/components/
mv src/components/RegisterModal.tsx src/features/auth/components/
mv src/pages/employee/login.tsx src/features/auth/components/EmployeeLogin.tsx
```

5. Přesuneme soubory související s produkty:
```
mv src/pages/products.tsx src/features/products/components/ProductList.tsx
mv src/pages/editproducts.tsx src/features/products/components/EditProducts.tsx
```

6. Přesuneme soubory související s košíkem:
```
mv src/pages/cart.tsx src/features/cart/components/Cart.tsx
mv src/components/Cart.tsx src/features/cart/components/CartComponent.tsx
```

7. Přesuneme soubory související s designem:
```
mv src/pages/designer/[id].tsx src/features/design/components/ProductDesigner.tsx
mv src/components/CanvasComponent.tsx src/features/design/components/
mv src/components/SavedDesigns.tsx src/features/design/components/
```

8. Přesuneme hooks do příslušných složek:
```
mv src/hooks/useProductViews.tsx src/features/products/hooks/
mv src/hooks/useUser.tsx src/features/auth/hooks/
```

9. Přesuneme services:
```
mv src/services/designService.ts src/features/design/services/
```

10. Přesuneme types:
```
mv src/types/types.ts src/features/
```

11. Aktualizujte importy v přesunutých souborech. Například v `src/features/design/components/ProductDesigner.tsx`:

```typescript:src/features/design/components/ProductDesigner.tsx
startLine: 1
endLine: 9
```

Změňte na:

```typescript
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import CanvasComponent from './CanvasComponent';
import useUser from '../../auth/hooks/useUser';
import useProductViews from '../../products/hooks/useProductViews';
import { loadDesign, saveDesign } from '../services/designService';
import { fabric } from 'fabric';
```

12. Podobně aktualizujte importy ve všech přesunutých souborech.

13. Aktualizujte `src/pages` složku, aby používala nové komponenty z `features`:

Vytvořte nový soubor `src/pages/products.tsx`:

```typescript
import ProductList from '../features/products/components/ProductList';

export default ProductList;
```

Podobně vytvořte nové soubory pro ostatní stránky (`cart.tsx`, `designer/[id].tsx`, atd.) v `src/pages`, které budou importovat a exportovat příslušné komponenty z `features`.

14. Nakonec aktualizujte `tsconfig.json`, aby zahrnoval nové cesty:


```21:23:tsconfig.json
    "paths": {
      "@/*": ["./src/*"]
    }
```


Změňte na:

```json
"paths": {
  "@/*": ["./src/*"],
  "@features/*": ["./src/features/*"]
}
```

Toto je základní restrukturalizace vašeho projektu. Možná budete muset provést další úpravy v závislosti na tom, jak jsou vaše komponenty propojeny. Také nezapomeňte aktualizovat všechny importy v celém projektu, aby odpovídaly nové struktuře složek.