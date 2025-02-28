//src/components/sections/IngredientsSpotlight.tsx


'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Featured ingredient data - replace with your real content
const ingredients = [
  {
    id: 1,
    name: 'Snail Mucin',
    description: 'A powerhouse for hydration and skin repair, snail mucin helps with acne scars, dryness, and dullness while supporting collagen production.',
    benefits: ['Intense hydration', 'Repairs damaged skin', 'Improves elasticity', 'Soothes irritation'],
    image: '/images/snail-mucin.jpg',
    color: 'bg-green-50',
    textColor: 'text-green-600',
    products: [
      { name: 'COSRX Advanced Snail 96 Mucin Power Essence', link: '/products/cosrx-snail-mucin' },
      { name: 'Some By Mi Snail Truecica Miracle Repair Cream', link: '/products/some-by-mi-snail-cream' }
    ]
  },
  {
    id: 2,
    name: 'Centella Asiatica',
    description: 'Also known as Cica, this herb is packed with amino acids and has powerful anti-inflammatory and antioxidant properties.',
    benefits: ['Calms inflammation', 'Strengthens skin barrier', 'Stimulates collagen', 'Antimicrobial'],
    image: '/images/centella-asiatica.jpg',
    color: 'bg-blue-50',
    textColor: 'text-blue-600',
    products: [
      { name: 'Purito Centella Green Level Unscented Serum', link: '/products/purito-centella-serum' },
      { name: 'COSRX Pure Fit Cica Serum', link: '/products/cosrx-cica-serum' }
    ]
  },
  {
    id: 3,
    name: 'Rice Extract',
    description: 'A traditional Korean beauty ingredient that brightens and evens skin tone while providing gentle exfoliation and rich antioxidants.',
    benefits: ['Brightens complexion', 'Reduces dark spots', 'Anti-aging', 'Softens skin texture'],
    image: '/images/rice-extract.jpg',
    color: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    products: [
      { name: 'Beauty of Joseon Rice + Probiotics Cleansing Balm', link: '/products/beauty-of-joseon-rice-balm' },
      { name: 'I\'m From Rice Toner', link: '/products/im-from-rice-toner' }
    ]
  },
  {
    id: 4,
    name: 'Hyaluronic Acid',
    description: 'A moisture-binding ingredient that can hold up to 1,000 times its weight in water, providing deep hydration to all skin layers.',
    benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines', 'Non-irritating'],
    image: '/images/hyaluronic-acid.jpg',
    color: 'bg-purple-50',
    textColor: 'text-purple-600',
    products: [
      { name: 'Isntree Hyaluronic Acid Water Essence', link: '/products/isntree-hyaluronic-essence' },
      { name: 'TIRTIR Hyaluronic Acid Ampoule', link: '/products/tirtir-hyaluronic-ampoule' }
    ]
  }
];

export default function IngredientsSpotlight() {
  const [activeIngredient, setActiveIngredient] = useState(ingredients[0]);

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
      <div className="text-center mb-10 sm:mb-16">
      <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4 block">The Science Behind</span>
      <h2 className="text-2xl sm:text-3xl text-black font-light mb-4 relative inline-block">
        Key Ingredients
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-black"></span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-6">
        Discover the powerful natural ingredients featured in Korean skincare that deliver exceptional results.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-6 sm:mb-8">
          {ingredients.map((ingredient) => (
            <button
              key={ingredient.id}
              onClick={() => setActiveIngredient(ingredient)}
              className={`py-1.5 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm rounded-full m-1 sm:m-2 transition-all ${
                activeIngredient.id === ingredient.id
                  ? `${ingredient.color} ${ingredient.textColor} font-medium`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ingredient.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        <div className={`rounded-lg overflow-hidden p-4 sm:p-8 lg:p-10 ${activeIngredient.color} transition-colors duration-300`}>
        <div className="aspect-square relative">
              <Image
                src={activeIngredient.image}
                alt={activeIngredient.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
          <h3 className={`text-xl sm:text-2xl font-light ${activeIngredient.textColor}`}>{activeIngredient.name}</h3>
          <p className="text-sm sm:text-base text-gray-700">{activeIngredient.description}</p>
            
            <div>
            <h4 className="text-xs sm:text-sm font-medium text-black uppercase tracking-wider mb-2 sm:mb-3">Benefits</h4>
            <ul className="grid text-black grid-cols-1 sm:grid-cols-2 gap-2">
            {activeIngredient.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className={`w-2 h-2 rounded-full ${activeIngredient.color} mr-2`}></span>
                    <span className="text-xs sm:text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
            <h4 className="text-xs sm:text-sm font-medium text-black uppercase tracking-wider mb-2 sm:mb-3">Featured In</h4>
            <ul className="space-y-1 sm:space-y-2">
            {activeIngredient.products.map((product, index) => (
                  <li key={index}>
                    <Link href={product.link} className="text-xs sm:text-sm text-gray-700 hover:text-black">
                    {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link 
              href={`/collections/ingredients/${activeIngredient.name.toLowerCase().replace(' ', '-')}`}
              className={`inline-block mt-2 sm:mt-4 border px-4 sm:px-6 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${activeIngredient.textColor} border-current hover:bg-gray-50`}
            >
              Explore All {activeIngredient.name} Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}