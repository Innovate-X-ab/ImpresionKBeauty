//app/account/orders/[orderId]/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { Package, Truck, CheckCircle, ArrowLeft } from 'lucide-react';

const orderStatuses = {
  PENDING: {
    label: 'Order Placed',
    icon: Package,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    description: 'Your order has been received and is being processed'
  },
  PROCESSING: {
    label: 'Processing',
    icon: Package,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
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
  }
};

// Mock data - replace with actual API call
const mockOrder = {
  id: 'ORD-123456',
  status: 'SHIPPED',
  createdAt: '2024-02-24T10:00:00Z',
  total: 129.99,
  shippingAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'London',
    postcode: 'SW1A 1AA',
    country: 'United Kingdom'
  },
  tracking: {
    number: 'TRK123456789',
    carrier: 'Royal Mail',
    status: 'In Transit',
    estimatedDelivery: '2024-02-26',
    events: [
      {
        date: '2024-02-24T15:30:00Z',
        location: 'London Sorting Center',
        status: 'Package in transit'
      },
      {
        date: '2024-02-24T10:15:00Z',
        location: 'London',
        status: 'Package picked up'
      }
    ]
  },
  items: [
    {
      id: '1',
      name: 'COSRX Advanced Snail Mucin Power Essence',
      quantity: 2,
      price: 21.99,
      image: '/api/placeholder/80/80'
    },
    {
      id: '2',
      name: 'Beauty of Joseon Glow Serum',
      quantity: 1,
      price: 19.99,
      image: '/api/placeholder/80/80'
    }
  ]
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const StatusIcon = orderStatuses[mockOrder.status as keyof typeof orderStatuses].icon;
  const status = orderStatuses[mockOrder.status as keyof typeof orderStatuses];

  return (
    <PageLayout>
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

          {/* Order Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-medium">Order #{orderId}</h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${status.bgColor}`}>
                <StatusIcon className={`w-4 h-4 mr-2 ${status.color}`} />
                <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
              </div>
            </div>
            <p className="text-gray-600">
              Placed on {new Date(mockOrder.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Tracking Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Tracking Information</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="font-medium">{mockOrder.tracking.number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Carrier</p>
                      <p className="font-medium">{mockOrder.tracking.carrier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Delivery</p>
                      <p className="font-medium">
                        {new Date(mockOrder.tracking.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="relative pt-8">
                    {mockOrder.tracking.events.map((event, index) => (
                      <div key={index} className="flex items-start mb-8 last:mb-0">
                        <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">{event.status}</p>
                          <p className="text-sm text-gray-500">{event.location}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Order Items</h2>
                <div className="divide-y divide-gray-200">
                  {mockOrder.items.map((item) => (
                    <div key={item.id} className="py-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                <div className="text-sm">
                  <p className="font-medium">{mockOrder.shippingAddress.name}</p>
                  <p>{mockOrder.shippingAddress.street}</p>
                  <p>{mockOrder.shippingAddress.city}</p>
                  <p>{mockOrder.shippingAddress.postcode}</p>
                  <p>{mockOrder.shippingAddress.country}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>£{mockOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <div className="flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span>£{mockOrder.total.toFixed(2)}</span>
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
    </PageLayout>
  );
}