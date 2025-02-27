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