// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetails from '@/components/products/ProductDetails';

// Type definition for product data
interface SerializedProduct {
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
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
    };
  }>;
}

// Define params prop type using Record utility type
type PageProps = {
  params: Record<string, string>;
};

// Explicitly type the props parameter
export default async function ProductPage({ params }: PageProps) {
  try {
    const id = params.id;

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

    // Serialize the product with all required fields
    const serializedProduct: SerializedProduct = {
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
      reviews: product.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment || "",
        createdAt: review.createdAt.toISOString(),
        user: {
          id: review.user.id,
          name: review.user.name || ""
        }
      }))
    };

    // Pass the serialized product to the component
    return <ProductDetails product={serializedProduct} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}