// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetails from '@/components/products/ProductDetails';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Fetch product data server-side
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      notFound();
    }

    // Serialize the product data to avoid issues with Decimal
    const serializedProduct = {
      ...product,
      price: parseFloat(product.price.toString()),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };

    // Pass serialized data to client component
    return <ProductDetails product={serializedProduct} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}