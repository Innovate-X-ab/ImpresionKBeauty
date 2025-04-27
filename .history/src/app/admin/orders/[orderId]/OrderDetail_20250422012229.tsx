// src/app/admin/orders/[orderId]/OrderDetail.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Send, 
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { getOrderDetails, updateOrderStatus, sendOrderStatusEmail } from '@/app/actions/admin/orders';
import { AdminOrder, ShippingDetails } from '@/types/order';
import { OrderStatus } from '@prisma/client';

interface OrderDetailClientProps {
  orderId: string;
}

const formatDate = (dateInput: string | Date | null | undefined): string => {
  try {
    // Log what we're getting
    console.log('formatDate received:', dateInput, 'of type:', typeof dateInput);
    
    // Handle null/undefined case
    if (!dateInput) {
      return 'No date';
    }
    
    // Create a proper Date object
    let date: Date;
    
    if (typeof dateInput === 'string') {
      // For string inputs, create a new Date
      date = new Date(dateInput);
      console.log('Created Date from string:', date);
    } else if (dateInput instanceof Date) {
      // Use the Date directly
      date = dateInput;
      console.log('Using Date object directly:', date);
    } else {
      // Unexpected input type
      console.warn('Unexpected date input type:', typeof dateInput);
      return 'No date';
    }
    
    // Validate date
    if (isNaN(date.getTime())) {
      console.warn('Invalid date created:', date);
      return 'No date';
    }

    // Format and return the date
    const formatted = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
    
    console.log('Formatted date result:', formatted);
    return formatted;
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'No date';
  }
};

