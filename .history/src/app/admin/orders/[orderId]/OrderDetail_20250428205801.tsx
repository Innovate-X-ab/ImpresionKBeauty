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
// Import AdminOrder and ShippingDetails from types/order
import { AdminOrder, ShippingDetails } from '@/types/order';
// Import OrderStatus directly from Prisma client
import { OrderStatus } from '@prisma/client';
import { orderShippedTemplate, orderDeliveredTemplate } from '@/lib/email/templates/orderStatus';
import { Decimal } from '@prisma/client/runtime/library'; // Keep Decimal import

// Define OrderStatus as a string union type for client-side use (can be derived from Prisma's OrderStatus if needed)
type ClientOrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// Interface for the items *after* formatting in the client
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

// Define an interface for the raw data structure *potentially* received from server actions
// This acknowledges that prices might still be Decimal types or numbers
interface RawServerOrderData {
  id: string;
  createdAt: string; // Date as ISO string
  status: OrderStatus;
  totalAmount: number | Decimal; // Could be number or Decimal
  shippingAddress: string | ShippingDetails;
  stripeSessionId?: string;
  paymentInfo?: {
    paymentId: string;
    paymentMethod: string;
    paymentStatus: string;
    paymentDate: string; // Date as ISO string
  };
  orderItems: Array<{
    id: string;
    quantity: number;
    price: number | Decimal; // Price could be number or Decimal
    product: {
      id: string;
      name: string;
      price: number | Decimal; // Price could be number or Decimal
      images: string;
      // Add other product fields if they exist in the raw data
    };
    // Add other order item fields if they exist
  }>;
  user: {
    id: string;
    name: string | null;
    email: string;
    // Add other user fields if they exist
  };
  // Add other top-level fields if they exist
}


interface OrderDetailClientProps {
  orderId: string;
}

// Helper function to format dates consistently
const formatDate = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) {
    return 'N/A';
  }
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    }).format(date);
  } catch (error) {
    console.error('[Client Component] Date formatting error:', error, 'Input:', dateInput);
    return 'Formatting Error';
  }
};

// Helper function to safely convert Decimal to number
const toNumber = (value: number | Decimal | undefined | null): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    // Check if it's a Decimal-like object before calling toNumber
    if (typeof value === 'object' && value !== null && 'toNumber' in value && typeof (value as Decimal).toNumber === 'function') {
         return (value as Decimal).toNumber();
    }
    // Fallback for unexpected types, attempt conversion
    const num = Number(value);
    return isNaN(num) ? 0 : num;
};


