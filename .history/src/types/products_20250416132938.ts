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

export interface ProductWithReviews extends Product {
  reviews?: {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: {
      id: string;
      name: string | null;
    };
  }[];
}