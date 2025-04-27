//components/layout/PageLayout.tsx

'use client';

import React, { ReactNode } from 'react';
import Header from './Header';
//import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white w-full">
        <div className="w-full bg-white">
          {children}
        </div>
      </div>
    </>
  );
}