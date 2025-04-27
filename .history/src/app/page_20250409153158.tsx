// src/app/page.tsx

'use client';
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import FeaturedProducts from "@/components/layout/FeaturedProducts";
import Link from "next/link";
import IngredientsSpotlight from "@/components/sections/IngredientsSpotlight";
import InstagramFeed from "@/components/sections/InstagramFeed";
import KBeautyRitualGuide from "@/components/sections/KBeautyRitualGuide";
import Image from 'next/image';


const ShopByCategory = () => {
  const categories = [
    {
      name: 'Cleansers',
      image: '/images/products/cleansers.jpg',
      description: 'Start with a clean canvas',
      link: '/collections/cleansers'
    },
    {
      name: 'Toners',
      image: '/images/products/toners.jpg',
      description: 'Balance and prep your skin',
      link: '/collections/toners'
    },
    {
      name: 'Serums',
      image: '/images/products/serums.jpg',
      description: 'Target specific concerns',
      link: '/collections/serums'
    },
    {
      name: 'Moisturizers',
      image: '/images/products/moisturizer.jpg',
      description: 'Lock in hydration',
      link: '/collections/moisturizers'
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="relative flex flex-col items-center mb-10 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4">Browse</span>
          <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4 relative">
            Shop by Category
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-black"></span>
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((category, index) => (
            <Link 
              href={category.link} 
              key={index} 
              className="group block"
            >
            <div className="relative aspect-[3/4] overflow-hidden mb-3 sm:mb-4">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
            </div>
              <h3 className="text-base sm:text-xl font-light text-black mb-1 sm:mb-2">{category.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/collections/all" 
            className="inline-block border border-black text-black px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
      <IngredientsSpotlight />
      <ShopByCategory />
      <KBeautyRitualGuide />
      <InstagramFeed />
    </main>
  );
}