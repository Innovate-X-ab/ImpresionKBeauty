//app/contact/page.tsx

'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  return (
    <PageLayout>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Phone className="w-6 h-6 mx-auto mb-4 text-black" />
              <h3 className="text-lg font-medium mb-2 text-black">Phone</h3>
              <p className="text-gray-600 ">+44 (0) 123 456 7890</p>
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

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-light mb-6 text-black">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}