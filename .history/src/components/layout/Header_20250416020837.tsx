// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Search,
  ChevronDown,
  User
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


export default function Header() {
  const { data: session } = useSession();
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header ref={dropdownRef} className="w-full bg-white z-50 relative shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Free shipping banner */}
        <div className="hidden sm:flex justify-center items-center text-xs py-1 px-4 bg-gray-50 w-full">
          <span className="font-medium text-black">
            Free shipping on orders over £50
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          {/* Logo and Creative Brand Text */}
          <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
              <Image
                src="/images/logo.png"
                alt="Impression K Beauty"
                fill
                className="object-contain scale-[5.4] sm:scale-[1.8] md:scale-[2.2] lg:scale-[2.5]"
                priority
              />
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="flex-1 mx-6 max-w-md hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-10 border border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all duration-200 text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4 sm:space-x-6">
              <Link
                href="/collections/new"
                className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
              >
                NEW
              </Link>
              <Link
                href="/collections/brands"
                className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
              >
                BRANDS
              </Link>
              <Link
                href="/collections/bestsellers"
                className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors"
              >
                BESTSELLERS
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden hover:bg-gray-100 p-1 rounded-full"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Authentication Buttons or Account Menu */}
            {session ? (
              <Menu as="div" className="relative hidden sm:block">
                <Menu.Button className="flex items-center text-xs sm:text-sm font-medium text-gray-800 hover:text-black px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">
                  <User className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">My Account</span>
                  {session.user?.role === 'ADMIN' && (
                    <span className="ml-1 text-xs text-red-500">(Admin)</span>
                  )}
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {session.user?.role === 'ADMIN' && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/admin/orders"
                            className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/orders"
                          className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                        >
                          Orders
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account/profile"
                          className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="text-xs sm:text-sm font-medium text-gray-800 hover:text-black px-2 sm:px-3 py-1 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-xs sm:text-sm font-medium text-white bg-black px-2 sm:px-3 py-1 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-1 text-black hover:bg-gray-100 rounded-full group"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-4 mb-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black bg-gray-50 focus:bg-white text-sm"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}

        {/* Decorative Border */}
        <div className="relative h-1 mt-4 bg-gradient-to-r from-pink-50 via-pink-200 to-pink-50 rounded-full"></div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 pt-16 sm:pt-20 overflow-y-auto">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black bg-gray-50 focus:bg-white text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>

            <nav className="flex flex-col">
              {session ? (
                <Link
                  href="/account"
                  className="text-base sm:text-lg font-medium py-2 border-b border-gray-100 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  My Account
                </Link>
              ) : (
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                href="/collections/new"
                className="text-base sm:text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                NEW
              </Link>
              <Link
                href="/collections/brands"
                className="text-base sm:text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                BRANDS
              </Link>

              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-medium">SKINCARE</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/collections/cleansers"
                    className="block py-1 text-sm text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cleansers
                  </Link>
                  <Link
                    href="/collections/toners"
                    className="block py-1 text-sm text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Toners
                  </Link>
                  <Link
                    href="/collections/serums"
                    className="block py-1 text-sm text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Serums
                  </Link>
                  <Link
                    href="/collections/moisturizers"
                    className="block py-1 text-sm text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Moisturizers
                  </Link>
                  <Link
                    href="/collections/skincare"
                    className="block py-1 text-sm font-medium text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All Skincare
                  </Link>
                </div>
              </div>

              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-medium">MAKEUP</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/collections/foundation"
                    className="block py-1 text-sm text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Foundation
                  </Link>
                  <Link
                    href="/collections/lip"
                    className="block py-1 text-sm text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lip
                  </Link>
                  <Link
                    href="/collections/eye"
                    className="block py-1 text-sm text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Eye
                  </Link>
                  <Link
                    href="/collections/makeup"
                    className="block py-1 text-sm font-medium text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All Makeup
                  </Link>
                </div>
              </div>

              <Link
                href="/collections/bestsellers"
                className="text-base sm:text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                BESTSELLERS
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
