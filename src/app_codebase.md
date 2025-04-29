# app\about\page.tsx

```tsx
//app/about/page.tsx
'use client';
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Image from 'next/image';
import { Heart, Shield, Truck, Medal } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-light text-black mb-6">About Impression K Beauty</h1>
            <p className="text-lg text-gray-600 mb-8">
              We believe in the transformative power of Korean beauty products and their 
              innovative approach to skincare. Our mission is to bring the best of K-beauty 
              to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Authentic Products",
                description: "We source directly from Korea to ensure 100% authentic products"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Quality Assured",
                description: "Every product is carefully vetted for quality and effectiveness"
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Fast Delivery",
                description: "Quick and reliable shipping to your doorstep"
              },
              {
                icon: <Medal className="w-8 h-8" />,
                title: "Expert Curation",
                description: "Products selected by skincare experts"
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-block p-3 bg-white rounded-full shadow-sm mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, Impression K Beauty was born from a passion for Korean 
                skincare and beauty products. We understand that everyone&apos;s skin is unique, 
                which is why we carefully curate our selection to cater to all skin types 
                and concerns.
              </p>
              <p className="text-gray-600">
                Our team of experts works directly with Korean manufacturers and brands 
                to bring you the latest innovations in K-beauty. We believe in transparent 
                pricing, authentic products, and exceptional customer service.
              </p>
            </div>
            <div className="relative h-96">
              <Image 
                src="/api/placeholder/600/800"
                alt="Our story"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Kim",
                role: "Founder & CEO",
                image: "/api/placeholder/400/400"
              },
              {
                name: "David Park",
                role: "Head of Product Curation",
                image: "/api/placeholder/400/400"
              },
              {
                name: "Emily Chen",
                role: "Beauty Expert",
                image: "/api/placeholder/400/400"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
```

# app\account\layout.tsx

```tsx
//app/account/layout.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { User, ShoppingBag, Heart, Settings } from 'lucide-react';

const accountLinks = [
  {
    label: 'Profile',
    href: '/account/profile',
    icon: User
  },
  {
    label: 'Orders',
    href: '/account/orders',
    icon: ShoppingBag
  },
  {
    label: 'Wishlist',
    href: '/account/wishlist',
    icon: Heart
  },
  {
    label: 'Settings',
    href: '/account/settings',
    icon: Settings
  }
];

export default function AccountLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-light mb-8 text-black">My Account</h1>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Navigation */}
              <aside className="w-full md:w-64">
                <nav className="space-y-1">
                  {accountLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon
                          className={`mr-3 h-5 w-5 ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 min-w-0">
                <div className="bg-white rounded-lg border border-gray-200">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

# app\account\orders\[orderId]\OrderDetailsLayout.tsx

```tsx
import React from 'react';

export default function OrderDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-gray-50">{children}</main>
      
    </>
  );
}
```

# app\account\orders\[orderId]\page.tsx

```tsx
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
  phone: string; // Add phone field
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
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </button>

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
                  {shippingAddress.phone && (
                    <p className="text-gray-600 mt-1 text-black">
                      Phone: {shippingAddress.phone}
                    </p>
                  )}
                  <p className="mt-2">{shippingAddress.address}</p>
                  {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                  <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
                  <p>{shippingAddress.country}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-black">
                <h2 className="text-lg font-medium mb-4 text-black">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-black">
                    <span>Subtotal</span>
                    <span>£{Number(order.totalAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-black">
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
                <h2 className="text-lg font-medium mb-2 text-black">Need Help?</h2>
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
```

# app\account\orders\page.tsx

