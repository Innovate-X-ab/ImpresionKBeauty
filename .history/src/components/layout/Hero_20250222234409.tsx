//src/components/layout/Hero.tsx

'use client';

import { useState, useEffect, useCallback  } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/hero-1.jpg',
    title: 'Discover Your Glow',
    subtitle: 'Korean Beauty Essentials',
    description: 'Experience the magic of K-Beauty with our curated collection of premium skincare products.',
    cta: 'Shop Skincare',
    link: '/collections/skincare',
    align: 'right' // Image on right, text on left
  },
  {
    id: 2,
    image: '/images/hero-2.jpg',
    title: 'Spring Collection',
    subtitle: 'New Arrivals',
    description: 'Refresh your beauty routine with our latest spring arrivals. Clean, gentle, and effective formulations.',
    cta: 'View New Arrivals',
    link: '/collections/new',
    align: 'left' // Image on left, text on right
  },
  {
    id: 3,
    image: '/images/hero-3.jpg',
    title: 'Beauty Sets',
    subtitle: 'Perfect Combinations',
    description: 'Curated sets for every skin type. Save more when you buy together.',
    cta: 'Shop Sets',
    link: '/collections/sets',
    align: 'right'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gray-100" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Slide Content */}
      <div className="relative h-full">
        <div className={`flex h-full transition-transform duration-500 ease-in-out ${isAnimating ? 'blur-sm' : ''}`}>
          {/* Image Section */}
          <div className={`w-1/2 relative ${slide.align === 'left' ? 'order-1' : 'order-2'}`}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Text Section */}
          <div className={`w-1/2 flex items-center ${slide.align === 'left' ? 'order-2' : 'order-1'}`}>
            <div className="max-w-xl mx-auto px-8">
              <span className="block text-sm font-medium tracking-[0.2em] text-gray-500 mb-4 uppercase">
                {slide.subtitle}
              </span>
              <h1 className="text-5xl font-light text-black mb-6 tracking-wide">
                {slide.title}
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {slide.description}
              </p>
              <Link
                href={slide.link}
                className="inline-block bg-black text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-black w-8' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}