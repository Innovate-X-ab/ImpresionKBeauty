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
    image: '/images/instagram/vitamin-c.jpg',
    caption: 'Morning glow with our Vitamin C serum! ✨ #kbeauty #skincareroutine',
    likes: 248,
    url: 'https://instagram.com/p/example1'
  },
  {
    id: 2,
    image: '/images/instagram/sheet-mask.jpg',
    caption: 'Sheet mask Sunday is our favorite day of the week 💆‍♀️ #selfcaresunday',
    likes: 312,
    url: 'https://instagram.com/p/example2'
  },
  {
    id: 3,
    image: '/images/instagram/hydration.jpg',
    caption: 'The perfect layering technique for maximum hydration 💧 #kbeautytips',
    likes: 186,
    url: 'https://instagram.com/p/example3'
  },
  {
    id: 4,
    image: '/images/instagram/products.jpg',
    caption: 'Our new arrivals from COSRX just landed! 🛍️ #newarrivals #cosrx',
    likes: 421,
    url: 'https://instagram.com/p/example4'
  },
  {
    id: 5,
    image: '/images/instagram/behindthescenes.jpg',
    caption: 'Behind the scenes at our product photoshoot today 📸 #behindthescenes',
    likes: 275,
    url: 'https://instagram.com/p/example5'
  },
  {
    id: 6,
    image: '/images/instagram/behindthescenes.jpg',
    caption: 'Customer results using our Snail Mucin essence for 4 weeks 🥰 #beforeandafter',
    likes: 529,
    url: 'https://instagram.com/p/example6'
  },
  {
    id: 7,
    image: '/images/instagram/before-after.jpg',
    caption: 'Quick tutorial: How to layer your serums correctly 👩‍🏫 #skincarebasics',
    likes: 193,
    url: 'https://instagram.com/p/example7'
  },
  {
    id: 8,
    image: '/images/instagram/founder.jpg',
    caption: 'Our founder\'s current evening skincare routine 🌙 #nighttimeritual',
    likes: 307,
    url: 'https://instagram.com/p/example8'
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4">Follow Us On Instagram</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Join our beauty community for skincare tips, tutorials, and inspiration.
          </p>
          <a 
            href="https://instagram.com/impressionkbeauty" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center mt-3 sm:mt-4 text-black hover:underline"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">@impressionkbeauty</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 h-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-1 sm:mt-2">
                <p className="text-xs sm:text-sm text-black line-clamp-1">{post.caption}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="https://instagram.com/impressionkbeauty"
            className="border border-black text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-md hover:bg-black hover:text-white transition-colors inline-block text-xs sm:text-sm"
          >
            See More Posts
          </Link>
        </div>
      </div>
    </section>
  );
}