```tsx
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Back Button - adjusted padding for mobile */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Package className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                {/* Order Header - stack on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                  <div>
                    <h2 className="text-base sm:text-lg font-medium text-gray-900">
                      Order #{order.id}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`self-start sm:self-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Items - adjusted for mobile */}
                <div className="space-y-4">
                  {order.orderItems && order.orderItems.map((item, index) => (
                    <div key={item.id || index} className="flex items-start sm:items-center">
                      <div className="flex-shrink-0 relative w-16 sm:w-20 h-16 sm:h-20">
                        <Image
                          src={getProductImage(item)}
                          alt={getProductName(item)}
                          fill
                          sizes="(max-width: 640px) 64px, 80px"
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 sm:ml-6 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {getProductName(item)}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-gray-900">
                          £{(Number(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer - stack on mobile */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
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
```

# app\account\profile\page.tsx

```tsx
//app/account/profile/page.tsx

'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+44 123 456 7890'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-black">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {!isEditing ? (
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-medium text-gray-900">{formData.name}</h3>
              <p className="text-gray-600">{formData.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <dl className="space-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{formData.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-black"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-black"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
```

# app\account\settings\page.tsx

```tsx
//app/account/settings/page.tsx

'use client';

import React, { useState } from 'react';
import { Bell, Lock, Mail } from 'lucide-react';

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password change
    console.log('Change password');
  };

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Password Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-medium">Password</h2>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Email Preferences */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-medium">Email Preferences</h2>
        </div>
        <div className="space-y-2 max-w-md">
          <p className="text-sm text-gray-500 mb-4">
            Choose what emails you&apos;d like to receive from us.
          </p>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.orderUpdates}
                onChange={() => handleNotificationChange('orderUpdates')}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Order Updates</span>
                <span className="block text-sm text-gray-500">Receive updates about your orders</span>
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.promotions}
                onChange={() => handleNotificationChange('promotions')}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Promotions</span>
                <span className="block text-sm text-gray-500">Receive emails about sales and special offers</span>
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationSettings.newsletter}
                onChange={() => handleNotificationChange('newsletter')}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Newsletter</span>
                <span className="block text-sm text-gray-500">Receive our weekly newsletter with skincare tips</span>
              </span>
            </label>
          </div>
          <button
            onClick={() => console.log('Save notification settings')}
            className="mt-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-medium">Push Notifications</h2>
        </div>
        <div className="max-w-md">
          <p className="text-sm text-gray-500 mb-4">
            Configure your browser notifications preferences.
          </p>
          <button
            onClick={() => console.log('Request notification permissions')}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Enable Push Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
```

# app\account\wishlist\page.tsx

```tsx
//app/account/wishlist/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

// Mock data - replace with actual API call
const wishlistItems = [
  {
    id: '1',
    name: 'COSRX Advanced Snail Mucin Power Essence',
    brand: 'COSRX',
    price: 21.99,
    image: '/api/placeholder/200/200',
    inStock: true
  },
  {
    id: '2',
    name: 'Beauty of Joseon Glow Serum',
    brand: 'Beauty of Joseon',
    price: 19.99,
    image: '/api/placeholder/200/200',
    inStock: false
  }
];

export default function WishlistPage() {
  const handleRemoveFromWishlist = (id: string) => {
    // TODO: Implement remove from wishlist functionality
    console.log('Remove from wishlist:', id);
  };

  const handleAddToCart = (id: string) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', id);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">My Wishlist</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-4">Save items you love for later.</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
          >
            Explore Products
          </Link>
        </div>
      ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {wishlistItems.map((item) => (
    <div 
      key={item.id} 
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-square relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-center object-cover"
        />
        {!item.inStock && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <p className="text-gray-900 font-medium">Out of Stock</p>
          </div>
        )}
      </div>

              <div className="p-4">
                <h3 className="text-sm text-gray-700 font-medium">{item.brand}</h3>
                <p className="mt-1 text-sm text-gray-900">{item.name}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">£{item.price.toFixed(2)}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

# app\actions\admin\orders.ts

```ts
//app/actions/admin/orders.ts

'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { OrderStatus, Order, OrderItem, User, Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { emailService } from '@/lib/email/service';
// Ensure templates are correctly imported (assuming they exist in lib/email/templates)
// import { orderShippedTemplate, orderDeliveredTemplate } from '@/lib/email/templates/orderStatus'; // Adjusted path

// Check if user is admin
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session;
}

// Type for Decimal-like objects
type DecimalLike = { toNumber: () => number; };
function isDecimalLike(obj: unknown): obj is DecimalLike {
  return obj !== null && typeof obj === 'object' && 'toNumber' in obj && typeof (obj as DecimalLike).toNumber === 'function';
}

// Helper function to convert Decimal values to numbers recursively
function serializeDecimalFields<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (isDecimalLike(obj)) return obj.toNumber() as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => serializeDecimalFields(item)) as unknown as T;
  if (typeof obj === 'object' && obj !== null) {
    const result = {} as Record<string, unknown>;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = serializeDecimalFields((obj as Record<string, unknown>)[key]);
      }
    }
    return result as unknown as T;
  }
  return obj;
}

// Define the complete order structure expected by email templates
interface CompleteOrder extends Order {
  user: User | null;
  orderItems: Array<OrderItem & { product: Product; }>;
}

// Get order details
export async function getOrderDetails(orderId: string) {
  try {
    await checkAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        orderItems: { include: { product: true } },
      },
    });
    if (!order) throw new Error('Order not found');

    // Log the raw date from Prisma
    console.log('[Server Action] Raw order.createdAt:', order.createdAt);

    // Serialize Decimal fields first
    const serializedOrderBase = serializeDecimalFields(order);

    // Construct the final serialized object, ensuring dates are ISO strings
    const serializedOrder = {
        ...serializedOrderBase,
        // Explicitly convert dates to ISO strings for consistent transfer
        createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt),
        updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : String(order.updatedAt),
    };

    // Construct paymentInfo using the original Date object before serialization
    const paymentInfo = {
      paymentId: order.stripeSessionId || 'N/A', // Use stripeSessionId from original order
      paymentMethod: 'Credit Card', // Assuming Stripe card payment
      paymentStatus: 'Paid', // Assuming payment is complete
      paymentDate: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt), // Ensure this is also an ISO string
    };

    // Log the serialized date being sent to the client
    console.log('[Server Action] Serialized createdAt:', serializedOrder.createdAt);
    console.log('[Server Action] paymentInfo.paymentDate:', paymentInfo.paymentDate);

    // Return the fully serialized order with paymentInfo
    return { ...serializedOrder, paymentInfo };
  } catch (error) {
    console.error('[Server Action] Error fetching order:', error);
    throw new Error(`Failed to fetch order details: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Get all orders
export async function getAllOrders() {
  try {
    await checkAdmin();
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        orderItems: { include: { product: { select: { id: true, name: true, price: true, images: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    // Format dates and serialize decimals before returning
    const ordersWithFormattedDates = orders.map(order => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    }));
    const serializedOrders = serializeDecimalFields(ordersWithFormattedDates);
    return serializedOrders;
  } catch (error) {
    console.error('[Server Action] Error fetching orders:', error);
    throw new Error(`Failed to fetch orders: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Update order status (and send standard email)
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await checkAdmin();
    const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status as OrderStatus)) throw new Error('Invalid status');

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, orderItems: { include: { product: true } } } // Include necessary relations
    });
    if (!existingOrder) throw new Error('Order not found');

    // Update the order status in the database
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
      include: { user: true, orderItems: { include: { product: true } } }, // Include relations again for the updated object
    });

    // Send standard email notification AFTER successful status update
    await sendOrderStatusEmailInternal(updatedOrder as CompleteOrder); // Pass the fully loaded updated order

    // Serialize Decimal fields BEFORE constructing paymentInfo
    const serializedUpdatedOrderBase = serializeDecimalFields(updatedOrder);

    // Construct the final serialized object, ensuring dates are ISO strings
    const serializedUpdatedOrder = {
        ...serializedUpdatedOrderBase,
        createdAt: updatedOrder.createdAt instanceof Date ? updatedOrder.createdAt.toISOString() : String(updatedOrder.createdAt),
        updatedAt: updatedOrder.updatedAt instanceof Date ? updatedOrder.updatedAt.toISOString() : String(updatedOrder.updatedAt),
    };


    // Construct paymentInfo using the original Date object before serialization
    const paymentInfo = {
        paymentId: updatedOrder.stripeSessionId || 'N/A',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        paymentDate: updatedOrder.createdAt instanceof Date ? updatedOrder.createdAt.toISOString() : String(updatedOrder.createdAt), // Use original creation date as ISO string
    };


    // Revalidate paths
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');
    revalidatePath(`/account/orders/${orderId}`);
    revalidatePath('/account/orders');

    // Return the fully serialized order *with* the constructed paymentInfo
    return { ...serializedUpdatedOrder, paymentInfo };

  } catch (error) {
    console.error('[Server Action] Error updating order status:', error);
    throw new Error(`Failed to update order status for ${orderId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Internal function to handle sending STANDARD status emails
async function sendOrderStatusEmailInternal(order: CompleteOrder) {
  if (!order.user?.email) {
    console.warn(`[Server Action] Cannot send status email for order ${order.id}: User email missing.`);
    return;
  }
  const customerEmail = order.user.email;
  const customerName = order.user.name || 'Valued Customer';

  // Prepare base data for templates, including customerName
  const baseEmailData = {
      orderNumber: order.id,
      customerName: customerName, // Pass customerName here
      // Add other common fields if needed by templates
      estimatedDelivery: '3-5 business days', // Example placeholder
      trackingNumber: 'N/A', // Example placeholder
      trackingUrl: '#', // Example placeholder
  };

  try {
    console.log(`[Server Action] Attempting to send status update email for order ${order.id} to ${customerEmail}, status: ${order.status}`);
    switch (order.status) {
      case OrderStatus.SHIPPED:
        // Pass necessary data to the template function
        await emailService.sendOrderShipped(customerEmail, {
          ...baseEmailData, // Include base data
          // Replace with actual tracking if available
        });
        console.log(`[Server Action] Shipped email queued for order ${order.id}`);
        break;
      case OrderStatus.DELIVERED:
         // Pass necessary data to the template function
        await emailService.sendOrderDelivered(customerEmail, {
          ...baseEmailData, // Include base data
        });
        console.log(`[Server Action] Delivered email queued for order ${order.id}`);
        break;
      default:
        console.log(`[Server Action] No standard email notification configured for status: ${order.status}`);
        break;
    }
  } catch (error) {
    console.error(`[Server Action] Error sending ${order.status} email for order ${order.id}:`, error);
    // Log error but don't block the main flow
  }
}

// Send a custom email
export async function sendCustomEmail(orderId: string, subject: string, htmlBody: string) {
  try {
    await checkAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { user: { select: { email: true, name: true } } }
    });
    if (!order || !order.user?.email) throw new Error('Order or user email not found');

    const customerEmail = order.user.email;
    await emailService.sendEmail({
      to: customerEmail,
      subject: subject,
      html: htmlBody,
      from: process.env.SMTP_USER // Ensure 'from' address is set
    });
    console.log(`[Server Action] Custom email sent successfully for order ${orderId} to ${customerEmail}`);
    return { success: true, message: `Custom email sent successfully to ${customerEmail}` };
  } catch (error) {
    console.error(`[Server Action] Error sending custom email for order ${orderId}:`, error);
    return { success: false, message: `Failed to send custom email: ${error instanceof Error ? error.message : String(error)}` };
  }
}

// Kept for potential backward compatibility or specific use cases.
export async function sendOrderStatusEmail(orderId: string, emailType: string) {
   try {
    await checkAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, orderItems: { include: { product: true } } }
    });
    if (!order || !order.user?.email) throw new Error('Order or user email not found');

    const customerName = order.user.name || 'Valued Customer';
    const baseEmailData = {
        orderNumber: order.id,
        customerName: customerName,
        estimatedDelivery: '3-5 business days', // Example placeholder
    };


    if (emailType.toLowerCase().includes('shipped')) {
       await emailService.sendOrderShipped(order.user.email, {
           ...baseEmailData,
           trackingNumber: 'MANUAL-TRACK-123',
           trackingUrl: '#'
        });
       console.log(`[Server Action] Manually triggered Shipped email for order ${order.id}`);
    } else if (emailType.toLowerCase().includes('delivered')) {
       await emailService.sendOrderDelivered(order.user.email, baseEmailData);
       console.log(`[Server Action] Manually triggered Delivered email for order ${order.id}`);
    } else {
       console.warn(`[Server Action] Unsupported manual email type: ${emailType}`);
       return { success: false, message: `Unsupported email type: ${emailType}` };
    }
    return { success: true, message: `${emailType} email queued successfully for ${order.user.email}` };
  } catch (error) {
    console.error(`[Server Action] Error sending manual email (${emailType}) for order ${orderId}:`, error);
    return { success: false, message: `Failed to send manual email: ${error instanceof Error ? error.message : String(error)}` };
  }
}
```

# app\admin\email\page.tsx

```tsx
// src/app/admin/email/page.tsx
'use client';

import EmailDashboard from '@/components/admin/EmailDashboard';
import EmailTemplateTester from '@/components/admin/EmailTemplateTester';

export default function EmailAdminPage() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <EmailDashboard />
      </div>
      <div>
        <EmailTemplateTester />
      </div>
    </div>
  );
} 
```

# app\admin\layout.tsx

```tsx
// src/app/admin/layout.tsx
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center mr-8">
                <Link 
                  href="/" 
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  Back to Site
                </Link>
              </div>

              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin/orders" className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </Link>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  href="/admin/orders"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Package className="h-5 w-5 mr-1" />
                  Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
```

# app\admin\orders\[orderSlug]\OrderDetail.tsx

```tsx
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
```

# app\admin\orders\[orderSlug]\OrderDetailLoader.tsx

```tsx
// src/app/admin/orders/[orderSlug]/OrderDetailLoader.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Dynamically import the OrderDetailClient component
const OrderDetailClient = dynamic(() => import('./OrderDetail'), {
  ssr: false,
  loading: () => <div className="p-6 text-center">Loading order details...</div>,
});

// This component no longer needs props, it reads from useParams
export default function OrderDetailLoader() {
  const params = useParams();

  // Extract the parameter using the new name 'orderSlug'
  // Ensure it's treated as a string
  const orderId = typeof params?.orderSlug === 'string' ? params.orderSlug : null;

  if (!orderId) {
    return <div className="p-6 text-center">Loading order ID...</div>;
  }

  // Pass the retrieved ID (still named orderId internally if desired)
  // to the actual detail component
  return <OrderDetailClient orderId={orderId} />;
}

```

# app\admin\orders\[orderSlug]\page.tsx

```tsx
// src/app/admin/orders/[orderSlug]/page.tsx
import React, { Suspense } from 'react';
// Ensure this import path is correct relative to this file
import OrderDetailLoader from './OrderDetailLoader';
// No Metadata or generateStaticParams needed for this approach

// This page component no longer needs props.
// It renders the loader which gets the ID via useParams.
export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render OrderDetailLoader WITHOUT passing any props */}
      <OrderDetailLoader />
    </Suspense>
  );
}
```

# app\admin\orders\OrdersList.tsx

```tsx
// src/app/admin/orders/OrdersList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Search, ChevronDown, MoreHorizontal, RefreshCw, XCircle } from 'lucide-react';
import { getAllOrders } from '@/app/actions/admin/orders';

// Update the formatDate function
const formatDate = (dateString: string | Date): string => {
  try {
    console.log("OrdersList formatDate input:", dateString);
    
    // Handle undefined or null case
    if (!dateString) {
      console.log("OrdersList: No date provided");
      return 'No date';
    }
    
    // If it's already a Date object, use it directly
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('OrdersList: Invalid date input:', dateString);
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
    console.error('OrdersList: Date formatting error:', error);
    return 'No date';
  }
};

// Update the Order interface
interface Order {
  id: string;
  createdAt: string | Date;  // Accept either string or Date objects
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

        console.log("OrdersList: First order data:", ordersData[0]);
        console.log("OrdersList: First order createdAt:", ordersData[0]?.createdAt);
        
        const formattedOrders = ordersData.map(order => {
          // Preserve the original createdAt string, don't create a Date object yet
          return {
            ...order,
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

        console.log("OrdersList: First formatted order createdAt:", formattedOrders[0]?.createdAt);
        setOrders(formattedOrders);
      } catch (err) {
        console.error('OrdersList: Error fetching orders:', err);
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
    let orderDate;
    try {
      orderDate = new Date(order.createdAt);
    } catch (e) {
      console.error("Error parsing order date:", e);
      orderDate = new Date(); // Fallback
    }
    
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

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Orders</h3>
          <p className="text-gray-500">Please wait while we fetch the orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Orders</h3>
          <p className="text-gray-500 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' || timeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'There are no orders yet.'}
          </p>
        </div>
      </div>
    );
  }

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
```

# app\admin\orders\page.tsx

```tsx
//app/admin/orders/page.tsx
import { Suspense } from 'react';
import OrdersClient from './OrdersList';

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrdersClient />
    </Suspense>
  );
}
```

# app\api\admin\email\metrics\route.ts

```ts
// src/app/api/admin/email/metrics/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// Define the interface for hourly volume data entries
interface HourlyVolumeEntry {
  hour: string;
  count: number;
}

// Define the type for an email log
interface EmailLog {
  createdAt: Date;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // We'll use placeholder metrics for now
    // You could integrate with your email service to get real metrics
    const metrics = {
      totalSent: 0,
      totalFailed: 0,
      deliveryRate: 0
    };
    
    // Generate hourly data for the last 24 hours
    const hourlyVolumeData: HourlyVolumeEntry[] = [];
    const now = new Date();
    
    // Looking at the schema, it seems 'createdAt' is a valid field we can use
    const emailLogs = await prisma.emailLog.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });
    
    // Group manually by hour
    const hourlyGroups = new Map<string, number>();
    
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date(now);
      hourDate.setHours(now.getHours() - i);
      const hourKey = hourDate.getHours().toString();
      hourlyGroups.set(hourKey, 0);
    }
    
    // Count emails per hour
    emailLogs.forEach((log: EmailLog) => {
      const logHour = new Date(log.createdAt).getHours().toString();
      if (hourlyGroups.has(logHour)) {
        hourlyGroups.set(logHour, hourlyGroups.get(logHour)! + 1);
      }
    });
    
    // Convert to array for response
    hourlyGroups.forEach((count, hour) => {
      hourlyVolumeData.push({
        hour,
        count
      });
    });

    return NextResponse.json({
      ...metrics,
      hourlyVolume: hourlyVolumeData,
    });
  } catch (error) {
    console.error('Error fetching email metrics:', error);
    return NextResponse.json(
      { error: 'Error fetching metrics' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\email\queue\route.ts

```ts
// src/app/api/admin/email/queue/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
//import { EmailService } from "@/lib/email/service";

interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

// Define this interface in a separate file or here if it's only used locally
interface QueueStatus {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
}

// Create a helper function to get queue status
function getQueueStatus(): QueueStatus {
  // This can be replaced with actual implementation accessing your email service
  return {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const queueStatus = getQueueStatus();
    return NextResponse.json(queueStatus);
  } catch (error) {
    console.error('Error fetching queue status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\email\retry\route.ts

```ts
// src/app/api/admin/email/retry/route.ts
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
//import { emailService } from "@/lib/email/service";

// Create a helper function to retry emails
async function retryEmail(emailId: string) {
  // Implement your email retry logic here
  // This would typically integrate with your actual email service
  console.log(`Attempting to retry email with ID: ${emailId}`);
  
  // For now, we'll just throw an error to simulate a failure
  throw new Error(`Failed to retry email with ID: ${emailId}`);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { emailId } = await request.json();
    await retryEmail(emailId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error retrying email:', error);
    return NextResponse.json(
      { error: 'Error retrying email' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\email\test\route.ts

```ts
// src/app/api/admin/email/test/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { emailService } from '@/lib/email/service';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { template, email } = await request.json();

    // Send test email based on template type
    switch(template) {
      case 'welcome':
        // Use queueEmail since there's no dedicated welcome email method
        await emailService.queueEmail(
          email, 
          'Welcome to Impression K Beauty', 
          `<p>Welcome to Impression K Beauty! Thank you for joining us.</p>`
        );
        break;
      
      case 'order-confirmation':
        await emailService.sendOrderConfirmation(
          email,
          {
            orderNumber: 'TEST-123',
            items: [
              { name: 'Test Product', quantity: 1, price: 29.99 }
            ],
            total: 29.99,
            shippingAddress: '123 Test St, Test City, TST 123'
          }
        );
        break;
      
      case 'shipping-confirmation':
        await emailService.sendOrderShipped(
          email,
          {
            orderNumber: 'TEST-123',
            trackingNumber: 'TRK123456789',
            trackingUrl: 'https://example.com/track'
          }
        );
        break;
      
      case 'delivery-confirmation':
        await emailService.sendOrderDelivered(
          email,
          {
            orderNumber: 'TEST-123'
          }
        );
        break;
      
      case 'password-reset':
        // Use queueEmail since there's no dedicated password reset method
        await emailService.queueEmail(
          email,
          'Password Reset',
          `<p>Click <a href="https://example.com/reset-password">here</a> to reset your password.</p>`
        );
        break;
      
      default:
        throw new Error(`Unknown template: ${template}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\layout.tsx

```tsx
// src/app/admin/layout.tsx
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold">Admin Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="py-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    );
  }
```

# app\api\admin\orders\[orderId]\route.ts

```ts
// src/app/api/admin/orders/[orderSlug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// --- serializeDecimalFields helper function (keep as is) ---
type DecimalLike = { toNumber: () => number; };
function isDecimalLike(obj: unknown): obj is DecimalLike {
  return obj !== null && typeof obj === 'object' && 'toNumber' in obj && typeof (obj as DecimalLike).toNumber === 'function';
}
function serializeDecimalFields<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (isDecimalLike(obj)) return obj.toNumber() as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => serializeDecimalFields(item)) as unknown as T;
  if (typeof obj === 'object' && obj !== null && !(obj instanceof Date)) {
    const result = {} as Record<string, unknown>;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = serializeDecimalFields((obj as Record<string, unknown>)[key]);
      }
    }
    return result as unknown as T;
  }
  return obj;
}
// --- End of helper function ---

export async function GET(
  request: NextRequest,
  // Update the context parameter name
  context: { params: { orderSlug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Destructure using the new parameter name
    const { orderSlug } = context.params;

    // Use the renamed parameter in your logic (assuming it's the ID)
    const orderId = orderSlug; // Assign to orderId if it represents the ID

    if (!orderId) {
        return NextResponse.json({ error: 'Order ID/Slug is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId, // Use the extracted ID here
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Serialization and Response (keep as is, using 'order') ---
    const serializedOrderBase = serializeDecimalFields(order);
    const serializedOrder = {
        ...serializedOrderBase,
        createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt),
        updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : String(order.updatedAt),
    };
    const paymentInfo = {
      paymentId: order.stripeSessionId || 'N/A',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      paymentDate: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt),
    };
    return NextResponse.json({ ...serializedOrder, paymentInfo });
    // --- End of Serialization ---

  } catch (error) {
    console.error('API GET Error fetching order:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: `An error occurred while fetching the order: ${message}` },
      { status: 500 }
    );
  }
}

// Remember to also update PATCH/POST/DELETE handlers in this file if they exist
// to use context.params.orderSlug

```

# app\api\admin\orders\[orderId]\status\route.ts

```ts
// src/app/api/admin/orders/[orderId]/status/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { OrderStatus } from '@prisma/client';

export async function PATCH(
  request: NextRequest,
  context: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { orderId } = await context.params;
    const { status } = await request.json();
    
    // Validate status
    const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    
    if (!validStatuses.includes(status as OrderStatus)) {
      return NextResponse.json(
        { error: 'Invalid order status' }, 
        { status: 400 }
      );
    }
    
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    // Convert Date objects to ISO strings for serialization
    const serializedOrder = {
      ...updatedOrder,
      createdAt: updatedOrder.createdAt.toISOString(),
      updatedAt: updatedOrder.updatedAt.toISOString(),
      // Convert all Decimal values to numbers
      totalAmount: Number(updatedOrder.totalAmount),
      orderItems: updatedOrder.orderItems.map(item => ({
        ...item,
        price: Number(item.price),
        product: item.product ? {
          ...item.product,
          price: Number(item.product.price)
        } : null
      }))
    };
    
    // Log the dates for debugging
    console.log('Status update API - order date:', serializedOrder.createdAt);
    
    // Add payment info
    const paymentInfo = {
      paymentId: updatedOrder.stripeSessionId || 'Not available',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      paymentDate: updatedOrder.createdAt.toISOString(),
    };
    
    return NextResponse.json({
      ...serializedOrder,
      paymentInfo
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\orders\route.ts

```ts
// src/app/api/admin/orders/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Define interfaces for the return types
interface OrderUser {
  id: string;
  name: string | null;
  email: string;
}

interface OrderProduct {
  id: string;
  name: string;
  price: number; // As a number, not Decimal
  images: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number; // As a number, not Decimal
  product: OrderProduct | null;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number; // As a number, not Decimal
  shippingAddress: string;
  stripeSessionId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  user: OrderUser;
  orderItems: OrderItem[];
}

// Type for database orders with Decimal fields
type DbOrder = {
  id: string;
  userId: string;
  status: string;
  totalAmount: Prisma.Decimal;
  shippingAddress: string;
  stripeSessionId: string;
  createdAt: Date;
  updatedAt: Date;
  user: OrderUser;
  orderItems: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: Prisma.Decimal;
    product: {
      id: string;
      name: string;
      price: Prisma.Decimal;
      images: string;
    } | null;
  }>;
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbOrders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }) as unknown as DbOrder[];

        // Add some debugging to check the date values
        if (dbOrders.length > 0) {
          console.log('First order date from DB:', dbOrders[0].createdAt);
        }

  // Convert Decimal fields to numbers and Date to ISO strings explicitly
  const serializedOrders: Order[] = dbOrders.map(order => {
    // Log each order's date for debugging
    console.log(`Order ${order.id} createdAt:`, order.createdAt);
    
    return {
      ...order,
      totalAmount: Number(order.totalAmount),
      createdAt: order.createdAt.toISOString(), // Convert Date to ISO string
      updatedAt: order.updatedAt.toISOString(), // Convert Date to ISO string
      orderItems: order.orderItems.map(item => ({
        ...item,
        price: Number(item.price),
        product: item.product ? {
          ...item.product,
          price: Number(item.product.price)
        } : null
      }))
    };
  });

  // Check the serialized dates
  if (serializedOrders.length > 0) {
    console.log('First order serialized date:', serializedOrders[0].createdAt);
  }

  return NextResponse.json(serializedOrders);
} catch (error) {
  console.error('Error fetching orders:', error);
  return NextResponse.json(
    { error: 'Failed to fetch orders' },
    { status: 500 }
  );
}
}
```

# app\api\admin\products\[id]\route.ts

```ts
// app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    
    // Basic validation
    if (!json.name || !json.brand || !json.description || typeof json.price !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update product
    const product = await prisma.product.update({
      where: {
        id: params.id
      },
      data: {
        name: json.name,
        brand: json.brand,
        description: json.description,
        price: json.price,
        images: typeof json.images === 'string' ? json.images : JSON.stringify(json.images),
        category: json.category,
        isVegan: json.isVegan,
        isCrueltyFree: json.isCrueltyFree,
        stock: json.stock
      }
    });
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params object before using it
    const { id } = await context.params;

    await prisma.product.delete({
      where: {
        id
      }
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\products\route.ts

```ts
// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const product = await prisma.product.create({
      data: {
        name: json.name,
        brand: json.brand,
        description: json.description,
        price: json.price,
        images: JSON.stringify(json.images),
        category: 'skincare',
        type: json.type.toUpperCase(), // Convert to uppercase to match enum
        isVegan: json.isVegan,
        isCrueltyFree: json.isCrueltyFree,
        stock: json.stock,
        isBestSeller: json.isBestSeller
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\social\[id]\route.ts

```ts
// app/api/admin/social/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET a specific social post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.socialPost.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to fetch social post:', error);
    return NextResponse.json({ error: 'Error fetching social post' }, { status: 500 });
  }
}

// PUT to update a social post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    
    // Basic validation
    if (!json.mediaUrl || !json.caption || !json.platform || !json.mediaType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Set thumbnail URL (same as media URL for images)
    if (json.mediaType === 'image' && !json.thumbnailUrl) {
      json.thumbnailUrl = json.mediaUrl;
    }

    // Update post
    const post = await prisma.socialPost.update({
      where: {
        id: params.id
      },
      data: {
        platform: json.platform,
        mediaUrl: json.mediaUrl,
        thumbnailUrl: json.thumbnailUrl || json.mediaUrl,
        mediaType: json.mediaType,
        caption: json.caption,
        likes: json.likes || 0,
        externalUrl: json.externalUrl || '',
      }
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to update social post:', error);
    return NextResponse.json({ error: 'Error updating social post' }, { status: 500 });
  }
}

// DELETE a social post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if post exists
    const post = await prisma.socialPost.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Delete post
    await prisma.socialPost.delete({
      where: {
        id: params.id
      }
    });
    
    return NextResponse.json({ message: 'Social post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete social post:', error);
    return NextResponse.json({ error: 'Error deleting social post' }, { status: 500 });
  }
}
```

# app\api\admin\social\route.ts

```ts
// app/api/admin/social/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET all social media posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform'); // Filter by platform if needed
    const mediaType = searchParams.get('mediaType'); // Filter by media type if needed
    
    const whereClause: {
      platform?: string;
      mediaType?: string;
    } = {};
    if (platform) whereClause.platform = platform;
    if (mediaType) whereClause.mediaType = mediaType;
    
    const posts = await prisma.socialPost.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch social posts:', error);
    return NextResponse.json({ error: 'Error fetching social posts' }, { status: 500 });
  }
}

// POST to create a new social media post
export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    
    // Basic validation
    if (!json.mediaUrl || !json.caption || !json.platform || !json.mediaType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Set thumbnail URL (same as media URL for images)
    if (json.mediaType === 'image' && !json.thumbnailUrl) {
      json.thumbnailUrl = json.mediaUrl;
    }

    // Create post
    const post = await prisma.socialPost.create({
      data: {
        platform: json.platform,
        mediaUrl: json.mediaUrl,
        thumbnailUrl: json.thumbnailUrl || json.mediaUrl,
        mediaType: json.mediaType,
        caption: json.caption,
        likes: json.likes || 0,
        externalUrl: json.externalUrl || '',
      }
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create social post:', error);
    return NextResponse.json({ error: 'Error creating social post' }, { status: 500 });
  }
}
```

# app\api\admin\upload\route.ts

```ts
// app/api/admin/upload/route.ts
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob'; // Import the 'put' function from Vercel Blob SDK
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Define maximum file sizes (adjust as needed)
const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // 1. Authentication Check
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Form Data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const mediaType = (formData.get('mediaType') as string | null) || 'image'; // Default to image

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 3. File Validation (Type and Size)
    if (mediaType === 'image') {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid image type: ${file.type}. Allowed: JPG, PNG, WEBP, GIF.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        return NextResponse.json(
          { error: `Image too large. Maximum size is ${MAX_IMAGE_SIZE_MB}MB.` },
          { status: 400 }
        );
      }
    } else if (mediaType === 'video') {
      const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo']; // Added webm
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid video type: ${file.type}. Allowed: MP4, MOV, WEBM, AVI.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
        return NextResponse.json(
          { error: `Video too large. Maximum size is ${MAX_VIDEO_SIZE_MB}MB.` },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid media type specified.' },
        { status: 400 }
      );
    }

    // 4. Generate Filename and Upload to Vercel Blob
    // Use a path structure like 'uploads/images/filename' or 'uploads/videos/filename'
    const fileExtension = file.name.split('.').pop() || '';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${mediaType}-${uniqueSuffix}.${fileExtension}`;
    const blobPath = `uploads/${mediaType}s/${filename}`; // e.g., uploads/images/image-123.jpg

    console.log(`Uploading ${mediaType} to Vercel Blob at path: ${blobPath}`);

    const blob = await put(blobPath, file, {
      access: 'public', // Make the file publicly accessible
      // Add cache control headers if needed, e.g.:
      // cacheControlMaxAge: 31536000, // Cache for 1 year
    });

    console.log('Vercel Blob upload successful:', blob.url);

    // 5. Return the Public URL from Vercel Blob
    // The 'blob.url' is the permanent, publicly accessible URL
    return NextResponse.json({
      url: blob.url, // Use the URL returned by Vercel Blob
      success: true
    });

  } catch (error: unknown) {
    console.error('Error uploading file to Vercel Blob:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during upload.';
    // Check for specific Vercel Blob errors if necessary
    // if (error.code === 'SOME_VERCEL_BLOB_ERROR_CODE') { ... }
    return NextResponse.json(
      { error: `Error uploading file: ${errorMessage}` },
      { status: 500 }
    );
  }
}
```

# app\api\auth\[...nextauth]\route.ts

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession, AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Type augmentation for next-auth
declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
  }
  
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"]
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // For Google sign-in users who don't have a password
        if (!user.password) {
          throw new Error("Please use Google sign-in for this account");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      
      // Keep the Google provider info in the token
      if (account?.provider === 'google') {
        token.provider = 'google';
      }
      
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        // Add debug log
        console.log('Session user role:', session.user.role);
      }
      return session;
    },
    async signIn({ user, account }) {
      // Handle Google login
      if (account?.provider === 'google') {
        try {
          // Check if user exists in our database by email first
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          
          if (!existingUser) {
            // Also check by ID
            existingUser = await prisma.user.findUnique({
              where: { id: user.id }
            });
          }
          
          if (!existingUser) {
            // If user doesn't exist at all, create a new user
            // Check if this is the admin email
            const isAdmin = user.email === 'arturoalbert123@gmail.com';
            
            // Create a new user if they don't exist
            try {
              existingUser = await prisma.user.create({
                data: {
                  id: user.id, // Use the OAuth provider's ID
                  email: user.email!,
                  name: user.name,
                  password: "",
                  role: isAdmin ? 'ADMIN' : 'USER', // Set ADMIN role for admin email
                }
              });
            } catch (error) {
              const createError = error as PrismaClientKnownRequestError;
              console.error("Error creating user during OAuth sign-in:", createError);
              
              // If there was an error (like duplicate email), try to find the user again
              if (createError.code === 'P2002') { // Unique constraint error
                existingUser = await prisma.user.findUnique({
                  where: { email: user.email! }
                });
                
                if (existingUser) {
                  console.log("Found existing user after create error:", existingUser.id);
                }
              }
              
              if (!existingUser) {
                throw createError; // Re-throw if we still don't have a user
              }
            }
          } else {
            console.log("Found existing user during OAuth sign-in:", existingUser.id);
          }
          
          // Update the user object with the role from database
          user.role = existingUser.role;
          // We need to ensure we use the database ID consistently
          user.id = existingUser.id;
          
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      
      return true;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

# app\api\auth\error\page.tsx

```tsx
// app/auth/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

// Create a component that uses the useSearchParams hook
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    'CredentialsSignin': 'Sign in failed. Check the details you provided are correct.',
    'OAuthAccountNotLinked': 'This email is already associated with another account. Please sign in using your original method.',
    'OAuthSignin': 'Error signing in with OAuth provider.',
    'OAuthCallback': 'Error during OAuth callback.',
    'default': 'An error occurred during authentication.'
  };

  const errorMessage = error ? (errorMessages[error] || errorMessages.default) : errorMessages.default;

  return (
    <div className="max-w-md w-full text-center">
      <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
      <h2 className="mt-6 text-3xl font-light text-gray-900">Authentication Error</h2>
      
      <div className="mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {errorMessage}
      </div>

      <div className="mt-8 space-y-4">
        <Link 
          href="/auth/login" 
          className="inline-block w-full px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Return to login
        </Link>
        
        <Link
          href="/"
          className="inline-block text-sm text-gray-600 hover:text-gray-900"
        >
          Return to home page
        </Link>
      </div>
    </div>
  );
}

// Main component that wraps the content in a Suspense boundary
export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="max-w-md w-full text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-gray-300" />
          <h2 className="mt-6 text-3xl font-light text-gray-900">Loading...</h2>
        </div>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
```

# app\api\auth\register\route.ts

```ts
// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Define validation schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = userSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER', // Default role for new users
      },
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    );
  }
}
```

# app\api\checkout\route.ts

```ts
// app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

interface CartItem {
  productId: string;
  name: string;
  images: string;
  price: number;
  quantity: number;
}

interface CheckoutPayload {
  items: CartItem[];
  email: string;
  shippingAddress?: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { items, email, shippingAddress }: CheckoutPayload = await req.json();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Creating checkout session for user:', session.user.id);
    console.log('Items:', items);
    console.log('Shipping address:', shippingAddress);

    const lineItems = items.map((item) => {
      let imageUrl = null;
      
      // Handle image URL
      if (item.images) {
        try {
          // Try parsing as JSON in case it's a stringified array
          const images = JSON.parse(item.images);
          const firstImage = Array.isArray(images) ? images[0] : images;
          
          // Ensure the image path is properly formatted
          if (firstImage) {
            const cleanPath = firstImage.replace(/^\/+/, ''); // Remove leading slashes
            imageUrl = new URL(cleanPath, baseUrl).toString();
          }
        } catch {
          // If JSON parsing fails, treat as a single image path
          const cleanPath = item.images.replace(/^\/+/, '');
          imageUrl = new URL(cleanPath, baseUrl).toString();
        }
      }

      // Only include images if we have a valid URL
      const productData = {
        name: item.name,
        ...(imageUrl && { images: [imageUrl] })
      };

      return {
        price_data: {
          currency: 'gbp',
          product_data: productData,
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // Store both the user ID and the items data in the metadata
    // Also store the shipping address (ensure no undefined values in metadata)
    const metadata: Record<string, string> = {
      userId: session.user.id,
      items: JSON.stringify(items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      })))
    };
    
    // Only add shippingAddress if it's defined (to match Stripe's type requirements)
    if (shippingAddress) {
      metadata.shippingAddress = shippingAddress;
    }

    console.log('Metadata being sent to Stripe:', metadata);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      metadata: metadata
    });

    console.log('Created Stripe session:', stripeSession.id);

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
```

# app\api\collections\[slug]\route.ts

```ts
// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ProductType } from '@prisma/client';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log('API Debug - Received slug:', slug);

    // First, let's see all products and their types
    const allProducts = await prisma.product.findMany({
      select: {
        name: true,
        type: true
      }
    });
    console.log('API Debug - All products in database:', allProducts);

    // Create a mapping for URL slugs to ProductType enum values
    const typeMapping: Record<string, ProductType> = {
      'cleansers': ProductType.CLEANSER,
      'toners': ProductType.TONER,
      'serums': ProductType.SERUM,
      'moisturizers': ProductType.MOISTURIZER,
      'masks': ProductType.MASK,
      'sunscreens': ProductType.SUNSCREEN
    };

    // Get the correct enum value for the slug
    const productType = typeMapping[slug.toLowerCase()];
    console.log('API Debug - Mapped type:', productType);
    
    if (!productType) {
      console.log('API Debug - Invalid product type for slug:', slug);
      return NextResponse.json([], { status: 200 }); // Return empty array for invalid types
    }

    console.log('API Debug - Searching for type:', productType);

    const products = await prisma.product.findMany({
      where: {
        category: 'skincare',
        type: productType
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('API Debug - Found products:', products.map(p => ({
      name: p.name,
      type: p.type
    })));

    return NextResponse.json(products);

  } catch (error) {
    console.error('API Debug - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

# app\api\collections\all\route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('API Debug - Fetching all products');

    const products = await prisma.product.findMany({
      where: {
        category: 'skincare'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`API Debug - Found ${products.length} total products`);
    return NextResponse.json(products);

  } catch (error) {
    console.error('API Debug - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

# app\api\collections\bestsellers\route.ts

```ts
// app/api/collections/bestsellers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isBestSeller: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bestsellers' },
      { status: 500 }
    );
  }
}
```

# app\api\collections\brands\[brandName]\route.ts

```ts
// app/api/collections/brands/[brandName]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { brandName: string } }
) {
  try {
    const brandName = params.brandName;
    
    // Map slug to actual brand name if needed
    const brandNameMap: { [key: string]: string } = {
      'cosrx': 'COSRX',
      'beauty-of-joseon': 'Beauty of Joseon',
      'some-by-mi': 'Some By Mi',
      'medicube': 'Medicube'
      // Add more mappings as needed
    };
    
    const actualBrandName = brandNameMap[brandName] || brandName;
    
    // Fetch products for this brand (case-insensitive)
    const products = await prisma.product.findMany({
      where: {
        brand: {
          contains: actualBrandName,
          // Case insensitivity will depend on your database
          // For most databases, contains is case-insensitive by default
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error(`Error fetching products for brand ${params.brandName}:`, error);
    return NextResponse.json(
      { error: 'Error fetching brand products' },
      { status: 500 }
    );
  }
}
```

# app\api\collections\brands\route.ts

```ts
// app/api/collections/brands/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get unique brands and their product counts
    const brandData = await prisma.product.groupBy({
      by: ['brand'],
      _count: {
        id: true
      }
    });
    
    return NextResponse.json(brandData);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { error: 'Error fetching brands' },
      { status: 500 }
    );
  }
}

```

# app\api\collections\makeup\route.ts

```ts
// app/api/collections/makeup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: 'makeup'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching makeup products:', error);
    return NextResponse.json(
      { error: 'Error fetching makeup products' },
      { status: 500 }
    );
  }
}
```

# app\api\collections\new\route.ts

```ts
// app/api/collections/new/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch new arrivals (products from the last 30 days)
    const products = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return NextResponse.json(
      { error: 'Error fetching new arrivals' },
      { status: 500 }
    );
  }
}
```

# app\api\collections\skincare\route.ts

```ts
// app/api/collections/skincare/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: 'skincare'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching skincare products:', error);
    return NextResponse.json(
      { error: 'Error fetching skincare products' },
      { status: 500 }
    );
  }
}
```

# app\api\orders\[orderId]\route.ts

```ts
// app/api/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Await the params before destructuring
    const { orderId } = await context.params;
    
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the order' },
      { status: 500 }
    );
  }
}
```

# app\api\orders\by-session\route.ts

```ts
// app/api/orders/by-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { stripe } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session in API:', session);
    if (!session?.user?.id) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    console.log('Debug info:', {
      sessionId,
      userId: session.user.id,
      userEmail: session.user.email
    });

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching orders for user ${session.user.id}`);

    // First, log all orders regardless of user to debug
    const allOrders = await prisma.order.findMany({
      where: {
        stripeSessionId: sessionId
      }
    });
    
    console.log('All orders with this session ID:', allOrders);

    // If there are no orders at all with this session ID, 
    // implement fallback order creation since webhook might not have fired
    if (allOrders.length === 0 && sessionId.startsWith('cs_')) {
      console.log('No orders found with session ID. Creating fallback order.');
      
      // First, verify that this is a valid and successful checkout session from Stripe
      try {
        const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (stripeSession.payment_status === 'paid') {
          console.log('Stripe session verified as paid. Creating fallback order.');
          
          // Extract metadata from the Stripe session
          const metadata = stripeSession.metadata || {};
          const items = metadata.items ? JSON.parse(metadata.items) : [];
          const shippingAddress = metadata.shippingAddress || '{}';
          
          // First, ensure the user exists in our database
          let dbUser = await prisma.user.findUnique({
            where: { id: session.user.id }
          });
          
          if (!dbUser) {
            // Look up by email instead, since user might exist with different ID
            dbUser = await prisma.user.findUnique({
              where: { email: session.user.email || '' }
            });
            
            if (dbUser) {
              // User exists with a different ID (probably created by credentials)
              console.log(`Found user by email ${session.user.email}, updating session user ID`);
              // We'll use this existing user ID for the order
              session.user.id = dbUser.id;
            } else {
              // If user doesn't exist at all in our database,
              // we need to create the user first
              try {
                dbUser = await prisma.user.create({
                  data: {
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.name || '',
                    password: '', // Empty password for OAuth users
                    role: 'USER',
                  }
                });
                
                console.log(`Created user ${session.user.id} in database`);
              } catch (error) {
                console.error('Error creating user:', error);
                
                // If we get a unique constraint error, the user might exist
                // Try to fetch the user one more time by email
                const prismaError = error as { code?: string };
                if (prismaError.code === 'P2002') {
                  dbUser = await prisma.user.findUnique({
                    where: { email: session.user.email || '' }
                  });
                  
                  if (dbUser) {
                    console.log(`Found user by email after create error, using ID: ${dbUser.id}`);
                    session.user.id = dbUser.id;
                  } else {
                    return NextResponse.json(
                      { error: 'Failed to create or find user record' },
                      { status: 500 }
                    );
                  }
                } else {
                  return NextResponse.json(
                    { error: 'Failed to create user record' },
                    { status: 500 }
                  );
                }
              }
            }
          }

          interface CartItem {
            productId: string;
            quantity: number;
            price: number;
          }

          // Create the order in the database
          const fallbackOrder = await prisma.order.create({
            data: {
              userId: session.user.id,
              stripeSessionId: sessionId,
              status: 'PROCESSING',
              totalAmount: (stripeSession.amount_total || 0) / 100, // Convert cents to dollars/pounds
              shippingAddress,
              orderItems: {
                create: items.map((item: CartItem) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.price
                }))
              }
            },
            include: {
              orderItems: {
                include: {
                  product: {
                    select: {
                      name: true,
                      price: true,
                      images: true
                    }
                  }
                }
              }
            }
          });
          
          console.log('Created fallback order:', fallbackOrder.id);
          
          // Update product stock for each item
          for (const item of items) {
            await prisma.product.update({
              where: { id: item.productId },
              data: {
                stock: {
                  decrement: item.quantity
                }
              }
            });
          }
          
          return NextResponse.json(fallbackOrder);
        } else {
          console.log('Stripe session not paid:', stripeSession.payment_status);
        }
      } catch (stripeError) {
        console.error('Error retrieving Stripe session:', stripeError);
      }
    }

    // Try to find an order associated with both the session ID and the current user
    const order = await prisma.order.findFirst({
      where: {
        stripeSessionId: sessionId,
        userId: session.user.id
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                images: true
              }
            }
          }
        }
      }
    });

    console.log('Found order details:', {
      found: !!order,
      orderId: order?.id,
      orderUserId: order?.userId,
      itemsCount: order?.orderItems?.length
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found. Please check your orders page in a few minutes, or contact support if the issue persists.' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
```

