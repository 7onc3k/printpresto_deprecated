// types.ts nebo na začátku vašeho souboru designer/[id].tsx
export interface Product {
    id: number;
    name: string;
    description?: string;  // ? značí, že pole je volitelné
    image_url: string;
  }
  

  interface Params {
    id: string;
  }