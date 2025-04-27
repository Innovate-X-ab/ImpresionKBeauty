//components/layout/PageLayout.tsx

'use client';

import Header from './Header';
//import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;  // Make className optional
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={className}>
      <Header />
      <div className="min-h-screen bg-white w-full">
        <div className="w-full bg-white">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}