# app\api\orders\create-from-session\route.ts

```ts
// app/api/orders/create-from-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { stripe } from '@/lib/stripe';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export async function POST(req: NextRequest) {
  try {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get session ID from request body
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log(`Processing order creation for session ${sessionId} and user ${session.user.id}`);

    // Check if an order already exists for this session
    const existingOrder = await prisma.order.findFirst({
      where: {
        stripeSessionId: sessionId
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (existingOrder) {
      console.log(`Order already exists for session ${sessionId}:`, existingOrder.id);
      return NextResponse.json(existingOrder);
    }

    // Retrieve session details from Stripe
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Verify the session is paid
    if (stripeSession.payment_status !== 'paid') {
      console.log(`Session ${sessionId} is not paid:`, stripeSession.payment_status);
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get order details from session metadata
    const metadata = stripeSession.metadata || {};
    let items: CartItem[] = [];
    try {
      items = metadata.items ? JSON.parse(metadata.items) : [];
    } catch (parseError) {
      console.error('Error parsing items from metadata:', parseError);
      return NextResponse.json(
        { error: 'Invalid order items data' },
        { status: 400 }
      );
    }

    if (!items.length) {
      console.error('No items found in session metadata');
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    // Get shipping address from metadata or use empty object
    const shippingAddress = metadata.shippingAddress || '{}';

    // First, ensure the user exists in our database
    let dbUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    
    if (!dbUser) {
      // Look up by email instead, since user might exist with different ID
      dbUser = await prisma.user.findUnique({
        where: { email: session.user.email || '' }
      });
      
      if (dbUser) {
        // User exists with a different ID (probably created by credentials)
        console.log(`Found user by email ${session.user.email}, updating session user ID`);
        // We'll use this existing user ID for the order
        session.user.id = dbUser.id;
      } else {
        // If user doesn't exist at all in our database,
        // we need to create the user first
        try {
          dbUser = await prisma.user.create({
            data: {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.name || '',
              password: '', // Empty password for OAuth users
              role: 'USER',
            }
          });
          
          console.log(`Created user ${session.user.id} in database`);
        } catch (userCreateError) {
          console.error('Error creating user:', userCreateError);
          
          // If we get a unique constraint error, the user might exist
          // Try to fetch the user one more time by email
          if (userCreateError && typeof userCreateError === 'object' && 'code' in userCreateError && userCreateError.code === 'P2002') {
            dbUser = await prisma.user.findUnique({
              where: { email: session.user.email || '' }
            });
            
            if (dbUser) {
              console.log(`Found user by email after create error, using ID: ${dbUser.id}`);
              session.user.id = dbUser.id;
            } else {
              return NextResponse.json(
                { error: 'Failed to create or find user record' },
                { status: 500 }
              );
            }
          } else {
            return NextResponse.json(
              { error: 'Failed to create user record' },
              { status: 500 }
            );
          }
        }
      }
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        stripeSessionId: sessionId,
        status: 'PROCESSING',
        totalAmount: (stripeSession.amount_total || 0) / 100, // Convert cents to dollars/pounds
        shippingAddress,
        orderItems: {
          create: items.map((item: CartItem) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    console.log(`Created order ${order.id} for session ${sessionId}`);
    
    // Update product stock for each item
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order from session:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
```

# app\api\orders\route.ts

```ts
// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.log('No authenticated user found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log(`Session user ID: ${session.user.id || 'undefined'}`);
    console.log(`Session user email: ${session.user.email || 'undefined'}`);

    // First approach: Try to find a user with the email from the session
    let userId = session.user.id;
    
    if (session.user.email) {
      const dbUser = await prisma.user.findUnique({
        where: { 
          email: session.user.email 
        },
        select: {
          id: true
        }
      });
      
      if (dbUser) {
        console.log(`Found user in database with email ${session.user.email}, ID: ${dbUser.id}`);
        userId = dbUser.id;
      }
    }

    console.log(`Using userId for order query: ${userId}`);

    // Fetch orders for this user
    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${orders.length} orders for user ${userId}`);

    // Transform the orders to match the expected format in the frontend
    const formattedOrders = orders.map(order => {
      return {
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        total: parseFloat(order.totalAmount.toString()),
        orderItems: order.orderItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price.toString()),
          product: {
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price.toString()),
            images: item.product.images
          }
        }))
      };
    });

    // Debug log the first order's structure
    if (formattedOrders.length > 0) {
      console.log('First formatted order sample:', JSON.stringify({
        id: formattedOrders[0].id,
        status: formattedOrders[0].status,
        orderItemCount: formattedOrders[0].orderItems.length,
        sampleOrderItem: formattedOrders[0].orderItems[0]
      }, null, 2));
    }

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}
```

# app\api\products\[id]\route.ts

```ts
// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params object
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

# app\api\products\route.ts

```ts
// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Log the first product's reviews for debugging
    if (products.length > 0) {
      console.log('First product reviews:', products[0].reviews);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    
    // Basic validation
    if (!json.name || !json.brand || !json.description || typeof json.price !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: json.name,
        brand: json.brand,
        description: json.description,
        price: json.price,
        images: JSON.stringify(json.images || ['/api/placeholder/300/300']),
        category: json.category || 'skincare',
        isVegan: json.isVegan || false,
        isCrueltyFree: json.isCrueltyFree || false,
        stock: json.stock || 0
      }
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
```

# app\api\reviews\route.ts

```ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, rating, comment } = await request.json();

    // First, ensure the user exists in the database
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create the review with the verified user ID
    const review = await prisma.review.create({
      data: {
        productId,
        userId: user.id,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
```

# app\api\search\route.ts

```ts
//app/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query.toLowerCase(),
            }
          },
          {
            brand: {
              contains: query.toLowerCase(),
            }
          },
          {
            category: {
              contains: query.toLowerCase(),
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        category: true,
        images: true,
        isVegan: true,
        isCrueltyFree: true
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
```

# app\api\stripe\webhook\route.ts

```ts
// app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    if (!sig) {
      console.error('Missing stripe-signature header');
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Missing Stripe webhook secret in environment variables');
      return NextResponse.json({ error: 'Missing Stripe webhook secret' }, { status: 500 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`Processing completed checkout session ${session.id}`);

      // Validate session metadata
      if (!session.metadata?.userId) {
        console.error('Missing userId in session metadata', session.id);
        return NextResponse.json({ error: 'Invalid session metadata' }, { status: 400 });
      }

      try {
        // Parse items from metadata
        let items: CartItem[] = [];
        try {
          items = JSON.parse(session.metadata.items || '[]');
        } catch (parseError) {
          console.error('Error parsing items from metadata:', parseError, session.metadata.items);
          items = [];
        }

        if (!items.length) {
          console.error('No items found in session metadata', session.id);
          return NextResponse.json({ error: 'No items in order' }, { status: 400 });
        }

        // Check if order already exists
        const existingOrder = await prisma.order.findFirst({
          where: {
            stripeSessionId: session.id
          }
        });

        if (existingOrder) {
          console.log(`Order already exists for session ${session.id}`);
          return NextResponse.json({ message: 'Order already processed' });
        }

        // Create order
        const order = await prisma.order.create({
          data: {
            userId: session.metadata.userId,
            stripeSessionId: session.id,
            status: 'PROCESSING',
            totalAmount: session.amount_total ? session.amount_total / 100 : 0,
            shippingAddress: session.metadata.shippingAddress || '',
            orderItems: {
              create: items.map((item: CartItem) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
              }))
            }
          }
        });

        console.log(`Created order ${order.id} for session ${session.id}`);
        
        // Update product stock
        for (const item of items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          });
        }

        return NextResponse.json({ orderId: order.id });
      } catch (error) {
        console.error('Error creating order from webhook:', error);
        return NextResponse.json(
          { error: 'Error processing order' }, 
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Need to disable body parser since we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
```

# app\auth\login\page.tsx

```tsx
// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Suspense } from 'react';

// Loading fallback component
function LoginPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}

// Component that uses useSearchParams
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const isRegistered = searchParams.get('registered') === 'true';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      // Check if this is an admin, route to admin dashboard
      // Otherwise go to homepage or callback URL
      router.push(callbackUrl);
      router.refresh(); // Refresh to update session state in the UI
    } catch (error: unknown) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your Impression K Beauty account
          </p>
        </div>
        
        {isRegistered && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Account created successfully! Please sign in.
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email address</label>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-black hover:text-gray-800"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <div className="px-2 bg-gray-50 text-sm text-gray-500">or</div>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="font-medium text-black hover:text-gray-800">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main export component with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginForm />
    </Suspense>
  );
}
```

# app\auth\register\page.tsx

```tsx
// app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to create account');
      }

      // Redirect to login page with success message
      router.push('/auth/login?registered=true');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join Impression K Beauty to discover premium Korean skincare
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Full name"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email address</label>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Password (min 8 characters)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <div className="px-2 bg-gray-50 text-sm text-gray-500">or</div>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-black hover:text-gray-800">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
```

# app\cart\page.tsx

