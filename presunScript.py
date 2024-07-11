import os
import re
import shutil

def update_imports(content, old_path, new_path):
    # Update relative imports
    content = re.sub(r'from (["\'])\.\./', f'from \\1../', content)
    content = re.sub(r'from (["\'])\./', f'from \\1../', content)
    
    # Update absolute imports
    old_parts = old_path.split('/')
    new_parts = new_path.split('/')
    for i in range(min(len(old_parts), len(new_parts))):
        if old_parts[i] != new_parts[i]:
            break
    common_path = '/'.join(old_parts[:i])
    relative_path = '../' * (len(old_parts) - i - 1)
    
    content = re.sub(f'from (["\']){common_path}', f'from \\1{relative_path}', content)
    return content

def process_file(old_path, new_path):
    os.makedirs(os.path.dirname(new_path), exist_ok=True)
    with open(old_path, 'r') as file:
        content = file.read()
    
    updated_content = update_imports(content, old_path, new_path)
    
    with open(new_path, 'w') as file:
        file.write(updated_content)
    
    print(f"Moved and updated: {old_path} -> {new_path}")
    
    # Remove the old file
    os.remove(old_path)
    print(f"Deleted old file: {old_path}")

# File mappings
file_mappings = {
    'src/pages/cart.tsx': 'src/app/cart/page.tsx',
    'src/pages/designer/[id].tsx': 'src/app/designer/[id]/page.tsx',
    'src/pages/employee/dashboard.tsx': 'src/app/employee/dashboard/page.tsx',
    'src/pages/employee/login.tsx': 'src/app/employee/login/page.tsx',
    'src/pages/login.tsx': 'src/app/login/page.tsx',
    'src/pages/products.tsx': 'src/app/products/page.tsx',
    'src/pages/profile.tsx': 'src/app/profile/page.tsx',
    'src/pages/register.tsx': 'src/app/register/page.tsx',
    'src/pages/_app.tsx': 'src/app/layout.tsx',
    'src/pages/index.tsx': 'src/app/page.tsx',
    'src/app/globals.css': 'src/app/globals.css',
}

# Process each file
for old_path, new_path in file_mappings.items():
    if os.path.exists(old_path):
        process_file(old_path, new_path)
    else:
        print(f"File not found: {old_path}")

# Update imports in other files
other_files = [
    'src/components/auth/AuthGuard.tsx',
    'src/components/auth/AuthProvider.tsx',
    'src/features/cart/Cart.tsx',
    'src/features/cart/CartItem.tsx',
    'src/features/cart/CheckoutButton.tsx',
    'src/components/employee/DesignViewerComponent.tsx',
    'src/components/employee/OrderDetailsComponent.tsx',
    'src/components/employee/OrderListComponent.tsx',
    'src/components/employee/OrdersList.tsx',
    'src/components/layout/Layout.tsx',
    'src/components/products/ActionButtons.tsx',
    'src/components/products/CanvasComponent.tsx',
    'src/components/products/CanvasSetup.tsx',
    'src/components/products/ImageManager.tsx',
    'src/components/products/ImageUploader.tsx',
    'src/components/products/ProductDesignerLayout.tsx',
    'src/components/products/ProductViewSelector.tsx',
    'src/components/products/SavedDesigns.tsx',
    'src/components/EditProducts/AddProductForm.tsx',
    'src/components/EditProducts/ImageUpload.tsx',
    'src/components/EditProducts/ProductItem.tsx',
    'src/components/EditProducts/ProductList.tsx',
    'src/components/OrderDetails.tsx',
    'src/components/OrdersList.tsx',
    'src/hooks/useCart.ts',
    'src/hooks/useDesign.ts',
    'src/hooks/useEmployeeAuth.ts',
    'src/hooks/useImageUpload.ts',
    'src/hooks/useOrders.ts',
    'src/hooks/useProductAdd.ts',
    'src/hooks/useProductDesigner.ts',
    'src/hooks/useProductList.ts',
    'src/hooks/useProductManagement.ts',
    'src/hooks/useProducts.ts',
    'src/hooks/useProductState.ts',
    'src/hooks/useProductUpdate.ts',
    'src/hooks/useProductViews.tsx',
    'src/hooks/useUser.tsx',
    'src/services/auth/authService.ts',
    'src/services/designService.ts',
    'src/services/orderService.ts',
    'src/store/slices/authSlice.ts',
    'src/store/slices/cartSlice.ts',
    'src/store/slices/orderSlice.ts',
    'src/store/slices/productSlice.ts',
    'src/store/index.ts',
    'src/types/productDesigner.ts',
    'src/types/types.ts',
    'src/utils/supabaseClient.js',
    'src/middleware.ts',
]

for file_path in other_files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            content = file.read()
        
        updated_content = update_imports(content, file_path, file_path)
        
        with open(file_path, 'w') as file:
            file.write(updated_content)
        
        print(f"Updated imports in: {file_path}")
    else:
        print(f"File not found: {file_path}")

# Remove empty directories
for root, dirs, files in os.walk('src', topdown=False):
    for dir in dirs:
        dir_path = os.path.join(root, dir)
        if not os.listdir(dir_path):
            os.rmdir(dir_path)
            print(f"Removed empty directory: {dir_path}")

print("Script completed.")