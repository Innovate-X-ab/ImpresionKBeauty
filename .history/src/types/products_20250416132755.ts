import { Decimal } from '@prisma/client/runtime/library';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  description?: string;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
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