```tsx
// src/app/cart/page.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Your cart is empty
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>

        <div className="mt-12">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {state.items.map((item) => {
                const images = JSON.parse(item.product.images as string);
                return (
                  <li key={item.product.id} className="p-4 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                        <Image
                          src={images[0]}
                          alt={item.product.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>

                      <div className="ml-6 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              <Link href={`/products/${item.product.id}`}>
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${Number(item.product.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-2 text-gray-600 hover:text-gray-700"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                              className="p-2 text-gray-600 hover:text-gray-700"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${state.totalAmount.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800"
                >
                  Proceed to Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{' '}
                  <Link href="/products" className="text-black font-medium hover:text-gray-800">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# app\checkout\page.tsx

```tsx
// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { getStripe } from '@/lib/stripe';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, CreditCard, XCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { state: cartState } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Review & Pay
  
  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    phone: '',
    email: currentUser?.email || ''
  });
  
  const handleShippingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateShippingForm = () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'email'];
    for (const field of requiredFields) {
      if (!shippingForm[field as keyof typeof shippingForm]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingForm.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Validate postal code format (basic)
    const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!ukPostcodeRegex.test(shippingForm.postalCode)) {
      setError('Please enter a valid UK postal code');
      return false;
    }
    
    // Add phone validation
    if (!shippingForm.phone || shippingForm.phone.trim() === '') {
      setError('Phone number is required');
      return false;
    }

    // Phone number format validation (optional but recommended)
    const phoneRegex = /^[\d\+\-\(\) ]{10,}$/; // Accepts digits, +, -, (, ), and spaces, minimum 10 chars
    if (!phoneRegex.test(shippingForm.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };
  
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (validateShippingForm()) {
      setStep(2);
    }
  };
  
  const handleBackToShipping = () => {
    setStep(1);
  };
  
  const handleCheckout = async () => {
    if (!currentUser?.email) {
      setError('Please sign in to checkout');
      return;
    }

    if (cartState.items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const items = cartState.items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        images: item.product.images,
        price: Number(item.product.price),
        quantity: item.quantity,
      }));

      // Format shipping address for the API
      const shippingAddress = JSON.stringify({
        firstName: shippingForm.firstName,
        lastName: shippingForm.lastName,
        address: shippingForm.address,
        apartment: shippingForm.apartment,
        city: shippingForm.city,
        postalCode: shippingForm.postalCode,
        country: shippingForm.country,
        phone: shippingForm.phone
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          email: shippingForm.email,
          shippingAddress
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  // If not logged in, show sign-in prompt
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Please sign in to checkout
          </h2>
          <Link
            href="/auth/login?redirect=/checkout"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }
  
  // If cart is empty, show empty cart message
  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 ">
            Your cart is empty
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-gray-600">Shipping</span>
            <span className="text-sm font-medium text-gray-600">Review & Pay</span>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
                
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingForm.firstName}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingForm.lastName}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingForm.email}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingForm.address}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={shippingForm.apartment}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingForm.city}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingForm.postalCode}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingForm.country}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        {/* <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value="Spain">Spain</option>
                        <option value="Japan">Japan</option>
                        <option value="South Korea">South Korea</option> */}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Continue to Payment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 2 && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Review Order</h2>
                    <button
                      onClick={handleBackToShipping}
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back to Shipping
                    </button>
                  </div>
                </div>
                
                {/* Shipping information summary */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">{shippingForm.firstName} {shippingForm.lastName}</p>
                      <p className="text-sm text-gray-600">{shippingForm.address}</p>
                      {shippingForm.apartment && <p className="text-sm text-gray-600">{shippingForm.apartment}</p>}
                      <p className="text-sm text-gray-600">{shippingForm.city}, {shippingForm.postalCode}</p>
                      <p className="text-sm text-gray-600">{shippingForm.country}</p>
                      {shippingForm.phone && <p className="text-sm text-gray-600">{shippingForm.phone}</p>}
                      <p className="text-sm text-gray-600">{shippingForm.email}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                {/* Payment notice */}
                <div className="p-6">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      After clicking &quot;Place Order,&quot; you will be redirected to Stripe to complete your purchase securely.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cartState.items.map((item) => {
                    const images = typeof item.product.images === 'string' 
                      ? JSON.parse(item.product.images) 
                      : item.product.images;
                    
                    const imageUrl = Array.isArray(images) && images.length > 0 
                      ? images[0] 
                      : '/api/placeholder/80/80';
                      
                    return (
                      <li key={item.product.id} className="py-6 flex">
                        <div className="relative flex-shrink-0 w-20 h-20 rounded border border-gray-200 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h3>{item.product.name}</h3>
                              <p className="ml-4">£{(Number(item.product.price) * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex justify-between text-sm mb-2 text-gray-600">
                  <p>Subtotal</p>
                  <p className="font-medium">£{cartState.totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm mb-2 text-gray-600">
                  <p>Shipping</p>
                  <p className="font-medium">Free</p>
                </div>
                {/* <div className="flex justify-between text-sm mb-2 text-gray-600">
                  <p>Taxes</p>
                  <p className="font-medium">Calculated at checkout</p>
                </div> */}
                <div className="flex justify-between text-base font-medium mt-6 pt-6 border-t border-gray-200 text-gray-600">
                  <p>Total</p>
                  <p>£{cartState.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# app\checkout\success\page.tsx

```tsx
// app/checkout/success/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

interface Order {
  id: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  orderItems: Array<{
    id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
    }
  }>;
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const createOrFetchOrder = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
          setError('No session ID provided');
          setLoading(false);
          return;
        }

        console.log('Processing checkout session:', sessionId);

        // Try to fetch an existing order first
        try {
          const response = await fetch(`/api/orders/by-session?session_id=${sessionId}`);
          const data = await response.json();
          
          if (response.ok && data) {
            console.log('Found existing order:', data.id);
            setOrder(data);
            clearCart();
            setLoading(false);
            return;
          }
        } catch {
          console.log('No existing order found, will create a new one');
        }

        // If no order exists, verify the session with Stripe and create a new order
        const createResponse = await fetch('/api/orders/create-from-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            sessionId 
          }),
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData.error || 'Failed to create order');
        }

        const orderData = await createResponse.json();
        setOrder(orderData);
        clearCart();
      } catch (err) {
        console.error('Error processing order:', err);
        setError(err instanceof Error ? err.message : 'Failed to process order');
      } finally {
        setLoading(false);
      }
    };

    createOrFetchOrder();
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">{error || 'Order not found'}</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasOrderItems = order.orderItems && order.orderItems.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="text-center mb-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Order #{order.id}
            </p>
            <p className="text-gray-500">
              We&apos;ll send you an email confirmation with order details.
            </p>
          </div>

          {hasOrderItems && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-gray-800">{item.product.name}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-gray-600">
                      £{(item.quantity * item.product.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>£{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/account/orders"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# app\collections\[slug]\CollectionPageClient.tsx

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { useAuth } from '@/contexts/AuthContext';
import AdminProductControls from '@/components/admin/AdminProductControls';


interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CollectionPageClientProps {
  slug: string;
}

export default function CollectionPageClient({ slug }: CollectionPageClientProps) {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const displayName = slug === 'all' 
    ? 'All Products'
    : slug.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = slug === 'all' 
          ? '/api/collections/all'
          : `/api/collections/${slug}`;

        console.log('Client Debug - Fetching products from:', endpoint);
        const response = await fetch(endpoint);
        
        const data = await response.json();
        console.log('Client Debug - Received data:', data);

        // Check if we received an error response
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.log('Client Debug - Invalid data format:', data);
          setProducts([]);
          setBrands([]);
          return;
        }

        // Type guard to ensure each item has required properties
        const validProducts = data.filter((item): item is Product => {
          return (
            item &&
            typeof item === 'object' &&
            'id' in item &&
            'name' in item &&
            'brand' in item &&
            'price' in item &&
            'images' in item
          );
        });

        console.log('Client Debug - Valid products:', validProducts.length);
        setProducts(validProducts);
        
        const uniqueBrands = Array.from(
          new Set(validProducts.map(p => p.brand))
        ).filter(Boolean);
        
        setBrands(uniqueBrands);

      } catch (error) {
        console.error('Client Debug - Error:', error);
        setProducts([]);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingProductId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-light text-black">{displayName}</h1>
            </div>
            <p className="text-gray-600 max-w-2xl">
              {slug === 'all' 
                ? 'Discover our complete collection of K-beauty products.'
                : `Discover our curated collection of ${displayName.toLowerCase()} products, 
                   featuring the best of K-beauty.`
              }
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 lg:w-72">
              <ProductFilters 
                brands={brands}
                categories={categories}
              />
            </div>
            
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
              ) : (
                <>
                  {isAdmin && (
                    <AdminProductControls 
                      title={displayName}
                    />
                  )}
                  <ProductGrid 
                    products={products}
                    isAdmin={isAdmin}
                    onDeleteProduct={handleDeleteProduct}
                    deletingProductId={deletingProductId}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

# app\collections\[slug]\page.tsx

```tsx
//app/collections/[slug]/page.tsx
'use client';

import { use } from 'react';
import CollectionPageClient from './CollectionPageClient';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = use(params);
  return <CollectionPageClient slug={slug} />;
}
```

# app\collections\all\page.tsx

```tsx
import CollectionPageClient from '../[slug]/CollectionPageClient';

export default function AllProductsPage() {
  return <CollectionPageClient slug="all" />;
}
```

# app\collections\bestsellers\page.tsx

```tsx
//app/collections/bestsellers/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CollectionLayout from '@/components/layout/CollectionLayout';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  isBestSeller: boolean;
}

export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/collections/bestsellers');
        if (!response.ok) {
          throw new Error('Failed to fetch bestsellers');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setProducts(data);
          setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
          setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
        setError(error instanceof Error ? error.message : 'Failed to load bestsellers');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <CollectionLayout
      title="Bestsellers"
      description="Our most-loved Korean beauty products, chosen by our community."
      products={products}
      brands={brands}
      categories={categories}
      loading={loading}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "Bestsellers",
        description: "Discover why these products are loved by thousands"
      }}
    />
  );
}
```

# app\collections\brands\[brandName]\page.tsx

```tsx
//app/collections/brands/[brandName]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdminProductControls from '@/components/admin/AdminProductControls';

// This is temporary mock data - replace with real brand information from your database
const brandInfo = {
  'cosrx': {
    name: 'COSRX',
    description: 'COSRX focuses on creating minimal, effective skincare solutions using scientific formulations.',
    image: '/api/placeholder/1920/400',
    logo: '/api/placeholder/200/200',
    story: 'Founded in 2014, COSRX has become a global leader in Korean skincare, known for their innovative formulations that focus on singular, effective ingredients.',
    values: [
      'Scientific Approach',
      'Minimal Ingredients',
      'Sensitive Skin Safe',
      'Dermatologist Tested'
    ]
  },
  'beauty-of-joseon': {
    name: 'Beauty of Joseon',
    description: 'Beauty of Joseon combines traditional Korean herbal ingredients with modern skincare technology.',
    image: '/api/placeholder/1920/400',
    logo: '/api/placeholder/200/200',
    story: 'Beauty of Joseon draws inspiration from historical Korean beauty secrets, specifically from the Joseon Dynasty era.',
    values: [
      'Traditional Ingredients',
      'Modern Technology',
      'Clean Beauty',
      'Sustainable Practices'
    ]
  }
  // Add more brands as needed
};

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

interface BrandPageProps {
  params: {
    brandName: string;
  };
}

export default function BrandPage({ params }: BrandPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const brandSlug = params.brandName.toLowerCase();
  const brand = brandInfo[brandSlug as keyof typeof brandInfo];

  if (!brand) {
    notFound();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/collections/brands/${brandSlug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch brand products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching brand products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandSlug]);

  return (
    <PageLayout>
      {/* Brand Hero */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${brand.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-light text-white mb-4">{brand.name}</h1>
            <p className="text-xl text-white/90">{brand.description}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link href="/collections/brands" className="text-gray-500 hover:text-gray-700">Brands</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-900">{brand.name}</span>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <AdminProductControls />
        </div>
      </div>

      {/* Brand Story */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
            <h2 className="text-3xl font-light mb-6">Our Story</h2>
            <p className="text-gray-600 mb-8">{brand.story}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brand.values.map((value, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">{brand.name} Products</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
```

# app\collections\brands\page.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import AdminProductControls from '@/components/admin/AdminProductControls';
import { useAuth } from '@/contexts/AuthContext';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/products';

export default function Brands() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands
        const brands = Array.from(new Set<string>(data.map((product: Product) => product.brand)));
        setUniqueBrands(brands);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedBrand === 'all' 
    ? products 
    : products.filter(product => product.brand === selectedBrand);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black">Home</Link>
          <ArrowRight className="w-4 h-4 mx-2" />
          <span className="text-black">Brands</span>
        </div>

        {/* Admin Controls */}
        {isAdmin && <AdminProductControls title="Products by Brand" />}

        {/* Brand Filter */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-6 text-gray-900">Our Brands Collection</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedBrand === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              All Brands
            </button>
            {uniqueBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedBrand === brand
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Products Display */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-900">
              {selectedBrand === 'all' ? 'All Products' : `${selectedBrand} Products`}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products found for this brand.</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
```

# app\collections\new\page.tsx

```tsx
//app/collections/new/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CollectionLayout from '@/components/layout/CollectionLayout';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/collections/new');
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands and categories
        setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
        setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CollectionLayout
      title="New Arrivals"
      description="Discover our latest K-beauty products, featuring innovative formulations and trending ingredients."
      products={products}
      brands={brands}
      categories={categories}
      loading={loading}
      banner={{
        image: "/images/new/new-arrivals.jpeg",
        title: "New Arrivals",
        description: "Be the first to try our latest Korean beauty innovations"
      }}
    />
  );
}
```

# app\collections\skincare\page.tsx

```tsx
//app/collections/skincare/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CollectionLayout from '@/components/layout/CollectionLayout';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export default function Skincare() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/collections/skincare');
        if (!response.ok) {
          throw new Error('Failed to fetch skincare products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands and categories
        setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
        setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
      } catch (error) {
        console.error('Error fetching skincare products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CollectionLayout
      title="Skincare"
      description="Discover our curated collection of Korean skincare products for every skin type and concern."
      products={products}
      brands={brands}
      categories={categories}
      loading={loading}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "K-Beauty Skincare",
        description: "Advanced formulations for your best skin ever"
      }}
    />
  );
}
```

# app\contact\page.tsx

```tsx
//app/contact/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { Mail, MapPin, Phone, Clock, ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();

  return (
    <PageLayout>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      {/* Contact Hero */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-light mb-4 text-black">Contact Us</h1>
            <p className="text-gray-600">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Phone className="w-6 h-6 mx-auto mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2 text-black">Phone</h3>
              <p className="text-gray-600">+44 (0) 123 456 7890</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Mail className="w-6 h-6 mx-auto mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2 text-black">Email</h3>
              <p className="text-gray-600">hello@impressionkbeauty.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <MapPin className="w-6 h-6 mx-auto mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2 text-black">Location</h3>
              <p className="text-gray-600">London, United Kingdom</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock className="w-6 h-6 mx-auto mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2 text-black">Hours</h3>
              <p className="text-gray-600">Mon-Fri: 9am - 6pm GMT</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

# app\cookies\page.tsx

```tsx
//app/cookies/page.tsx

import React from 'react';
import PolicyLayout from '@/components/layout/PolicyLayout';

export default function CookiePolicy() {
  return (
    <PolicyLayout
      title="Cookie Policy"
      lastUpdated="February 24, 2024"
    >
      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your device when you visit our 
        website. They help us provide you with a better experience by remembering your 
        preferences and understanding how you use our site.
      </p>

      <h2>Types of Cookies We Use</h2>
      
      <h3>Essential Cookies</h3>
      <p>
        These cookies are necessary for the website to function properly. They enable basic 
        functions like page navigation and access to secure areas of the website.
      </p>

      <h3>Performance Cookies</h3>
      <p>
        These cookies help us understand how visitors interact with our website by collecting 
        and reporting information anonymously. This helps us improve our website.
      </p>

      <h3>Functionality Cookies</h3>
      <p>
        These cookies remember your preferences to provide enhanced, more personal features. 
        They may remember your language preferences or the region you are in.
      </p>

      <h3>Targeting Cookies</h3>
      <p>
        These cookies record your visit to our website, the pages you have visited, and the 
        links you have followed. We use this information to make our website and advertising 
        more relevant to your interests.
      </p>

      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings:</p>
      <ul>
        <li>Chrome: Settings → Privacy and Security → Cookies</li>
        <li>Firefox: Options → Privacy & Security → Cookies</li>
        <li>Safari: Preferences → Privacy → Cookies</li>
        <li>Edge: Settings → Privacy & Security → Cookies</li>
      </ul>

      <h2>Third-Party Cookies</h2>
      <p>
        We use third-party services that may set cookies on your device. These include:
      </p>
      <ul>
        <li>Google Analytics (website analytics)</li>
        <li>Stripe (payment processing)</li>
        <li>Social media plugins</li>
      </ul>

      <h2>Impact of Disabling Cookies</h2>
      <p>
        If you disable certain cookies, some parts of our website may not function properly. 
        Essential cookies cannot be disabled as they are necessary for the website to work.
      </p>

      <h2>Changes to Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. Please check this page regularly 
        for any changes.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about our use of cookies, please contact us at:{' '}
        <a href="mailto:privacy@impressionkbeauty.com">privacy@impressionkbeauty.com</a>
      </p>
    </PolicyLayout>
  );
}
```

# app\faq\page.tsx

```tsx
//app/faq/page.tsx

'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping within the UK takes 2-4 business days. International shipping times vary by location, typically 5-10 business days."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with tracking information."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of purchase for unused items in original packaging."
      },
      {
        q: "How do I initiate a return?",
        a: "Log into your account and visit the orders section, or contact our customer service team."
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive your return."
      }
    ]
  },
  {
    category: "Products & ingredients",
    questions: [
      {
        q: "Are your products authentic?",
        a: "Yes, all our products are sourced directly from official Korean manufacturers and distributors."
      },
      {
        q: "Do you test on animals?",
        a: "No, we are committed to cruelty-free beauty. We only work with brands that share this value."
      },
      {
        q: "How do I check product expiration dates?",
        a: "Expiration dates are printed on all product packaging. We also list manufacturing dates in product descriptions."
      }
    ]
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>("Orders & Shipping");
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* FAQ Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-light mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600">
              Find answers to common questions about our products, shipping, and more.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-3xl mx-auto">
            {faqs.map((category) => (
              <div key={category.category} className="mb-8">
                <button
                  onClick={() => setOpenCategory(
                    openCategory === category.category ? null : category.category
                  )}
                  className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-xl font-medium">{category.category}</h2>
                  {openCategory === category.category ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {openCategory === category.category && (
                  <div className="mt-4 space-y-4">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-4">
                        <button
                          onClick={() => toggleQuestion(faq.q)}
                          className="w-full flex items-center justify-between py-2 text-left hover:text-gray-600"
                        >
                          <span className="font-medium">{faq.q}</span>
                          {openQuestions.includes(faq.q) ? (
                            <ChevronUp className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 flex-shrink-0" />
                          )}
                        </button>
                        {openQuestions.includes(faq.q) && (
                          <p className="mt-2 text-gray-600 pl-4">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="max-w-xl mx-auto mt-16 text-center">
            <h3 className="text-xl font-medium mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

# app\favicon.ico

This is a binary file of the type: Binary

# app\globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

```

# app\layout.tsx

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { WishlistProvider } from '@/contexts/WishlistContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impression K Beauty",
  description: "Premium Korean Beauty Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WishlistProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </WishlistProvider>
      </body>
    </html>
  );
}
```

# app\page.tsx

```tsx
// src/app/page.tsx

'use client';
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Link from "next/link";
import IngredientsSpotlight from "@/components/sections/IngredientsSpotlight";
import InstagramFeed from "@/components/sections/InstagramFeed";
import KBeautyRitualGuide from "@/components/sections/KBeautyRitualGuide";
import Image from 'next/image';


const ShopByCategory = () => {
  const categories = [
    {
      name: 'Cleansers',
      image: '/images/products/cleansers.jpg',
      description: 'Start with a clean canvas',
      link: '/collections/cleansers'
    },
    {
      name: 'Toners',
      image: '/images/products/toners.jpg',
      description: 'Balance and prep your skin',
      link: '/collections/toners'
    },
    {
      name: 'Serums',
      image: '/images/products/serums.jpg',
      description: 'Target specific concerns',
      link: '/collections/serums'
    },
    {
      name: 'Moisturizers',
      image: '/images/products/moisturizer.jpg',
      description: 'Lock in hydration',
      link: '/collections/moisturizers'
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="relative flex flex-col items-center mb-10 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4">Browse</span>
          <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4 relative">
            Shop by Category
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-black"></span>
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((category, index) => (
            <Link 
              href={category.link} 
              key={index} 
              className="group block"
            >
            <div className="relative aspect-[3/4] overflow-hidden mb-3 sm:mb-4">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
            </div>
              <h3 className="text-base sm:text-xl font-light text-black mb-1 sm:mb-2">{category.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/collections/all" 
            className="inline-block border border-black text-black px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <IngredientsSpotlight />
      <ShopByCategory />
      <KBeautyRitualGuide />
      <InstagramFeed />
    </main>
  );
}
```

# app\privacy\page.tsx

```tsx
//app/privacy/page.tsx

import React from 'react';
import PolicyLayout from '@/components/layout/PolicyLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated="February 24, 2024"
    >
      <h2>Introduction</h2>
      <p>
        At Impression K Beauty, we take your privacy seriously. This Privacy Policy explains how we collect, 
        use, and protect your personal information when you use our website and services.
      </p>

      <h2>Information We Collect</h2>
      <h3>Personal Information</h3>
      <p>We may collect the following personal information:</p>
      <ul>
        <li>Name and contact details</li>
        <li>Shipping and billing addresses</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Payment information</li>
      </ul>

      <h3>Automatically Collected Information</h3>
      <p>We automatically collect certain information when you visit our website:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device information</li>
        <li>Cookies and similar technologies</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your personal information to:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Send order confirmations and updates</li>
        <li>Provide customer support</li>
        <li>Send marketing communications (with your consent)</li>
        <li>Improve our website and services</li>
        <li>Prevent fraud and maintain security</li>
      </ul>

      <h2>Information Sharing</h2>
      <p>
        We do not sell your personal information to third parties. We may share your information with:
      </p>
      <ul>
        <li>Shipping partners to deliver your orders</li>
        <li>Payment processors to handle transactions</li>
        <li>Service providers who assist our operations</li>
        <li>Law enforcement when required by law</li>
      </ul>

      <h2>Data Security</h2>
      <p>
        We implement appropriate security measures to protect your personal information. However, 
        no method of transmission over the internet is 100% secure.
      </p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Opt-out of marketing communications</li>
        <li>Withdraw consent where applicable</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use cookies to improve your browsing experience. You can control cookies through your 
        browser settings. See our <a href="/cookies">Cookie Policy</a> for more information.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any significant 
        changes by posting the new policy on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at:{' '}
        <a href="mailto:privacy@impressionkbeauty.com">privacy@impressionkbeauty.com</a>
      </p>
    </PolicyLayout>
  );
}
```

# app\products\[id]\page.tsx

```tsx
// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetails from '@/components/products/ProductDetails';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Define the type for a review
interface Review {
  id: string;
  rating: number;
  comment: string | null;
  user: {
    id: string;
    name: string | null;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Await the params object before accessing id
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      notFound();
    }

    // Properly serialize the reviews array to match the expected types
    const serializedReviews = product.reviews.map((review: Review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment || "", // Convert null to empty string
      user: {
        id: review.user.id,
        name: review.user.name || "" // Convert null to empty string
      }
    }));

    // Serialize the product data to avoid issues with Decimal
    const serializedProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: parseFloat(product.price.toString()),
      category: product.category,
      images: product.images,
      isVegan: product.isVegan,
      isCrueltyFree: product.isCrueltyFree,
      stock: product.stock,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      reviews: serializedReviews
    };

    // Pass serialized data to client component
    return <ProductDetails product={serializedProduct} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
```

# app\products\page.tsx

```tsx
// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import AddProductButton from '@/components/admin/AddProductButton';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowLeft } from 'lucide-react';

// Define a Product interface to type the products array
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  description: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const brands = Array.from(new Set(products.map((product) => product.brand)));
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          {/* Title and Add Product Button in a flex container */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            {isAdmin && <AddProductButton showOnList={true} />}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64">
              <ProductFilters 
                brands={brands}
                categories={categories}
              />
            </div>
            
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Loading products...</p>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>

        {/* Floating Add Product Button - still shown to admin users */}
        {isAdmin && <AddProductButton />}
      </div>
    </PageLayout>
  );
}
```

# app\returns\page.tsx

```tsx
//app/returns/page.tsx

import React from 'react';
import PolicyLayout from '@/components/layout/PolicyLayout';
import { RotateCcw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function ReturnsPolicy() {
  return (
    <PolicyLayout
      title="Returns Policy"
      lastUpdated="February 24, 2024"
    >
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="flex items-center text-xl font-medium mb-4">
          <RotateCcw className="w-6 h-6 mr-2" />
          Returns Overview
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            30-day return window from delivery date
          </li>
          <li className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            Free returns for UK customers
          </li>
          <li className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            Items must be unused and in original packaging
          </li>
        </ul>
      </div>

      <h2>Return Process</h2>
      <ol className="space-y-4 mb-8">
        <li className="flex items-start">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-3 flex-shrink-0">1</span>
          <div>
            <h3 className="font-medium mb-1">Initiate Your Return</h3>
            <p className="text-gray-600">
              Log into your account and select the order you wish to return. 
              Alternatively, contact our customer service team.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-3 flex-shrink-0">2</span>
          <div>
            <h3 className="font-medium mb-1">Package Your Items</h3>
            <p className="text-gray-600">
              Ensure items are unused, in their original packaging, with all tags attached.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-3 flex-shrink-0">3</span>
          <div>
            <h3 className="font-medium mb-1">Ship Your Return</h3>
            <p className="text-gray-600">
              Use the provided return label or ship to our returns center. 
              Keep your tracking number for reference.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-3 flex-shrink-0">4</span>
          <div>
            <h3 className="font-medium mb-1">Refund Processing</h3>
            <p className="text-gray-600">
              Once we receive and inspect your return, we&apos;ll process your refund 
              within 5-7 business days.
            </p>
          </div>
        </li>
      </ol>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Eligible for Returns
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>Unopened beauty products</li>
            <li>Unused skincare items</li>
            <li>Products in original packaging</li>
            <li>Items with tags attached</li>
            <li>Damaged or defective items</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            Not Eligible for Returns
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>Opened or used products</li>
            <li>Items without original packaging</li>
            <li>Sale or clearance items</li>
            <li>Gift cards</li>
            <li>Personal care items</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Special Notice</h4>
            <p className="text-sm text-yellow-700">
              Due to hygiene reasons, we cannot accept returns on opened cosmetics or 
              personal care items unless they are damaged or defective.
            </p>
          </div>
        </div>
      </div>

      <h2>Refund Information</h2>
      <p className="mb-4">
        Refunds will be processed to the original payment method used for the purchase. 
        Please allow:
      </p>
      <ul className="list-disc pl-6 mb-8">
        <li>5-7 business days for credit card refunds</li>
        <li>3-5 business days for store credit</li>
        <li>7-10 business days for international orders</li>
      </ul>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          Our customer service team is here to help with any questions about returns 
          or refunds:
        </p>
        <ul className="space-y-2">
          <li>Email: returns@impressionkbeauty.com</li>
          <li>Phone: +44 (0) 123 456 7890</li>
          <li>
            <a href="/contact" className="text-black hover:underline">
              Contact Form
            </a>
          </li>
        </ul>
      </div>
    </PolicyLayout>
  );
}
```

# app\search\page.tsx

```tsx
//app/search/page.tsx

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { Search } from 'lucide-react';

// Define base product interface
export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

// This matches the return type from the search API
interface SearchResult extends BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

// Create a separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    brands: [] as string[],
    categories: [] as string[],
    isVegan: false,
    isCrueltyFree: false,
    priceRange: [0, 1000] as [number, number]
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch results');
        
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // Extract unique brands and categories from results
  const brands = Array.from(new Set(results.map(item => item.brand)));
  const categories = Array.from(new Set(results.map(item => item.category)));

  // Filter results based on active filters
  const filteredResults = results.filter(item => {
    if (activeFilters.brands.length && !activeFilters.brands.includes(item.brand)) return false;
    if (activeFilters.categories.length && !activeFilters.categories.includes(item.category)) return false;
    if (activeFilters.isVegan && !item.isVegan) return false;
    if (activeFilters.isCrueltyFree && !item.isCrueltyFree) return false;
    if (item.price < activeFilters.priceRange[0] || item.price > activeFilters.priceRange[1]) return false;
    return true;
  });

  return (
    <div className="bg-white py-4 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-light mb-2 text-gray-600">
            {query ? `Search Results for "${query}"` : 'Search Products'}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredResults.length} products found
            </p>
            {/* Mobile filter button */}
            <button
              className="md:hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              Filters
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Search Error</h2>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-500">
              We couldn&apos;t find any products matching your search.
              Try checking your spelling or using different keywords.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filters Dialog */}
            {isMobileFiltersOpen && (
              <div className="fixed inset-0 z-40 md:hidden">
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black bg-opacity-25"
                  onClick={() => setIsMobileFiltersOpen(false)}
                />
                
                {/* Slide-over panel */}
                <div className="fixed inset-0 flex z-40">
                  <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setIsMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Filters */}
                    <div className="mt-4 px-4">
                      <ProductFilters
                        brands={brands}
                        categories={categories}
                        activeFilters={activeFilters}
                        onFilterChange={(filters) => {
                          setActiveFilters(filters);
                          setIsMobileFiltersOpen(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Filters */}
            <div className="hidden md:block w-64">
              <ProductFilters
                brands={brands}
                categories={categories}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
            </div>

            {/* Results Grid */}
            <div className="flex-1">
              <ProductGrid products={filteredResults} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function SearchLoading() {
  return (
    <div className="bg-white py-4 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-12 sm:py-20">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-black"></div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <PageLayout>
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
    </PageLayout>
  );
}
```

# app\shipping\page.tsx

```tsx
//app/shipping/page.tsx

import React from 'react';
import PolicyLayout from '@/components/layout/PolicyLayout';
import { Truck, Clock, Globe, AlertCircle } from 'lucide-react';

export default function ShippingInfo() {
  return (
    <PolicyLayout
      title="Shipping Information"
      lastUpdated="February 24, 2024"
    >
      {/* Shipping Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Truck className="w-5 h-5 mr-2" />
            Standard Shipping
          </h3>
          <p className="text-gray-600 mb-2">Delivery in 2-4 business days</p>
          <p className="font-medium">Free on orders over £50</p>
          <p className="text-gray-600">£3.99 for orders under £50</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Clock className="w-5 h-5 mr-2" />
            Express Shipping
          </h3>
          <p className="text-gray-600 mb-2">Delivery in 1-2 business days</p>
          <p className="font-medium">£7.99 flat rate</p>
          <p className="text-gray-600">Available for UK mainland only</p>
        </div>
      </div>

      <h2>Delivery Times</h2>
      <p className="mb-6">
        Orders are processed and shipped Monday through Friday, excluding holidays. 
        Order processing takes 1-2 business days.
      </p>

      <div className="border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="flex items-center text-lg font-medium mb-4">
          <Globe className="w-5 h-5 mr-2" />
          International Shipping
        </h3>
        <div className="space-y-4">
          <p>We ship to the following regions:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
              Europe (5-7 business days)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
              North America (7-10 business days)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
              Australia (10-14 business days)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
              Asia (7-10 business days)
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-700">
            Due to COVID-19, shipping times may be longer than usual. We appreciate your patience.
          </p>
        </div>
      </div>

      <h2>Tracking Your Order</h2>
      <p className="mb-6">
        Once your order ships, you&apos;ll receive a confirmation email with tracking 
        information. You can also track your order by:
      </p>
      <ul className="list-disc pl-6 mb-8">
        <li>Logging into your account</li>
        <li>Using the tracking link in your shipping confirmation email</li>
        <li>Contacting our customer service team</li>
      </ul>

      <h2>Shipping Restrictions</h2>
      <p className="mb-4">
        Some products may have shipping restrictions due to their contents. These will 
        be clearly marked on the product page.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-lg font-medium mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you have questions about shipping or need to make changes to your delivery, 
          please contact us:
        </p>
        <ul className="space-y-2">
          <li>Email: shipping@impressionkbeauty.com</li>
          <li>Phone: +44 (0) 123 456 7890</li>
          <li>
            <a href="/contact" className="text-black hover:underline">
              Contact Form
            </a>
          </li>
        </ul>
      </div>
    </PolicyLayout>
  );
}
```

# app\terms\page.tsx

```tsx
//app/terms/page.tsx

import React from 'react';
import PolicyLayout from '@/components/layout/PolicyLayout';

export default function TermsOfService() {
  return (
    <PolicyLayout
      title="Terms of Service"
      lastUpdated="February 24, 2024"
    >
      <h2>Introduction</h2>
      <p>
        These Terms of Service govern your use of the Impression K Beauty website and services. 
        By accessing or using our website, you agree to be bound by these terms.
      </p>

      <h2>Accounts</h2>
      <p>When creating an account, you agree to:</p>
      <ul>
        <li>Provide accurate and complete information</li>
        <li>Maintain the security of your account</li>
        <li>Not share your account credentials</li>
        <li>Notify us of any unauthorized use</li>
      </ul>

      <h2>Orders and Payments</h2>
      <p>By placing an order, you agree that:</p>
      <ul>
        <li>All information provided is accurate and complete</li>
        <li>You are authorized to use the payment method</li>
        <li>We reserve the right to refuse or cancel orders</li>
        <li>Prices and availability are subject to change</li>
      </ul>

      <h2>Shipping and Delivery</h2>
      <p>
        We aim to deliver products within the estimated timeframes. However, delays may occur 
        due to circumstances beyond our control. See our <a href="/shipping">Shipping Policy</a> 
        for details.
      </p>

      <h2>Returns and Refunds</h2>
      <p>
        Our return policy allows returns within 30 days of purchase. See our{' '}
        <a href="/returns">Returns Policy</a> for complete details.
      </p>

      <h2>Product Information</h2>
      <p>
        We strive to provide accurate product information. However, we do not warrant that 
        product descriptions or other content is accurate, complete, or current.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on our website is protected by copyright and other intellectual property 
        rights. You may not use our content without permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        We are not liable for any indirect, incidental, special, or consequential damages 
        arising from your use of our services.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of our services after 
        changes constitutes acceptance of the new terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the United Kingdom. Any disputes shall be 
        resolved in the courts of London, UK.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, please contact us at:{' '}
        <a href="mailto:legal@impressionkbeauty.com">legal@impressionkbeauty.com</a>
      </p>
    </PolicyLayout>
  );
}
```

# app\wishlist\page.tsx

```tsx
'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product, WishlistProduct } from '@/types/products';
import { Decimal } from '@prisma/client/runtime/library';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [formattedWishlist, setFormattedWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const formatWishlistItems = () => {
      return (wishlist as WishlistProduct[]).map((item) => {
        // Handle images - simplified approach
        const formattedImages = Array.isArray(item.images) 
          ? item.images[0] 
          : item.images || '/api/placeholder/300/300';

        // Handle price
        let formattedPrice: number;
        try {
          formattedPrice = typeof item.price === 'object' && 'toNumber' in item.price 
            ? (item.price as Decimal).toNumber()
            : Number(item.price);
        } catch (e) {
          formattedPrice = 0;
          console.error('Error formatting price:', e);
        }

        // Return a complete Product object
        return {
          id: item.id,
          name: item.name,
          brand: item.brand || '',
          images: formattedImages,
          price: formattedPrice,
          category: item.category || '',
          isVegan: Boolean(item.isVegan),
          isCrueltyFree: Boolean(item.isCrueltyFree)
        } as Product;
      });
    };

    setFormattedWishlist(formatWishlistItems());
  }, [wishlist]);

  if (!wishlist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-sm text-gray-500">
            {formattedWishlist.length} {formattedWishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {formattedWishlist.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link 
              href="/collections/all"
              className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <ProductGrid products={formattedWishlist} />
        )}
      </div>
    </div>
  );
}
```

# components\admin\AddProductButton.tsx

```tsx
// components/admin/AddProductButton.tsx
'use client';

import { useRef, useState } from 'react';
import { Plus, X, Save, Upload, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/lib/services/uploadService';
import Image from 'next/image';


interface AddProductButtonProps {
  showOnList?: boolean; // Optional prop to display as an inline button in a list
}

export default function AddProductButton({ showOnList = false }: AddProductButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: 'skincare',  // Main category
    type: 'cleanser',      // Add this new field
    isVegan: false,
    isCrueltyFree: false,
    isBestSeller: false,
    stock: '0',
    images: ['/api/placeholder/300/300']
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(['/api/placeholder/300/300']);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkboxes
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setError(null);

    try {
      const uploadedImageUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Create a preview URL for the image
        const previewUrl = URL.createObjectURL(file);
        
        // Add to preview images immediately for visual feedback
        setPreviewImages(prev => [...prev.filter(url => !url.includes('placeholder')), previewUrl]);
        
        // Upload the file to the server
        const uploadedUrl = await uploadFile(file);
        uploadedImageUrls.push(uploadedUrl);
      }
      
      // Update form data with the new image URLs
      setFormData(prev => ({
        ...prev,
        images: [...prev.images.filter(url => !url.includes('placeholder')), ...uploadedImageUrls]
      }));
      
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Image upload error:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    // If all images are removed, reset to placeholder
    if (previewImages.length <= 1) {
      setPreviewImages(['/api/placeholder/300/300']);
      setFormData(prev => ({
        ...prev,
        images: ['/api/placeholder/300/300']
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: 'skincare',  // Always set main category as skincare
          type: formData.type,    // Include the type field
          isBestSeller: formData.isBestSeller // Add this line
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create product');
      }

      const result = await response.json();
      setIsAdding(false);
      router.refresh(); // Refresh the page to show new product
      router.push(`/products/${result.id}`); // Navigate to the new product
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdding) {
    // Render different button styles based on showOnList prop
    return (
      <button 
        onClick={() => setIsAdding(true)}
        className={`flex items-center ${
          showOnList 
            ? "bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800" 
            : "fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 z-50"
        }`}
      >
        <Plus className={`${showOnList ? "w-4 h-4 mr-2" : "w-6 h-6"}`} />
        {showOnList && "Add Product"}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-black">Add New Product</h3>
          <button 
            onClick={() => setIsAdding(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand*
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price* (£)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              >
                <option value="cleanser">Cleanser</option>
                <option value="toner">Toner</option>
                <option value="serum">Serum</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="mask">Mask</option>
                <option value="sunscreen">Sunscreen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Type*
              </label>
              <select
                name="type"          // Changed from category to type
                value={formData.type}  // Changed from category to type
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              >
                <option value="cleanser">Cleanser</option>
                <option value="toner">Toner</option>
                <option value="serum">Serum</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="mask">Mask</option>
                <option value="sunscreen">Sunscreen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock*
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"/>
            </div>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isVegan"
                  checked={formData.isVegan}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Vegan</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isCrueltyFree"
                  checked={formData.isCrueltyFree}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Cruelty Free</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Best Seller</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"/>
          </div>

           {/* Image Upload Section */}
           <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            
            {/* Hidden file input */}
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              multiple
            />
            
            {/* Preview images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-3">
              {previewImages.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <Image 
                    src={img} 
                    alt={`Product preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Upload button */}
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={uploadingImage}
              className="border border-dashed border-gray-300 rounded-md p-4 text-center w-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {uploadingImage ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload product images</span>
                  <span className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</span>
                </div>
              )}
            </button>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isLoading || !formData.name || !formData.price || !formData.description}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# components\admin\AddSocialPostButton.tsx

```tsx
// components/admin/AddSocialPostButton.tsx
'use client';

import { useRef, useState } from 'react';
import { Plus, X, Save, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { uploadMedia } from '@/lib/services/uploadService';
import Image from 'next/image';

interface AddSocialPostButtonProps {
  showOnList?: boolean; // Optional prop to display as an inline button
  onAdd?: () => void; // Callback to refresh posts after adding
}

export default function AddSocialPostButton({ showOnList = false, onAdd }: AddSocialPostButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    platform: 'instagram',
    mediaType: 'image',
    caption: '',
    likes: '0',
    externalUrl: '',
    mediaUrl: '/api/placeholder/300/300', // Default placeholder
    thumbnailUrl: '/api/placeholder/300/300' // Default placeholder
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('/api/placeholder/300/300');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setError(null);

    try {
      const file = files[0];
      const mediaType = formData.mediaType as 'image' | 'video';
      
      // For images, create a preview URL
      if (mediaType === 'image') {
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
      }
      
      // Upload the file to the server
      const uploadedUrl = await uploadMedia(file, mediaType);
      
      setFormData(prev => ({
        ...prev,
        mediaUrl: uploadedUrl,
        // For images, thumbnailUrl is the same as mediaUrl
        ...(mediaType === 'image' ? { thumbnailUrl: uploadedUrl } : {})
      }));
    } catch (err) {
      setError('Failed to upload media. Please try again.');
      console.error('Media upload error:', err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setError(null);

    try {
      const file = files[0];
      
      // Create a preview URL for the thumbnail
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
      
      // Upload the thumbnail to the server
      const uploadedUrl = await uploadMedia(file, 'image');
      
      setFormData(prev => ({
        ...prev,
        thumbnailUrl: uploadedUrl
      }));
    } catch (err) {
      setError('Failed to upload thumbnail. Please try again.');
      console.error('Thumbnail upload error:', err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerThumbnailInput = () => {
    thumbnailInputRef.current?.click();
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          likes: parseInt(formData.likes),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create post');
      }

      setIsAdding(false);
      if (onAdd) onAdd();
      router.refresh(); // Refresh the page to show new post
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdding) {
    // Render different button styles based on showOnList prop
    return (
      <button 
        onClick={() => setIsAdding(true)}
        className={`flex items-center ${
          showOnList 
            ? "bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800" 
            : "fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 z-50"
        }`}
      >
        <Plus className={`${showOnList ? "w-4 h-4 mr-2" : "w-6 h-6"}`} />
        {showOnList && "Add Social Media Post"}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Add New Social Media Post</h3>
          <button 
            onClick={() => setIsAdding(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
            
            {/* Media Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Media Type
              </label>
              <select
                name="mediaType"
                value={formData.mediaType}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            
            {/* Media Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.mediaType === 'image' ? 'Image' : 'Video'}
              </label>
              
              {/* Hidden file input */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleMediaUpload}
                className="hidden"
                accept={formData.mediaType === 'image' ? "image/*" : "video/*"}
              />
              
              {/* Preview */}
              <div className="relative aspect-square mb-2 border rounded-lg overflow-hidden">
                {formData.mediaType === 'image' ? (
                  <Image 
                    src={previewUrl} 
                    alt="Post preview" 
                    fill
                    className="object-cover"
                  />
                ) : formData.mediaUrl !== '/api/placeholder/300/300' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <video 
                      src={formData.mediaUrl}
                      poster={previewUrl}
                      controls
                      className="max-h-full max-w-full"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No video selected</span>
                  </div>
                )}
              </div>

              {/* Upload button */}
              <button
                type="button"
                onClick={triggerFileInput}
                disabled={uploadingMedia}
                className="w-full border border-dashed border-gray-300 rounded-md p-3 text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {uploadingMedia ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Upload className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Upload {formData.mediaType === 'image' ? 'image' : 'video'}
                    </span>
                  </div>
                )}
              </button>
            </div>
            
            {/* Thumbnail Upload Section (for videos only) */}
            {formData.mediaType === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Thumbnail
                </label>
                
                {/* Hidden thumbnail input */}
                <input 
                  type="file"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  accept="image/*"
                />
                
                <button
                  type="button"
                  onClick={triggerThumbnailInput}
                  disabled={uploadingMedia}
                  className="w-full border border-dashed border-gray-300 rounded-md p-3 text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {uploadingMedia ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Upload className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        Upload thumbnail image
                      </span>
                    </div>
                  )}
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Likes
              </label>
              <input
                type="number"
                name="likes"
                value={formData.likes}
                onChange={handleChange}
                min="0"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                External URL (optional)
              </label>
              <input
                type="text"
                name="externalUrl"
                value={formData.externalUrl}
                onChange={handleChange}
                placeholder={`https://${formData.platform}.com/p/example`}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isLoading || !formData.caption || formData.mediaUrl === '/api/placeholder/300/300'}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# components\admin\AdminProductControls.tsx

```tsx
// components/admin/AdminProductControls.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import AddProductButton from '@/components/admin/AddProductButton';

interface AdminProductControlsProps {
  title?: string;
  className?: string;
}

/**
 * A component that renders admin product controls (Add Product button)
 * Can be included in any collection or product page
 */
export default function AdminProductControls({ title, className = '' }: AdminProductControlsProps) {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  if (title) {
    return (
      <div className={`flex justify-between items-center mb-8 ${className}`}>
        <h1 className="text-3xl font-light text-black">{title}</h1>
        <AddProductButton showOnList={true} />
      </div>
    );
  }

  return (
    <>
      <div className={`mb-8 flex justify-end ${className}`}>
        <AddProductButton showOnList={true} />
      </div>
      <AddProductButton />
    </>
  );
}
```

# components\admin\dashboard\EmailCharts.tsx

```tsx
// src/components/admin/dashboard/EmailCharts.tsx
import { 
    LineChart, 
    BarChart, 
    Bar, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend 
  } from 'recharts';
  
  interface EmailChartsProps {
    hourlyVolume: Array<{
      hour: string;
      sent: number;
      failed: number;
    }>;
    statusBreakdown: Array<{
      status: string;
      count: number;
    }>;
  }
  
  export default function EmailCharts({ hourlyVolume, statusBreakdown }: EmailChartsProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Email Volume</h3>
          <LineChart width={500} height={300} data={hourlyVolume}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sent" stroke="#3B82F6" />
            <Line type="monotone" dataKey="failed" stroke="#EF4444" />
          </LineChart>
        </div>
  
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Delivery Status</h3>
          <BarChart width={500} height={300} data={statusBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </div>
      </div>
    );
  }
```

# components\admin\dashboard\EmailQueueTable.tsx

```tsx
// src/components/admin/dashboard/EmailQueueTable.tsx
interface EmailQueueTableProps {
    emails: Array<{
      id: string;
      to: string;
      subject: string;
      status: 'pending' | 'processing' | 'failed' | 'sent';
      attempts: number;
      lastAttempt?: string;
    }>;
  }
  
  export default function EmailQueueTable({ emails }: EmailQueueTableProps) {
    return (
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Email Queue</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">To</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Attempts</th>
                  <th className="px-4 py-2 text-left">Last Attempt</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr key={email.id}>
                    <td className="px-4 py-2">{email.id}</td>
                    <td className="px-4 py-2">{email.to}</td>
                    <td className="px-4 py-2">{email.subject}</td>
                    <td className="px-4 py-2">
                      <span 
                        className={`px-2 py-1 rounded text-sm ${
                          email.status === 'sent' ? 'bg-green-100 text-green-800' :
                          email.status === 'failed' ? 'bg-red-100 text-red-800' :
                          email.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {email.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{email.attempts}</td>
                    <td className="px-4 py-2">
                      {email.lastAttempt ? new Date(email.lastAttempt).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
```

# components\admin\dashboard\MetricsCard.tsx

```tsx
// src/components/admin/dashboard/MetricsCard.tsx
interface MetricsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
  }
  
  export default function MetricsCard({ title, value, icon }: MetricsCardProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </div>
    );
  }
```

# components\admin\EmailDashboard.tsx

```tsx
// src/components/admin/EmailDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import MetricsCard from './dashboard/MetricsCard';
import EmailQueueTable from './dashboard/EmailQueueTable';
import EmailCharts from './dashboard/EmailCharts';

interface EmailMetrics {
  totalSent: number;
  totalFailed: number;
  queueLength: number;
  averageLatency: number;
  hourlyVolume: Array<{
    hour: string;
    sent: number;
    failed: number;
  }>;
  statusBreakdown: Array<{
    status: string;
    count: number;
  }>;
}

interface QueuedEmail {
  id: string;
  to: string;
  subject: string;
  status: 'pending' | 'processing' | 'failed' | 'sent';
  attempts: number;
  lastAttempt?: string;
}

export default function EmailDashboard() {
  const [metrics, setMetrics] = useState<EmailMetrics | null>(null);
  const [queuedEmails, setQueuedEmails] = useState<QueuedEmail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [metricsResponse, queueResponse] = await Promise.all([
        fetch('/api/admin/email/metrics'),
        fetch('/api/admin/email/queue')
      ]);

      const [metricsData, queueData] = await Promise.all([
        metricsResponse.json(),
        queueResponse.json()
      ]);

      setMetrics(metricsData);
      setQueuedEmails(queueData);
    } catch (error) {
      console.error('Error fetching email data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Email Dashboard</h1>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricsCard
          title="Total Sent"
          value={metrics?.totalSent || 0}
          icon={<Mail className="h-8 w-8 text-blue-500" />}
        />
        <MetricsCard
          title="Failed"
          value={metrics?.totalFailed || 0}
          icon={<AlertCircle className="h-8 w-8 text-red-500" />}
        />
        <MetricsCard
          title="Queue Length"
          value={metrics?.queueLength || 0}
          icon={<Clock className="h-8 w-8 text-yellow-500" />}
        />
        <MetricsCard
          title="Avg. Latency"
          value={`${metrics?.averageLatency.toFixed(2)}ms` || '0ms'}
          icon={<CheckCircle className="h-8 w-8 text-green-500" />}
        />
      </div>

      {/* Email Queue */}
      <EmailQueueTable emails={queuedEmails} />

      {/* Charts */}
      <EmailCharts 
        hourlyVolume={metrics?.hourlyVolume || []}
        statusBreakdown={metrics?.statusBreakdown || []}
      />
    </div>
  );
}
```

# components\admin\EmailTemplateTester.tsx

```tsx
// src/components/admin/EmailTemplateTester.tsx
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

const templates = [
  { id: 'welcome', name: 'Welcome Email' },
  { id: 'order-confirmation', name: 'Order Confirmation' },
  { id: 'shipping-confirmation', name: 'Shipping Confirmation' },
  { id: 'password-reset', name: 'Password Reset' },
];

export default function EmailTemplateTester() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [testEmail, setTestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success?: boolean; message?: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: selectedTemplate,
          email: testEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: 'Test email sent successfully!' });
      } else {
        setResult({ success: false, message: data.error || 'Failed to send test email' });
      }
    } catch (error) {
      setResult({ success: false, message: `Failed to send test email: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Email Template Tester</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">
            Select Template
          </label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700">
            Test Email Address
          </label>
          <input
            type="email"
            id="testEmail"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="test@example.com"
            required
          />
        </div>

        {result && (
          <div
            className={`p-4 rounded-md ${
              result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {result.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Test Email
            </>
          )}
        </button>
      </form>
    </div>
  );
}
```

# components\admin\ProductEditControls.tsx

```tsx
// components/admin/ProductEditControls.tsx
'use client';

import { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductEditControlsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    isVegan: boolean;
    isCrueltyFree: boolean;
    stock: number;
  };
}

export default function ProductEditControls({ product }: ProductEditControlsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...product });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkboxes
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update product');
      }

      setIsEditing(false);
      router.refresh(); // Refresh the page to show updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete product');
      }

      router.push('/products'); // Redirect to products list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Admin Controls</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </button>
          <button 
            onClick={handleDelete}
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">Edit Product</h3>
        <button 
          onClick={() => setIsEditing(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="cleanser">Cleanser</option>
            <option value="toner">Toner</option>
            <option value="serum">Serum</option>
            <option value="moisturizer">Moisturizer</option>
            <option value="mask">Mask</option>
            <option value="sunscreen">Sunscreen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isVegan"
              checked={formData.isVegan}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Vegan</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isCrueltyFree"
              checked={formData.isCrueltyFree}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Cruelty Free</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
```

# components\admin\ProductQuickEdit.tsx

```tsx
// components/admin/ProductQuickEdit.tsx
'use client';

import { useState, useRef } from 'react';
import { Edit, X, Upload, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { uploadFile } from '@/lib/services/uploadService';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | string;
  category?: string;
  stock?: number;
  isVegan?: boolean;
  isCrueltyFree?: boolean;
  images?: string;
}

interface ProductQuickEditProps {
  product: Product;
  displayMode?: 'icon' | 'button';
}

export default function ProductQuickEdit({ product, displayMode = 'icon' }: ProductQuickEditProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: product.name,
    price: typeof product.price === 'number' ? product.price.toString() : product.price,
    stock: product.stock?.toString() || '0',
    images: product.images ? JSON.parse(product.images as string) : ['/api/placeholder/300/300'],
  });
  
  const [previewImages, setPreviewImages] = useState<string[]>(
    formData.images.length > 0 ? formData.images : ['/api/placeholder/300/300']
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isAdmin) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setError(null);

    try {
      const uploadedImageUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Create a preview URL for the image
        const previewUrl = URL.createObjectURL(file);
        
        // Add to preview images immediately for visual feedback
        setPreviewImages(prev => [...prev.filter(url => !url.includes('placeholder')), previewUrl]);
        
        // Upload the file to the server
        const uploadedUrl = await uploadFile(file);
        uploadedImageUrls.push(uploadedUrl);
      }
      
      // Update form data with the new image URLs
      setFormData(prev => ({
        ...prev,
        images: [...prev.images.filter((url: string) => !url.includes('placeholder')), ...uploadedImageUrls]
      }));
      
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Image upload error:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index)
    }));
    
    // If all images are removed, reset to placeholder
    if (previewImages.length <= 1) {
      setPreviewImages(['/api/placeholder/300/300']);
      setFormData(prev => ({
        ...prev,
        images: ['/api/placeholder/300/300']
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          images: JSON.stringify(formData.images)
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update product');
      }

      setIsEditing(false);
      router.refresh(); // Refresh the page to show updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick edit popup
  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Quick Edit Product</h3>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                
                {/* Hidden file input */}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
                
                {/* Preview images */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative">
                      <Image 
                        src={img} 
                        alt={`Product preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload button */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={uploadingImage}
                  className="border border-dashed border-gray-300 rounded-md p-3 text-center w-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {uploadingImage ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Upload className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">Upload images</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Trigger button/icon
  if (displayMode === 'button') {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </button>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Edit className="h-5 w-5" />
    </button>
  );
}
```

# components\admin\SocialPostEdit.tsx

```tsx
// components/admin/SocialPostEdit.tsx
'use client';

import { useState, useRef } from 'react';
import { Edit, X, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { uploadMedia } from '@/lib/services/uploadService';

interface SocialPost {
  id: string;
  platform: string; // 'instagram' or 'tiktok'
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: string; // 'image' or 'video'
  caption: string;
  likes: number;
  externalUrl?: string;
}

interface SocialPostEditProps {
  post: SocialPost;
  displayMode?: 'icon' | 'button';
  onUpdate?: () => void; // Callback to refresh posts after update
}

export default function SocialPostEdit({ 
  post, 
  displayMode = 'icon', 
  onUpdate 
}: SocialPostEditProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    platform: post.platform,
    mediaUrl: post.mediaUrl,
    thumbnailUrl: post.thumbnailUrl || post.mediaUrl, // Use media URL as fallback
    mediaType: post.mediaType,
    caption: post.caption,
    likes: post.likes,
    externalUrl: post.externalUrl || '',
  });
  
  const [previewUrl, setPreviewUrl] = useState<string>(
    post.mediaType === 'image' ? post.mediaUrl : (post.thumbnailUrl || post.mediaUrl)
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isAdmin) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setError(null);

    try {
      const file = files[0];
      const mediaType = formData.mediaType as 'image' | 'video';
      
      // Create a preview URL for the file
      if (mediaType === 'image') {
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
      }
      
      // Upload the file to the server
      const uploadedUrl = await uploadMedia(file, mediaType);
      
      setFormData(prev => ({
        ...prev,
        mediaUrl: uploadedUrl,
        // For images, thumbnailUrl is the same as mediaUrl
        ...(mediaType === 'image' ? { thumbnailUrl: uploadedUrl } : {})
      }));
    } catch (err) {
      setError('Failed to upload media. Please try again.');
      console.error('Media upload error:', err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setError(null);

    try {
      const file = files[0];
      
      // Create a preview URL for the thumbnail
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
      
      // Upload the thumbnail to the server
      const uploadedUrl = await uploadMedia(file, 'image');
      
      setFormData(prev => ({
        ...prev,
        thumbnailUrl: uploadedUrl
      }));
    } catch (err) {
      setError('Failed to upload thumbnail. Please try again.');
      console.error('Thumbnail upload error:', err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerThumbnailInput = () => {
    thumbnailInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/social/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update post');
      }

      setIsEditing(false);
      if (onUpdate) onUpdate();
      router.refresh(); // Refresh the page to show updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick edit popup
  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Edit Social Media Post</h3>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              
              {/* Media Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Media Type
                </label>
                <select
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              {/* Media Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.mediaType === 'image' ? 'Image' : 'Video'}
                </label>
                
                {/* Hidden file input */}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  className="hidden"
                  accept={formData.mediaType === 'image' ? "image/*" : "video/*"}
                />
                
                {/* Preview */}
                <div className="relative aspect-square mb-2 border rounded-lg overflow-hidden">
                  {formData.mediaType === 'image' ? (
                    <Image 
                      src={previewUrl} 
                      alt="Post preview" 
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <video 
                        src={formData.mediaUrl}
                        poster={previewUrl}
                        controls
                        className="max-h-full max-w-full"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>

                {/* Upload button */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={uploadingMedia}
                  className="w-full border border-dashed border-gray-300 rounded-md p-3 text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {uploadingMedia ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Upload className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        Upload {formData.mediaType === 'image' ? 'image' : 'video'}
                      </span>
                    </div>
                  )}
                </button>
              </div>
              
              {/* Thumbnail Upload Section (for videos only) */}
              {formData.mediaType === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video Thumbnail
                  </label>
                  
                  {/* Hidden thumbnail input */}
                  <input 
                    type="file"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  
                  <button
                    type="button"
                    onClick={triggerThumbnailInput}
                    disabled={uploadingMedia}
                    className="w-full border border-dashed border-gray-300 rounded-md p-3 text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {uploadingMedia ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Upload className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">
                          Upload thumbnail image
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <textarea
                  name="caption"
                  value={formData.caption}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Likes
                </label>
                <input
                  type="number"
                  name="likes"
                  value={formData.likes}
                  onChange={handleChange}
                  min="0"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  External URL (optional)
                </label>
                <input
                  type="text"
                  name="externalUrl"
                  value={formData.externalUrl}
                  onChange={handleChange}
                  placeholder={`https://${formData.platform}.com/p/example`}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Trigger button/icon
  if (displayMode === 'button') {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </button>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Edit className="h-5 w-5" />
    </button>
  );
}
```

# components\checkout\ConfirmationStep.tsx

```tsx
// src/components/checkout/ConfirmationStep.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ConfirmationStep() {
  const { state, clearCart } = useCart();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Clear cart when component mounts
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Order Confirmed!
      </h2>

      <p className="text-gray-600 mb-6">
        Thank you for your order. Your order number is #{orderNumber}
      </p>

      <div className="border-t border-b border-gray-200 py-4 my-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Order Total:</span>
          <span className="font-semibold">${state.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Method:</span>
          <span>Standard Shipping</span>
        </div>
      </div>

      <div className="mb-6 text-left">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <ul className="space-y-2 text-gray-600">
          <li>1. You will receive an order confirmation email</li>
          <li>2. We will process your order within 24 hours</li>
          <li>3. You will receive shipping updates via email</li>
        </ul>
      </div>

      <div className="space-y-4">
        <Link
          href="/account/orders"
          className="block w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          View Order Status
        </Link>
        <Link
          href="/"
          className="block w-full bg-white text-black px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
```

# components\checkout\PaymentForm.tsx

```tsx
// src/components/checkout/PaymentForm.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/contexts/CartContext';
import { getStripePublicKey } from '@/lib/stripe';

// Initialize Stripe
const stripePromise = loadStripe(getStripePublicKey());

interface PaymentFormProps {
  onComplete: () => void;
  onBack: () => void;
}

function CheckoutForm({ onComplete, onBack }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
          disabled={isProcessing}
        >
          Back
        </button>
        
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Pay now'}
        </button>
      </div>
    </form>
  );
}

export default function PaymentForm(props: PaymentFormProps) {
  const { state } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: state.totalAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error('Error:', err));
  }, [state.totalAmount]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
          },
        }}
      >
        <CheckoutForm {...props} />
      </Elements>
    </div>
  );
}
```

# components\checkout\ShippingForm.tsx

```tsx
// src/components/checkout/ShippingForm.tsx
'use client';

import { useState } from 'react';

interface ShippingFormProps {
  onComplete: () => void;
}

export default function ShippingForm({ onComplete }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United Kingdom',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate and save the shipping information
    onComplete();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Shipping Information
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            required
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            required
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-600 text-lg">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            required
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            id="apartment"
            value={formData.apartment}
            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State / Province
          </label>
          <input
            type="text"
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
```

# components\layout\ClientLayout.tsx

```tsx
//components/layout/ClientLayout.tsx

'use client';

import { CartProvider } from "@/contexts/CartContext";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
```

# components\layout\CollectionLayout.tsx

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageLayout from './PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { ArrowRight, X, Filter } from 'lucide-react';
import AdminProductControls from '@/components/admin/AdminProductControls';

// Define a product interface
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  description: string;
}

interface CollectionLayoutProps {
  title: string;
  description: string;
  products: Product[];
  brands: string[];
  categories: string[];
  loading?: boolean;
  banner?: {
    image: string;
    title: string;
    description: string;
  };
}

export default function CollectionLayout({
  title,
  description,
  products,
  brands,
  categories,
  loading,
  banner
}: CollectionLayoutProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <PageLayout className="bg-white">
      {/* Text Header Section - Smaller Size */}
      {banner && (
        <div className="w-full bg-gray-50 py-1 -mt-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-light mb-1 text-black">{banner.title}</h1>
              <p className="text-xs sm:text-sm text-gray-600">{banner.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Admin Controls */}
          <AdminProductControls title={!banner ? title : undefined} />

          {/* Collection Header - Only show if no banner */}
          {!banner && (
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-black mb-2 sm:mb-4">{title}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>
            </div>
          )}

          {/* Breadcrumb */}
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mx-2" />
            <span className="text-black">{title}</span>
          </div>

          {/* Mobile Filter Button */}
          <button
            className="md:hidden w-full mb-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-md flex items-center justify-between"
            onClick={() => setShowMobileFilters(true)}
          >
            <span className="text-sm">Filters</span>
            <Filter className="w-4 h-4" />
          </button>

          {/* Products Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Overlay */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 bg-white md:hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-medium">Filters</h2>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <ProductFilters 
                    brands={brands}
                    categories={categories}
                  />
                </div>
              </div>
            )}

            {/* Desktop Filters */}
            <div className="hidden md:block w-64 lg:w-72">
              <ProductFilters 
                brands={brands}
                categories={categories}
              />
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

# components\layout\Footer.tsx

```tsx
//components/layout/Footer.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className="bg-blue-100 border-t border-gray-100">
      {/* Newsletter Section */}
      {/* <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-light mb-4">Join Our Beauty Community</h3>
            <p className="text-gray-300 mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-black"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-base sm:text-lg text-gray-600 font-medium mb-4 sm:mb-6">IMPRESSION K BEAUTY</h4>
            <p className="text-sm text-gray-600 mb-4">
              Your destination for authentic Korean beauty products. We bring the best of K-beauty to your doorstep.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm">+44 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm">hello@impressionkbeauty.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm">London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg text-gray-600 font-medium mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-black">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-black">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-black">FAQs</Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-black">Shipping Information</Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-600 hover:text-black">Returns Policy</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base sm:text-lg text-gray-600 font-medium mb-4 sm:mb-6">Categories</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/collections/skincare" className="text-sm text-gray-600 hover:text-black">Skincare</Link>
              </li>
              <li>
                <Link href="/collections/moisturizers" className="text-sm text-gray-600 hover:text-black">Moisturizers</Link>
              </li>
              <li>
                <Link href="/collections/serums" className="text-sm text-gray-600 hover:text-black">Serums</Link>
              </li>
              <li>
                <Link href="/collections/masks" className="text-sm text-gray-600 hover:text-black">Face Masks</Link>
              </li>
              <li>
                <Link href="/collections/sets" className="text-sm text-gray-600 hover:text-black">Gift Sets</Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-base sm:text-lg text-gray-600 font-medium mb-4 sm:mb-6">Follow Us</h4>
            <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SiFacebook size={18} color="#1877F2" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SiInstagram size={18} color="#E4405F" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SiYoutube size={18} color="#FF0000" />
              </a>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h5 className="font-medium text-gray-600 text-sm">Payment Methods</h5>
              <div className="flex flex-wrap gap-2">
                <div className="relative h-6 sm:h-8 w-10 sm:w-12">
                  <Image 
                    src='/images/payments/visa.png' 
                    alt="Visa" 
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-6 sm:h-8 w-10 sm:w-12">
                  <Image 
                    src='/images/payments/mastercard.jpg' 
                    alt="Mastercard" 
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-6 sm:h-8 w-12 sm:w-14">
                  <Image 
                    src='/images/payments/apple-pay.png' 
                    alt="Apple Pay" 
                    fill
                    sizes="(max-width: 640px) 48px, 56px"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-6 sm:h-8 w-12 sm:w-14">
                  <Image 
                    src='/images/payments/pay-pal.png' 
                    alt="PayPal" 
                    fill
                    sizes="(max-width: 640px) 48px, 56px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-600">
              © {new Date().getFullYear()} IMPRESSION K BEAUTY. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-3 md:mt-0">
              <Link href="/privacy" className="text-xs sm:text-sm text-gray-600 hover:text-black">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs sm:text-sm text-gray-600 hover:text-black">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-xs sm:text-sm text-gray-600 hover:text-black">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

# components\layout\Header.tsx

```tsx
// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Search,
  User,
  Heart
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


export default function Header() {
  const { data: session } = useSession();
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wishlist: string[] = [];
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header ref={dropdownRef} className="w-full bg-white z-50 relative shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Free shipping banner */}
        <div className="hidden sm:flex justify-center items-center text-xs py-1 px-4 bg-gray-50 w-full">
          <span className="font-medium text-black">
            Free shipping on orders over £50
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          {/* Logo and Creative Brand Text */}
          <Link href="/" className="flex items-center">
  <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] overflow-visible">
    <div className="absolute inset-0 origin-left scale-[2.2] sm:scale-[3.2] md:scale-[4.5]">
      <Image
        src="/images/logo.png"
        alt="Impression K Beauty"
        fill
        className="object-contain"
        priority
      />
    </div>
  </div>
</Link>

          {/* Search Bar (Desktop) */}
          <div className="flex-1 mx-6 max-w-md hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-10 border border-gray-300 bg-white rounded-full focus:outline-none focus:ring-1 focus:ring-black transition-all duration-200 text-sm text-black"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full text-black"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4 sm:space-x-6">
              <Link
                href="/collections/new"
                className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
              >
                NEW
              </Link>
              <Link
                href="/collections/brands"
                className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
              >
                BRANDS
              </Link>
              <Link
                href="/collections/bestsellers"
                className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
              >
                BESTSELLERS
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full text-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Authentication Buttons or Account Menu */}
            {session ? (
              <Menu as="div" className="relative hidden sm:block">
                <Menu.Button className="flex items-center text-xs sm:text-sm font-medium text-gray-800 hover:text-black px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">
                  <User className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">My Account</span>
                  {session.user?.role === 'ADMIN' && (
                    <span className="ml-1 text-xs text-red-500">(Admin)</span>
                  )}
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {session.user?.role === 'ADMIN' && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/admin/orders"
                            className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/orders"
                          className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                        >
                          Orders
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/profile"
                          className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="text-xs sm:text-sm font-medium text-gray-800 hover:text-black px-2 sm:px-3 py-1 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-xs sm:text-sm font-medium text-white bg-black px-2 sm:px-3 py-1 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <div className="flex items-center space-x-4">
              {/* Wishlist Icon */}
              <Link 
                href="/wishlist" 
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Heart className="w-6 h-6 text-gray-600" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-1 text-black hover:bg-gray-100 rounded-full group"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {state.totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-4 mb-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-10 border border-gray-300 bg-white rounded-full focus:outline-none focus:ring-1 focus:ring-black text-sm text-black"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}

        {/* Decorative Border */}
        <div className="relative h-1 mt-4 bg-gradient-to-r from-pink-50 via-pink-200 to-pink-50 rounded-full"></div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          {/* Add Close Button at the top */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-800"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="container mx-auto px-4 py-4">
            {/* Authentication Section */}
            {session ? (
              <Link
                href="/account"
                className="text-base sm:text-lg font-medium py-3 border-b border-gray-200 flex items-center text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-2" />
                My Account
              </Link>
            ) : (
              <div className="flex justify-between py-4 border-b border-gray-100">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Main Navigation */}
            <nav className="flex flex-col mt-4">
              <Link
                href="/collections/new"
                className="text-base sm:text-lg font-medium py-3 border-b border-gray-200 text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                NEW
              </Link>
              <Link
                href="/collections/brands"
                className="text-base sm:text-lg font-medium py-3 border-b border-gray-200 text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                BRANDS
              </Link>
              <Link
                href="/collections/bestsellers"
                className="text-base sm:text-lg font-medium py-3 border-b border-gray-200 text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                BESTSELLERS
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

```

# components\layout\Hero.tsx

```tsx
//src/components/layout/Hero.tsx

'use client';

import { useState, useEffect, useCallback  } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/hero-1.jpg',
    title: 'Discover Your Glow',
    subtitle: 'Korean Beauty Essentials',
    description: 'Experience the magic of K-Beauty with our curated collection of premium skincare products.',
    cta: 'Shop Skincare',
    link: '/collections/brands',
    align: 'right' // Image on right, text on left
  },
  {
    id: 2,
    image: '/images/hero-2.jpg',
    title: 'Spring Collection',
    subtitle: 'New Arrivals',
    description: 'Refresh your beauty routine with our latest spring arrivals. Clean, gentle, and effective formulations.',
    cta: 'View New Arrivals',
    link: '/collections/new',
    align: 'left' // Image on left, text on right
  },
  {
    id: 3,
    image: '/images/hero-3.jpg',
    title: 'Best Sellers',
    subtitle: 'Best sellers',
    description: 'Our most-loved picks, handpicked just for you. Shop best sellers and save more.',
    cta: 'Best sellers',
    link: '/collections/bestsellers',
    align: 'right'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-blue-100" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Slide Content */}
      <div className="relative h-full">
      <div className={`flex flex-col md:flex-row h-full transition-transform duration-500 ease-in-out ${isAnimating ? 'blur-sm' : ''}`}>
      {/* Image Section */}
        <div className={`w-full md:w-1/2 h-1/2 md:h-full relative ${slide.align === 'left' ? 'md:order-1' : 'md:order-2'}`}>
          <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Text Section */}
          <div className={`w-full md:w-1/2 h-1/2 md:h-full flex items-center ${slide.align === 'left' ? 'md:order-2' : 'md:order-1'}`}>
            <div className="max-w-xl mx-auto px-6 sm:px-8 py-8 md:py-0">
              <span className="block text-xs sm:text-sm font-medium tracking-[0.2em] text-gray-500 mb-2 sm:mb-4 uppercase">
                {slide.subtitle}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-3 sm:mb-6 tracking-wide">
                {slide.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                {slide.description}
              </p>
              <Link
                href={slide.link}
                className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-black w-6 sm:w-8' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
```

# components\layout\PageLayout.tsx

```tsx
//components/layout/PageLayout.tsx

'use client';

import Header from './Header';
//import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;  // Make className optional
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={className}>
      <Header />
      <div className="min-h-screen bg-white w-full">
        <div className="w-full bg-white">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
```

# components\layout\PolicyLayout.tsx

```tsx
//components/layout/PolicyLayout.tsx
'use client';

import React from 'react';
import PageLayout from './PageLayout';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light mb-4">{title}</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {children}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-600">
              <p>
                If you have any questions about these policies, please{' '}
                <a href="/contact" className="text-black hover:underline">
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

# components\products\AddToCartButton.tsx

```tsx
// src/components/products/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Decimal } from '@prisma/client/runtime/library';

// This interface matches the structure from Prisma but converts Decimal to number for the cart
interface ProductProps {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: Decimal | number;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AddToCartButtonProps {
  product: ProductProps;
  showQuantity?: boolean; // Optional prop to show/hide quantity controls
}

export default function AddToCartButton({ product, showQuantity = true }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Convert the product with Decimal price to a product with numeric price
      const cartProduct = {
        ...product,
        price: Number(product.price)  // Convert Decimal to Number for the cart
      };
      
      addItem(cartProduct, quantity);
      
      // Use a more subtle success notification - replace alert
      // Show temporary success state for 1.5 seconds
      setTimeout(() => {
        setIsAdding(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
      alert('Failed to add to cart. Please try again.');
    }
  };

  // Simple button version (no quantity controls)
  if (!showQuantity) {
    return (
      <button
        type="button"
        className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        onClick={handleAddToCart}
        disabled={isAdding || product.stock === 0}
      >
        {isAdding ? (
          'Adding...'
        ) : product.stock === 0 ? (
          'Out of Stock'
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    );
  }

  // Full version with quantity controls
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1 || isAdding}
          >
            -
          </button>
          <span className="px-4 py-2 text-gray-900">{quantity}</span>
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock || isAdding}
          >
            +
          </button>
        </div>
        
        <button
          type="button"
          className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>
            {isAdding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </span>
        </button>
      </div>
      
      {product.stock < 10 && product.stock > 0 && (
        <p className="text-sm text-red-600">
          Only {product.stock} left in stock - order soon
        </p>
      )}
    </div>
  );
}
```

# components\products\ProductDetails.tsx

```tsx
//src/components/products/ProductDetails.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import AddToCartButton from '@/components/products/AddToCartButton';
import ProductEditControls from '@/components/admin/ProductEditControls';
import AddProductButton from '@/components/admin/AddProductButton';
import { useAuth } from '@/contexts/AuthContext';
import StarRating from '../ui/StarRating';
import ReviewForm from './ReviewForm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Interface for reviews
interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string; // This will be an ISO date string from the API
  user: {
    id: string;
    name: string;
  };
}

// Serialized product data from server
interface SerializedProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}

interface ProductDetailsProps {
  product: SerializedProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [reviews, setReviews] = useState(product.reviews);
  
  const images = JSON.parse(product.images as string);

  // Prepare objects for different components with their expected types
  const addToCartProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    images: product.images,
    category: product.category,
    isVegan: product.isVegan,
    isCrueltyFree: product.isCrueltyFree,
    stock: product.stock,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt)
  };

  const editControlsProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    category: product.category,
    isVegan: product.isVegan,
    isCrueltyFree: product.isCrueltyFree,
    stock: product.stock
  };

  const averageRating = reviews?.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const handleReviewSubmitted = async () => {
    // Refresh reviews
    const response = await fetch(`/api/products/${product.id}`);
    const updatedProduct = await response.json();
    setReviews(updatedProduct.reviews);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </button>

        {/* Header with Add Product Button for admins */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
          {isAdmin && <AddProductButton showOnList={true} />}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover object-center"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image: string, index: number) => (
                  <div 
                    key={index} 
                    className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer ${
                      index === activeImage ? 'ring-2 ring-black' : ''
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 12vw"
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-500">{product.brand}</p>
            </div>

            <p className="text-2xl font-semibold text-gray-900">
            £{product.price.toFixed(2)}
            </p>

            <div className="prose prose-sm text-gray-600">
              <p>{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              {product.isVegan && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Vegan
                </span>
              )}
              {product.isCrueltyFree && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Cruelty Free
                </span>
              )}
            </div>

            <div className="space-y-4">
              <AddToCartButton product={addToCartProduct} />
            </div>

            {/* Admin Controls - Only shown to admin users */}
            {isAdmin && <ProductEditControls product={editControlsProduct} />}

            {/* Reviews Section */}
            <div className="mt-12 border-t pt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-600">Customer Reviews</h2>
                <StarRating 
                  rating={averageRating} 
                  size="lg" 
                  showCount={true}
                  count={reviews?.length ?? 0}
                />
              </div>

              {/* Review Form */}
              <div className="mb-8">
                <ReviewForm 
                  productId={product.id} 
                  onReviewSubmitted={handleReviewSubmitted} 
                />
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews?.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <span className="font-medium">{review.user.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# components\products\ProductFilters.tsx

```tsx
// src/components/products/ProductFilters.tsx


'use client';

import { useState } from 'react';

// Define the filters type to avoid using 'any'
export interface FilterState {
  brands: string[];
  categories: string[];
  isVegan: boolean;
  isCrueltyFree: boolean;
  priceRange: [number, number];
}

export interface ProductFiltersProps {
  brands: string[];
  categories: string[];
  activeFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export default function ProductFilters({ 
  brands, 
  categories, 
  activeFilters,
  onFilterChange
}: ProductFiltersProps) {
  // Default values when activeFilters is not provided
  const defaultFilters: FilterState = {
    brands: [],
    categories: [],
    isVegan: false,
    isCrueltyFree: false,
    priceRange: [0, 100]
  };

  // Use provided activeFilters or default values
  const filters = activeFilters || defaultFilters;

  // Internal state for when no external state is provided
  const [internalFilters, setInternalFilters] = useState<FilterState>(defaultFilters);

  // Use either the provided onChange handler or update internal state
  const handleFilterChange = (newFilters: FilterState) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    } else {
      setInternalFilters(newFilters);
    }
  };

  // Use either provided filters or internal state
  const currentFilters = onFilterChange ? filters : internalFilters;

  const toggleBrand = (brand: string) => {
    const newBrands = currentFilters.brands.includes(brand)
      ? currentFilters.brands.filter(b => b !== brand)
      : [...currentFilters.brands, brand];
    
    handleFilterChange({
      ...currentFilters,
      brands: newBrands
    });
  };

  const toggleCategory = (category: string) => {
    const newCategories = currentFilters.categories.includes(category)
      ? currentFilters.categories.filter(c => c !== category)
      : [...currentFilters.categories, category];
    
    handleFilterChange({
      ...currentFilters,
      categories: newCategories
    });
  };

  const toggleVegan = () => {
    handleFilterChange({
      ...currentFilters,
      isVegan: !currentFilters.isVegan
    });
  };

  const toggleCrueltyFree = () => {
    handleFilterChange({
      ...currentFilters,
      isCrueltyFree: !currentFilters.isCrueltyFree
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Brands</h3>
        <div className="mt-2 space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={currentFilters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={currentFilters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentFilters.isVegan}
              onChange={toggleVegan}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">Vegan</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentFilters.isCrueltyFree}
              onChange={toggleCrueltyFree}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">Cruelty Free</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={currentFilters.priceRange[0]}
              onChange={(e) => handleFilterChange({
                ...currentFilters,
                priceRange: [Number(e.target.value), currentFilters.priceRange[1]]
              })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600"
            />
            <span className="text-gray-600">to</span>
            <input
              type="number"
              value={currentFilters.priceRange[1]}
              onChange={(e) => handleFilterChange({
                ...currentFilters,
                priceRange: [currentFilters.priceRange[0], Number(e.target.value)]
              })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

# components\products\ProductGrid.tsx

```tsx
// src/components/products/ProductGrid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { Decimal } from '@prisma/client/runtime/library';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProductQuickEdit from '@/components/admin/ProductQuickEdit';
import { useWishlist } from '@/contexts/WishlistContext';

// Define a base product interface that includes common properties
interface FullProduct extends Product {
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

interface ProductGridProps {
  products: Product[] | null;  // Update to allow null
  isAdmin?: boolean;
  onDeleteProduct?: (productId: string) => Promise<void>;
  deletingProductId?: string | null;
}

interface CartQuantity {
  [key: string]: number;
}

const ProductGrid = ({ products = [] }: ProductGridProps) => {  // Add default empty array
  const { addItem, removeItem, updateItemQuantity } = useCart();
  const { isAdmin } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [cartQuantities, setCartQuantities] = useState<CartQuantity>({});

  // Add null check before rendering
  if (!products || !Array.isArray(products)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  // Update the updateCartQuantity function
  const updateCartQuantity = async (product: Product, increment: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  
    const currentQty = cartQuantities[product.id] || 0;
    const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
  
    // If quantity becomes 0, remove the item from cartQuantities
    if (newQty === 0) {
      const newCartQuantities = { ...cartQuantities };
      delete newCartQuantities[product.id];
      setCartQuantities(newCartQuantities);
    } else {
      setCartQuantities(prev => ({
        ...prev,
        [product.id]: newQty
      }));
    }
  
    const cartProduct = {
      ...product,
      price: Number(product.price),
      stock: 'stock' in product ? (product as FullProduct).stock : 10,
      description: 'description' in product ? (product as FullProduct).description : "No description available",
      createdAt: 'createdAt' in product ? (product as FullProduct).createdAt : new Date(),
      updatedAt: 'updatedAt' in product ? (product as FullProduct).updatedAt : new Date()
    };
  
    // If quantity is 0, the item should be removed from cart
    if (newQty === 0) {
      // Assuming your CartContext has a removeItem function
      removeItem(product.id);
    } else {
      // Set the exact quantity instead of adding/removing
      updateItemQuantity(cartProduct, newQty);
    }
  };

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingProductId(product.id);
    try {
      const cartProduct = {
        ...product,
        price: Number(product.price),
        stock: 'stock' in product ? (product as FullProduct).stock : 10,
        description: 'description' in product ? (product as FullProduct).description : "No description available",
        createdAt: 'createdAt' in product ? (product as FullProduct).createdAt : new Date(),
        updatedAt: 'updatedAt' in product ? (product as FullProduct).updatedAt : new Date()
      };
      
      setCartQuantities(prev => ({
        ...prev,
        [product.id]: 1
      }));
      
      addItem(cartProduct, 1);
      
      setTimeout(() => {
        setAddingProductId(null);
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingProductId(null);
    }
  };

  const handleDeleteProduct = async (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingProductId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh the page to update the product list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const wishlistProduct = {
        ...product,
        price: Number(product.price)
      };
      addToWishlist(wishlistProduct);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {products.map((product) => {
        // console.log('Product reviews:', product.reviews); // Debug log

        // Handle both string JSON and parsed images
        let imageUrl;
        try {
          const images = typeof product.images === 'string' 
            ? JSON.parse(product.images) 
            : product.images;
          
          imageUrl = Array.isArray(images) && images.length > 0 
            ? images[0] 
            : '/api/placeholder/300/400';
        } catch {
          // Fallback if parsing fails
          imageUrl = '/api/placeholder/300/400';
        }

        // Format price (handling both number and Decimal)
        const price = typeof product.price === 'object' && 'toFixed' in product.price
          ? Number(product.price).toFixed(2)
          : Number(product.price).toFixed(2);

        const isAddingToCart = addingProductId === product.id;
        const isDeleting = deletingProductId === product.id;

        return (
          <div key={product.id} className="group">
            <Link href={`/products/${product.id}`}>
              {/* Reduce aspect ratio and adjust image container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Adjust wishlist button size */}
                <button 
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={(e) => handleWishlistToggle(product, e)}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`} 
                  />
                </button>
                
                {/* Adjust admin controls size and positioning */}
                {isAdmin && (
                  <div className="absolute bottom-2 right-2 flex space-x-1.5">
                    <div onClick={(e) => e.preventDefault()}>
                      <ProductQuickEdit 
                        product={{
                          ...product,
                          price: typeof product.price === 'object' ? Number(product.price) : product.price
                        }} 
                      />
                    </div>
                    
                    <button 
                      className="p-1.5 rounded-full bg-white shadow-md hover:bg-red-50 text-gray-500 hover:text-red-500"
                      onClick={(e) => handleDeleteProduct(product.id, e)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {/* Adjust product info text sizes */}
              <div className="mt-2 space-y-0.5">
                <p className="text-xs text-gray-500">{product.brand}</p>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                <p className="text-sm font-semibold text-gray-900">
                  £{price}
                </p>
                
                {/* Adjust badges size */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.isVegan && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                      Vegan
                    </span>
                  )}
                  {product.isCrueltyFree && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-800">
                      Cruelty Free
                    </span>
                  )}
                </div>
              </div>
            </Link>
            
            {/* Replace the existing Add to Cart section */}
            <div className="mt-2">
              {cartQuantities[product.id] ? (
                <div className="flex items-center bg-black text-white rounded-md">
                  <button
                    onClick={(e) => updateCartQuantity(product, false, e)}
                    className="px-3 py-2 hover:bg-gray-800 rounded-l-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center py-2 font-medium">
                    {cartQuantities[product.id]}
                  </span>
                  <button
                    onClick={(e) => updateCartQuantity(product, true, e)}
                    className="px-3 py-2 hover:bg-gray-800 rounded-r-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 flex items-center justify-center transition-colors"
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    "Adding..."
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
```

# components\products\ReviewForm.tsx

```tsx
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (!response.ok) throw new Error('Failed to submit review');
      
      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="text-center py-4 bg-gray-50 rounded-md">
        <p className="text-gray-600">Please sign in to leave a review</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts about this product..."
        className="w-full p-3 border rounded-md focus:ring-1 focus:ring-black text-sm text-gray-600"
        rows={4}
        required
      />

      <button
        type="submit"
        disabled={!rating || isSubmitting}
        className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
```

# components\sections\IngredientsSpotlight.tsx

```tsx
//src/components/sections/IngredientsSpotlight.tsx


'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Featured ingredient data - replace with your real content
const ingredients = [
  {
    id: 1,
    name: 'Snail Mucin',
    description: 'A powerhouse for hydration and skin repair, snail mucin helps with acne scars, dryness, and dullness while supporting collagen production.',
    benefits: ['Intense hydration', 'Repairs damaged skin', 'Improves elasticity', 'Soothes irritation'],
    image: '/images/snail-mucin.jpg',
    color: 'bg-green-50',
    textColor: 'text-green-600',
    products: [
      { name: 'COSRX Advanced Snail 96 Mucin Power Essence', link: '/products/cosrx-snail-mucin' },
      { name: 'Some By Mi Snail Truecica Miracle Repair Cream', link: '/products/some-by-mi-snail-cream' }
    ]
  },
  {
    id: 2,
    name: 'Centella Asiatica',
    description: 'Also known as Cica, this herb is packed with amino acids and has powerful anti-inflammatory and antioxidant properties.',
    benefits: ['Calms inflammation', 'Strengthens skin barrier', 'Stimulates collagen', 'Antimicrobial'],
    image: '/images/centella-asiatica.jpg',
    color: 'bg-blue-50',
    textColor: 'text-blue-600',
    products: [
      { name: 'Purito Centella Green Level Unscented Serum', link: '/products/purito-centella-serum' },
      { name: 'COSRX Pure Fit Cica Serum', link: '/products/cosrx-cica-serum' }
    ]
  },
  {
    id: 3,
    name: 'Rice Extract',
    description: 'A traditional Korean beauty ingredient that brightens and evens skin tone while providing gentle exfoliation and rich antioxidants.',
    benefits: ['Brightens complexion', 'Reduces dark spots', 'Anti-aging', 'Softens skin texture'],
    image: '/images/rice-extract.jpg',
    color: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    products: [
      { name: 'Beauty of Joseon Rice + Probiotics Cleansing Balm', link: '/products/beauty-of-joseon-rice-balm' },
      { name: 'I\'m From Rice Toner', link: '/products/im-from-rice-toner' }
    ]
  },
  {
    id: 4,
    name: 'Hyaluronic Acid',
    description: 'A moisture-binding ingredient that can hold up to 1,000 times its weight in water, providing deep hydration to all skin layers.',
    benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines', 'Non-irritating'],
    image: '/images/hyaluronic-acid.jpg',
    color: 'bg-purple-50',
    textColor: 'text-purple-600',
    products: [
      { name: 'Isntree Hyaluronic Acid Water Essence', link: '/products/isntree-hyaluronic-essence' },
      { name: 'TIRTIR Hyaluronic Acid Ampoule', link: '/products/tirtir-hyaluronic-ampoule' }
    ]
  }
];

export default function IngredientsSpotlight() {
  const [activeIngredient, setActiveIngredient] = useState(ingredients[0]);

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
      <div className="text-center mb-10 sm:mb-16">
      <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4 block">The Science Behind</span>
      <h2 className="text-2xl sm:text-3xl text-black font-light mb-4 relative inline-block">
        Key Ingredients
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-black"></span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-6">
        Discover the powerful natural ingredients featured in Korean skincare that deliver exceptional results.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-6 sm:mb-8">
          {ingredients.map((ingredient) => (
            <button
              key={ingredient.id}
              onClick={() => setActiveIngredient(ingredient)}
              className={`py-1.5 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm rounded-full m-1 sm:m-2 transition-all ${
                activeIngredient.id === ingredient.id
                  ? `${ingredient.color} ${ingredient.textColor} font-medium`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ingredient.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        <div className={`rounded-lg overflow-hidden p-4 sm:p-8 lg:p-10 ${activeIngredient.color} transition-colors duration-300`}>
        <div className="aspect-square relative">
              <Image
                src={activeIngredient.image}
                alt={activeIngredient.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
          <h3 className={`text-xl sm:text-2xl font-light ${activeIngredient.textColor}`}>{activeIngredient.name}</h3>
          <p className="text-sm sm:text-base text-gray-700">{activeIngredient.description}</p>
            
            <div>
            <h4 className="text-xs sm:text-sm font-medium text-black uppercase tracking-wider mb-2 sm:mb-3">Benefits</h4>
            <ul className="grid text-black grid-cols-1 sm:grid-cols-2 gap-2">
            {activeIngredient.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className={`w-2 h-2 rounded-full ${activeIngredient.color} mr-2`}></span>
                    <span className="text-xs sm:text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
            <h4 className="text-xs sm:text-sm font-medium text-black uppercase tracking-wider mb-2 sm:mb-3">Featured In</h4>
            <ul className="space-y-1 sm:space-y-2">
            {activeIngredient.products.map((product, index) => (
                  <li key={index}>
                    <Link href={product.link} className="text-xs sm:text-sm text-gray-700 hover:text-black">
                    {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* <Link 
              href={`/collections/ingredients/${activeIngredient.name.toLowerCase().replace(' ', '-')}`}
              className={`inline-block mt-2 sm:mt-4 border px-4 sm:px-6 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${activeIngredient.textColor} border-current hover:bg-gray-50`}
            >
              Explore All {activeIngredient.name} Products
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
```

# components\sections\InstagramFeed.tsx

```tsx
//src/components/sections/InstagramFeed.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AddSocialPostButton from '@/components/admin/AddSocialPostButton';
import SocialPostEdit from '@/components/admin/SocialPostEdit';



interface SocialPost {
  id: string;
  platform: string; // 'instagram' or 'tiktok'
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: string; // 'image' or 'video'
  caption: string;
  likes: number;
  externalUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Sample Instagram posts - replace with your real content
const samplePosts: SocialPost[] = [
  {
    id: '1',
    platform: 'instagram',
    mediaUrl: '/images/instagram/vitamin-c.jpg',
    thumbnailUrl: '/images/instagram/vitamin-c.jpg',
    mediaType: 'image',
    caption: 'Morning glow with our Vitamin C serum! ✨ #kbeauty #skincareroutine',
    likes: 248,
    externalUrl: 'https://instagram.com/p/example1'
  },
  {
    id: '2',
    platform: 'instagram',
    mediaUrl: '/images/instagram/sheet-mask.jpg',
    thumbnailUrl: '/images/instagram/sheet-mask.jpg',
    mediaType: 'image',
    caption: 'Sheet mask Sunday is our favorite day of the week 💆‍♀️ #selfcaresunday',
    likes: 312,
    externalUrl: 'https://instagram.com/p/example2'
  },
  {
    id: '3',
    platform: 'tiktok',
    mediaUrl: '/videos/sample-skincare-routine.mp4',
    thumbnailUrl: '/images/instagram/hydration.jpg',
    mediaType: 'video',
    caption: 'The perfect layering technique for maximum hydration 💧 #kbeautytips',
    likes: 186,
    externalUrl: 'https://tiktok.com/@example/video/123456'
  },
  {
    id: '4',
    platform: 'instagram',
    mediaUrl: '/images/instagram/products.jpg',
    thumbnailUrl: '/images/instagram/products.jpg',
    mediaType: 'image',
    caption: 'Our new arrivals from COSRX just landed! 🛍️ #newarrivals #cosrx',
    likes: 421,
    externalUrl: 'https://instagram.com/p/example4'
  },
  {
    id: '5',
    platform: 'tiktok',
    mediaUrl: '/videos/unboxing-sample.mp4',
    thumbnailUrl: '/images/instagram/behindthescenes.jpg',
    mediaType: 'video',
    caption: 'Unboxing our latest K-beauty arrivals! ✨ #kbeauty #unboxing',
    likes: 529,
    externalUrl: 'https://tiktok.com/@example/video/567890'
  },
  {
    id: '6',
    platform: 'instagram',
    mediaUrl: '/images/instagram/behindthescenes.jpg',
    thumbnailUrl: '/images/instagram/behindthescenes.jpg',
    mediaType: 'image',
    caption: 'Customer results using our Snail Mucin essence for 4 weeks 🥰 #beforeandafter',
    likes: 529,
    externalUrl: 'https://instagram.com/p/example6'
  },
  {
    id: '7',
    platform: 'instagram',
    mediaUrl: '/images/instagram/before-after.jpg',
    thumbnailUrl: '/images/instagram/before-after.jpg',
    mediaType: 'image',
    caption: 'Quick tutorial: How to layer your serums correctly 👩‍🏫 #skincarebasics',
    likes: 193,
    externalUrl: 'https://instagram.com/p/example7'
  },
  {
    id: '8',
    platform: 'instagram',
    mediaUrl: '/images/instagram/founder.jpg',
    thumbnailUrl: '/images/instagram/founder.jpg',
    mediaType: 'image',
    caption: 'Our founder\'s current evening skincare routine 🌙 #nighttimeritual',
    likes: 307,
    externalUrl: 'https://instagram.com/p/example8'
  }
];

export default function InstagramFeed() {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    platform: 'all' // 'all', 'instagram', or 'tiktok'
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/social');
      if (!response.ok) {
        throw new Error('Failed to fetch social media posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching social media posts:', err);
      setError('Failed to load social media posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setDeletingPostId(postId);
    try {
      const response = await fetch(`/api/admin/social/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      
      // Remove the deleted post from state
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeletingPostId(null);
    }
  };

  // If there are no posts and we're not loading, use sample posts
  const displayPosts = posts.length === 0 && !loading ? samplePosts : posts;

  // Filter posts based on active filters
  const filteredPosts = displayPosts.filter(post => {
    if (activeFilters.platform !== 'all' && post.platform !== activeFilters.platform) {
      return false;
    }
    return true;
  });

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4">Follow Us On Social Media</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Join our beauty community for skincare tips, tutorials, and inspiration.
          </p>
          <div className="flex justify-center items-center gap-4 mt-3 sm:mt-4">
            <a 
              href="https://instagram.com/impression_kbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-black hover:underline"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">@impression_kbeauty</span>
            </a>
            <a 
              href="https://www.tiktok.com/@impression_kbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-black hover:underline"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
              </svg>
              <span className="text-sm sm:text-base">@impression_kbeauty</span>
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveFilters({ ...activeFilters, platform: 'all' })}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilters.platform === 'all'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200 rounded-l-lg`}
            >
              All Posts
            </button>
            <button
              type="button"
              onClick={() => setActiveFilters({ ...activeFilters, platform: 'instagram' })}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilters.platform === 'instagram'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-200`}
            >
              Instagram
            </button>
            <button
              type="button"
              onClick={() => setActiveFilters({ ...activeFilters, platform: 'tiktok' })}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilters.platform === 'tiktok'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-200 rounded-r-lg`}
            >
              TikTok
            </button>
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <AddSocialPostButton showOnList onAdd={fetchPosts} />
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <button 
              onClick={fetchPosts}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Social Media Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="group relative">
                <a 
                  href={post.externalUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {post.mediaType === 'image' ? (
                      <Image 
                        src={post.mediaUrl} 
                        alt={post.caption}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        {/* Video Thumbnail */}
                        <Image 
                          src={post.thumbnailUrl || post.mediaUrl} 
                          alt={post.caption}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 h-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          {post.likes}
                        </span>
                      </div>
                    </div>
                    {/* Platform badge */}
                    <div className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-full p-1">
                      {post.platform === 'instagram' ? (
                        <Instagram className="w-4 h-4" />
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="mt-1 sm:mt-2">
                    <p className="text-xs sm:text-sm text-black line-clamp-1">{post.caption}</p>
                  </div>
                </a>

                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex space-x-1.5 z-10">
                    <SocialPostEdit post={post} onUpdate={fetchPosts} />
                    <button 
                      onClick={(e) => handleDeletePost(post.id, e)}
                      className="p-1.5 rounded-full bg-white shadow-md hover:bg-red-50 text-gray-500 hover:text-red-500"
                      disabled={deletingPostId === post.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {activeFilters.platform === 'instagram' ? (
                <Instagram className="w-8 h-8 text-gray-400" />
              ) : activeFilters.platform === 'tiktok' ? (
                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              ) : (
                <ExternalLink className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-gray-500">No {activeFilters.platform === 'all' ? 'social media' : activeFilters.platform} posts found</p>
            {isAdmin && (
              <button
                onClick={() => document.querySelector<HTMLButtonElement>('[data-add-social-post]')?.click()}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Add Your First Post
              </button>
            )}
          </div>
        )}

        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="https://www.tiktok.com/@impression_kbeauty"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-md hover:bg-black hover:text-white transition-colors inline-block text-xs sm:text-sm"
          >
            See More Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
```

# components\sections\KBeautyRitualGuide.tsx

```tsx
//src/components/sections/KBeautyRitualGuide.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// K-Beauty Ritual steps data
const ritualSteps = [
  {
    id: 1,
    name: 'Oil Cleansing',
    description: 'The first step in the double cleansing method removes oil-based impurities like makeup, sunscreen, and excess sebum.',
    tip: 'Massage gently in circular motions for 1-2 minutes to dissolve makeup and sunscreen.',
    image: '/images/rituals/oil-cleansing.jpg',
    // productRecommendation: {
    //   name: 'Beauty of Joseon Ginseng Cleansing Oil',
    //   price: 24.99,
    //   link: '/products/beauty-of-joseon-cleansing-oil'
    // }
  },
  {
    id: 2,
    name: 'Water-Based Cleansing',
    description: 'The second cleansing step removes any remaining water-based impurities like sweat and dirt.',
    tip: 'Use lukewarm water and rinse thoroughly to prevent cleanser residue.',
    image: '/images/rituals/water-cleansing.jpg',
    // productRecommendation: {
    //   name: 'COSRX Low pH Good Morning Gel Cleanser',
    //   price: 14.99,
    //   link: '/products/cosrx-low-ph-cleanser'
    // }
  },
  {
    id: 3,
    name: 'Exfoliation',
    description: 'Removes dead skin cells to improve texture and allow better absorption of subsequent products.',
    tip: 'Exfoliate 1-3 times per week depending on your skin type, not daily.',
    image: '/images/rituals/exfoliation.jpg',
    // productRecommendation: {
    //   name: 'Some By Mi AHA-BHA-PHA 30 Days Miracle Toner',
    //   price: 19.99,
    //   link: '/products/some-by-mi-aha-bha-pha-toner'
    // }
  },
  {
    id: 4,
    name: 'Toner',
    description: 'Balances skin\'s pH, removes any residual impurities, and prepares skin for better absorption of following products.',
    tip: 'Pat gently with hands instead of using cotton pads to minimize waste and irritation.',
    image: '/images/rituals/toner.png',
    // productRecommendation: {
    //   name: 'Klairs Supple Preparation Facial Toner',
    //   price: 22.99,
    //   link: '/products/klairs-supple-preparation-toner'
    // }
  },
  {
    id: 5,
    name: 'Essence',
    description: 'A lightweight, hydrating layer that enhances skin renewal and boosts hydration.',
    tip: 'Press and pat gently to aid absorption rather than rubbing.',
    image: '/images/rituals/essence.jpg',
    // productRecommendation: {
    //   name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    //   price: 21.99,
    //   link: '/products/cosrx-snail-mucin'
    // }
  },
  {
    id: 6,
    name: 'Serum',
    description: 'Concentrated treatment that targets specific skin concerns like brightening, anti-aging, or acne.',
    tip: 'Apply from thinnest to thickest consistency, allowing each layer to absorb.',
    image: '/images/rituals/serum.jpg',
    // productRecommendation: {
    //   name: 'Beauty of Joseon Glow Serum',
    //   price: 19.99,
    //   link: '/products/beauty-of-joseon-glow-serum'
    // }
  },
  {
    id: 7,
    name: 'Sheet Mask',
    description: 'Infuses skin with hydration and beneficial ingredients while creating a barrier to enhance absorption.',
    tip: 'Use 1-3 times per week, leaving on for no longer than 20 minutes to prevent reverse osmosis.',
    image: '/images/rituals/sheet-mask.jpg',
    // productRecommendation: {
    //   name: 'Abib Gummy Sheet Mask Heartleaf Sticker',
    //   price: 6.99,
    //   link: '/products/abib-gummy-sheet-mask'
    // }
  },
  {
    id: 8,
    name: 'Eye Cream',
    description: 'Targeted treatment for the delicate eye area to address fine lines, dark circles, and puffiness.',
    tip: 'Apply with your ring finger using a gentle patting motion to avoid pulling the skin.',
    image: '/images/rituals/eye-cream.webp',
    // productRecommendation: {
    //   name: 'Mixsoon Green Tea Eye Cream',
    //   price: 29.99,
    //   link: '/products/mixsoon-green-tea-eye-cream'
    // }
  },
  {
    id: 9,
    name: 'Moisturizer',
    description: 'Locks in previous layers of hydration and adds additional moisture while strengthening the skin barrier.',
    tip: 'Adjust thickness based on your skin type - gel for oily skin, cream for dry skin.',
    image: '/images/rituals/moisturizer.jpg',
    // productRecommendation: {
    //   name: 'Isntree Hyaluronic Acid Moist Cream',
    //   price: 24.99,
    //   link: '/products/isntree-hyaluronic-acid-cream'
    // }
  },
  {
    id: 10,
    name: 'Sunscreen (AM)',
    description: 'Protects skin from UV damage, which contributes to premature aging and hyperpigmentation.',
    tip: 'Apply generously as the final step of your morning routine, even on cloudy days or indoors.',
    image: '/images/rituals/sunscreen.jpg',
    // productRecommendation: {
    //   name: 'Beauty of Joseon Relief Sun: Rice + Probiotics',
    //   price: 18.99,
    //   link: '/products/beauty-of-joseon-relief-sun'
    // }
  }
];

export default function KBeautyRitualGuide() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-blue-50">
      <div className="container mx-auto px-4">
      <div className="text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4">The K-Beauty Ritual</h2>
      <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
      Discover the famous 10-step Korean skincare routine that has revolutionized beauty worldwide.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step Navigator */}
          <div className="relative mb-8 sm:mb-12">
          <div className="hidden md:block absolute h-1 bg-gray-200 top-5 left-0 right-0"></div>
          <div className="flex overflow-x-auto md:overflow-visible py-4 px-2 md:justify-between">
          {ritualSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex-shrink-0 flex flex-col items-center mx-2 sm:mx-3 md:mx-0 relative focus:outline-none group`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-medium z-10 transition-all duration-300 ${
                    activeStep === step.id
                      ? 'bg-blue-500 text-white'
                      : step.id < activeStep
                      ? 'bg-blue-100 text-blue-500'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.id}
                  </div>
                  <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                    activeStep === step.id ? 'text-blue-500' : 'text-gray-500'
                  } hidden sm:block`}>
                    {step.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Step Image */}
              <div className="p-4 sm:p-6 bg-blue-100">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image 
                    src={ritualSteps[activeStep - 1].image} 
                    alt={ritualSteps[activeStep - 1].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Step Info */}
              <div className="p-4 sm:p-8">
              <h3 className="text-xl sm:text-2xl text-black font-light mb-3 sm:mb-4">
              Step {activeStep}: {ritualSteps[activeStep - 1].name}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                  {ritualSteps[activeStep - 1].description}
                </p>
                
                <div className="mb-6 sm:mb-8 bg-blue-50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-medium text-black text-xs sm:text-sm uppercase mb-1 sm:mb-2">Pro Tip</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                {ritualSteps[activeStep - 1].tip}
                  </p>
                </div>
                
                <div className="border-t border-gray-100 pt-4 sm:pt-6">
                {/* <h4 className="font-medium text-black text-xs sm:text-sm uppercase mb-3 sm:mb-4">Recommended Product</h4> */}
                {/* <div className="flex justify-between items-center">
                    <div>
                    <p className="text-sm sm:text-base text-black font-medium">
                    {ritualSteps[activeStep - 1].productRecommendation.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        ${ritualSteps[activeStep - 1].productRecommendation.price}
                      </p>
                    </div>
                    <Link 
                      href={ritualSteps[activeStep - 1].productRecommendation.link}
                      className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-gray-800 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4 sm:mt-6">
            <button
              onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
              disabled={activeStep === 1}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-blue-500 text-white text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(prev + 1, ritualSteps.length))}
              disabled={activeStep === ritualSteps.length}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-blue-500 text-white text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Next Step
            </button>
          </div>

          {/* <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/collections/skincare-sets"
              className="inline-block border border-black text-black px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Explore All Skincare Products
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
```

# components\sections\TestimonialSection.tsx

```tsx
//src/components/sections/TestimonialSection.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial data - replace with your real testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah K.',
    age: 28,
    concern: 'Acne & Hyperpigmentation',
    quote: "After 3 months of using the COSRX Snail Mucin and Beauty of Joseon Serum, my skin has completely transformed. I've never felt so confident without makeup!",
    beforeImage: '/api/placeholder/300/300',
    afterImage: '/api/placeholder/300/300',
    products: ['COSRX Advanced Snail Mucin Power Essence', 'Beauty of Joseon Glow Serum']
  },
  {
    id: 2,
    name: 'Mia T.',
    age: 35,
    concern: 'Fine Lines & Dryness',
    quote: "The difference in my skin's texture and hydration is incredible. These products have helped reduce my fine lines and my skin feels plump and moisturized all day.",
    beforeImage: '/api/placeholder/300/300',
    afterImage: '/api/placeholder/300/300',
    products: ['Some By Mi AHA-BHA-PHA Toner', 'Medicube Deep Vita C Serum']
  },
  {
    id: 3,
    name: 'Daniel L.',
    age: 31,
    concern: 'Oily & Sensitive Skin',
    quote: "I was skeptical about K-beauty at first, but these products have balanced my oily skin without causing irritation. My redness is gone and I'm breaking out much less!",
    beforeImage: '/api/placeholder/300/300',
    afterImage: '/api/placeholder/300/300',
    products: ['TIRTIR Rosemary Relief Cream', 'Abib Heartleaf Calming Essence']
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4">Real Results</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            See the transformations our customers have experienced with our K-beauty products.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Before & After Images */}
              <div className="p-4 sm:p-8 bg-gray-100">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">Before</p>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src={currentTestimonial.beforeImage} 
                        alt={`${currentTestimonial.name} before`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">After</p>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src={currentTestimonial.afterImage} 
                        alt={`${currentTestimonial.name} after`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="p-4 sm:p-8 flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mb-3 sm:mb-4" />
                  <p className="text-base sm:text-lg text-gray-500 italic mb-4 sm:mb-6">{currentTestimonial.quote}</p>
                  <div className="mb-6 sm:mb-8">
                    <p className="text-sm sm:text-base text-gray-500 font-medium">{currentTestimonial.name}, {currentTestimonial.age}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Concern: {currentTestimonial.concern}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2">Products Used:</p>
                    <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600">
                      {currentTestimonial.products.map((product, index) => (
                        <li key={index} className="mb-1">{product}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 sm:mt-8">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                          index === currentIndex ? 'bg-black' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

# components\ui\Breadcrumb.tsx

```tsx
//components/ui/Breadcrumb.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // If no items provided, generate from pathname
  const breadcrumbItems = items || generateBreadcrumbItems(pathname);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
          >
            Home
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link 
                href={item.href}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 text-sm font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  // Remove leading slash and split into segments
  const segments = pathname.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    // Create the href for this segment
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    
    // Format the label (capitalize and replace hyphens with spaces)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      label,
      href
    };
  });
}
```

# components\ui\SearchBar.tsx

```tsx
//components/ui/SearchBar.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Search Results */}
            {query && (
              <div className="mt-4">
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={`/products/${result.id}`}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                      <div className="relative w-12 h-12">
                        <Image
                          src={result.image}
                          alt={result.name}
                          fill
                          sizes="48px"
                          className="object-cover rounded"
                        />
                      </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{result.name}</p>
                          <p className="text-sm text-gray-500">{result.brand}</p>
                        </div>
                        <p className="ml-auto text-sm font-medium text-gray-900">
                          £{result.price.toFixed(2)}
                        </p>
                      </Link>
                    ))}
                    <div className="pt-2 border-t">
                      <button
                        onClick={() => {
                          router.push(`/search?q=${encodeURIComponent(query)}`);
                          setIsOpen(false);
                        }}
                        className="text-sm text-black hover:text-gray-600 flex items-center justify-center w-full"
                      >
                        View all results
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

# components\ui\StarRating.tsx

```tsx
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
}

export default function StarRating({ 
  rating, 
  size = 'sm', 
  showCount = false, 
  count = 0 
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-1.5">
      <div className="flex space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizes[size]} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500">
          {count > 0 ? `(${count})` : '(0)'}
        </span>
      )}
    </div>
  );
}
```

# contexts\AuthContext.tsx

```tsx
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export interface AuthContextType {
  currentUser: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
  isAdmin: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ currentUser: session?.user || null, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

# contexts\CartContext.tsx

```tsx
// contexts/CartContext.tsx
'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  updateItemQuantity: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.product.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity
            };
          }
          return item;
        });
      } else {
        newItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        )
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        )
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => {
        if (item.product.id === action.payload.productId) {
          return {
            ...item,
            quantity: action.payload.quantity
          };
        }
        return item;
      });

      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        )
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0
      };
      
    case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Use SET_CART action to replace the entire state at once
        if (parsedCart && parsedCart.items) {
          dispatch({ 
            type: 'SET_CART', 
            payload: {
              items: parsedCart.items,
              totalItems: parsedCart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
              totalAmount: parsedCart.items.reduce(
                (sum: number, item: CartItem) => sum + Number(item.product.price) * item.quantity, 0
              )
            } 
          });
        }
      } catch (err) {
        console.error('Error parsing saved cart:', err);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity: number) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        product: {
          ...product,
          id: product.id // Make sure product ID is included
        }, 
        quantity 
      } 
    });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const updateItemQuantity = (product: Product, quantity: number) => {
    updateQuantity(product.id, quantity);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        updateItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

# contexts\WishlistContext.tsx

```tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  // Add other product properties as needed
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (!prev.some(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
```

# lib\email.ts

```ts
// src/lib/email.ts
import nodemailer from 'nodemailer';

// Create transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email templates
export const sendOrderConfirmation = async (
  to: string,
  orderDetails: {
    orderNumber: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  }
) => {
  const html = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order!</p>
    <p>Order Number: ${orderDetails.orderNumber}</p>
    
    <h2>Order Details:</h2>
    <ul>
      ${orderDetails.items
        .map(
          (item) => `
        <li>
          ${item.name} x ${item.quantity} - £${item.price.toFixed(2)}
        </li>
      `
        )
        .join('')}
    </ul>
    
    <p><strong>Total: £${orderDetails.total.toFixed(2)}</strong></p>
    
    <p>We will process your order shortly.</p>
    
    <p>Best regards,<br>Impression K Beauty</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `Order Confirmation #${orderDetails.orderNumber}`,
    html,
  });
};

