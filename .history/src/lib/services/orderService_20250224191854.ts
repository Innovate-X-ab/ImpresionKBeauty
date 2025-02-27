//lib/services/orderService.ts

import { prisma } from '@/lib/prisma';
import { emailService } from '@/lib/email/service';
import { 
  orderConfirmationTemplate,
  orderShippedTemplate,
  orderDeliveredTemplate 
} from '@/lib/email/templates/orderStatus';

export class OrderService {
  async updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
        include: {
          user: true,
          orderItems: {
            include: {
              product: true
            }
          }
        }
      });

      // Send appropriate email notification based on status
      await this.sendStatusNotification(order);

      return order;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  private async sendStatusNotification(order: any) {
    if (!order.user?.email) return;

    const baseData = {
      orderNumber: order.id,
      customerName: order.user.name || 'Valued Customer',
    };

    try {
      switch (order.status) {
        case 'PROCESSING':
          await emailService.sendEmail({
            to: order.user.email,
            subject: `Order #${order.id} is Being Processed`,
            html: orderConfirmationTemplate({
              ...baseData,
              items: order.orderItems.map((item: any) => ({
                name: item.product.name,
                quantity: item.quantity,
                price: Number(item.price)
              })),
              total: Number(order.totalAmount),
              shippingAddress: JSON.parse(order.shippingAddress),
              estimatedDelivery: this.getEstimatedDeliveryDate()
            })
          });
          break;

        case 'SHIPPED':
          // In a real application, you would get this from your shipping provider
          const trackingInfo = {
            trackingNumber: 'MOCK-TRACKING-123',
            trackingUrl: 'https://example.com/track',
            estimatedDelivery: this.getEstimatedDeliveryDate()
          };

          await emailService.sendEmail({
            to: order.user.email,
            subject: `Order #${order.id} Has Been Shipped`,
            html: orderShippedTemplate({
              ...baseData,
              ...trackingInfo
            })
          });
          break;

        case 'DELIVERED':
          await emailService.sendEmail({
            to: order.user.email,
            subject: `Order #${order.id} Has Been Delivered`,
            html: orderDeliveredTemplate(baseData)
          });
          break;
      }
    } catch (error) {
      console.error('Error sending order notification:', error);
      // Don't throw error here - we don't want to roll back the order status
      // if email sending fails
    }
  }

  private getEstimatedDeliveryDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Estimate 3 days for delivery
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  async getOrderDetails(orderId: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: {
              product: true
            }
          }
        }
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Add mock tracking info - in a real app, get this from shipping provider
      const trackingInfo = {
        trackingNumber: 'MOCK-TRACKING-123',
        carrier: 'Royal Mail',
        status: 'In Transit',
        estimatedDelivery: this.getEstimatedDeliveryDate(),
        events: [
          {
            date: new Date().toISOString(),
            location: 'Local Sorting Center',
            description: 'Package is in transit'
          }
        ]
      };

      return {
        ...order,
        tracking: trackingInfo
      };
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }
}