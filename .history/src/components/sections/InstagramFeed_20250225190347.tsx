//src/components/sections/InstagramFeed.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

// Sample Instagram posts - replace with your real content
const instagramPosts = [
  {
    id: 1,
    image: '/api/placeholder/400/400',
    caption: 'Morning glow with our Vitamin C serum! ✨ #kbeauty #skincareroutine',
    likes: 248,
    url: 'https://instagram.com/p/example1'
  },
  {
    id: 2,
    image: '/api/placeholder/400/400',
    caption: 'Sheet mask Sunday is our favorite day of the week 💆‍♀️ #selfcaresunday',
    likes: 312,
    url: 'https://instagram.com/p/example2'
  },
  {
    id: 3,
    image: '/api/placeholder/400/400',
    caption: 'The perfect layering technique for maximum hydration 💧 #kbeautytips',
    likes: 186,
    url: 'https://instagram.com/p/example3'
  },
  {
    id: 4,
    image: '/api/placeholder/400/400',
    caption: 'Our new arrivals from COSRX just landed! 🛍️ #newarrivals #cosrx',
    likes: 421,
    url: 'https://instagram.com/p/example4'
  },
  {
    id: 5,
    image: '/api/placeholder/400/400',
    caption: 'Behind the scenes at our product photoshoot today 📸 #behindthescenes',
    likes: 275,
    url: 'https://instagram.com/p/example5'
  },
  {
    id: 6,
    image: '/api/placeholder/400/400',
    caption: 'Customer results using our Snail Mucin essence for 4 weeks 🥰 #beforeandafter',
    likes: 529,
    url: 'https://instagram.com/p/example6'
  },
  {
    id: 7,
    image: '/api/placeholder/400/400',
    caption: 'Quick tutorial: How to layer your serums correctly 👩‍🏫 #skincarebasics',
    likes: 193,
    url: 'https://instagram.com/p/example7'
  },
  {
    id: 8,
    image: '/api/placeholder/400/400',
    caption: 'Our founder\'s current evening skincare routine 🌙 #nighttimeritual',
    likes: 307,
    url: 'https://instagram.com/p/example8'
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-black font-light mb-4">Follow Us On Instagram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our beauty community for skincare tips, tutorials, and inspiration.
          </p>
          <a 
            href="https://instagram.com/impressionkbeauty" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-black hover:underline"
          >
            <Instagram className="w-5 h-5 mr-2" />
            <span>@impressionkbeauty</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 line-clamp-1">{post.caption}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center  mt-12">
          <Link
            href="/pages/social"
            className="border border-black text-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition-colors inline-block"
          >
            See More Posts
          </Link>
        </div>
      </div>
    </section>
  );
}