// types/product.ts
export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    images: string;
    isVegan: boolean;
    isCrueltyFree: boolean;
    stock: number;
    createdAt: string;
    updatedAt: string;
    description: string;
  }