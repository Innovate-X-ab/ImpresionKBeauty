//lib/email/templates/orderStatus.ts

interface OrderStatusData {
    orderNumber: string;
    customerName: string;
    trackingNumber?: string;
    trackingUrl?: string;
    estimatedDelivery?: string;
  }
  
  export const orderShippedTemplate = (data: OrderStatusData): string => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 30px 0;
        background-color: #f8f8f8;
        margin-bottom: 30px;
      }
      .tracking-info {
        background-color: #f8f8f8;
        padding: 20px;
        margin-bottom: 30px;
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Shipped!</h1>
        <p>Hello ${data.customerName},</p>
        <p>Great news! Your order #${data.orderNumber} is on its way.</p>
      </div>
  
      <div class="tracking-info">
        <h2>Tracking Information</h2>
        <p>Tracking Number: ${data.trackingNumber}</p>
        <p>Estimated Delivery: ${data.estimatedDelivery}</p>
        <p style="margin-top: 20px;">
          <a href="${data.trackingUrl}" class="button">Track Your Package</a>
        </p>
      </div>
  
      <div style="text-align: center;">
        <a href="https://yourwebsite.com/account/orders/${data.orderNumber}" class="button">
          View Order Details
        </a>
      </div>
  
      <div class="footer">
        <p>Need help? Contact our support team at support@impressionkbeauty.com</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  export const orderDeliveredTemplate = (data: OrderStatusData): string => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 30px 0;
        background-color: #f8f8f8;
        margin-bottom: 30px;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Delivered!</h1>
        <p>Hello ${data.customerName},</p>
        <p>Your order #${data.orderNumber} has been delivered.</p>
      </div>
  
      <div style="text-align: center; margin-bottom: 30px;">
        <p>We hope you love your new K-beauty products!</p>
        <p>If you have any issues with your order, please contact our support team.</p>
      </div>
  
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="https://localhost:3000/account/orders/${data.orderNumber}" class="button">
          View Order Details
        </a>
      </div>
  
      <div style="text-align: center; margin-bottom: 30px;">
        <h3>Leave a Review</h3>
        <p>Share your thoughts and help other customers make informed decisions.</p>
        <a href="https://yourwebsite.com/account/orders/${data.orderNumber}/review" class="button">
          Write a Review
        </a>
      </div>
  
      <div class="footer">
        <p>Need help? Contact our support team at support@impressionkbeauty.com</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;