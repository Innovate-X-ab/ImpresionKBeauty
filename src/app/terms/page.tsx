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