// app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

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
    const { items, email, shippingAddress }: CheckoutPayload = await req.json();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Creating checkout session for user:', session.user.id);
    console.log('Items:', items);
    console.log('Shipping address:', shippingAddress);

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

    // Store both the user ID and the items data in the metadata
    // Also store the shipping address (ensure no undefined values in metadata)
    const metadata: Record<string, string> = {
      userId: session.user.id,
      items: JSON.stringify(items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      })))
    };
    
    // Only add shippingAddress if it's defined (to match Stripe's type requirements)
    if (shippingAddress) {
      metadata.shippingAddress = shippingAddress;
    }

    console.log('Metadata being sent to Stripe:', metadata);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      metadata: metadata
    });

    console.log('Created Stripe session:', stripeSession.id);

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}