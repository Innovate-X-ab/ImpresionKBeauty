import { Decimal } from '@prisma/client/runtime/library';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string | string[];
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

// Add a WishlistProduct interface for wishlist items
export interface WishlistProduct extends Partial<Product> {
  id: string;
  name: string;
  price: number | Decimal;
}