// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetails from '@/components/products/ProductDetails';
import { ReactElement } from 'react';

// Define types without reference to Page Props
interface ProductReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
  };
}

interface SerializedReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

interface SerializedProductData {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  type: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  reviews: SerializedReview[];
}

// Without specific type annotation on the function parameters
export default function ProductPage(props: { params: { id: string } }): ReactElement {
  return ProductPageContent(props.params.id);
}

// Separate function to handle the async logic
async function ProductPageContent(id: string): Promise<ReactElement> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
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

    // Serialize reviews with createdAt field
    const serializedReviews: SerializedReview[] = product.reviews.map((review: ProductReview) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment || "",
      createdAt: review.createdAt.toISOString(),
      user: {
        id: review.user.id,
        name: review.user.name || ""
      }
    }));

    // Serialize product data
    const serializedProduct: SerializedProductData = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: parseFloat(product.price.toString()),
      category: product.category,
      type: product.type,
      images: product.images,
      isVegan: product.isVegan,
      isCrueltyFree: product.isCrueltyFree,
      stock: product.stock,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      reviews: serializedReviews
    };

    // Use type coercion without explicit 'any'
    return <ProductDetails product={serializedProduct} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}