kde je potřeba dodělat tohle image width

- products
- canvas component
- cart
- design service
- user profile
- dashboard
- layout
- id

Děkuji za poskytnutí informací o projektu. Na základě struktury a obsahu souborů, které jste mi ukázali, mám několik doporučení, jak projekt předělat, aby se v něm lépe pracovalo:

1. Struktura složek:
   - Vytvořte složku [features](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/README.md#21%2C63-21%2C63) nebo `modules` a rozdělte komponenty a logiku podle funkcionality (např. [auth](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/src/pages/employee/dashboard.tsx#24%2C49-24%2C49), [products](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/note.md#3%2C3-3%2C3), [cart](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/note.md#5%2C3-5%2C3), [design](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/note.md#6%2C3-6%2C3) atd.).
   - V každé feature složce mějte podsložky [components](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/src/pages/_app.tsx#4%2C24-4%2C24), [hooks](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/src/pages/designer/%5Bid%5D.tsx#6%2C28-6%2C28), [services](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/src/pages/designer/%5Bid%5D.tsx#8%2C47-8%2C47) a [types](file:///c%3A/Users/thanh/Downloads/Programy/printpresto/src/pages/products.tsx#6%2C29-6%2C29).

2. State management:
   - Zvažte použití globálního state managementu, jako je Redux Toolkit nebo Zustand, pro lepší správu stavu aplikace, zejména pro košík a uživatelské informace.

3. Stylování:
   - Místo inline stylů použijte CSS moduly nebo styled-components pro lepší organizaci a znovupoužitelnost stylů.

4. Typování:
   - Vytvořte centrální soubor pro typy (např. `src/types/index.ts`) a importujte typy z tohoto souboru.

5. API calls:
   - Vytvořte centrální místo pro API volání (např. `src/api/index.ts`) a používejte custom hooks pro data fetching.

6. Konfigurace:
   - Vytvořte konfigurační soubor (např. `src/config.ts`) pro konstanty a konfigurační hodnoty.

7. Komponenty:
   - Rozdělte velké komponenty na menší, znovupoužitelné části.
   - Používejte React.memo() pro optimalizaci výkonu u komponent, které se často překreslují.

8. Routing:
   - Zvažte použití dynamických routů pro lepší organizaci stránek.

9. Error handling:
   - Implementujte globální error boundary pro lepší zachycení a zobrazení chyb.

10. Testování:
    - Přidejte unit testy pro klíčové komponenty a funkce.

11. Dokumentace:
    - Přidejte komentáře k složitějším částem kódu a vytvořte README soubory pro každou feature.

12. Optimalizace:
    - Implementujte lazy loading pro komponenty a stránky, které nejsou potřeba při prvním načtení.

13. Lokalizace:
    - Připravte projekt pro vícejazyčnost pomocí knihovny jako react-i18next.

14. Formuláře:
    - Použijte knihovnu pro správu formulářů, jako je react-hook-form, pro lepší validaci a správu stavu formulářů.

Tyto změny by měly zlepšit organizaci, udržitelnost a škálovatelnost vašeho projektu. Začněte postupně implementovat tyto změny, abyste minimalizovali riziko regresí a udrželi funkčnost aplikace během refaktoringu.


mv src/components/LoginModal.tsx src/features/auth/components/
mv src/components/RegisterModal.tsx src/features/auth/components/
mv src/pages/employee/login.tsx src/features/auth/components/EmployeeLogin.tsx
mv src/pages/products.tsx src/features/products/components/ProductList.tsx
mv src/pages/editproducts.tsx src/features/products/components/EditProducts.tsx
mv src/pages/cart.tsx src/features/cart/components/Cart.tsx
mv src/components/Cart.tsx src/features/cart/components/CartComponent.tsx
mv src/pages/designer/[id].tsx src/features/design/components/ProductDesigner.tsx
mv src/components/CanvasComponent.tsx src/features/design/components/
mv src/components/SavedDesigns.tsx src/features/design/components/
mv src/hooks/useProductViews.tsx src/features/products/hooks/
mv src/hooks/useUser.tsx src/features/auth/hooks/
mv src/services/designService.ts src/features/design/services/
mv src/types/types.ts src/features/


[[krok_1]]