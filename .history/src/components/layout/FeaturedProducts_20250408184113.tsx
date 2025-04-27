//src/components/layout/FeaturedProducts.tsx

'use client';

import Link from "next/link";
import Image from 'next/image';

// export default function FeaturedProducts() {
//   return (
//     <>
//       {/* Featured Collections */}
//       <section className="py-12 sm:py-20 bg-white">
//         <div className="container mx-auto px-4 bg-white">
//           {/* Decorative heading */}
//           <div className="relative flex flex-col items-center mb-10 sm:mb-16">
//             <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4">Discover</span>
//             <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4 relative">
//               Featured Collections
//               <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-black"></span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
//             {[
//               { title: 'Skincare', image: '/images/placeholder-600x800.jpg', description: 'Discover radiant skin' },
//               { title: 'Makeup', image: '/images/placeholder-400x400.jpg', description: 'Enhance your beauty' },
//               { title: 'New Arrivals', image: '/images/placeholder-300x300.jpg', description: 'Latest innovations' }
//             ].map((collection, index) => (
//               <Link href={`/collections/${collection.title.toLowerCase()}`} key={index} className="group">
//               <div className="relative aspect-[3/4] overflow-hidden">
//                 <Image 
//                   src={collection.image} 
//                   alt={collection.title}
//                   fill
//                   sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-8">
//                     <h3 className="text-xl sm:text-2xl text-white font-light tracking-wider mb-1 sm:mb-2">{collection.title}</h3>
//                     <p className="text-white/80 text-xs sm:text-sm tracking-wider transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//                       {collection.description}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

      {/* Bestsellers Section */}
      <section className="py-12 sm:py-20 bg-blue-100">
        <div className="container mx-auto px-4">
          {/* Decorative heading */}
          <div className="relative flex flex-col items-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4">Shop Now</span>
            <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4 relative">
              Bestsellers
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-black"></span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                name: 'Advanced Snail Mucin',
                price: 29.99,
                image: '/images/products/snail-mucin.jpg',
                brand: 'COSRX',
                rating: 4.8
              },
              {
                name: 'Hydrating Toner',
                price: 24.99,
                image: '/images/products/toner.jpg',
                brand: 'Klairs',
                rating: 4.7
              },
              {
                name: 'Vitamin C Serum',
                price: 34.99,
                image: '/images/products/vitamin-c.jpg',
                brand: 'Some By Mi',
                rating: 4.9
              },
              {
                name: 'Clay Mask',
                price: 19.99,
                image: '/images/products/clay-mask.jpg',
                brand: 'Innisfree',
                rating: 4.6
              }
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden mb-3 sm:mb-4 bg-white">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Quick view button */}
                  <button className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Quick View
                  </button>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</span>
                <h4 className="text-xs sm:text-sm font-medium mb-1 transition-colors duration-300 group-hover:text-gray-700">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-gray-900">${product.price}</p>
                  <span className="text-xs text-gray-500">★ {product.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}