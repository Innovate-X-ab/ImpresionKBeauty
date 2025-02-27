'use client';

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`w-full ${isScrolled ? 'bg-white shadow-sm' : 'bg-white border-b border-gray-100'}`}
        style={{ height: '80px' }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-light tracking-wider text-black">
              IMPRESSION K BEAUTY
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-gray-600">
              <Link href="/collections/new" className="text-sm hover:text-gray-600">NEW</Link>
              <Link href="/collections/bestsellers" className="text-sm hover:text-gray-600">BESTSELLERS</Link>
              <Link href="/collections/skincare" className="text-sm hover:text-gray-600">SKINCARE</Link>
              <Link href="/collections/makeup" className="text-sm hover:text-gray-600">MAKEUP</Link>
              <Link href="/collections/brands" className="text-sm hover:text-gray-600">BRANDS</Link>
            </nav>

            {/* Cart Icon */}
            <Link href="/cart" className="relative text-gray-600">
              <ShoppingBag className="w-6 h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[80px] left-0 right-0 bg-white z-50 border-b border-gray-100 shadow-sm text-gray-600">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <nav className="flex flex-col space-y-4 text-sm w-full pb-4 border-b border-gray-100">  
              <Link href="/collections/new" className="text-sm hover:text-gray-600">NEW</Link>
              <Link href="/collections/bestsellers" className="text-sm hover:text-gray-600">BESTSELLERS</Link>
              <Link href="/collections/skincare" className="text-sm hover:text-gray-600">SKINCARE</Link>
              <Link href="/collections/makeup" className="text-sm hover:text-gray-600">MAKEUP</Link>
              <Link href="/collections/brands" className="text-sm hover:text-gray-600">BRANDS</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}