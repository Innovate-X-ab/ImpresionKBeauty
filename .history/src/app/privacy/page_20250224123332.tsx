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