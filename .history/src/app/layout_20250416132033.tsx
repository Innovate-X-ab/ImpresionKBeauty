import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { WishlistProvider } from '@/contexts/WishlistContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impression K Beauty",
  description: "Premium Korean Beauty Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WishlistProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </WishlistProvider>
      </body>
    </html>
  );
}