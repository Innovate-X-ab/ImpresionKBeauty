//app/account/orders/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    images: string; // Can be JSON string or direct URL
    price: number;
  }
  // Sometimes the API might return orderItems in a different format
  name?: string;
  images?: string;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  orderItems: OrderItem[];
}

// Improved helper function to properly extract images
const getProductImage = (item: OrderItem): string => {
  if (!item) return '/api/placeholder/80/80';
  
  // If product is nested
  if (item.product?.images) {
    try {
      const images = typeof item.product.images === 'string' 
        ? JSON.parse(item.product.images) 
        : item.product.images;
      
      return Array.isArray(images) && images.length > 0 
        ? images[0] 
        : '/api/placeholder/80/80';
    } catch {
      // If JSON parsing fails
      return '/api/placeholder/80/80';
    }
  }
  
  // If images are directly on the orderItem
  if (item.images) {
    try {
      const images = typeof item.images === 'string' 
        ? JSON.parse(item.images) 
        : item.images;
      
      return Array.isArray(images) && images.length > 0 
        ? images[0] 
        : '/api/placeholder/80/80';
    } catch {
      return '/api/placeholder/80/80';
    }
  }
  
  return '/api/placeholder/80/80';
};

// Improved helper function to get product name with fallback
const getProductName = (item: OrderItem): string => {
  // If product is nested
  if (item?.product?.name) {
    return item.product.name;
  }
  
  // If name is directly on the orderItem
  if (item?.name) {
    return item.name;
  }
  
  return 'Product';
};

export default function OrdersPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      
      // Debug - log the structure of the data
      console.log('Orders API response:', JSON.stringify(data, null, 2));
      
      // If there's at least one order, debug log the first order item structure
      if (data.length > 0 && data[0].orderItems && data[0].orderItems.length > 0) {
        console.log('First order item structure:', 
          JSON.stringify(data[0].orderItems[0], null, 2));
      }
      
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Add Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-4">
                  {order.orderItems && order.orderItems.map((item, index) => (
                    <div key={item.id || index} className="flex items-center">
                      <div className="flex-shrink-0 relative w-20 h-20">
                        <Image
                          src={getProductImage(item)}
                          alt={getProductName(item)}
                          fill
                          sizes="80px"
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="ml-6 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {getProductName(item)}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          £{(Number(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Total: £{Number(order.total).toFixed(2)}
                  </p>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}