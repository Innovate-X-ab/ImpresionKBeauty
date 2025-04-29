// src/app/admin/orders/[orderId]/OrderDetail.tsx
'use client';

import React, { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Send,
  XCircle,
  Clock,
  RefreshCw,
  X
} from 'lucide-react';
import { getOrderDetails, updateOrderStatus, sendCustomEmail } from '@/app/actions/admin/orders';
import { AdminOrder, ShippingDetails } from '@/types/order';
// Import email template functions directly for preview
// Ensure the path is correct for your project structure
import { orderShippedTemplate, orderDeliveredTemplate } from '@/lib/email/templates/orderStatus'; // Adjusted path


// Define OrderStatus as a string union type for client-side use
type ClientOrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface FormattedOrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string;
  };
}



interface OrderDetailClientProps {
  orderId: string;
}

// Helper function to format dates consistently
const formatDate = (dateInput: string | Date | null | undefined): string => {
  // Log the input received by formatDate
  console.log('[Client Component] formatDate input:', dateInput, typeof dateInput);

  if (!dateInput) {
    console.warn('[Client Component] formatDate received null or undefined input.');
    return 'N/A';
  }

  try {
    // Attempt to create a Date object. Handles ISO strings and Date objects.
    const date = new Date(dateInput);

    // Check if the created date is valid
    if (isNaN(date.getTime())) {
      console.warn('[Client Component] Invalid date created from input:', dateInput);
      return 'Invalid Date';
    }

    // Format the valid date
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC' // Specify UTC or your desired timezone if needed
    }).format(date);
  } catch (error) {
    console.error('[Client Component] Date formatting error:', error, 'Input:', dateInput);
    return 'Formatting Error';
  }
};


