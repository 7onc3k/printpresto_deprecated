import os
import re

def update_imports(file_path, old_path, new_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Upravit importy
    updated_content = re.sub(
        rf'from [\'"]({re.escape(old_path)})[\'"]',
        f'from "{new_path}"',
        content
    )
    updated_content = re.sub(
        rf'import .+ from [\'"]({re.escape(old_path)})[\'"]',
        lambda m: m.group(0).replace(old_path, new_path),
        updated_content
    )

    # Zapsat změny zpět do souboru
    with open(file_path, 'w') as file:
        file.write(updated_content)

def main():
    moves = [
        ('src/components/LoginModal.tsx', 'src/features/auth/components/LoginModal'),
        ('src/components/RegisterModal.tsx', 'src/features/auth/components/RegisterModal'),
        ('src/pages/employee/login.tsx', 'src/features/auth/components/EmployeeLogin'),
        ('src/pages/products.tsx', 'src/features/products/components/ProductList'),
        ('src/pages/editproducts.tsx', 'src/features/products/components/EditProducts'),
        ('src/pages/cart.tsx', 'src/features/cart/components/Cart'),
        ('src/components/Cart.tsx', 'src/features/cart/components/CartComponent'),
        ('src/pages/designer/[id].tsx', 'src/features/design/components/ProductDesigner'),
        ('src/components/CanvasComponent.tsx', 'src/features/design/components/CanvasComponent'),
        ('src/components/SavedDesigns.tsx', 'src/features/design/components/SavedDesigns'),
        ('src/hooks/useProductViews.tsx', 'src/features/products/hooks/useProductViews'),
        ('src/hooks/useUser.tsx', 'src/features/auth/hooks/useUser'),
        ('src/services/designService.ts', 'src/features/design/services/designService'),
        ('src/types/types.ts', 'src/features/types'),
    ]

    for old_path, new_path in moves:
        # Projít všechny soubory v projektu
        for root, dirs, files in os.walk('src'):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.ts'):
                    file_path = os.path.join(root, file)
                    update_imports(file_path, old_path, new_path)

    print("Importy byly aktualizovány.")

if __name__ == "__main__":
    main()