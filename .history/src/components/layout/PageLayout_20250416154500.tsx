//components/layout/PageLayout.tsx

'use client';

import React from 'react';
//import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white">
      {children}
    </div>
  );
}