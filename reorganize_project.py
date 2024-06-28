import os
import shutil
import re

# Definice přesunů
moves = {
    'src/pages/cart.tsx': 'src/features/cart/Cart.tsx',
    'src/pages/designer/[id].tsx': 'src/features/design/ProductDesigner.tsx',
    'src/pages/editproducts.tsx': 'src/features/products/EditProducts.tsx',
    'src/pages/employee/dashboard.tsx': 'src/features/user/EmployeeDashboard.tsx',
    'src/pages/products.tsx': 'src/features/products/ProductList.tsx',
    'src/components/Cart.tsx': 'src/features/cart/CartComponent.tsx',
    'src/components/CanvasComponent.tsx': 'src/features/design/CanvasComponent.tsx',
    'src/components/SavedDesigns.tsx': 'src/features/design/SavedDesigns.tsx',
    'src/components/UserProfile.tsx': 'src/features/user/UserProfile.tsx'
}

# Funkce pro aktualizaci importů
def update_imports(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Aktualizace importů
    for old_path, new_path in moves.items():
        old_import = old_path.replace('src/', '').replace('.tsx', '')
        new_import = new_path.replace('src/', '').replace('.tsx', '')
        content = re.sub(f"from ['\"]{old_import}['\"]", f"from '{new_import}'", content)

    with open(file_path, 'w') as file:
        file.write(content)

# Hlavní funkce pro přesun souborů
def move_files():
    for old_path, new_path in moves.items():
        # Vytvoření cílové složky, pokud neexistuje
        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        
        # Přesun souboru
        shutil.move(old_path, new_path)
        print(f"Přesunuto: {old_path} -> {new_path}")

        # Aktualizace importů v přesunutém souboru
        update_imports(new_path)

    # Aktualizace importů ve všech souborech v src/
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                update_imports(file_path)

if __name__ == "__main__":
    move_files()
    print("Přesun souborů a aktualizace importů dokončeny.")