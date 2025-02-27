// src/app/cart/page.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart();

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
                <Link
                  href="/checkout"
                  className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800"
                >
                  Proceed to Checkout
                </Link>
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