// Order status update email
export const sendOrderStatusUpdate = async (
  to: string,
  orderDetails: {
    orderNumber: string;
    status: string;
    trackingNumber?: string;
  }
) => {
  const html = `
    <h1>Order Status Update</h1>
    <p>Your order #${orderDetails.orderNumber} has been ${orderDetails.status.toLowerCase()}.</p>
    
    ${
      orderDetails.trackingNumber
        ? `<p>Tracking Number: ${orderDetails.trackingNumber}</p>`
        : ''
    }
    
    <p>Best regards,<br>Impression K Beauty</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `Order Status Update #${orderDetails.orderNumber}`,
    html,
  });
};
```

# lib\email\monitoring.ts

```ts
// src/lib/email/monitoring.ts
interface EmailMetrics {
    totalSent: number;
    totalFailed: number;
    queueLength: number;
    averageLatency: number;
  }
  
  export class EmailMonitoring {
    private metrics: EmailMetrics = {
      totalSent: 0,
      totalFailed: 0,
      queueLength: 0,
      averageLatency: 0,
    };
  
    private latencies: number[] = [];
  
    recordSentEmail(latencyMs: number) {
      this.metrics.totalSent++;
      this.latencies.push(latencyMs);
      this.updateAverageLatency();
    }
  
    recordFailedEmail() {
      this.metrics.totalFailed++;
    }
  
    updateQueueLength(length: number) {
      this.metrics.queueLength = length;
    }
  
    private updateAverageLatency() {
      // Keep only last 100 latencies for average
      if (this.latencies.length > 100) {
        this.latencies = this.latencies.slice(-100);
      }
      
      this.metrics.averageLatency = 
        this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length;
    }
  
    getMetrics(): EmailMetrics {
      return { ...this.metrics };
    }
  
    async logMetrics() {
      console.log('Email Service Metrics:', {
        ...this.metrics,
        successRate: `${((this.metrics.totalSent / (this.metrics.totalSent + this.metrics.totalFailed)) * 100).toFixed(2)}%`,
        averageLatencyMs: `${this.metrics.averageLatency.toFixed(2)}ms`,
      });
    }
  }
