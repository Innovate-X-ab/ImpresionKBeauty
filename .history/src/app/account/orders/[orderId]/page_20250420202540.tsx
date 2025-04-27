//app/account/orders/[orderId]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import OrderDetailsLayout from './OrderDetailsLayout';
import { Package, Truck, CheckCircle, ArrowLeft, XCircle, Clock, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

// Define interfaces for the order data
interface Product {
  id: string;
  name: string;
  images: string;
  brand: string;
}

interface OrderItem {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  price: number | string;
  product: Product;
}

interface OrderUser {
  id: string;
  name: string | null;
  email: string;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number | string;
  shippingAddress: string | ShippingDetails;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  user: OrderUser;
  orderItems: OrderItem[];
}

const orderStatuses = {
  PENDING: {
    label: 'Order Placed',
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    description: 'Your order has been received and is being processed'
  },
  PROCESSING: {
    label: 'Processing',
    icon: Package,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    description: 'Your order is being prepared for shipping'
  },
  SHIPPED: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    description: 'Your order is on its way'
  },
  DELIVERED: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    description: 'Your order has been delivered'
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    description: 'This order has been cancelled'
  }
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const orderId = params.orderId as string;
  const loading = status === 'loading';
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if no user
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?redirect=/account/orders/' + orderId);
    }
  }, [status, router, orderId]);

  // Fetch order data
  useEffect(() => {
    async function fetchOrder() {
      if (status !== 'authenticated' || !session?.user) {
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/orders/${orderId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching order:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchOrder();
  }, [orderId, session, status]);

  if (loading || isLoading) {
    return (
      <OrderDetailsLayout>
        <div className="bg-white py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-black">Loading Order Details</h3>
              <p className="text-gray-500 text-black">Please wait...</p>
            </div>
          </div>
        </div>
      </OrderDetailsLayout>
    );
  }

  if (error || !order) {
    return (
      <OrderDetailsLayout>
        <div className="bg-white py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-black">Error Loading Order</h3>
              <p className="text-gray-500 mb-4">{error || 'Order not found'}</p>
              <Link
                href="/account/orders"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Link>
            </div>
          </div>
        </div>
      </OrderDetailsLayout>
    );
  }

  const orderStatus = orderStatuses[order.status as keyof typeof orderStatuses] || orderStatuses.PENDING;
  const StatusIcon = orderStatus.icon;
  
  // Parse shipping address if it's stored as a string
  const shippingAddress = typeof order.shippingAddress === 'string' 
    ? JSON.parse(order.shippingAddress) as ShippingDetails
    : order.shippingAddress as ShippingDetails;

  return (
    <OrderDetailsLayout>
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link 
            href="/account/orders" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>

          {/* Remove redundant header and directly start with Order Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h1 className="text-2xl font-medium text-black">Order #{orderId}</h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${orderStatus.bgColor}`}>
                <StatusIcon className={`w-4 h-4 mr-2 ${orderStatus.color}`} />
                <span className={`text-sm font-medium ${orderStatus.color}`}>{orderStatus.label}</span>
              </div>
            </div>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
            </p>
            <p className="mt-2 text-gray-600">{orderStatus.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Order Status Timeline */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-6 text-black">Order Status</h2>
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                  
                  {order.status !== 'CANCELLED' && (
                    <>
                      <div className="relative flex items-center mb-8">
                        <div className={`flex-shrink-0 z-10 w-8 h-8 ${order.status ? 'bg-green-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-black">Order Placed</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center mb-8">
                        <div className={`flex-shrink-0 z-10 w-8 h-8 ${order.status === 'PROCESSING' || order.status === 'SHIPPED' || order.status === 'DELIVERED' ? 'bg-blue-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                          <Package className="w-4 h-4 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-black">Processing</p>
                          <p className="text-sm text-gray-500">
                            {order.status === 'PROCESSING' || order.status === 'SHIPPED' || order.status === 'DELIVERED' 
                              ? 'Your order is being prepared' 
                              : 'Waiting to be processed'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center mb-8">
                        <div className={`flex-shrink-0 z-10 w-8 h-8 ${order.status === 'SHIPPED' || order.status === 'DELIVERED' ? 'bg-purple-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                          <Truck className="w-4 h-4 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-black">Shipped</p>
                          <p className="text-sm text-gray-500">
                            {order.status === 'SHIPPED' || order.status === 'DELIVERED' 
                              ? 'Your order is on its way' 
                              : 'Waiting to be shipped'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center">
                        <div className={`flex-shrink-0 z-10 w-8 h-8 ${order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-black">Delivered</p>
                          <p className="text-sm text-gray-500">
                            {order.status === 'DELIVERED' 
                              ? 'Your order has been delivered' 
                              : 'Waiting to be delivered'}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {order.status === 'CANCELLED' && (
                    <div className="relative flex items-center">
                      <div className="flex-shrink-0 z-10 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <XCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-black">Order Cancelled</p>
                        <p className="text-sm text-gray-500">
                          This order has been cancelled
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4 text-black">Order Items</h2>
                <div className="divide-y divide-gray-200">
                  {order.orderItems.map((item) => {
                    const images = typeof item.product.images === 'string' 
                      ? JSON.parse(item.product.images) 
                      : item.product.images;
                    
                    const imageUrl = Array.isArray(images) && images.length > 0 
                      ? images[0] 
                      : '/api/placeholder/80/80';
                    
                    return (
                      <div key={item.id} className="py-4 flex items-center">
                        <div className="relative w-16 h-16">
                          <Image
                            src={imageUrl}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-black">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">
                          £{Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-black">
                <h2 className="text-lg font-medium mb-4 text-black">Shipping Address</h2>
                <div className="text-sm">
                  <p className="font-medium text-black">{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</p>
                  <p>{shippingAddress.address}</p>
                  {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                  <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
                  <p>{shippingAddress.country}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>£{Number(order.totalAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <div className="flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span>£{Number(order.totalAmount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium mb-2">Need Help?</h2>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, please contact our customer service team.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrderDetailsLayout>
  );
}