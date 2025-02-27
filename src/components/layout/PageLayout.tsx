//components/layout/PageLayout.tsx

'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className={`min-h-screen pt-20 ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}