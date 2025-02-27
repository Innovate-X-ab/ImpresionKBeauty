// src/app/products/page.tsx
import { prisma } from '@/lib/prisma';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  const brands = Array.from(new Set(products.map(product => product.brand)));
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64">
            <ProductFilters 
              brands={brands}
              categories={categories}
            />
          </div>
          
          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}