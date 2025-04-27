import { Decimal } from '@prisma/client/runtime/library';

export interface BaseProduct {
  id: string;
  name: string;
  price: number | Decimal;
}

export interface Product extends BaseProduct {
  brand: string;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

export interface WishlistItem extends Product {
  // Add any additional wishlist-specific properties here
}