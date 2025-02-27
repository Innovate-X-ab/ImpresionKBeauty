// src/lib/email.ts
import nodemailer from 'nodemailer';

// Create transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email templates
export const sendOrderConfirmation = async (
  to: string,
  orderDetails: {
    orderNumber: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  }
) => {
  const html = `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order!</p>
    <p>Order Number: ${orderDetails.orderNumber}</p>
    
    <h2>Order Details:</h2>
    <ul>
      ${orderDetails.items
        .map(
          (item) => `
        <li>
          ${item.name} x ${item.quantity} - £${item.price.toFixed(2)}
        </li>
      `
        )
        .join('')}
    </ul>
    
    <p><strong>Total: £${orderDetails.total.toFixed(2)}</strong></p>
    
    <p>We will process your order shortly.</p>
    
    <p>Best regards,<br>Impression K Beauty</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `Order Confirmation #${orderDetails.orderNumber}`,
    html,
  });
};

// Order status update email
export const sendOrderStatusUpdate = async (
  to: string,
  orderDetails: {
    orderNumber: string;
    status: string;
    trackingNumber?: string;
  }
) => {
  const html = `
    <h1>Order Status Update</h1>
    <p>Your order #${orderDetails.orderNumber} has been ${orderDetails.status.toLowerCase()}.</p>
    
    ${
      orderDetails.trackingNumber
        ? `<p>Tracking Number: ${orderDetails.trackingNumber}</p>`
        : ''
    }
    
    <p>Best regards,<br>Impression K Beauty</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `Order Status Update #${orderDetails.orderNumber}`,
    html,
  });
};