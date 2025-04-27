// src/types/order.ts
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// Define a simpler User type that matches what we get from the API
export interface UserBasic {
  id: string;
  name: string | null;
  email: string;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

// Define our own Product interface to avoid extending Prisma's Product
export interface ProductWithImages {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: Decimal | number;
  images: string | string[]; // Handle both string and parsed array
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface OrderItem {
  id: string;
  product: ProductWithImages;
  quantity: number;
  price: number | Decimal;
}

// Basic order interface (matches your current structure)
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number | Decimal;
  shippingAddress: string;
  status: OrderStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Extended order interface for the admin panel with additional details
interface AdminOrder {
  id: string;
  createdAt: Date;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: string | ShippingDetails;
  paymentId?: string;
  stripeSessionId?: string;
  paymentInfo?: {
    paymentId: string;
    paymentMethod: string;
    paymentStatus: string;
    paymentDate: Date | string;
  };
  orderItems: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      price: number;
      images: string;
    };
  }>;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}