// src/components/layout/Hero.tsx

'use client';

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="/api/placeholder/1920/1080" // We'll replace this with actual hero image
          alt="Korean Beauty Products" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center text-white">
        <div className="max-w-3xl px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Discover Korean Beauty</h1>
          <p className="text-lg md:text-xl mb-8">Experience the magic of K-Beauty with our curated collection</p>
          <Link 
            href="/collections/all" 
            className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}