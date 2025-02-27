// src/lib/email/service.ts
import nodemailer from 'nodemailer';
import { 
  orderConfirmationTemplate, 
  orderShippedTemplate, 
  orderDeliveredTemplate 
} from './templates';
import { EmailQueue } from './queue';
import { EmailMonitoring } from './monitoring';

interface EmailConfig {
  maxRetries: number;
  retryDelay: number; // in milliseconds
}

interface EmailMetrics {
  totalSent: number;
  totalFailed: number;
  deliveryRate: number;
}

export class EmailProvider {
  private totalSent = 0;
  private totalFailed = 0;

  async send(to: string, subject: string, body: string): Promise<void> {
    try {
      // Basic email sending implementation using nodemailer
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: body,
      });
      this.totalSent++;
    } catch (error) {
      this.totalFailed++;
      throw error;
    }
  }

  getMetrics(): EmailMetrics {
    const total = this.totalSent + this.totalFailed;
    const deliveryRate = total === 0 ? 0 : (this.totalSent / total) * 100;

    return {
      totalSent: this.totalSent,
      totalFailed: this.totalFailed,
      deliveryRate
    };
  }
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;
  private queue: EmailQueue;
  private monitoring: EmailMonitoring;

  constructor(config: EmailConfig = { maxRetries: 3, retryDelay: 1000 }) {
    this.config = config;
    this.queue = new EmailQueue(this);
    this.monitoring = new EmailMonitoring();
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    setInterval(() => this.monitoring.logMetrics(), 3600000);
  }

  async queueEmail(to: string, subject: string, html: string) {
    return this.queue.addToQueue(to, subject, html);
  }

  private async retry<T>(
    fn: () => Promise<T>,
    retries: number = this.config.maxRetries
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        return this.retry(fn, retries - 1);
      }
      throw error;
    }
  }

  public async sendEmail(options: nodemailer.SendMailOptions) {
    return this.retry(async () => {
      try {
        const info = await this.transporter.sendMail(options);
        console.log('Email sent:', info.messageId);
        return info;
      } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
      }
    });
  }

  async sendOrderConfirmation(
    to: string,
    data: {
      orderNumber: string;
      items: Array<{
        name: string;
        quantity: number;
        price: number;
      }>;
      total: number;
      shippingAddress: string;
    }
  ) {
    const html = orderConfirmationTemplate(data);
    return this.sendEmail({
      from: process.env.SMTP_USER,
      to,
      subject: `Order Confirmation #${data.orderNumber}`,
      html,
    });
  }

  async sendOrderShipped(
    to: string,
    data: {
      orderNumber: string;
      trackingNumber: string;
      trackingUrl?: string;
    }
  ) {
    const html = orderShippedTemplate(data);
    return this.sendEmail({
      from: process.env.SMTP_USER,
      to,
      subject: `Your Order #${data.orderNumber} Has Been Shipped!`,
      html,
    });
  }

  async sendOrderDelivered(
    to: string,
    data: {
      orderNumber: string;
    }
  ) {
    const html = orderDeliveredTemplate(data);
    return this.sendEmail({
      from: process.env.SMTP_USER,
      to,
      subject: `Your Order #${data.orderNumber} Has Been Delivered!`,
      html,
    });
  }
}

// Export a singleton instance
export const emailService = new EmailService();

// Usage example:
/*
try {
  await emailService.sendOrderConfirmation(
    'customer@example.com',
    {
      orderNumber: '12345',
      items: [{
        name: 'Product 1',
        quantity: 2,
        price: 29.99
      }],
      total: 59.98,
      shippingAddress: '123 Main St, City, Country'
    }
  );
} catch (error) {
  console.error('Failed to send order confirmation:', error);
}
*/