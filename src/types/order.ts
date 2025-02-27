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
export interface AdminOrder {
  id: string;
  user: UserBasic; // Use the simpler user type
  status: OrderStatus;
  totalAmount: number | Decimal;
  shippingAddress: string | ShippingDetails;
  paymentId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  orderItems: OrderItem[];
  tracking?: {
    number: string;
    carrier: string;
    status: string;
    estimatedDelivery: string;
    events: Array<{
      date: string;
      location: string;
      status: string;
    }>;
  };
}