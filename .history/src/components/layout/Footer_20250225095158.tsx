//components/layout/Footer.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';


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
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg text-gray-600 font-medium mb-6">IMPRESSION K BEAUTY</h4>
            <p className="text-gray-600 mb-4">
              Your destination for authentic Korean beauty products. We bring the best of K-beauty to your doorstep.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                <span>+44 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                <span>hello@impressionkbeauty.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg text-gray-600 font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-black">FAQs</Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-black">Shipping Information</Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-black">Returns Policy</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg text-gray-600 font-medium mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/collections/skincare" className="text-gray-600 hover:text-black">Skincare</Link>
              </li>
              <li>
                <Link href="/collections/moisturizers" className="text-gray-600 hover:text-black">Moisturizers</Link>
              </li>
              <li>
                <Link href="/collections/serums" className="text-gray-600 hover:text-black">Serums</Link>
              </li>
              <li>
                <Link href="/collections/masks" className="text-gray-600 hover:text-black">Face Masks</Link>
              </li>
              <li>
                <Link href="/collections/sets" className="text-gray-600 hover:text-black">Gift Sets</Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg text-gray-600 font-medium mb-6">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SiFacebook size={20} color="#1877F2" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SiInstagram size={20} color="#E4405F" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SiYoutube size={20} color="#FF0000" />
              </a>
            </div>
            <div className="space-y-4">
              <h5 className="font-medium text-gray-600 ">Payment Methods</h5>
              <div className="flex space-x-2">
                <img src='/images/payments/visa.png' alt="Visa" className="h-8" />
                <img src='/images/payments/mastercard.jpg' alt="Mastercard" className="h-8" />
                <img src='/images/payments/apple-pay.png' alt="Apple Pay" className="h-8" />
                <img src='/images/payments/pay-pal.png' alt="PayPal" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} IMPRESSION K BEAUTY. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-black">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-black">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-gray-600 hover:text-black">
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