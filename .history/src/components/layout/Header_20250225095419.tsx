'use client';

import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header 
      className={`w-full ${isScrolled ? 'bg-white shadow-sm' : 'bg-white border-b border-gray-100'} transition-all duration-200`}
      style={{ height: '80px' }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light tracking-wider text-black hover:opacity-80 transition-opacity">
            IMPRESSION K BEAUTY
          </Link>

          {/* Search Bar - Always visible */}
          <div className="flex-1 mx-6 max-w-md hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm bg-gray-50 group-hover:bg-white transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="absolute inset-0 border border-transparent group-hover:border-black rounded-md pointer-events-none transition-colors opacity-0 group-hover:opacity-10"></div>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/collections/new" className="text-sm text-gray-800 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform">NEW</Link>
              <Link href="/collections/bestsellers" className="text-sm text-gray-800 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform">BESTSELLERS</Link>
              <Link href="/collections/skincare" className="text-sm text-gray-800 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform">SKINCARE</Link>
              <Link href="/collections/makeup" className="text-sm text-gray-800 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform">MAKEUP</Link>
              <Link href="/collections/brands" className="text-sm text-gray-800 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform">BRANDS</Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden hover:bg-gray-100 p-2 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-transform hover:scale-110">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 pt-20 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-3 px-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm bg-gray-50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/collections/new" 
                className="text-lg font-medium py-3 border-b border-gray-100 hover:pl-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                NEW
              </Link>
              <Link 
                href="/collections/bestsellers" 
                className="text-lg font-medium py-3 border-b border-gray-100 hover:pl-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                BESTSELLERS
              </Link>
              <Link 
                href="/collections/skincare" 
                className="text-lg font-medium py-3 border-b border-gray-100 hover:pl-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                SKINCARE
              </Link>
              <Link 
                href="/collections/makeup" 
                className="text-lg font-medium py-3 border-b border-gray-100 hover:pl-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                MAKEUP
              </Link>
              <Link 
                href="/collections/brands" 
                className="text-lg font-medium py-3 border-b border-gray-100 hover:pl-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                BRANDS
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}