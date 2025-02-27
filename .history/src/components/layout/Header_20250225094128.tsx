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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header 
        className={`w-full ${isScrolled ? 'bg-white shadow-sm' : 'bg-white border-b border-gray-100'}`}
        style={{ height: '80px' }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left section: Mobile Menu Button & Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden mr-4"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>

              {/* Logo */}
              <Link href="/" className="text-2xl font-light tracking-wider text-black">
                IMPRESSION K BEAUTY
              </Link>
            </div>

            {/* Middle section: Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2 px-10 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-black text-sm bg-gray-50"
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

            {/* Right section: Navigation & Cart */}
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6 mr-6 text-gray-600">
                <Link href="/collections/new" className="text-sm hover:text-gray-600">NEW</Link>
                <Link href="/collections/bestsellers" className="text-sm hover:text-gray-600">BESTSELLERS</Link>
                <Link href="/collections/skincare" className="text-sm hover:text-gray-600">SKINCARE</Link>
                <Link href="/collections/makeup" className="text-sm hover:text-gray-600">MAKEUP</Link>
                <Link href="/collections/brands" className="text-sm hover:text-gray-600">BRANDS</Link>
              </nav>
              
              {/* Mobile Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden text-gray-600 mr-4"
              >
                <Search className="w-5 h-5" />
              </button>
              
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
        </div>
      </header>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-4">
          <div className="container mx-auto">
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="ml-4 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[80px] left-0 right-0 bg-white z-50 border-b border-gray-100 shadow-sm text-gray-00">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <nav className="flex flex-col space-y-4 text-sm w-full pb-4 border-b border-gray-100 text-gray-600">  
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