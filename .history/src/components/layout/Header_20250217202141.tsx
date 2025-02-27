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