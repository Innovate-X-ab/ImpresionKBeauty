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
      // Convert relative image path to absolute URL
      let imageUrl = null;
      if (item.images) {
        // Remove any leading slashes and combine with base URL
        const imagePath = item.images.startsWith('/') ? item.images.slice(1) : item.images;
        imageUrl = `${baseUrl}/${imagePath}`;
      }

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            ...(imageUrl && { images: [imageUrl] })
          },
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
        items: JSON.stringify(items)
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