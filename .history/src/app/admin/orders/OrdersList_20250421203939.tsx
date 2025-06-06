// src/app/admin/orders/OrdersList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Search, ChevronDown, MoreHorizontal } from 'lucide-react';
import { getAllOrders } from '@/app/actions/admin/orders';

// Update the formatDate function
const formatDate = (dateString: string | Date): string => {
  try {
    // Handle undefined or null case
    if (!dateString) {
      return 'No date';
    }
    
    // If it's already a Date object, use it directly
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date input:', dateString);
      return 'No date';
    }

    // Return formatted date
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'No date';
  }
};

// Update the Order interface
interface Order {
  id: string;
  createdAt: Date;  // Changed to only accept Date objects
  status: string;
  totalAmount: number;
  user: {
    name: string | null;
    email: string;
    id: string;
  };
  orderItems: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      price: number;
    } | null;
  }>;
}

export default function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        const ordersData = await getAllOrders();
        
        const formattedOrders = ordersData.map(order => {
          // Ensure the date is properly handled
          let createdAt;
          try {
            // Log for debugging
            console.log(`Order ${order.id} createdAt:`, order.createdAt);
            
            createdAt = order.createdAt ? new Date(order.createdAt) : new Date();
            
            // Check if the date is valid
            if (isNaN(createdAt.getTime())) {
              console.warn('Invalid date from API:', order.createdAt);
              createdAt = new Date(); // Fallback to current date
            }
          } catch (error) {
            console.error('Error parsing date:', error);
            createdAt = new Date(); // Fallback to current date if parsing fails
          }
    
          return {
            ...order,
            createdAt,  // Store as Date object directly
            totalAmount: parseFloat(String(order.totalAmount)) || 0,
            orderItems: order.orderItems.map(item => ({
              ...item,
              price: parseFloat(String(item.price)) || 0,
              product: item.product ? {
                ...item.product,
                price: parseFloat(String(item.product.price)) || 0
              } : null
            }))
          };
        });
    
        setOrders(formattedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
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

  const filteredOrders = orders.filter(order => {
    // Search filter
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.user?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Time filter
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const isRecent = 
      timeFilter === 'all' || 
      (timeFilter === 'current' && 
        (order.status.toLowerCase() === 'pending' || 
         order.status.toLowerCase() === 'processing' || 
         order.status.toLowerCase() === 'shipped')) ||
      (timeFilter === 'recent' && !isNaN(orderDate.getTime()) && 
        (now.getTime() - orderDate.getTime() < 7 * 24 * 60 * 60 * 1000)) ||
      (timeFilter === 'past' && 
        (order.status.toLowerCase() === 'delivered' || 
         order.status.toLowerCase() === 'cancelled'));

    return matchesSearch && matchesStatus && isRecent;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage and track customer orders
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 appearance-none pr-8"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 appearance-none pr-8"
              >
                <option value="all">All Orders</option>
                <option value="current">Active Orders</option>
                <option value="recent">Recent (7 days)</option>
                <option value="past">Completed Orders</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Orders</h3>
          <p className="text-gray-500">Please wait while we fetch the orders...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Orders</h3>
          <p className="text-gray-500 mb-4">{error}</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' || timeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'There are no orders yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      <Link href={`/admin/orders/${order.id}`}>
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.user?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{order.user?.email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.createdAt ? formatDate(order.createdAt) : 'No date'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </Link>
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}