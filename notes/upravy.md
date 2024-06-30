Jistě, rád vám pomůžu s restrukturalizací vašeho projektu. Budeme postupovat krok po kroku, abyste mohl po každé větší změně zkontrolovat funkčnost aplikace. Začneme s nejdůležitějšími změnami a postupně budeme projekt vylepšovat.

Krok 1: Reorganizace složek

1. Vytvořte následující strukturu složek:
   ```
   src/
   ├── components/
   │   ├── common/
   │   ├── layout/
   │   ├── products/
   │   ├── designer/
   │   └── employee/
   ├── hooks/
   ├── services/
   ├── store/
   ├── types/
   ├── utils/
   └── pages/
       ├── api/
       ├── employee/
       └── designer/
   ```

2. Přesuňte existující komponenty do příslušných složek:
   - Přesuňte `Layout.tsx` do `src/components/layout/`
   - Přesuňte `CanvasComponent.tsx` do `src/components/designer/`
   - Přesuňte `Cart.tsx` do `src/components/common/`
   - Přesuňte `LoginModal.tsx` a `RegisterModal.tsx` do `src/components/common/`
   - Přesuňte `UserProfile.tsx` do `src/components/common/`
   - Přesuňte `SavedDesigns.tsx` do `src/components/designer/`

3. Aktualizujte importy ve všech souborech, aby odpovídaly nové struktuře složek.

4. Otestujte aplikaci, zda funguje správně po těchto změnách.

Krok 2: Implementace state managementu

1. Nainstalujte Redux Toolkit:
   ```
   npm install @reduxjs/toolkit react-redux
   ```

2. Vytvořte soubor `src/store/index.ts`:
   ```typescript
   import { configureStore } from '@reduxjs/toolkit';
   import userReducer from './slices/userSlice';
   import cartReducer from './slices/cartSlice';

   export const store = configureStore({
     reducer: {
       user: userReducer,
       cart: cartReducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;
   ```

3. Vytvořte soubor `src/store/slices/userSlice.ts`:
   ```typescript
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';
   import { User } from '@supabase/supabase-js';

   interface UserState {
     user: User | null;
     isLoading: boolean;
   }

   const initialState: UserState = {
     user: null,
     isLoading: true,
   };

   const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
       setUser: (state, action: PayloadAction<User | null>) => {
         state.user = action.payload;
         state.isLoading = false;
       },
       clearUser: (state) => {
         state.user = null;
         state.isLoading = false;
       },
     },
   });

   export const { setUser, clearUser } = userSlice.actions;
   export default userSlice.reducer;
   ```

4. Vytvořte soubor `src/store/slices/cartSlice.ts`:
   ```typescript
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';
   import { CartItem } from '../../types/types';

   interface CartState {
     items: CartItem[];
   }

   const initialState: CartState = {
     items: [],
   };

   const cartSlice = createSlice({
     name: 'cart',
     initialState,
     reducers: {
       addToCart: (state, action: PayloadAction<CartItem>) => {
         state.items.push(action.payload);
       },
       removeFromCart: (state, action: PayloadAction<string>) => {
         state.items = state.items.filter(item => item.designId !== action.payload);
       },
       clearCart: (state) => {
         state.items = [];
       },
     },
   });

   export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
   export default cartSlice.reducer;
   ```

5. Upravte soubor `src/pages/_app.tsx`:
   ```typescript
   import '../app/globals.css'
   import type { AppProps } from 'next/app'
   import Layout from '../components/layout/Layout'
   import { Provider } from 'react-redux'
   import { store } from '../store'

   export default function App({ Component, pageProps }: AppProps) {
     return (
       <Provider store={store}>
         <Layout>
           <Component {...pageProps} />
         </Layout>
       </Provider>
     );
   }
   ```

6. Aktualizujte komponenty, které používají stav uživatele a košíku, aby používaly Redux místo lokálního stavu.

7. Otestujte aplikaci, zda funguje správně po implementaci Redux.

Toto jsou první dva kroky k vylepšení struktury vašeho projektu. Po dokončení těchto kroků byste měl mít lepší organizaci souborů a centralizovaný state management. Pokud je vše funkční, můžeme pokračovat dalšími kroky k vylepšení projektu.