export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const orderData = await getOrderDetails(orderId);
        
        // Create payment info
        const paymentInfo = {
          paymentId: orderData.stripeSessionId || 'N/A',
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          paymentDate: orderData.createdAt // Use the same date as createdAt
        };
        
        // Format order items
        const formattedOrderItems = orderData.orderItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: Number(item.price || 0),
          product: {
            id: item.product.id,
            name: item.product.name,
            price: Number(item.product.price || 0),
            images: item.product.images || ''
          }
        }));
        
        // Create a properly formatted order object
        const formattedOrder: AdminOrder = {
          id: orderData.id,
          // Important: If createdAt is a string, convert it to a Date object
          createdAt: typeof orderData.createdAt === 'string' 
            ? new Date(orderData.createdAt) 
            : orderData.createdAt,
          stripeSessionId: orderData.stripeSessionId || 'N/A',
          status: orderData.status as OrderStatus,
          totalAmount: Number(orderData.totalAmount || 0),
          shippingAddress: orderData.shippingAddress || '{}',
          orderItems: formattedOrderItems,
          user: orderData.user,
          paymentInfo: paymentInfo
        };
    
        setOrder(formattedOrder);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrder();
  }, [orderId]);

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    try {
      setUpdatingStatus(true);
      const updatedOrderData = await updateOrderStatus(orderId, newStatus);
      
      // Create payment info
      const paymentInfo = {
        paymentId: updatedOrderData.stripeSessionId || 'N/A',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        paymentDate: updatedOrderData.createdAt
      };
      
      // Format order items
      const formattedOrderItems = updatedOrderData.orderItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: Number(item.price || 0),
        product: {
          id: item.product.id,
          name: item.product.name,
          price: Number(item.product.price || 0),
          images: item.product.images || ''
        }
      }));
      
      // Create a properly formatted order object
      const formattedOrder: AdminOrder = {
        id: updatedOrderData.id,
        // Important: If createdAt is a string, convert it to a Date object
        createdAt: typeof updatedOrderData.createdAt === 'string' 
          ? new Date(updatedOrderData.createdAt) 
          : updatedOrderData.createdAt,
        status: updatedOrderData.status as OrderStatus,
        totalAmount: Number(updatedOrderData.totalAmount || 0),
        shippingAddress: updatedOrderData.shippingAddress || '{}',
        stripeSessionId: updatedOrderData.stripeSessionId || 'N/A',
        orderItems: formattedOrderItems,
        user: updatedOrderData.user,
        paymentInfo: paymentInfo
      };
      
      setOrder(formattedOrder);
      
      // Send email notification
      setEmailSending(true);
      try {
        await sendOrderStatusEmail(orderId, `Order ${newStatus.toLowerCase()}`);
        alert(`Status updated and notification email sent!`);
      } catch (emailErr) {
        alert(`Status updated but failed to send email: ${emailErr instanceof Error ? emailErr.message : 'An error occurred'}`);
      } finally {
        setEmailSending(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setUpdatingStatus(false);
    }
  };
  
  const handleSendEmail = async (emailType: string) => {
    try {
      setEmailSending(true);
      await sendOrderStatusEmail(orderId, emailType);
      alert(`${emailType} email has been sent!`);
    } catch (err) {
      alert(`Error sending email: ${err instanceof Error ? err.message : 'An error occurred'}`);
    } finally {
      setEmailSending(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const renderStatusActions = () => {
    if (!order) return null;
    
    const currentStatus = order.status.toLowerCase();
    
    return (
      <div className="flex flex-wrap gap-2">
        {currentStatus === 'pending' && (
          <button
            onClick={() => handleUpdateStatus('PROCESSING')}
            disabled={updatingStatus || emailSending}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
          >
            <Package className="w-4 h-4 mr-2" />
            Start Processing
          </button>
        )}
        
        {currentStatus === 'processing' && (
          <button
            onClick={() => handleUpdateStatus('SHIPPED')}
            disabled={updatingStatus || emailSending}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:opacity-50"
          >
            <Truck className="w-4 h-4 mr-2" />
            Mark as Shipped
          </button>
        )}
        
        {currentStatus === 'shipped' && (
          <button
            onClick={() => handleUpdateStatus('DELIVERED')}
            disabled={updatingStatus || emailSending}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Delivered
          </button>
        )}
        
        {!['cancelled', 'delivered'].includes(currentStatus) && (
          <button
            onClick={() => handleUpdateStatus('CANCELLED')}
            disabled={updatingStatus || emailSending}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Order
          </button>
        )}
        
        <button
          onClick={() => handleSendEmail('Status Update')}
          disabled={emailSending}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Manual Email
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Order Details</h3>
          <p className="text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Order</h3>
          <p className="text-gray-500 mb-4">{error || 'Order not found'}</p>
          <Link
            href="/admin/orders"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // Parse shipping address from JSON string if needed
  const shippingAddress = typeof order.shippingAddress === 'string' 
    ? JSON.parse(order.shippingAddress) as ShippingDetails
    : order.shippingAddress as ShippingDetails;
    
  // Ensure phone number is available (for backward compatibility)
  if (!shippingAddress.phone && typeof order.shippingAddress === 'string') {
    try {
      // Try to extract phone from JSON if it might be in a different format
      const parsedAddress = JSON.parse(order.shippingAddress);
      shippingAddress.phone = parsedAddress.phone || '';
    } catch (e) {
      console.error('Error parsing shipping address:', e);
    }
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <Link
        href="/admin/orders"
        className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Orders
      </Link>

      {/* Order Header */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Order #{orderId}</h1>
            <p className="text-sm text-gray-500">
        {/* Add debugging */}
        {console.log('Order Header Date:', order.createdAt)}
        {formatDate(order.createdAt)}
      </p>
      </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="ml-1.5">{order.status}</span>
            </div>
            {renderStatusActions()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.orderItems.map((item) => {
                const images = typeof item.product.images === 'string' 
                  ? JSON.parse(item.product.images) 
                  : item.product.images;
                
                const imageUrl = Array.isArray(images) && images.length > 0 
                  ? images[0] 
                  : '/api/placeholder/80/80';
                
                return (
                  <div key={item.id} className="p-6 flex items-center">
                    <div className="flex-shrink-0 relative w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-center object-cover"
                      />
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link href={`/products/${item.product.id}`}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          £{Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
            </div>
            <div className="p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                  <dd className="mt-1 text-sm text-gray-900">Credit Card</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.paymentInfo?.paymentId || order.stripeSessionId || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Paid
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(order.paymentInfo?.paymentDate || order.createdAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Customer</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{order.user?.name || 'Customer'}</h3>
                  <p className="text-sm text-gray-500">{order.user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
            </div>
            <div className="p-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-900">
                  {`${shippingAddress.firstName} ${shippingAddress.lastName}` || order.user?.name || 'Customer'}
                </p>
                {shippingAddress.phone && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Phone:</span> {shippingAddress.phone}
                  </p>
                )}
                <p className="text-sm text-gray-500">{shippingAddress.address}</p>
                {shippingAddress.apartment && (
                  <p className="text-sm text-gray-500">{shippingAddress.apartment}</p>
                )}
                <p className="text-sm text-gray-500">
                  {shippingAddress.city}, {shippingAddress.postalCode}
                </p>
                <p className="text-sm text-gray-500">{shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            </div>
            <div className="p-6">
              <dl className="space-y-3">
                <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Subtotal</dt>
                  <dd className="text-sm text-gray-900">£{Number(order.totalAmount).toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Shipping</dt>
                  <dd className="text-sm text-gray-900">£0.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Tax</dt>
                  <dd className="text-sm text-gray-900">£0.00</dd>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-900">Total</dt>
                  <dd className="text-sm font-medium text-gray-900">£{Number(order.totalAmount).toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}