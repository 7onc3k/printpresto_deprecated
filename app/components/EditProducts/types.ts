export interface Product {
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

export interface ViewFiles {
    [key: string]: File | null;
}