```

# lib\email\queue.ts

```ts
// src/lib/email/queue.ts
interface EmailService {
  sendEmail(params: { to: string; subject: string; html: string }): Promise<void>;
}

interface QueuedEmail {
    id: string;
    to: string;
    subject: string;
    html: string;
    attempts: number;
    lastAttempt?: Date;
    status: 'pending' | 'processing' | 'failed' | 'sent';
  }
  
  export class EmailQueue {
    private queue: QueuedEmail[] = [];
    private isProcessing: boolean = false;
    private processingInterval: number = 1000; // 1 second
    private maxConcurrent: number = 5;
    private maxRetries: number = 3;
  
    constructor(private emailService: EmailService) {
      // Start processing the queue
      setInterval(() => this.processQueue(), this.processingInterval);
    }
  
    async addToQueue(to: string, subject: string, html: string): Promise<string> {
      const id = Math.random().toString(36).substring(7);
      
      this.queue.push({
        id,
        to,
        subject,
        html,
        attempts: 0,
        status: 'pending'
      });
  
      return id;
    }
  
    private async processQueue() {
      if (this.isProcessing) return;
      
      this.isProcessing = true;
      
      try {
        // Get pending emails that haven't exceeded max retries
        const pendingEmails = this.queue.filter(
          email => 
            email.status === 'pending' && 
            email.attempts < this.maxRetries
        ).slice(0, this.maxConcurrent);
  
        if (pendingEmails.length === 0) {
          this.isProcessing = false;
          return;
        }
  
        await Promise.all(
          pendingEmails.map(async (email) => {
            try {
              email.status = 'processing';
              email.attempts += 1;
              email.lastAttempt = new Date();
  
              await this.emailService.sendEmail({
                to: email.to,
                subject: email.subject,
                html: email.html
              });
  
              email.status = 'sent';
              // Remove from queue if sent successfully
              this.queue = this.queue.filter(e => e.id !== email.id);
  
            } catch (error) {
              console.error(`Failed to send email ${email.id}:`, error);
              email.status = 'failed';
              
              if (email.attempts >= this.maxRetries) {
                // Log failed email for manual review
                console.error(`Email ${email.id} failed after ${this.maxRetries} attempts`);
              } else {
                email.status = 'pending'; // Reset to pending for retry
              }
            }
          })
        );
      } finally {
        this.isProcessing = false;
      }
    }
  
    getStatus(emailId: string) {
      const email = this.queue.find(e => e.id === emailId);
      return email ? {
        status: email.status,
        attempts: email.attempts,
        lastAttempt: email.lastAttempt
      } : null;
    }
  
    clearQueue() {
      this.queue = [];
    }
  }
