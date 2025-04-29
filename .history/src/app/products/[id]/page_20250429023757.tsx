// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetails from '@/components/products/ProductDetails';

// Update the params type to match Next.js 15.3.1 expectations
interface ProductPageProps {
  params: { id: string };
}

// Define the review from database with createdAt field
interface DbReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Direct access to id - no Promise to await anymore
    const { id } = params;

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

    // Properly serialize the reviews array with the createdAt field
    const serializedReviews = product.reviews.map((review: DbReview) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment || "", // Convert null to empty string
      createdAt: review.createdAt.toISOString(), // Add the createdAt field
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
      type: product.type, // Add the type field from your schema
      images: product.images,
      isVegan: product.isVegan,
      isCrueltyFree: product.isCrueltyFree,
      stock: product.stock,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      reviews: serializedReviews
    };

    // Use a more specific type assertion
    return <ProductDetails product={serializedProduct} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}