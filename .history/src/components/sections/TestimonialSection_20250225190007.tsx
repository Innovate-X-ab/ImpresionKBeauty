//src/components/sections/TestimonialSection.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial data - replace with your real testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah K.',
    age: 28,
    concern: 'Acne & Hyperpigmentation',
    quote: "After 3 months of using the COSRX Snail Mucin and Beauty of Joseon Serum, my skin has completely transformed. I've never felt so confident without makeup!",
    beforeImage: '/api/placeholder/300/300',
    afterImage: '/api/placeholder/300/300',
    products: ['COSRX Advanced Snail Mucin Power Essence', 'Beauty of Joseon Glow Serum']
  },
  {
    id: 2,
    name: 'Mia T.',
    age: 35,
    concern: 'Fine Lines & Dryness',
    quote: "The difference in my skin's texture and hydration is incredible. These products have helped reduce my fine lines and my skin feels plump and moisturized all day.",
    beforeImage: '/api/placeholder/300/300',
    afterImage: '/api/placeholder/300/300',
    products: ['Some By Mi AHA-BHA-PHA Toner', 'Medicube Deep Vita C Serum']
  },
  {
    id: 3,
    name: 'Daniel L.',
    age: 31,
    concern: 'Oily & Sensitive Skin',
    quote: "I was skeptical about K-beauty at first, but these products have balanced my oily skin without causing irritation. My redness is gone and I'm breaking out much less!",
    beforeImage: '/api/placeholder/300/300',
    afterImage: '/api/placeholder/300/300',
    products: ['TIRTIR Rosemary Relief Cream', 'Abib Heartleaf Calming Essence']
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-black font-light mb-4">Real Results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See the transformations our customers have experienced with our K-beauty products.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Before & After Images */}
              <div className="p-8 bg-gray-100">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Before</p>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src={currentTestimonial.beforeImage} 
                        alt={`${currentTestimonial.name} before`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">After</p>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src={currentTestimonial.afterImage} 
                        alt={`${currentTestimonial.name} after`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <Quote className="w-12 h-12 text-blue-200 mb-4" />
                  <p className="text-lg italic mb-6">{currentTestimonial.quote}</p>
                  <div className="mb-8">
                    <p className="font-medium">{currentTestimonial.name}, {currentTestimonial.age}</p>
                    <p className="text-sm text-gray-500">Concern: {currentTestimonial.concern}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Products Used:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {currentTestimonial.products.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${
                          index === currentIndex ? 'bg-black' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full hover:bg-gray-100"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full hover:bg-gray-100"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}