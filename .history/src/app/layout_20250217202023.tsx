// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// src/app/page.tsx
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import FeaturedProducts from "@/components/layout/FeaturedProducts";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
    </main>
  );
}

// src/components/layout/Header.tsx
import Link from "next/link";
import { ShoppingCart, Heart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            IMPRESSION K BEAUTY
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-pink-600">
              Shop All
            </Link>
            <Link href="/brands" className="hover:text-pink-600">
              Brands
            </Link>
            <Link href="/bestsellers" className="hover:text-pink-600">
              Best Sellers
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="hover:text-pink-600">
              <Heart className="w-6 h-6" />
            </Link>
            <Link href="/cart" className="hover:text-pink-600">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <Link href="/account" className="hover:text-pink-600">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// src/components/layout/Hero.tsx
export default function Hero() {
  return (
    <section className="pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Discover Korean Beauty
            </h1>
            <p className="text-lg text-gray-600">
              Vegan and cruelty-free skincare products for your beauty routine
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img 
              src="/api/placeholder/600/400" 
              alt="Korean Beauty Products" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/layout/FeaturedProducts.tsx
export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "COSRX Advanced Snail Mucin",
      brand: "COSRX",
      price: 21.99,
      image: "/api/placeholder/300/300"
    },
    // Add more sample products
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h3 className="font-medium">{product.name}</h3>
                <p className="font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}