```

# lib\email\service.ts

```ts
// src/lib/email/service.ts
import nodemailer from 'nodemailer';
import { 
  orderConfirmationTemplate, 
  orderShippedTemplate, 
  orderDeliveredTemplate 
} from './templates';
import { EmailQueue } from './queue';
import { EmailMonitoring } from './monitoring';

interface EmailConfig {
  maxRetries: number;
  retryDelay: number; // in milliseconds
}

interface EmailMetrics {
  totalSent: number;
  totalFailed: number;
  deliveryRate: number;
}

export class EmailProvider {
  private totalSent = 0;
  private totalFailed = 0;

  async send(to: string, subject: string, body: string): Promise<void> {
    try {
      // Basic email sending implementation using nodemailer
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: body,
      });
      this.totalSent++;
    } catch (error) {
      this.totalFailed++;
      throw error;
    }
  }

  getMetrics(): EmailMetrics {
    const total = this.totalSent + this.totalFailed;
    const deliveryRate = total === 0 ? 0 : (this.totalSent / total) * 100;

    return {
      totalSent: this.totalSent,
      totalFailed: this.totalFailed,
      deliveryRate
    };
  }
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;
  private queue: EmailQueue;
  private monitoring: EmailMonitoring;

  constructor(config: EmailConfig = { maxRetries: 3, retryDelay: 1000 }) {
    this.config = config;
    this.queue = new EmailQueue(this);
    this.monitoring = new EmailMonitoring();
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    setInterval(() => this.monitoring.logMetrics(), 3600000);
  }

  async queueEmail(to: string, subject: string, html: string) {
    return this.queue.addToQueue(to, subject, html);
  }

  private async retry<T>(
    fn: () => Promise<T>,
    retries: number = this.config.maxRetries
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        return this.retry(fn, retries - 1);
      }
      throw error;
    }
  }

  public async sendEmail(options: nodemailer.SendMailOptions) {
    return this.retry(async () => {
      try {
        const info = await this.transporter.sendMail(options);
        console.log('Email sent:', info.messageId);
        return info;
      } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
      }
    });
  }

  async sendOrderConfirmation(
    to: string,
    data: {
      orderNumber: string;
      items: Array<{
        name: string;
        quantity: number;
        price: number;
      }>;
      total: number;
      shippingAddress: string;
    }
  ) {
    const html = orderConfirmationTemplate(data);
    return this.sendEmail({
      from: process.env.SMTP_USER,
      to,
      subject: `Order Confirmation #${data.orderNumber}`,
      html,
    });
  }

  async sendOrderShipped(
    to: string,
    data: {
      orderNumber: string;
      trackingNumber: string;
      trackingUrl?: string;
    }
  ) {
    const html = orderShippedTemplate(data);
    return this.sendEmail({
      from: process.env.SMTP_USER,
      to,
      subject: `Your Order #${data.orderNumber} Has Been Shipped!`,
      html,
    });
  }

  async sendOrderDelivered(
    to: string,
    data: {
      orderNumber: string;
    }
  ) {
    const html = orderDeliveredTemplate(data);
    return this.sendEmail({
      from: process.env.SMTP_USER,
      to,
      subject: `Your Order #${data.orderNumber} Has Been Delivered!`,
      html,
    });
  }
}

