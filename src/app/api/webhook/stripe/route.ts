// src/app/api/webhook/stripe/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { emailService } from '@/lib/email/service';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const userId = paymentIntent.metadata.userId;

                // Get user details
                const user = await prisma.user.findUnique({
                    where: { id: userId }
                  });
          
                  if (!user) {
                    throw new Error('User not found');
                  }

        // Create order in database
        const order = await prisma.order.create({
          data: {
            userId,
            totalAmount: paymentIntent.amount / 100, // Convert from cents
            status: 'PROCESSING',
            shippingAddress: paymentIntent.shipping?.address?.line1 || '',
            paymentId: paymentIntent.id,
          },include: {
            orderItems: {
              include: {
                product: true
              }
            }
          }
        });

        // Send confirmation email
        await emailService.sendOrderConfirmation(user.email, {
            orderNumber: order.id,
            items: order.orderItems.map(item => ({
              name: item.product.name,
              quantity: item.quantity,
              price: Number(item.price)
            })),
            total: Number(order.totalAmount),
            shippingAddress: order.shippingAddress
          });
  
            break;
        
        case 'charge.refunded': {
            // Handle refund notification
            // You could add refund email notification here
            console.log('Refund processed:', event.data.object.id);
            break;
        }
    
        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object;
          // Handle failed payment
          // You could add payment failure notification here
          console.log('Payment failed:', paymentIntent.id);
          break;
        }
      }
  
      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Webhook handler failed:', error);
          return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
          );
        }
    }