//src/components/sections/LimitedTimeOffers.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

// Sample offers data - replace with your real offers
const offers = [
  {
    id: 1,
    title: 'Spring Essentials Bundle',
    description: 'Perfect for refreshing your routine for the new season with brightening and hydrating favorites.',
    discount: '25% OFF',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    image: '/api/placeholder/600/500',
    link: '/collections/spring-bundle',
    regularPrice: 120.00,
    salePrice: 90.00,
    backgroundColor: 'bg-rose-50'
  },
  {
    id: 2,
    title: 'Snail Mucin Set',
    description: 'Our bestselling snail mucin products for intense hydration and skin barrier repair.',
    discount: '20% OFF',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    image: '/api/placeholder/600/500',
    link: '/collections/snail-mucin-set',
    regularPrice: 89.99,
    salePrice: 71.99,
    backgroundColor: 'bg-green-50'
  },
  {
    id: 3,
    title: 'New Arrival Special',
    description: 'Be the first to try our newest products at a special introductory price.',
    discount: '15% OFF',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    image: '/api/placeholder/600/500',
    link: '/collections/new-arrivals-special',
    regularPrice: 99.99,
    salePrice: 84.99,
    backgroundColor: 'bg-blue-50'
  }
];

export default function LimitedTimeOffers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<{days: number, hours: number, minutes: number, seconds: number}>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Function to update countdown
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endTime = offers[currentIndex].endDate;
      const difference = endTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Offer has expired
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);
  
  const nextOffer = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === offers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevOffer = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 block">Don&apos;t Miss Out</span>
          <h2 className="text-3xl text-black font-light mb-4 relative inline-block">
            Special Offers
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-black"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Take advantage of these limited-time deals before they&apos;re gone!
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Carousel Navigation */}
          <button
            onClick={prevOffer}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
            aria-label="Previous offer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextOffer}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
            aria-label="Next offer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Current Offer */}
          <div className={`rounded-xl overflow-hidden shadow-md ${offers[currentIndex].backgroundColor}`}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={offers[currentIndex].image}
                  alt={offers[currentIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full font-bold">
                  {offers[currentIndex].discount}
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl text-black font-light mb-3">{offers[currentIndex].title}</h3>
                  <p className="text-gray-600 mb-6">{offers[currentIndex].description}</p>
                  
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-2xl text-gray-500 font-medium">${offers[currentIndex].salePrice.toFixed(2)}</span>
                    <span className="text-gray-900 line-through">${offers[currentIndex].regularPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">Offer ends in:</span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="bg-white rounded-md p-2 w-16 text-center">
                        <span className="block text-xl font-bold">{timeRemaining.days}</span>
                        <span className="text-xs text-gray-500">Days</span>
                      </div>
                      <div className="bg-white rounded-md p-2 w-16 text-center">
                        <span className="block text-xl font-bold">{timeRemaining.hours}</span>
                        <span className="text-xs text-gray-500">Hours</span>
                      </div>
                      <div className="bg-white rounded-md p-2 w-16 text-center">
                        <span className="block text-xl font-bold">{timeRemaining.minutes}</span>
                        <span className="text-xs text-gray-500">Mins</span>
                      </div>
                      <div className="bg-white rounded-md p-2 w-16 text-center">
                        <span className="block text-xl font-bold">{timeRemaining.seconds}</span>
                        <span className="text-xs text-gray-500">Secs</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={offers[currentIndex].link}
                    className="block w-full bg-black text-white py-3 text-center rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-black w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}