export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [emailPreviewContent, setEmailPreviewContent] = useState('');
  const [emailPreviewSubject, setEmailPreviewSubject] = useState('');
  const [statusToUpdate, setStatusToUpdate] = useState<ClientOrderStatus | null>(null);

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualEmailSubject, setManualEmailSubject] = useState('');
  const [manualEmailBody, setManualEmailBody] = useState('');

  // Helper function to process raw order data from server actions
  // This function converts the data to match the AdminOrder type definition
  // Parameter type is now RawServerOrderData
  const processOrderData = (rawData: RawServerOrderData): AdminOrder => {

    // Process order items, ensuring prices are numbers
    const processedOrderItems = (rawData.orderItems || []).map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: toNumber(item.price), // Convert Decimal/number to number
      product: {
        id: item.product.id,
        name: item.product.name,
        price: toNumber(item.product.price), // Convert Decimal/number to number
        images: item.product.images
      }
    }));

    // Convert date strings to Date objects
    const processedCreatedAt = new Date(rawData.createdAt);
    const processedPaymentDate = rawData.paymentInfo?.paymentDate ? new Date(rawData.paymentInfo.paymentDate) : processedCreatedAt;

    // Construct the final AdminOrder object
    return {
      id: rawData.id,
      createdAt: processedCreatedAt, // Assign Date object
      status: rawData.status,
      totalAmount: toNumber(rawData.totalAmount), // Convert Decimal/number to number
      shippingAddress: rawData.shippingAddress,
      stripeSessionId: rawData.stripeSessionId,
      paymentInfo: rawData.paymentInfo ? {
        ...rawData.paymentInfo,
        paymentDate: processedPaymentDate // Assign Date object
      } : undefined,
      orderItems: processedOrderItems,
      user: rawData.user
    };
  };


  // Fetch order details on component mount
  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        setError(null);
        console.log(`[Client Component] Fetching order details for ID: ${orderId}`);
        // Fetch raw data - remove the problematic cast
        const rawOrderData = await getOrderDetails(orderId);
        console.log('[Client Component] Received raw orderData:', rawOrderData);

        if (!rawOrderData || !rawOrderData.id) {
          throw new Error('Order data is incomplete or missing.');
        }

        // Process the raw data to conform to the AdminOrder type
        // Pass the raw data (which might have Decimals) to the processing function
        const processedOrder = processOrderData(rawOrderData as RawServerOrderData); // Cast here is safer as processOrderData handles the structure
        console.log('[Client Component] Processed order object:', processedOrder);

        // Set the state with the processed data
        setOrder(processedOrder);

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
  const handleOpenPreviewModal = (newStatus: ClientOrderStatus) => {
    if (!order || !order.user) return;

    let subject = '';
    let content = '';
    const templateData = {
        orderNumber: order.id,
        customerName: order.user.name || 'Customer',
        trackingNumber: 'PENDING',
        trackingUrl: '#',
        estimatedDelivery: '3-5 business days'
    };

    if (newStatus === 'SHIPPED') {
      subject = `Your Order #${order.id} Has Been Shipped!`;
      content = orderShippedTemplate(templateData);
    } else if (newStatus === 'DELIVERED') {
      subject = `Your Order #${order.id} Has Been Delivered!`;
      content = orderDeliveredTemplate(templateData);
    }

    setEmailPreviewSubject(subject);
    setEmailPreviewContent(content);
    setStatusToUpdate(newStatus);
    setIsPreviewModalOpen(true);
  };

  // Function to confirm status update from preview modal
  const handleConfirmStatusUpdate = async () => {
    if (!statusToUpdate) return;

    setIsPreviewModalOpen(false);
    setUpdatingStatus(true);
    setError(null);

    try {
      // Call the server action - remove the problematic cast
      const rawUpdatedOrderData = await updateOrderStatus(orderId, statusToUpdate);
      console.log('[Client Component] Received raw updatedOrderData:', rawUpdatedOrderData);

      if (!rawUpdatedOrderData || !rawUpdatedOrderData.id) {
         throw new Error('Failed to receive valid updated order data.');
      }

      // Process the raw updated data
      const processedUpdatedOrder = processOrderData(rawUpdatedOrderData as RawServerOrderData); // Cast here is safer
      console.log('[Client Component] Processed order after update:', processedUpdatedOrder);

      // Set the state with the processed updated data
      setOrder(processedUpdatedOrder);

      console.log(`Order status updated to ${statusToUpdate} and email notification sent.`);
      // alert(`Order status updated to ${statusToUpdate} and email notification sent.`); // Consider replacing alert

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
         alert('Custom email sent successfully!'); // Replace with better notification
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

    const actions: { status: ClientOrderStatus, label: string, icon: React.ReactNode, color: string, nextStatus?: ClientOrderStatus }[] = [
        { status: 'PENDING', label: 'Start Processing', icon: <Package className="w-4 h-4 mr-2" />, color: 'bg-blue-600 hover:bg-blue-700', nextStatus: 'PROCESSING' },
        { status: 'PROCESSING', label: 'Mark as Shipped', icon: <Truck className="w-4 h-4 mr-2" />, color: 'bg-purple-600 hover:bg-purple-700', nextStatus: 'SHIPPED' },
        { status: 'SHIPPED', label: 'Mark as Delivered', icon: <CheckCircle className="w-4 h-4 mr-2" />, color: 'bg-green-600 hover:bg-green-700', nextStatus: 'DELIVERED' },
    ];

    const currentAction = actions.find(a => a.status === currentStatus);

    return (
      <div className="flex flex-wrap gap-2">
        {currentAction && currentAction.nextStatus && (
          <button
            onClick={() => ['SHIPPED', 'DELIVERED'].includes(currentAction.nextStatus!)
              ? handleOpenPreviewModal(currentAction.nextStatus!)
              : (() => { setStatusToUpdate(currentAction.nextStatus!); handleConfirmStatusUpdate(); })()
            }
            disabled={updatingStatus}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${currentAction.color} focus:outline-none disabled:opacity-50`}
          >
            {currentAction.icon}
            {currentAction.label}
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
              {/* Use formatDate - it now accepts Date objects */}
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
                {/* Map over order.orderItems - type should be inferred correctly now */}
                {/* Keep the FormattedOrderItem annotation as the data is processed */}
                {(order.orderItems || []).map((item: FormattedOrderItem) => {
                  let imageUrl = '/api/placeholder/80/80';
                  try {
                    const images = JSON.parse(item.product.images);
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
                    <dd className="mt-1 text-sm text-gray-900 break-all">{order.stripeSessionId || order.paymentInfo?.paymentId || 'N/A'}</dd>
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
                    {/* Use formatDate - it now accepts Date objects */}
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