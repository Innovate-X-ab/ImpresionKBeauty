//src/components/sections/KBeautyRitualGuide.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// K-Beauty Ritual steps data
const ritualSteps = [
  {
    id: 1,
    name: 'Oil Cleansing',
    description: 'The first step in the double cleansing method removes oil-based impurities like makeup, sunscreen, and excess sebum.',
    tip: 'Massage gently in circular motions for 1-2 minutes to dissolve makeup and sunscreen.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Beauty of Joseon Ginseng Cleansing Oil',
      price: 24.99,
      link: '/products/beauty-of-joseon-cleansing-oil'
    }
  },
  {
    id: 2,
    name: 'Water-Based Cleansing',
    description: 'The second cleansing step removes any remaining water-based impurities like sweat and dirt.',
    tip: 'Use lukewarm water and rinse thoroughly to prevent cleanser residue.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'COSRX Low pH Good Morning Gel Cleanser',
      price: 14.99,
      link: '/products/cosrx-low-ph-cleanser'
    }
  },
  {
    id: 3,
    name: 'Exfoliation',
    description: 'Removes dead skin cells to improve texture and allow better absorption of subsequent products.',
    tip: 'Exfoliate 1-3 times per week depending on your skin type, not daily.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Some By Mi AHA-BHA-PHA 30 Days Miracle Toner',
      price: 19.99,
      link: '/products/some-by-mi-aha-bha-pha-toner'
    }
  },
  {
    id: 4,
    name: 'Toner',
    description: 'Balances skin\'s pH, removes any residual impurities, and prepares skin for better absorption of following products.',
    tip: 'Pat gently with hands instead of using cotton pads to minimize waste and irritation.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Klairs Supple Preparation Facial Toner',
      price: 22.99,
      link: '/products/klairs-supple-preparation-toner'
    }
  },
  {
    id: 5,
    name: 'Essence',
    description: 'A lightweight, hydrating layer that enhances skin renewal and boosts hydration.',
    tip: 'Press and pat gently to aid absorption rather than rubbing.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'COSRX Advanced Snail 96 Mucin Power Essence',
      price: 21.99,
      link: '/products/cosrx-snail-mucin'
    }
  },
  {
    id: 6,
    name: 'Serum',
    description: 'Concentrated treatment that targets specific skin concerns like brightening, anti-aging, or acne.',
    tip: 'Apply from thinnest to thickest consistency, allowing each layer to absorb.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Beauty of Joseon Glow Serum',
      price: 19.99,
      link: '/products/beauty-of-joseon-glow-serum'
    }
  },
  {
    id: 7,
    name: 'Sheet Mask',
    description: 'Infuses skin with hydration and beneficial ingredients while creating a barrier to enhance absorption.',
    tip: 'Use 1-3 times per week, leaving on for no longer than 20 minutes to prevent reverse osmosis.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Abib Gummy Sheet Mask Heartleaf Sticker',
      price: 6.99,
      link: '/products/abib-gummy-sheet-mask'
    }
  },
  {
    id: 8,
    name: 'Eye Cream',
    description: 'Targeted treatment for the delicate eye area to address fine lines, dark circles, and puffiness.',
    tip: 'Apply with your ring finger using a gentle patting motion to avoid pulling the skin.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Mixsoon Green Tea Eye Cream',
      price: 29.99,
      link: '/products/mixsoon-green-tea-eye-cream'
    }
  },
  {
    id: 9,
    name: 'Moisturizer',
    description: 'Locks in previous layers of hydration and adds additional moisture while strengthening the skin barrier.',
    tip: 'Adjust thickness based on your skin type - gel for oily skin, cream for dry skin.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Isntree Hyaluronic Acid Moist Cream',
      price: 24.99,
      link: '/products/isntree-hyaluronic-acid-cream'
    }
  },
  {
    id: 10,
    name: 'Sunscreen (AM)',
    description: 'Protects skin from UV damage, which contributes to premature aging and hyperpigmentation.',
    tip: 'Apply generously as the final step of your morning routine, even on cloudy days or indoors.',
    image: '/api/placeholder/400/400',
    productRecommendation: {
      name: 'Beauty of Joseon Relief Sun: Rice + Probiotics',
      price: 18.99,
      link: '/products/beauty-of-joseon-relief-sun'
    }
  }
];

export default function KBeautyRitualGuide() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-black font-light mb-4">The K-Beauty Ritual</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the famous 10-step Korean skincare routine that has revolutionized beauty worldwide.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step Navigator */}
          <div className="relative mb-12">
            <div className="hidden md:block absolute h-1 bg-gray-200 top-5 left-0 right-0"></div>
            <div className="flex overflow-x-auto md:overflow-visible py-4 md:justify-between">
              {ritualSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex-shrink-0 flex flex-col items-center mx-3 md:mx-0 relative focus:outline-none group`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium z-10 transition-all duration-300 ${
                    activeStep === step.id
                      ? 'bg-blue-500 text-white'
                      : step.id < activeStep
                      ? 'bg-blue-100 text-blue-500'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.id}
                  </div>
                  <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                    activeStep === step.id ? 'text-blue-500' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Step Image */}
              <div className="p-6 bg-blue-100">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image 
                    src={ritualSteps[activeStep - 1].image} 
                    alt={ritualSteps[activeStep - 1].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Step Info */}
              <div className="p-8">
                <h3 className="text-2xl text-black font-light mb-4">
                  Step {activeStep}: {ritualSteps[activeStep - 1].name}
                </h3>
                <p className="text-gray-700 mb-6">
                  {ritualSteps[activeStep - 1].description}
                </p>
                
                <div className="mb-8 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-black text-sm uppercase mb-2">Pro Tip</h4>
                  <p className="text-gray-700 text-sm">
                    {ritualSteps[activeStep - 1].tip}
                  </p>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-medium text-black text-sm uppercase mb-4">Recommended Product</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {ritualSteps[activeStep - 1].productRecommendation.name}
                      </p>
                      <p className="text-gray-500">
                        ${ritualSteps[activeStep - 1].productRecommendation.price}
                      </p>
                    </div>
                    <Link 
                      href={ritualSteps[activeStep - 1].productRecommendation.link}
                      className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
              disabled={activeStep === 1}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(prev + 1, ritualSteps.length))}
              disabled={activeStep === ritualSteps.length}
              className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Next Step
            </button>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/collections/skincare-sets"
              className="inline-block border border-black text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Explore All Skincare Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}