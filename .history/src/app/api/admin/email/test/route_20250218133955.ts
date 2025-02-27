// src/app/api/admin/email/test/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Transporter } from 'nodemailer';

interface TemplateData {
  welcome: { name: string };
  'order-confirmation': {
    orderNumber: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    shippingAddress: string;
  };
  'shipping-confirmation': {
    orderNumber: string;
    trackingNumber: string;
    trackingUrl: string;
  };
  'password-reset': {
    resetLink: string;
  };
}

export class EmailService {
  private transporter!: Transporter;
  
  constructor() {
    // existing constructor code
  }

  async sendTemplateEmail(email: string, template: keyof TemplateData, data: TemplateData[keyof TemplateData]) {
    // Add implementation based on your email sending logic
    return await this.transporter.sendMail({
      to: email,
      subject: template.charAt(0).toUpperCase() + template.slice(1).replace(/-/g, ' '),
      html: await this.renderTemplate(template, data)
    });
  }

  private async renderTemplate(template: keyof TemplateData, data: TemplateData[keyof TemplateData]): Promise<string> {
    // Basic template rendering implementation
    return `Template: ${template}, Data: ${JSON.stringify(data)}`;
  }
}

const emailService = new EmailService();

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

    // Sample data for different templates
    const templateData = {
      'welcome': {
        name: 'Test User',
      },
      'order-confirmation': {
        orderNumber: 'TEST-123',
        items: [
          { name: 'Test Product', quantity: 1, price: 29.99 }
        ],
        total: 29.99,
        shippingAddress: '123 Test St, Test City, TST 123',
      },
      'shipping-confirmation': {
        orderNumber: 'TEST-123',
        trackingNumber: 'TRK123456789',
        trackingUrl: 'https://example.com/track',
      },
      'password-reset': {
        resetLink: 'https://example.com/reset-password',
      },
    };

    // Send test email
    await emailService.sendTemplateEmail(
      email,
      template,
      templateData[template as keyof typeof templateData]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}

