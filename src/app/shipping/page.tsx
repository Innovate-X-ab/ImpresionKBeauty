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