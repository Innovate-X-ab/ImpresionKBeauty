//app/account/orders/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';

// Mock data - replace with actual API call
const orders = [
  {
    id: 'ORD-123456',
    date: '2024-02-24',
    status: 'Delivered',
    total: 129.99,
    items: [
      {
        name: 'COSRX Advanced Snail Mucin Power Essence',
        quantity: 2,
        price: 21.99,
        image: '/api/placeholder/80/80'
      },
      {
        name: 'Beauty of Joseon Glow Serum',
        quantity: 1,
        price: 19.99,
        image: '/api/placeholder/80/80'
      }
    ]
  },
  {
    id: 'ORD-123457',
    date: '2024-02-20',
    status: 'In Transit',
    total: 89.99,
    items: [
      {
        name: 'Some By Mi AHA-BHA-PHA Toner',
        quantity: 1,
        price: 24.99,
        image: '/api/placeholder/80/80'
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'in transit':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OrdersPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-4">When you place orders, they will appear here.</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order placed</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Order number</p>
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total amount</p>
                    <p className="text-sm font-medium text-gray-900">£{order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-20 h-20">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover rounded"
                        />
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm font-medium text-gray-900">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="text-sm font-medium text-black hover:text-gray-700 flex items-center justify-end"
                >
                  View Order Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}