export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  // State for Modals
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [emailPreviewContent, setEmailPreviewContent] = useState('');
  const [emailPreviewSubject, setEmailPreviewSubject] = useState('');
  // Use the client-side string union type for statusToUpdate
  const [statusToUpdate, setStatusToUpdate] = useState<ClientOrderStatus | null>(null);

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualEmailSubject, setManualEmailSubject] = useState('');
  const [manualEmailBody, setManualEmailBody] = useState('');


  // Fetch order details on component mount
  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        setError(null);
        console.log(`[Client Component] Fetching order details for ID: ${orderId}`);
        const orderData: AdminOrder = await getOrderDetails(orderId);
        console.log('[Client Component] Received orderData:', orderData); // Log received data

        // Check if orderData is valid
        if (!orderData || !orderData.id) {
          throw new Error('Order data is incomplete or missing.');
        }

        // Log the dates received from the server action
        console.log('[Client Component] Received createdAt:', orderData.createdAt);
        console.log('[Client Component] Received paymentInfo.paymentDate:', orderData.paymentInfo?.paymentDate);


        const formattedOrderItems = (orderData.orderItems || []).map((item: FormattedOrderItem) => ({
          id: item.id,
          quantity: item.quantity,
          price: Number(item.price || 0),
          product: {
            id: item.product?.id || 'unknown',
            name: item.product?.name || 'Unknown Product',
            price: Number(item.product?.price || 0),
            images: item.product?.images || ''
          }
        }));

        // Construct the AdminOrder object for state
        const formattedOrder: AdminOrder = {
          id: orderData.id,
          // Ensure createdAt is a Date object or a valid string for the Date constructor
          createdAt: orderData.createdAt ? new Date(orderData.createdAt) : new Date(0), // Attempt to create Date object
          status: orderData.status as ClientOrderStatus, // Cast here
          totalAmount: Number(orderData.totalAmount || 0),
          shippingAddress: orderData.shippingAddress || '{}',
          stripeSessionId: orderData.stripeSessionId || 'N/A',
          orderItems: formattedOrderItems,
          user: orderData.user || { id: 'unknown', name: 'Unknown User', email: 'unknown@example.com' },
          // Ensure paymentInfo and its date are handled correctly
          paymentInfo: orderData.paymentInfo ? {
            ...orderData.paymentInfo,
            paymentId: orderData.stripeSessionId || 'N/A', // Use stripeSessionId if paymentId missing
            paymentDate: orderData.paymentInfo.paymentDate // Keep the date string as received
          } : {
            paymentId: orderData.stripeSessionId || 'N/A',
            paymentMethod: 'N/A',
            paymentStatus: 'N/A',
            paymentDate: orderData.createdAt // Fallback to order creation date string
          }
        };

        // Log the formatted order object before setting state
        console.log('[Client Component] Formatted order object:', formattedOrder);
        console.log('[Client Component] Formatted createdAt:', formattedOrder.createdAt);
        console.log('[Client Component] Formatted paymentInfo.paymentDate:', formattedOrder.paymentInfo?.paymentDate);


        setOrder(formattedOrder);
      } catch (err) {
        console.error('[Client Component] Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while loading the order.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  // Function to handle opening the preview modal
  // Use ClientOrderStatus type for newStatus parameter
  const handleOpenPreviewModal = (newStatus: ClientOrderStatus) => {
    if (!order || !order.user) return;

    let subject = '';
    let content = '';
    // Ensure template data matches expected structure
    const templateData = {
        orderNumber: order.id,
        customerName: order.user.name || 'Customer',
        trackingNumber: 'PENDING', // Placeholder
        trackingUrl: '#', // Placeholder
        estimatedDelivery: '3-5 business days' // Placeholder
    };

    // Use string literals for comparison
    if (newStatus === 'SHIPPED') {
      subject = `Your Order #${order.id} Has Been Shipped!`;
      content = orderShippedTemplate(templateData);
    } else if (newStatus === 'DELIVERED') {
      subject = `Your Order #${order.id} Has Been Delivered!`;
      content = orderDeliveredTemplate(templateData);
    }

    setEmailPreviewSubject(subject);
    setEmailPreviewContent(content);
    setStatusToUpdate(newStatus); // Store the string status
    setIsPreviewModalOpen(true);
  };

  // Function to confirm status update from preview modal
  const handleConfirmStatusUpdate = async () => {
    if (!statusToUpdate) return; // statusToUpdate is now a string literal

    setIsPreviewModalOpen(false);
    setUpdatingStatus(true);
    setError(null);

    try {
      // Pass the string status to the server action
      const updatedOrderData = await updateOrderStatus(orderId, statusToUpdate);
      console.log('[Client Component] Received updatedOrderData:', updatedOrderData); // Log update response


      if (!updatedOrderData || !updatedOrderData.id) {
         throw new Error('Failed to receive valid updated order data.');
      }

      // Log dates from updated data
      console.log('[Client Component] Updated createdAt:', updatedOrderData.createdAt);
      console.log('[Client Component] Updated paymentInfo.paymentDate:', updatedOrderData.paymentInfo?.paymentDate);


      const formattedOrderItems = (updatedOrderData.orderItems || []).map((item: FormattedOrderItem) => ({
        id: item.id,
        quantity: item.quantity,
        price: Number(item.price || 0),
        product: {
          id: item.product?.id || 'unknown',
          name: item.product?.name || 'Unknown Product',
          price: Number(item.product?.price || 0),
          images: item.product?.images || ''
        }
      }));

      // Reconstruct the AdminOrder object after update
      const formattedOrder: AdminOrder = {
        id: updatedOrderData.id,
        createdAt: updatedOrderData.createdAt ? new Date(updatedOrderData.createdAt) : new Date(0), // Attempt to create Date object
        status: updatedOrderData.status as ClientOrderStatus, // Cast here
        totalAmount: Number(updatedOrderData.totalAmount || 0),
        shippingAddress: updatedOrderData.shippingAddress || '{}',
        stripeSessionId: updatedOrderData.stripeSessionId || 'N/A',
        orderItems: formattedOrderItems,
        user: updatedOrderData.user || { id: 'unknown', name: 'Unknown User', email: 'unknown@example.com' },
        paymentInfo: updatedOrderData.paymentInfo ? {
            ...updatedOrderData.paymentInfo,
            paymentId: updatedOrderData.stripeSessionId || 'N/A',
            paymentDate: updatedOrderData.paymentInfo.paymentDate // Keep as string
          } : {
            paymentId: updatedOrderData.stripeSessionId || 'N/A',
            paymentMethod: 'N/A',
            paymentStatus: 'N/A',
            paymentDate: updatedOrderData.createdAt // Fallback to order creation date string
          }
      };

      // Log the formatted order object before setting state after update
      console.log('[Client Component] Formatted order after update:', formattedOrder);


      setOrder(formattedOrder);
      alert(`Order status updated to ${statusToUpdate} and email notification sent.`);

    } catch (err) {
      console.error(`[Client Component] Error updating status to ${statusToUpdate}:`, err);
      setError(err instanceof Error ? err.message : `Failed to update status to ${statusToUpdate}.`);
    } finally {
      setUpdatingStatus(false);
      setStatusToUpdate(null);
    }
  };

  // Function to open manual email modal
   const handleOpenManualEmailModal = () => {
     if (!order) return;
     setManualEmailSubject(`Regarding your order #${order.id}`);
     setManualEmailBody(`<p>Hello ${order.user?.name || 'Customer'},</p><p><br></p><p>Regarding your recent order...</p><p><br></p><p>Best regards,<br>Impression K Beauty</p>`);
     setIsManualModalOpen(true);
   };

  // Function to send custom email from manual modal
   const handleSendCustomEmail = async () => {
     if (!order) return;
     setEmailSending(true);
     setError(null);
     try {
       const result = await sendCustomEmail(orderId, manualEmailSubject, manualEmailBody);
       if (result.success) {
         alert('Custom email sent successfully!');
         setIsManualModalOpen(false);
       } else {
         throw new Error(result.message || 'Failed to send custom email.');
       }
     } catch (err) {
       console.error('[Client Component] Error sending custom email:', err);
       setError(err instanceof Error ? err.message : 'Failed to send custom email.');
     } finally {
       setEmailSending(false);
     }
   };


  // Helper to get badge color based on status
  const getStatusBadgeColor = (status: string = 'UNKNOWN') => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper to get icon based on status
  const getStatusIcon = (status: string = 'UNKNOWN') => {
    switch (status.toUpperCase()) {
      case 'PENDING': return <Clock className="w-5 h-5" />;
      case 'PROCESSING': return <Package className="w-5 h-5" />;
      case 'SHIPPED': return <Truck className="w-5 h-5" />;
      case 'DELIVERED': return <CheckCircle className="w-5 h-5" />;
      case 'CANCELLED': return <XCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  // Render action buttons based on current status
  const renderStatusActions = () => {
    if (!order) return null;
    const currentStatus = order.status.toUpperCase();

    return (
      <div className="flex flex-wrap gap-2">
        {currentStatus === 'PENDING' && (
          <button
            onClick={() => { setStatusToUpdate('PROCESSING'); handleConfirmStatusUpdate(); }}
            disabled={updatingStatus}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
          >
            <Package className="w-4 h-4 mr-2" />
            Start Processing
          </button>
        )}

        {currentStatus === 'PROCESSING' && (
          <button
            onClick={() => handleOpenPreviewModal('SHIPPED')}
            disabled={updatingStatus}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:opacity-50"
          >
            <Truck className="w-4 h-4 mr-2" />
            Mark as Shipped
          </button>
        )}

        {currentStatus === 'SHIPPED' && (
          <button
            onClick={() => handleOpenPreviewModal('DELIVERED')}
            disabled={updatingStatus}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Delivered
          </button>
        )}

        {!['CANCELLED', 'DELIVERED'].includes(currentStatus) && (
          <button
            onClick={() => {
                if (window.confirm('Are you sure you want to cancel this order? This action might not send an email notification.')) {
                    setStatusToUpdate('CANCELLED');
                    handleConfirmStatusUpdate();
                }
            }}
            disabled={updatingStatus}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Order
          </button>
        )}

        {/* Manual Email Send Button */}
        <button
          onClick={handleOpenManualEmailModal}
          disabled={emailSending}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Manual Email
        </button>
      </div>
    );
  };

  // Loading State UI
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

  // Error State UI
  if (error || !order) {
    return (
        <div className="p-6">
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Order</h3>
                <p className="text-gray-500 mb-4">{error || 'Order data could not be loaded.'}</p>
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

  // Parse shipping address safely
  let shippingAddress: ShippingDetails | null = null;
  try {
    if (typeof order.shippingAddress === 'string' && order.shippingAddress.trim() !== '{}' && order.shippingAddress.trim() !== '') {
      shippingAddress = JSON.parse(order.shippingAddress);
    } else if (typeof order.shippingAddress === 'object' && order.shippingAddress !== null) {
      shippingAddress = order.shippingAddress as ShippingDetails;
    }
  } catch (e) {
    console.error('[Client Component] Error parsing shipping address:', e);
  }

  // Main component render
  return (
    <>
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
              <h1 className="text-xl font-semibold text-gray-900">Order #{order.id}</h1>
              {/* Use formatDate for the order date display */}
              <p className="text-sm text-gray-500">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Details Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {order.orderItems.map((item) => {
                  let imageUrl = '/api/placeholder/80/80';
                  try {
                    const images = typeof item.product.images === 'string'
                      ? JSON.parse(item.product.images)
                      : item.product.images;
                    if (Array.isArray(images) && images.length > 0) {
                      imageUrl = images[0];
                    }
                  } catch (e) { console.error('[Client Component] Error parsing product images:', e); }

                  return (
                    <div key={item.id} className="p-6 flex items-center">
                      <div className="flex-shrink-0 relative w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                        <Image src={imageUrl} alt={item.product.name} fill sizes="80px" className="object-center object-cover" />
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">£{Number(item.price).toFixed(2)}</p>
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
                    <dd className="mt-1 text-sm text-gray-900">{order.paymentInfo?.paymentMethod || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Payment ID</dt>
                    {/* Display Stripe Session ID here */}
                    <dd className="mt-1 text-sm text-gray-900 break-all">{order.stripeSessionId || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.paymentInfo?.paymentStatus || 'Paid'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Payment Date</dt>
                    {/* Use formatDate for the payment date */}
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(order.paymentInfo?.paymentDate)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900">Customer</h2>
              </div>
              <div className="p-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-900">{order.user?.name || 'Customer'}</h3>
                  <p className="text-sm text-gray-500 break-all">{order.user?.email}</p>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            {shippingAddress && (
               <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                 <div className="border-b border-gray-200 px-6 py-4">
                   <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
                 </div>
                 <div className="p-6">
                   <div className="space-y-1">
                     <p className="text-sm text-gray-900">
                       {`${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim() || order.user?.name || 'Customer'}
                     </p>
                     {shippingAddress.phone && ( <p className="text-sm text-gray-500"><span className="font-medium">Phone:</span> {shippingAddress.phone}</p> )}
                     <p className="text-sm text-gray-500">{shippingAddress.address || 'N/A'}</p>
                     {shippingAddress.apartment && ( <p className="text-sm text-gray-500">{shippingAddress.apartment}</p> )}
                     <p className="text-sm text-gray-500">{`${shippingAddress.city || ''}, ${shippingAddress.postalCode || ''}`.trim() || 'N/A'}</p>
                     <p className="text-sm text-gray-500">{shippingAddress.country || 'N/A'}</p>
                   </div>
                 </div>
               </div>
             )}

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

      {/* --- Email Preview Modal --- */}
      <Transition appear show={isPreviewModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsPreviewModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                    <span>Email Preview: {emailPreviewSubject}</span>
                     <button onClick={() => setIsPreviewModalOpen(false)} className="text-gray-400 hover:text-gray-600"> <X className="w-5 h-5" /> </button>
                  </Dialog.Title>
                  <div className="mt-4 max-h-96 overflow-y-auto border rounded p-4">
                    <div dangerouslySetInnerHTML={{ __html: emailPreviewContent }} />
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsPreviewModalOpen(false)}> Cancel </button>
                    <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50" onClick={handleConfirmStatusUpdate} disabled={updatingStatus}>
                      {updatingStatus ? 'Updating...' : `Confirm & Send ${statusToUpdate} Email`}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* --- Manual Email Modal --- */}
       <Transition appear show={isManualModalOpen} as={Fragment}>
         <Dialog as="div" className="relative z-50" onClose={() => setIsManualModalOpen(false)}>
           <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
             <div className="fixed inset-0 bg-black bg-opacity-25" />
           </Transition.Child>
           <div className="fixed inset-0 overflow-y-auto">
             <div className="flex min-h-full items-center justify-center p-4 text-center">
               <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                 <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                   <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                     <span>Send Manual Email</span>
                     <button onClick={() => setIsManualModalOpen(false)} className="text-gray-400 hover:text-gray-600"> <X className="w-5 h-5" /> </button>
                   </Dialog.Title>
                   <div className="mt-4 space-y-4">
                     {error && ( <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm"> {error} </div> )}
                     <div>
                       <label htmlFor="manualSubject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                       <input type="text" id="manualSubject" value={manualEmailSubject} onChange={(e) => setManualEmailSubject(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black" />
                     </div>
                     <div>
                       <label htmlFor="manualBody" className="block text-sm font-medium text-gray-700 mb-1">Body (HTML)</label>
                       <textarea id="manualBody" value={manualEmailBody} onChange={(e) => setManualEmailBody(e.target.value)} rows={10} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-black" placeholder="Enter email body as HTML..." />
                     </div>
                   </div>
                   <div className="mt-6 flex justify-end space-x-3">
                     <button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsManualModalOpen(false)}> Cancel </button>
                     <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50" onClick={handleSendCustomEmail} disabled={emailSending || !manualEmailSubject || !manualEmailBody}>
                       {emailSending ? 'Sending...' : 'Send Custom Email'}
                     </button>
                   </div>
                 </Dialog.Panel>
               </Transition.Child>
             </div>
           </div>
         </Dialog>
       </Transition>

    </>
  );
}