// Export a singleton instance
export const emailService = new EmailService();

// Usage example:
/*
try {
  await emailService.sendOrderConfirmation(
    'customer@example.com',
    {
      orderNumber: '12345',
      items: [{
        name: 'Product 1',
        quantity: 2,
        price: 29.99
      }],
      total: 59.98,
      shippingAddress: '123 Main St, City, Country'
    }
  );
} catch (error) {
  console.error('Failed to send order confirmation:', error);
}
*/
```

# lib\email\templates.ts

```ts
// src/lib/email/templates.ts
export const orderConfirmationTemplate = (data: {
    orderNumber: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    shippingAddress: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; padding: 20px 0; }
      .order-details { margin: 20px 0; }
      .item { padding: 10px 0; border-bottom: 1px solid #eee; }
      .total { font-weight: bold; padding: 15px 0; }
      .footer { text-align: center; padding: 20px 0; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Order Confirmation</h1>
        <p>Thank you for shopping with Impression K Beauty!</p>
      </div>
  
      <div class="order-details">
        <h2>Order #${data.orderNumber}</h2>
        
        <h3>Items Ordered:</h3>
        ${data.items.map(item => `
          <div class="item">
            <p>${item.name}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: £${item.price.toFixed(2)}</p>
          </div>
        `).join('')}
  
        <div class="total">
          <p>Total: £${data.total.toFixed(2)}</p>
        </div>
  
        <h3>Shipping Address:</h3>
        <p>${data.shippingAddress}</p>
      </div>
  
      <div class="footer">
        <p>If you have any questions, please contact our customer service.</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  export const orderShippedTemplate = (data: {
    orderNumber: string;
    trackingNumber: string;
    trackingUrl?: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; padding: 20px 0; }
      .tracking-info { margin: 20px 0; padding: 20px; background: #f9f9f9; }
      .footer { text-align: center; padding: 20px 0; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Shipped!</h1>
      </div>
  
      <div class="tracking-info">
        <h2>Order #${data.orderNumber}</h2>
        <p>Your order has been shipped and is on its way to you!</p>
        <p>Tracking Number: ${data.trackingNumber}</p>
        ${data.trackingUrl ? `<p><a href="${data.trackingUrl}">Track Your Package</a></p>` : ''}
      </div>
  
      <div class="footer">
        <p>If you have any questions, please contact our customer service.</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  export const orderDeliveredTemplate = (data: {
    orderNumber: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; padding: 20px 0; }
      .content { margin: 20px 0; }
      .footer { text-align: center; padding: 20px 0; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Delivered!</h1>
      </div>
  
      <div class="content">
        <h2>Order #${data.orderNumber}</h2>
        <p>Your order has been delivered! We hope you enjoy your products.</p>
        <p>Please let us know if you have any questions or concerns.</p>
      </div>
  
      <div class="footer">
        <p>Thank you for choosing Impression K Beauty!</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
```

# lib\email\templates\auth.ts

```ts
// src/lib/email/templates/auth.ts
export const welcomeTemplate = (data: { name: string }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .content { margin: 20px 0; }
    .footer { text-align: center; padding: 20px 0; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Impression K Beauty!</h1>
    </div>

    <div class="content">
      <p>Hello ${data.name},</p>
      <p>Thank you for creating an account with us. We're excited to have you join our community!</p>
      <p>At Impression K Beauty, you'll find:</p>
      <ul>
        <li>Premium Korean beauty products</li>
        <li>Vegan and cruelty-free options</li>
        <li>Expert skincare advice</li>
        <li>Exclusive offers and updates</li>
      </ul>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const passwordResetTemplate = (data: { resetLink: string }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .button { 
      display: inline-block; 
      padding: 10px 20px; 
      background-color: #000; 
      color: #fff; 
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>

    <div class="content">
      <p>You've requested to reset your password. Click the button below to set a new password:</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${data.resetLink}" class="button">Reset Password</a>
      </p>
      <p>If you didn't request this, please ignore this email or contact support if you have concerns.</p>
      <p>This link will expire in 1 hour.</p>
    </div>
  </div>
</body>
</html>
`;
```

# lib\email\templates\marketing.ts

```ts
// src/lib/email/templates/marketing.ts
export const specialOfferTemplate = (data: {
    name: string;
    offer: string;
    expiryDate: string;
    promoCode?: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .offer { 
        background-color: #f8f8f8; 
        padding: 20px; 
        margin: 20px 0; 
        border-radius: 5px;
      }
      .promo-code {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        padding: 10px;
        background-color: #000;
        color: #fff;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Special Offer Just for You!</h1>
      </div>
  
      <div class="content">
        <p>Hello ${data.name},</p>
        <div class="offer">
          <h2>${data.offer}</h2>
          ${data.promoCode ? `
            <div class="promo-code">
              ${data.promoCode}
            </div>
          ` : ''}
          <p>Offer expires: ${data.expiryDate}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
```

# lib\email\templates\orderConfirmation.ts

```ts
//lib/email/templates/orderConfirmation.ts

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
  }
  
  interface OrderConfirmationData {
    orderNumber: string;
    customerName: string;
    items: OrderItem[];
    total: number;
    shippingAddress: {
      street: string;
      city: string;
      postcode: string;
      country: string;
    };
    estimatedDelivery: string;
  }
  
  export const orderConfirmationTemplate = (data: OrderConfirmationData): string => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .logo {
        text-align: center;
        margin-bottom: 30px;
      }
      .header {
        text-align: center;
        padding: 30px 0;
        background-color: #f8f8f8;
        margin-bottom: 30px;
      }
      .order-details {
        margin-bottom: 30px;
      }
      .items-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
      }
      .items-table th,
      .items-table td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      .total {
        text-align: right;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 30px;
      }
      .shipping-info {
        background-color: #f8f8f8;
        padding: 20px;
        margin-bottom: 30px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #666;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <h1>IMPRESSION K BEAUTY</h1>
      </div>
  
      <div class="header">
        <h2>Order Confirmation</h2>
        <p>Thank you for your order, ${data.customerName}!</p>
        <p>Order #${data.orderNumber}</p>
      </div>
  
      <div class="order-details">
        <table class="items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>£${item.price.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
  
        <div class="total">
          Total: £${data.total.toFixed(2)}
        </div>
      </div>
  
      <div class="shipping-info">
        <h3>Shipping Address</h3>
        <p>
          ${data.shippingAddress.street}<br>
          ${data.shippingAddress.city}<br>
          ${data.shippingAddress.postcode}<br>
          ${data.shippingAddress.country}
        </p>
        <p>Estimated Delivery: ${data.estimatedDelivery}</p>
      </div>
  
      <div style="text-align: center;">
        <a href="https://yourwebsite.com/account/orders/${data.orderNumber}" class="button">
          View Order Details
        </a>
      </div>
  
      <div style="margin-top: 30px; text-align: center;">
        <h3>What's Next?</h3>
        <p>1. We'll process your order within 24 hours</p>
        <p>2. You'll receive a shipping confirmation email with tracking details</p>
        <p>3. Your order will be delivered in 2-4 business days</p>
      </div>
  
      <div class="footer">
        <p>Need help? Contact our support team at support@impressionkbeauty.com</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
```

# lib\email\templates\orderStatus.ts

```ts
//lib/email/templates/orderStatus.ts

interface OrderStatusData {
    orderNumber: string;
    customerName: string;
    trackingNumber?: string;
    trackingUrl?: string;
    estimatedDelivery?: string;
  }
  
  export const orderShippedTemplate = (data: OrderStatusData): string => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 30px 0;
        background-color: #f8f8f8;
        margin-bottom: 30px;
      }
      .tracking-info {
        background-color: #f8f8f8;
        padding: 20px;
        margin-bottom: 30px;
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Shipped!</h1>
        <p>Hello ${data.customerName},</p>
        <p>Great news! Your order #${data.orderNumber} is on its way.</p>
      </div>
  
      <div class="tracking-info">
        <h2>Tracking Information</h2>
        <p>Tracking Number: ${data.trackingNumber}</p>
        <p>Estimated Delivery: ${data.estimatedDelivery}</p>
        <p style="margin-top: 20px;">
          <a href="${data.trackingUrl}" class="button">Track Your Package</a>
        </p>
      </div>
  
      <div style="text-align: center;">
        <a href="https://yourwebsite.com/account/orders/${data.orderNumber}" class="button">
          View Order Details
        </a>
      </div>
  
      <div class="footer">
        <p>Need help? Contact our support team at support@impressionkbeauty.com</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  export const orderDeliveredTemplate = (data: OrderStatusData): string => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 30px 0;
        background-color: #f8f8f8;
        margin-bottom: 30px;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Delivered!</h1>
        <p>Hello ${data.customerName},</p>
        <p>Your order #${data.orderNumber} has been delivered.</p>
      </div>
  
      <div style="text-align: center; margin-bottom: 30px;">
        <p>We hope you love your new K-beauty products!</p>
        <p>If you have any issues with your order, please contact our support team.</p>
      </div>
  
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="https://yourwebsite.com/account/orders/${data.orderNumber}" class="button">
          View Order Details
        </a>
      </div>
  
  
      <div class="footer">
        <p>Need help? Contact our support team at support@impressionkbeauty.com</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
```

# lib\prisma.ts

```ts
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// This approach prevents multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// For handling decimal values in your application
export type Decimal = {
  toFixed: (precision: number) => string
  toString: () => string
}
```

# lib\services\orderService.ts

```ts
//lib/services/orderService.ts

import { prisma } from '@/lib/prisma';
import { emailService } from '@/lib/email/service';
import { OrderStatus, Order, OrderItem, User, Product } from '@prisma/client';

// Import or define the templates correctly
import { 
  orderShippedTemplate,
  orderDeliveredTemplate 
} from '@/lib/email/templates/orderStatus';
import { orderConfirmationTemplate } from '@/lib/email/templates/orderConfirmation';

// Define the complete order structure with related entities
interface CompleteOrder extends Order {
  user: User | null;
  orderItems: Array<OrderItem & {
    product: Product;
  }>;
}

// Define the template data interfaces to avoid using 'any'
interface OrderConfirmationData {
  orderNumber: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  estimatedDelivery: string;
}

interface TrackingInfo {
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: string;
}

export class OrderService {
  async updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
        include: {
          user: true,
          orderItems: {
            include: {
              product: true
            }
          }
        }
      });

      // Send appropriate email notification based on status
      await this.sendStatusNotification(order as CompleteOrder);

      return order;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  private async sendStatusNotification(order: CompleteOrder) {
    if (!order.user?.email) return;

    const baseData = {
      orderNumber: order.id,
      customerName: order.user.name || 'Valued Customer',
    };

    try {
      switch (order.status) {
        case 'PROCESSING':
          await emailService.sendEmail({
            to: order.user.email,
            subject: `Order #${order.id} is Being Processed`,
            html: orderConfirmationTemplate({
              ...baseData,
              items: order.orderItems.map((item) => ({
                name: item.product.name,
                quantity: item.quantity,
                price: Number(item.price)
              })),
              total: Number(order.totalAmount),
              shippingAddress: JSON.parse(order.shippingAddress),
              estimatedDelivery: this.getEstimatedDeliveryDate()
            } as OrderConfirmationData)
          });
          break;

        case 'SHIPPED':
          // In a real application, you would get this from your shipping provider
          const trackingInfo: TrackingInfo = {
            trackingNumber: 'MOCK-TRACKING-123',
            trackingUrl: 'https://example.com/track',
            estimatedDelivery: this.getEstimatedDeliveryDate()
          };

          await emailService.sendEmail({
            to: order.user.email,
            subject: `Order #${order.id} Has Been Shipped`,
            html: orderShippedTemplate({
              ...baseData,
              ...trackingInfo
            })
          });
          break;

        case 'DELIVERED':
          await emailService.sendEmail({
            to: order.user.email,
            subject: `Order #${order.id} Has Been Delivered`,
            html: orderDeliveredTemplate(baseData)
          });
          break;
      }
    } catch (error) {
      console.error('Error sending order notification:', error);
      // Don't throw error here - we don't want to roll back the order status
      // if email sending fails
    }
  }

  private getEstimatedDeliveryDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Estimate 3 days for delivery
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  async getOrderDetails(orderId: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: {
              product: true
            }
          }
        }
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Add mock tracking info - in a real app, get this from shipping provider
      const trackingInfo = {
        trackingNumber: 'MOCK-TRACKING-123',
        carrier: 'Royal Mail',
        status: 'In Transit',
        estimatedDelivery: this.getEstimatedDeliveryDate(),
        events: [
          {
            date: new Date().toISOString(),
            location: 'Local Sorting Center',
            description: 'Package is in transit'
          }
        ]
      };

      return {
        ...order,
        tracking: trackingInfo
      };
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }
}
```

# lib\services\uploadService.ts

```ts
// lib/services/uploadService.ts

/**
 * Service for handling file uploads via the API route, which now uses Vercel Blob.
 * @param file - The file to upload
 * @param mediaType - The type of media being uploaded ('image' or 'video')
 * @returns Promise with the Vercel Blob URL path to the uploaded file
 */
export async function uploadMedia(file: File, mediaType: 'image' | 'video'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('mediaType', mediaType);

  try {
    // Call the API route that handles the Vercel Blob upload
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Upload Error Response:', errorData); // Log error details
      throw new Error(errorData.error || 'Failed to upload file via API');
    }

    const data = await response.json();

    // Ensure the response contains the URL from Vercel Blob
    if (!data.url || !data.success) {
      console.error('API Upload Success Response Missing URL:', data);
      throw new Error('API did not return a valid upload URL.');
    }

    console.log('Upload successful, Vercel Blob URL:', data.url);
    return data.url; // Returns the Vercel Blob URL

  } catch (error) {
    console.error('Upload service error:', error);
    // Re-throw the error so the calling component can handle it
    throw error instanceof Error ? error : new Error('An unknown upload error occurred');
  }
}

// Keep the original method for backward compatibility if needed,
// ensuring it specifies 'image' media type.
export async function uploadFile(file: File): Promise<string> {
return uploadMedia(file, 'image');
}
```

# lib\stripe.ts

```ts
// src/lib/stripe.ts
import Stripe from 'stripe';
import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';

const getSecretKey = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('Missing STRIPE_SECRET_KEY in environment variables');
    return '';
  }
  return key;
};

// Server-side Stripe instance
export const stripe = new Stripe(getSecretKey(), {
  apiVersion: '2025-02-24.acacia', // Updated to match type definition
  typescript: true,
});

// Client-side Stripe promise
let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};
```

# lib\validations\payment.ts

```ts
// src/lib/validations/payment.ts
import * as yup from 'yup';

export const creditCardSchema = yup.object({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  cardHolder: yup
    .string()
    .required('Card holder name is required')
    .min(3, 'Name must be at least 3 characters'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
});

// Function to format card number with spaces
export const formatCardNumber = (value: string) => {
  return value
    .replace(/\s/g, '')
    .match(/.{1,4}/g)
    ?.join(' ') || '';
};

// Function to format expiry date
export const formatExpiryDate = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};
```

# middleware.ts

```ts
// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are protected
  const isProtectedPath = path.startsWith('/admin');
  const isAuthPath = path.startsWith('/auth');

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if accessing protected path without token
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect to admin dashboard if accessing auth paths while logged in
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Check admin role for admin paths
  if (isProtectedPath && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*']
};
```

# types\checkout.ts

```ts
export interface ShippingDetails {
  firstName: string;
  lastName: string;
  phone: string; // Make sure phone is included and required
  email: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
}
```

# types\next-auth.d.ts

```ts
// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
  
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession['user'];
  }
}
```

# types\order.ts

```ts
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
  createdAt: Date;
  status: OrderStatus;
  totalAmount: number;
  // Make sure shippingAddress can't be null
  shippingAddress: string | ShippingDetails;
  // Add both payment ID fields to match API response
  stripeSessionId?: string;
  // Add paymentInfo object
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
```

# types\product.ts

```ts
// types/product.ts
export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    images: string;
    isVegan: boolean;
    isCrueltyFree: boolean;
    stock: number;
    createdAt: string;
    updatedAt: string;
    description: string;
  }
```

# types\products.ts

```ts
import { Decimal } from '@prisma/client/runtime/library';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string;  // Changed to only string type
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

export interface WishlistProduct extends Omit<Product, 'images'> {
  images: string | string[];  // WishlistProduct can handle both string and array
}
```

