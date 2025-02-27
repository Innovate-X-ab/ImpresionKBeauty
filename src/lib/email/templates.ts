// src/lib/email/templates.ts
export const orderConfirmationTemplate = (data: {
    orderNumber: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    shippingAddress: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; padding: 20px 0; }
      .order-details { margin: 20px 0; }
      .item { padding: 10px 0; border-bottom: 1px solid #eee; }
      .total { font-weight: bold; padding: 15px 0; }
      .footer { text-align: center; padding: 20px 0; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Order Confirmation</h1>
        <p>Thank you for shopping with Impression K Beauty!</p>
      </div>
  
      <div class="order-details">
        <h2>Order #${data.orderNumber}</h2>
        
        <h3>Items Ordered:</h3>
        ${data.items.map(item => `
          <div class="item">
            <p>${item.name}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: £${item.price.toFixed(2)}</p>
          </div>
        `).join('')}
  
        <div class="total">
          <p>Total: £${data.total.toFixed(2)}</p>
        </div>
  
        <h3>Shipping Address:</h3>
        <p>${data.shippingAddress}</p>
      </div>
  
      <div class="footer">
        <p>If you have any questions, please contact our customer service.</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  export const orderShippedTemplate = (data: {
    orderNumber: string;
    trackingNumber: string;
    trackingUrl?: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; padding: 20px 0; }
      .tracking-info { margin: 20px 0; padding: 20px; background: #f9f9f9; }
      .footer { text-align: center; padding: 20px 0; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Shipped!</h1>
      </div>
  
      <div class="tracking-info">
        <h2>Order #${data.orderNumber}</h2>
        <p>Your order has been shipped and is on its way to you!</p>
        <p>Tracking Number: ${data.trackingNumber}</p>
        ${data.trackingUrl ? `<p><a href="${data.trackingUrl}">Track Your Package</a></p>` : ''}
      </div>
  
      <div class="footer">
        <p>If you have any questions, please contact our customer service.</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  export const orderDeliveredTemplate = (data: {
    orderNumber: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; padding: 20px 0; }
      .content { margin: 20px 0; }
      .footer { text-align: center; padding: 20px 0; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Order Has Been Delivered!</h1>
      </div>
  
      <div class="content">
        <h2>Order #${data.orderNumber}</h2>
        <p>Your order has been delivered! We hope you enjoy your products.</p>
        <p>Please let us know if you have any questions or concerns.</p>
      </div>
  
      <div class="footer">
        <p>Thank you for choosing Impression K Beauty!</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;