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
              Once we receive and inspect your return, we'll process your refund 
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