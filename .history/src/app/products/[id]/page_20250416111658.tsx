// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetails from '@/components/products/ProductDetails';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Define the type for a review
interface Review {
  id: string;
  rating: number;
  comment: string | null;
  user: {
    id: string;
    name: string | null;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Await the params object before accessing id
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
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

    // Properly serialize the reviews array to match the expected types
    const serializedReviews = product.reviews.map((review: Review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment || "", // Convert null to empty string
      user: {
        id: review.user.id,
        name: review.user.name || "" // Convert null to empty string
      }
    }));

    // Serialize the product data to avoid issues with Decimal
    const serializedProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: parseFloat(product.price.toString()),
      category: product.category,
      images: product.images,
      isVegan: product.isVegan,
      isCrueltyFree: product.isCrueltyFree,
      stock: product.stock,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      reviews: serializedReviews
    };

    // Pass serialized data to client component
    return <ProductDetails product={serializedProduct} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}