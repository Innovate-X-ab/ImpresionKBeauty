//components/layout/PageLayout.tsx

'use client';

import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const PageLayout = ({ children, hideHeader = false }: PageLayoutProps) => {
  return (
    <>
      {!hideHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;