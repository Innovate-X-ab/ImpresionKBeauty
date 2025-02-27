'use client';

import Link from "next/link";
import { ShoppingBag, Menu, X, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
      <div className="grid grid-cols-4 gap-6 p-6">
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">Shop All Skincare</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/skincare" className="text-sm text-gray-600 hover:text-black">All Skincare</Link></li>
            <li><Link href="/collections/skincare?filter=vegan" className="text-sm text-gray-600 hover:text-black">Vegan Products</Link></li>
            <li><Link href="/collections/skincare?filter=cruelty-free" className="text-sm text-gray-600 hover:text-black">Cruelty-Free Products</Link></li>
            <li><Link href="/collections/travel-size" className="text-sm text-gray-600 hover:text-black">Minis & Travel Size</Link></li>
            <li><Link href="/collections/skincare-sets" className="text-sm text-gray-600 hover:text-black">Skincare Sets</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">By Product Type</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/cleansers" className="text-sm text-gray-600 hover:text-black">Cleansers</Link></li>
            <li><Link href="/collections/exfoliators" className="text-sm text-gray-600 hover:text-black">Exfoliators</Link></li>
            <li><Link href="/collections/toners" className="text-sm text-gray-600 hover:text-black">Toners</Link></li>
            <li><Link href="/collections/serums" className="text-sm text-gray-600 hover:text-black">Serums & Essences</Link></li>
            <li><Link href="/collections/moisturizers" className="text-sm text-gray-600 hover:text-black">Moisturizers</Link></li>
            <li><Link href="/collections/masks" className="text-sm text-gray-600 hover:text-black">Sheet Masks</Link></li>
            <li><Link href="/collections/sunscreens" className="text-sm text-gray-600 hover:text-black">Sunscreens</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">By Skin Concern</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/skincare?concern=acne" className="text-sm text-gray-600 hover:text-black">Acne</Link></li>
            <li><Link href="/collections/skincare?concern=pigmentation" className="text-sm text-gray-600 hover:text-black">Pigmentation</Link></li>
            <li><Link href="/collections/skincare?concern=wrinkles" className="text-sm text-gray-600 hover:text-black">Wrinkles & Firmness</Link></li>
            <li><Link href="/collections/skincare?concern=redness" className="text-sm text-gray-600 hover:text-black">Redness</Link></li>
            <li><Link href="/collections/skincare?concern=pores" className="text-sm text-gray-600 hover:text-black">Pores & Blackheads</Link></li>
            <li><Link href="/collections/skincare?concern=dryness" className="text-sm text-gray-600 hover:text-black">Dryness</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">By Skin Type</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/skincare?type=oily" className="text-sm text-gray-600 hover:text-black">Oily Skin</Link></li>
            <li><Link href="/collections/skincare?type=combination" className="text-sm text-gray-600 hover:text-black">Combination Skin</Link></li>
            <li><Link href="/collections/skincare?type=dry" className="text-sm text-gray-600 hover:text-black">Dry Skin</Link></li>
            <li><Link href="/collections/skincare?type=sensitive" className="text-sm text-gray-600 hover:text-black">Sensitive Skin</Link></li>
            <li><Link href="/collections/skincare?type=balanced" className="text-sm text-gray-600 hover:text-black">Balanced Skin</Link></li>
          </ul>
        </div>
      </div>
    ),
    makeup: (
      <div className="grid grid-cols-3 gap-6 p-6">
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">Shop All Makeup</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/makeup" className="text-sm text-gray-600 hover:text-black">All Makeup</Link></li>
            <li><Link href="/collections/makeup?filter=vegan" className="text-sm text-gray-600 hover:text-black">Vegan Makeup</Link></li>
            <li><Link href="/collections/makeup-sets" className="text-sm text-gray-600 hover:text-black">Makeup Sets</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">By Category</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/foundation" className="text-sm text-gray-600 hover:text-black">Foundation & BB Cream</Link></li>
            <li><Link href="/collections/lip" className="text-sm text-gray-600 hover:text-black">Lip Products</Link></li>
            <li><Link href="/collections/eye" className="text-sm text-gray-600 hover:text-black">Eye Makeup</Link></li>
            <li><Link href="/collections/blush" className="text-sm text-gray-600 hover:text-black">Blush & Highlighter</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">Featured</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/bestsellers-makeup" className="text-sm text-gray-600 hover:text-black">Bestsellers</Link></li>
            <li><Link href="/collections/new-makeup" className="text-sm text-gray-600 hover:text-black">New Arrivals</Link></li>
          </ul>
        </div>
      </div>
    ),
    brands: (
      <div className="grid grid-cols-4 gap-6 p-6">
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">Popular Brands</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/brands/cosrx" className="text-sm text-gray-600 hover:text-black">COSRX</Link></li>
            <li><Link href="/collections/brands/beauty-of-joseon" className="text-sm text-gray-600 hover:text-black">Beauty of Joseon</Link></li>
            <li><Link href="/collections/brands/some-by-mi" className="text-sm text-gray-600 hover:text-black">Some By Mi</Link></li>
            <li><Link href="/collections/brands/klairs" className="text-sm text-gray-600 hover:text-black">Klairs</Link></li>
            <li><Link href="/collections/brands/isntree" className="text-sm text-gray-600 hover:text-black">Isntree</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">Featured Brands</h3>
          <ul className="space-y-2">
            <li><Link href="/collections/brands/medicube" className="text-sm text-gray-600 hover:text-black">Medicube</Link></li>
            <li><Link href="/collections/brands/mixsoon" className="text-sm text-gray-600 hover:text-black">Mixsoon</Link></li>
            <li><Link href="/collections/brands/abib" className="text-sm text-gray-600 hover:text-black">Abib</Link></li>
            <li><Link href="/collections/brands/skin1004" className="text-sm text-gray-600 hover:text-black">Skin1004</Link></li>
            <li><Link href="/collections/brands/tirtir" className="text-sm text-gray-600 hover:text-black">Tirtir</Link></li>
          </ul>
        </div>
        <div className="col-span-2 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3 uppercase text-gray-900">Featured Brand</h3>
          <div className="aspect-video bg-gray-200 rounded-lg mb-3">
            {/* Brand image would go here */}
            <Image
                src="/images/brand.jpg"
                alt="Korean Skincare Brand Photo featuring COSRX"
                width={1080} // Example width
                height={100} // Example height (16:9 ratio)
                layout="responsive"
                className="rounded-lg"
                priority={true} // Optional
              />
          </div>
          <p className="text-sm text-gray-600 mb-3">Explore our featured brand of the month with exclusive products and special offers.</p>
          <Link href="/collections/brands/featured" className="text-sm font-medium text-black hover:underline">
            Explore Collection →
          </Link>
        </div>
      </div>
    )
  };

  return (
    <header ref={dropdownRef} className="w-full bg-white z-50 relative shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar - Can be used for announcements/promos */}
        <div className="hidden sm:flex justify-center items-center text-xs mb-4 py-1 px-4 bg-gray-50 rounded-full">
          <span className="font-medium text-black">Free shipping on orders over $50</span>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light tracking-wider text-black">
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

          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/collections/new" className="text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">NEW</Link>
              
              <button 
                className={`text-sm text-gray-800 hover:text-black font-medium px-2 py-1 rounded-md transition-colors flex items-center ${activeDropdown === 'brands' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleDropdown('brands')}
              >
                BRANDS <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'brands' ? 'rotate-180' : ''}`} />
              </button>
              
              <button 
                className={`text-sm text-gray-800 hover:text-black font-medium px-2 py-1 rounded-md transition-colors flex items-center ${activeDropdown === 'skincare' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleDropdown('skincare')}
              >
                SKINCARE <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'skincare' ? 'rotate-180' : ''}`} />
              </button>
              
              <button 
                className={`text-sm text-gray-800 hover:text-black font-medium px-2 py-1 rounded-md transition-colors flex items-center ${activeDropdown === 'makeup' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleDropdown('makeup')}
              >
                MAKEUP <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'makeup' ? 'rotate-180' : ''}`} />
              </button>
              
              <Link href="/collections/bestsellers" className="text-sm text-gray-800 hover:text-black font-medium px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">BESTSELLERS</Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden hover:bg-gray-100 p-1 rounded-full"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-1 text-black hover:bg-gray-100 rounded-full group">
              <ShoppingBag className="w-6 h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        
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
        <div className="lg:hidden fixed inset-0 bg-white z-50 pt-20">
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
              <Link 
                href="/collections/new" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                NEW
              </Link>
              
              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">BRANDS</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/collections/brands/cosrx" className="block py-1 text-sm text-gray-600">COSRX</Link>
                  <Link href="/collections/brands/beauty-of-joseon" className="block py-1 text-sm text-gray-600">Beauty of Joseon</Link>
                  <Link href="/collections/brands/some-by-mi" className="block py-1 text-sm text-gray-600">Some By Mi</Link>
                  <Link href="/collections/brands" className="block py-1 text-sm font-medium text-black">View All Brands</Link>
                </div>
              </div>
              
              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">SKINCARE</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/collections/cleansers" className="block py-1 text-sm text-gray-600">Cleansers</Link>
                  <Link href="/collections/toners" className="block py-1 text-sm text-gray-600">Toners</Link>
                  <Link href="/collections/serums" className="block py-1 text-sm text-gray-600">Serums</Link>
                  <Link href="/collections/moisturizers" className="block py-1 text-sm text-gray-600">Moisturizers</Link>
                  <Link href="/collections/skincare" className="block py-1 text-sm font-medium text-black">View All Skincare</Link>
                </div>
              </div>
              
              <div className="py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">MAKEUP</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/collections/foundation" className="block py-1 text-sm text-gray-600">Foundation</Link>
                  <Link href="/collections/lip" className="block py-1 text-sm text-gray-600">Lip</Link>
                  <Link href="/collections/eye" className="block py-1 text-sm text-gray-600">Eye</Link>
                  <Link href="/collections/makeup" className="block py-1 text-sm font-medium text-black">View All Makeup</Link>
                </div>
              </div>
              
              <Link 
                href="/collections/bestsellers" 
                className="text-lg font-medium py-2 border-b border-gray-100"
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