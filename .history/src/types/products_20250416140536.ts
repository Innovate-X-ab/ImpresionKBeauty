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

export interface WishlistItem extends Product {
  formattedPrice?: number;
  formattedImages?: string;
}