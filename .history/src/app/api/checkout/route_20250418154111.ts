//src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

interface CartItem {
  productId: string;
  name: string;
  images: string;
  price: number;
  quantity: number;
}

interface CheckoutPayload {
  items: CartItem[];
  email: string;
  shippingAddress?: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { items, email }: CheckoutPayload = await req.json();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const lineItems = items.map((item) => {
      let imageUrl = null;
      
      // Handle image URL
      if (item.images) {
        try {
          // Try parsing as JSON in case it's a stringified array
          const images = JSON.parse(item.images);
          const firstImage = Array.isArray(images) ? images[0] : images;
          
          // Ensure the image path is properly formatted
          if (firstImage) {
            const cleanPath = firstImage.replace(/^\/+/, ''); // Remove leading slashes
            imageUrl = new URL(cleanPath, baseUrl).toString();
          }
        } catch {
          // If JSON parsing fails, treat as a single image path
          const cleanPath = item.images.replace(/^\/+/, '');
          imageUrl = new URL(cleanPath, baseUrl).toString();
        }
      }

      // Only include images if we have a valid URL
      const productData = {
        name: item.name,
        ...(imageUrl && { images: [imageUrl] })
      };

      return {
        price_data: {
          currency: 'gbp',
          product_data: productData,
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      metadata: {
        userId: session.user.id,
        items: JSON.stringify(items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })))
      }
    });

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}