//src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

interface CartItem {
  name: string;
  images: string;
  price: number;
  quantity: number;
}

interface CheckoutPayload {
  items: CartItem[];
  email: string;
}

export async function POST(req: Request) {
  try {
    const { items, email }: CheckoutPayload = await req.json();

    if (!items?.length) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    const lineItems = items.map((item: CartItem) => {
      // Parse images and ensure we have full URLs
      let imageUrl;
      try {
        const images = JSON.parse(item.images);
        // Convert relative URL to absolute URL
        imageUrl = new URL(images[0], process.env.NEXT_PUBLIC_URL).toString();
      } catch (e) {
        // Fallback to a default image or null if parsing fails
        console.error('Error parsing image URL:', e);
        imageUrl = null;
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            // Only include images if we have a valid URL
            ...(imageUrl && { images: [imageUrl] }),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      customer_email: email,
      metadata: {
        orderId: `ORDER_${Date.now()}`,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}