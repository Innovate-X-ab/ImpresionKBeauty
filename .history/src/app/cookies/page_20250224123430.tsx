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