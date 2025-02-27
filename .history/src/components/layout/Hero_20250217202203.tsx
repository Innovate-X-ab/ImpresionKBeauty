// src/components/layout/Hero.tsx
export default function Hero() {
    return (
      <section className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Discover Korean Beauty
              </h1>
              <p className="text-lg text-gray-600">
                Vegan and cruelty-free skincare products for your beauty routine
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="/api/placeholder/600/400" 
                alt="Korean Beauty Products" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }