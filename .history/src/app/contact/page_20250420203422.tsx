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