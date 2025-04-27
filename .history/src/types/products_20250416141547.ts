import { Decimal } from '@prisma/client/runtime/library';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string;  // Changed to only string type
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

export interface WishlistProduct extends Omit<Product, 'images'> {
  images: string | string[];  // WishlistProduct can handle both string and array
}