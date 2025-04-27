import React from 'react';
import Footer from '@/components/layout/Footer';

export default function OrderDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-gray-50">{children}</main>
      
    </>
  );
}