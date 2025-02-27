//components/layout/ClientLayout.tsx

'use client';

import { CartProvider } from "@/contexts/CartContext";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}