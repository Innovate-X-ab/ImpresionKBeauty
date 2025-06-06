'use client';

import Link from "next/link";
import { ShoppingBag, Menu as MenuIcon, X, Search, ChevronDown, User } from "lucide-react";
import { Menu, Transition } from '@headlessui/react';
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
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

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Mega menu content remains the same
  const megaMenuContent = {
    skincare: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 sm:p-6">
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">Shop All Skincare</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/skincare" className="text-xs sm:text-sm text-gray-600 hover:text-black">All Skincare</Link></li>
            <li><Link href="/collections/skincare?filter=vegan" className="text-xs sm:text-sm text-gray-600 hover:text-black">Vegan Products</Link></li>
            <li><Link href="/collections/skincare?filter=cruelty-free" className="text-xs sm:text-sm text-gray-600 hover:text-black">Cruelty-Free Products</Link></li>
            <li><Link href="/collections/travel-size" className="text-xs sm:text-sm text-gray-600 hover:text-black">Minis & Travel Size</Link></li>
            <li><Link href="/collections/skincare-sets" className="text-xs sm:text-sm text-gray-600 hover:text-black">Skincare Sets</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">By Product Type</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/cleansers" className="text-xs sm:text-sm text-gray-600 hover:text-black">Cleansers</Link></li>
            <li><Link href="/collections/exfoliators" className="text-xs sm:text-sm text-gray-600 hover:text-black">Exfoliators</Link></li>
            <li><Link href="/collections/toners" className="text-xs sm:text-sm text-gray-600 hover:text-black">Toners</Link></li>
            <li><Link href="/collections/serums" className="text-xs sm:text-sm text-gray-600 hover:text-black">Serums & Essences</Link></li>
            <li><Link href="/collections/moisturizers" className="text-xs sm:text-sm text-gray-600 hover:text-black">Moisturizers</Link></li>
            <li><Link href="/collections/masks" className="text-xs sm:text-sm text-gray-600 hover:text-black">Sheet Masks</Link></li>
            <li><Link href="/collections/sunscreens" className="text-xs sm:text-sm text-gray-600 hover:text-black">Sunscreens</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">By Skin Concern</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/skincare?concern=acne" className="text-xs sm:text-sm text-gray-600 hover:text-black">Acne</Link></li>
            <li><Link href="/collections/skincare?concern=pigmentation" className="text-xs sm:text-sm text-gray-600 hover:text-black">Pigmentation</Link></li>
            <li><Link href="/collections/skincare?concern=wrinkles" className="text-xs sm:text-sm text-gray-600 hover:text-black">Wrinkles & Firmness</Link></li>
            <li><Link href="/collections/skincare?concern=redness" className="text-xs sm:text-sm text-gray-600 hover:text-black">Redness</Link></li>
            <li><Link href="/collections/skincare?concern=pores" className="text-xs sm:text-sm text-gray-600 hover:text-black">Pores & Blackheads</Link></li>
            <li><Link href="/collections/skincare?concern=dryness" className="text-xs sm:text-sm text-gray-600 hover:text-black">Dryness</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">By Skin Type</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/skincare?type=oily" className="text-xs sm:text-sm text-gray-600 hover:text-black">Oily Skin</Link></li>
            <li><Link href="/collections/skincare?type=combination" className="text-xs sm:text-sm text-gray-600 hover:text-black">Combination Skin</Link></li>
            <li><Link href="/collections/skincare?type=dry" className="text-xs sm:text-sm text-gray-600 hover:text-black">Dry Skin</Link></li>
            <li><Link href="/collections/skincare?type=sensitive" className="text-xs sm:text-sm text-gray-600 hover:text-black">Sensitive Skin</Link></li>
            <li><Link href="/collections/skincare?type=balanced" className="text-xs sm:text-sm text-gray-600 hover:text-black">Balanced Skin</Link></li>
          </ul>
        </div>
      </div>
    ),
    makeup: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 sm:p-6">
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">Shop All Makeup</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/makeup" className="text-xs sm:text-sm text-gray-600 hover:text-black">All Makeup</Link></li>
            <li><Link href="/collections/makeup?filter=vegan" className="text-xs sm:text-sm text-gray-600 hover:text-black">Vegan Makeup</Link></li>
            <li><Link href="/collections/makeup-sets" className="text-xs sm:text-sm text-gray-600 hover:text-black">Makeup Sets</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">By Category</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/foundation" className="text-xs sm:text-sm text-gray-600 hover:text-black">Foundation & BB Cream</Link></li>
            <li><Link href="/collections/lip" className="text-xs sm:text-sm text-gray-600 hover:text-black">Lip Products</Link></li>
            <li><Link href="/collections/eye" className="text-xs sm:text-sm text-gray-600 hover:text-black">Eye Makeup</Link></li>
            <li><Link href="/collections/blush" className="text-xs sm:text-sm text-gray-600 hover:text-black">Blush & Highlighter</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">Featured</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/bestsellers-makeup" className="text-xs sm:text-sm text-gray-600 hover:text-black">Bestsellers</Link></li>
            <li><Link href="/collections/new-makeup" className="text-xs sm:text-sm text-gray-600 hover:text-black">New Arrivals</Link></li>
          </ul>
        </div>
      </div>
    ),
    brands: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 sm:p-6">
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">Popular Brands</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/brands/cosrx" className="text-xs sm:text-sm text-gray-600 hover:text-black">COSRX</Link></li>
            <li><Link href="/collections/brands/beauty-of-joseon" className="text-xs sm:text-sm text-gray-600 hover:text-black">Beauty of Joseon</Link></li>
            <li><Link href="/collections/brands/some-by-mi" className="text-xs sm:text-sm text-gray-600 hover:text-black">Some By Mi</Link></li>
            <li><Link href="/collections/brands/klairs" className="text-xs sm:text-sm text-gray-600 hover:text-black">Klairs</Link></li>
            <li><Link href="/collections/brands/isntree" className="text-xs sm:text-sm text-gray-600 hover:text-black">Isntree</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">Featured Brands</h3>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link href="/collections/brands/medicube" className="text-xs sm:text-sm text-gray-600 hover:text-black">Medicube</Link></li>
            <li><Link href="/collections/brands/mixsoon" className="text-xs sm:text-sm text-gray-600 hover:text-black">Mixsoon</Link></li>
            <li><Link href="/collections/brands/abib" className="text-xs sm:text-sm text-gray-600 hover:text-black">Abib</Link></li>
            <li><Link href="/collections/brands/skin1004" className="text-xs sm:text-sm text-gray-600 hover:text-black">Skin1004</Link></li>
            <li><Link href="/collections/brands/tirtir" className="text-xs sm:text-sm text-gray-600 hover:text-black">Tirtir</Link></li>
          </ul>
        </div>
        <div className="col-span-2 bg-gray-50 rounded-lg p-3 sm:p-4 hidden md:block">
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase text-gray-900">Featured Brand</h3>
          <div className="aspect-video bg-gray-200 rounded-lg mb-3">
            <Image
                src="/images/brand.jpg"
                alt="Korean Skincare Brand Photo featuring COSRX"
                width={1080}
                height={100}
                layout="responsive"
                className="rounded-lg"
                priority={true}
              />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">Explore our featured brand of the month with exclusive products and special offers.</p>
          <Link href="/collections/brands/featured" className="text-xs sm:text-sm font-medium text-black hover:underline">
            Explore Collection →
          </Link>
        </div>
      </div>
    )
  };

  return (
    <header ref={dropdownRef} className="w-full bg-white z-50 relative shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Top Bar - Can be used for announcements/promos */}
        <div className="hidden sm:flex justify-center items-center text-xs mb-3 sm:mb-4 py-1 px-4 bg-gray-50 rounded-full">
          <span className="font-medium text-black">Free shipping on orders over £50</span>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-light tracking-wider text-black">
            IMPRESSION K BEAUTY
          </Link>

          {/* Search Bar - Hidden on mobile unless toggled */}
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
                  onClick={() => setSearchQuery("")}
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
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-4 sm:space-x-6">
              <Link href="/collections/new" className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">NEW</Link>
              
              <button 
                className={`text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 rounded-md transition-colors flex items-center ${activeDropdown === 'brands' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleDropdown('brands')}
              >
                BRANDS <ChevronDown className={`ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${activeDropdown === 'brands' ? 'rotate-180' : ''}`} />
              </button>
              
              <button 
                className={`text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 rounded-md transition-colors flex items-center ${activeDropdown === 'skincare' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleDropdown('skincare')}
              >
                SKINCARE <ChevronDown className={`ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${activeDropdown === 'skincare' ? 'rotate-180' : ''}`} />
              </button>
              
              <button 
                className={`text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 rounded-md transition-colors flex items-center ${activeDropdown === 'makeup' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleDropdown('makeup')}
              >
                MAKEUP <ChevronDown className={`ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${activeDropdown === 'makeup' ? 'rotate-180' : ''}`} />
              </button>
              
              <Link href="/collections/bestsellers" className="text-xs sm:text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">BESTSELLERS</Link>
            </div>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden hover:bg-gray-100 p-1 rounded-full"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            {/* Authentication Buttons */}
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
            {({active}) => (
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
          {({active}) => (
            <Link
              href="/account/orders"
              className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
            >
              Orders
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({active}) => (
            <Link
              href="/account/profile"
              className={`${active ? 'bg-gray-100' : ''} block w-full px-4 py-2 text-sm text-gray-700 text-left`}
            >
              Profile
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({active}) => (
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
            <Link href="/cart" className="relative p-1 text-black hover:bg-gray-100 rounded-full group">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar - Only visible when toggled */}
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
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}
        
        {/* Decorative Border */}
        <div className="relative h-1 mt-4 bg-gradient-to-r from-pink-50 via-pink-200 to-pink-50 rounded-full"></div>
        
        {/* Mega Menu Dropdowns */}
        {activeDropdown && (
          <div className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-lg z-20 animate-fadeIn">
            {activeDropdown === 'skincare' && megaMenuContent.skincare}
            {activeDropdown === 'makeup' && megaMenuContent.makeup}
            {activeDropdown === 'brands' && megaMenuContent.brands}
          </div>
        )}
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
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
            
            <nav className="flex flex-col">
              {/* Authentication links for mobile */}
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
              
              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-medium">BRANDS</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/collections/brands/cosrx" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>COSRX</Link>
                  <Link href="/collections/brands/beauty-of-joseon" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Beauty of Joseon</Link>
                  <Link href="/collections/brands/some-by-mi" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Some By Mi</Link>
                  <Link href="/collections/brands" className="block py-1 text-sm font-medium text-black" onClick={() => setIsMenuOpen(false)}>View All Brands</Link>
                </div>
              </div>
              
              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-medium">SKINCARE</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/collections/cleansers" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Cleansers</Link>
                  <Link href="/collections/toners" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Toners</Link>
                  <Link href="/collections/serums" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Serums</Link>
                  <Link href="/collections/moisturizers" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Moisturizers</Link>
                  <Link href="/collections/skincare" className="block py-1 text-sm font-medium text-black" onClick={() => setIsMenuOpen(false)}>View All Skincare</Link>
                </div>
              </div>
              
              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-medium">MAKEUP</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/collections/foundation" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Foundation</Link>
                  <Link href="/collections/lip" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Lip</Link>
                  <Link href="/collections/eye" className="block py-1 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Eye</Link>
                  <Link href="/collections/makeup" className="block py-1 text-sm font-medium text-black" onClick={() => setIsMenuOpen(false)}>View All Makeup</Link>
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