//src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { items, email, shippingAddress }: CheckoutPayload = await req.json();

    if (!items?.length) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const lineItems = items.map((item: CartItem) => {
      let imageUrl;
      try {
        const images = JSON.parse(item.images);
        // Ensure image path starts with a slash and combine with base URL
        const imagePath = images[0].startsWith('/') ? images[0] : `/${images[0]}`;
        imageUrl = `${baseUrl}${imagePath}`;
      } catch (e) {
        console.error('Error parsing image URL:', e);
        imageUrl = null;
      }

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            ...(imageUrl && { images: [imageUrl] }),
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Format cart items for order creation
    const orderItems = items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      metadata: {
        userId: session.user.id,
        items: JSON.stringify(orderItems),
        shippingAddress: shippingAddress || '{}',
      },
    });

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}