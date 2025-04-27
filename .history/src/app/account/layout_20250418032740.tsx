//app/account/layout.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { User, ShoppingBag, Heart, Settings } from 'lucide-react';

const accountLinks = [
  {
    label: 'Profile',
    href: '/account/profile',
    icon: User
  },
  {
    label: 'Orders',
    href: '/account/orders',
    icon: ShoppingBag
  },
  {
    label: 'Wishlist',
    href: '/account/wishlist',
    icon: Heart
  },
  {
    label: 'Settings',
    href: '/account/settings',
    icon: Settings
  }
];

export default function AccountLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-light mb-8 text-black">My Account</h1>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Navigation */}
              <aside className="w-full md:w-64">
                <nav className="space-y-1">
                  {accountLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon
                          className={`mr-3 h-5 w-5 ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 min-w-0">
                <div className="bg-white rounded-lg border border-gray-200">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}