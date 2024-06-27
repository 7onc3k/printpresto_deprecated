import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Upravte cestu podle vaší struktury projektu

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    view_1: string;
    view_2: string;
    view_3: string;
    view_4: string;
}

const EditProducts: React.FC = () => {
    const [newProduct, setNewProduct] = useState<Partial<Product>>({});
    const [products, setProducts] = useState<Product[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [viewFiles, setViewFiles] = useState<{ [key: string]: File | null }>({
        view_1: null,
        view_2: null,
        view_3: null,
        view_4: null,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from('products').select('*');
            if (error) {
                console.error('Chyba při načítání produktů:', error);
            } else {
                setProducts(data);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
        const value = field === 'price' ? parseFloat(e.target.value) : e.target.value;
        setNewProduct({ ...newProduct, [field]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleViewImageChange = (e: React.ChangeEvent<HTMLInputElement>, view: string) => {
        if (e.target.files && e.target.files[0]) {
            setViewFiles({ ...viewFiles, [view]: e.target.files[0] });
        }
    };

    const uploadImage = async (file: File) => {
        const fileName = `${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('products').upload(fileName, file);
        if (uploadError) {
            console.error('Chyba při nahrávání obrázku:', uploadError);
            return null;
        }
        const { data: urlData } = await supabase.storage.from('products').getPublicUrl(fileName);
        if (!urlData) {
            console.error('Chyba při získávání veřejného URL');
            return null;
        }
        return urlData.publicUrl;
    };

    const uploadViewImage = async (file: File, view: string) => {
        const fileName = `${Date.now()}_${view}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('product_views').upload(fileName, file);
        if (uploadError) {
            console.error(`Chyba při nahrávání obrázku pro ${view}:`, uploadError);
            return null;
        }
        const { data: urlData } = await supabase.storage.from('product_views').getPublicUrl(fileName);
        if (!urlData) {
            console.error(`Chyba při získávání veřejného URL pro ${view}`);
            return null;
        }
        return urlData.publicUrl;
    };

    const handleAddProduct = async () => {
        let imageUrl: string = '';
        if (imageFile) {
            const uploadedImageUrl = await uploadImage(imageFile);
            if (uploadedImageUrl) {
                imageUrl = uploadedImageUrl;
            }
        }

        const viewUrls: { [key: string]: string } = {};
        for (const view in viewFiles) {
            if (viewFiles[view]) {
                const uploadedViewUrl = await uploadViewImage(viewFiles[view]!, view);
                if (uploadedViewUrl) {
                    viewUrls[view] = uploadedViewUrl;
                }
            }
        }

        const productToAdd = { ...newProduct, image_url: imageUrl, ...viewUrls };
        const { data, error } = await supabase.from('products').insert([productToAdd]).select();
        if (error) {
            console.error('Chyba při přidávání produktu:', error);
        } else {
            setProducts([...products, data[0]]);
            setNewProduct({});
            setImageFile(null);
            setViewFiles({ view_1: null, view_2: null, view_3: null, view_4: null });
        }
    };

    const handleUpdateProduct = async (id: string, updatedProduct: Partial<Product>) => {
        const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id).select();
        if (error) {
            console.error('Chyba při aktualizaci produktu:', error);
        } else {
            setProducts(products.map(product => (product.id === id ? data[0] : product)));
        }
    };

    return (
        <div>
            <h1>Upravit Produkty</h1>
            <div>
                <h2>Přidat nový produkt</h2>
                <input
                    type="text"
                    placeholder="Název"
                    value={newProduct.name || ''}
                    onChange={(e) => handleInputChange(e, 'name')}
                />
                <input
                    type="text"
                    placeholder="Popis"
                    value={newProduct.description || ''}
                    onChange={(e) => handleInputChange(e, 'description')}
                />
                <input
                    type="number"
                    placeholder="Cena"
                    value={newProduct.price as number || ''}
                    onChange={(e) => handleInputChange(e, 'price')}
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                />
                <input
                    type="file"
                    onChange={(e) => handleViewImageChange(e, 'view_1')}
                />
                <input
                    type="file"
                    onChange={(e) => handleViewImageChange(e, 'view_2')}
                />
                <input
                    type="file"
                    onChange={(e) => handleViewImageChange(e, 'view_3')}
                />
                <input
                    type="file"
                    onChange={(e) => handleViewImageChange(e, 'view_4')}
                />
                <button onClick={handleAddProduct}>Přidat Produkt</button>
            </div>
            <div>
                <h2>Seznam produktů</h2>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <div key={product.id}>
                            <input
                                type="text"
                                value={product.name}
                                onChange={(e) => handleUpdateProduct(product.id, { name: e.target.value })}
                            />
                            <input
                                type="text"
                                value={product.description}
                                onChange={(e) => handleUpdateProduct(product.id, { description: e.target.value })}
                            />
                            <input
                                type="number"
                                value={product.price}
                                onChange={(e) => handleUpdateProduct(product.id, { price: parseFloat(e.target.value) })}
                            />
                            <input
                                type="text"
                                value={product.image_url}
                                onChange={(e) => handleUpdateProduct(product.id, { image_url: e.target.value })}
                            />
                            <input
                                type="text"
                                value={product.view_1}
                                onChange={(e) => handleUpdateProduct(product.id, { view_1: e.target.value })}
                            />
                            <input
                                type="text"
                                value={product.view_2}
                                onChange={(e) => handleUpdateProduct(product.id, { view_2: e.target.value })}
                            />
                            <input
                                type="text"
                                value={product.view_3}
                                onChange={(e) => handleUpdateProduct(product.id, { view_3: e.target.value })}
                            />
                            <input
                                type="text"
                                value={product.view_4}
                                onChange={(e) => handleUpdateProduct(product.id, { view_4: e.target.value })}
                            />
                        </div>
                    ))
                ) : (
                    <p>Žádné produkty nebyly nalezeny.</p>
                )}
            </div>
        </div>
    );
};

export default EditProducts;
