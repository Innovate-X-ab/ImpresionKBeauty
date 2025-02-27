//components/layout/PolicyLayout.tsx
'use client';

import React from 'react';
import PageLayout from './PageLayout';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light mb-4">{title}</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {children}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-600">
              <p>
                If you have any questions about these policies, please{' '}
                <a href="/contact" className="text-black hover:underline">
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}