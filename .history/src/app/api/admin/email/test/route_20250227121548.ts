// src/app/api/admin/email/test/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { emailService } from '@/lib/email/service';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { template, email } = await request.json();

    // Send test email based on template type
    switch(template) {
      case 'welcome':
        // Use queueEmail since there's no dedicated welcome email method
        await emailService.queueEmail(
          email, 
          'Welcome to Impression K Beauty', 
          `<p>Welcome to Impression K Beauty! Thank you for joining us.</p>`
        );
        break;
      
      case 'order-confirmation':
        await emailService.sendOrderConfirmation(
          email,
          {
            orderNumber: 'TEST-123',
            items: [
              { name: 'Test Product', quantity: 1, price: 29.99 }
            ],
            total: 29.99,
            shippingAddress: '123 Test St, Test City, TST 123'
          }
        );
        break;
      
      case 'shipping-confirmation':
        await emailService.sendOrderShipped(
          email,
          {
            orderNumber: 'TEST-123',
            trackingNumber: 'TRK123456789',
            trackingUrl: 'https://example.com/track'
          }
        );
        break;
      
      case 'delivery-confirmation':
        await emailService.sendOrderDelivered(
          email,
          {
            orderNumber: 'TEST-123'
          }
        );
        break;
      
      case 'password-reset':
        // Use queueEmail since there's no dedicated password reset method
        await emailService.queueEmail(
          email,
          'Password Reset',
          `<p>Click <a href="https://example.com/reset-password">here</a> to reset your password.</p>`
        );
        break;
      
      default:
        throw new Error(`Unknown template: ${template}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}