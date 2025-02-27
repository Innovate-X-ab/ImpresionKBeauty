//lib/email/templates/orderConfirmation.ts

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
  }
  
  interface OrderConfirmationData {
    orderNumber: string;
    customerName: string;
    items: OrderItem[];
    total: number;
    shippingAddress: {
      street: string;
      city: string;
      postcode: string;
      country: string;
    };
    estimatedDelivery: string;
  }
  
  export const orderConfirmationTemplate = (data: OrderConfirmationData): string => `
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
      .logo {
        text-align: center;
        margin-bottom: 30px;
      }
      .header {
        text-align: center;
        padding: 30px 0;
        background-color: #f8f8f8;
        margin-bottom: 30px;
      }
      .order-details {
        margin-bottom: 30px;
      }
      .items-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
      }
      .items-table th,
      .items-table td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      .total {
        text-align: right;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 30px;
      }
      .shipping-info {
        background-color: #f8f8f8;
        padding: 20px;
        margin-bottom: 30px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #666;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <h1>IMPRESSION K BEAUTY</h1>
      </div>
  
      <div class="header">
        <h2>Order Confirmation</h2>
        <p>Thank you for your order, ${data.customerName}!</p>
        <p>Order #${data.orderNumber}</p>
      </div>
  
      <div class="order-details">
        <table class="items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>£${item.price.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
  
        <div class="total">
          Total: £${data.total.toFixed(2)}
        </div>
      </div>
  
      <div class="shipping-info">
        <h3>Shipping Address</h3>
        <p>
          ${data.shippingAddress.street}<br>
          ${data.shippingAddress.city}<br>
          ${data.shippingAddress.postcode}<br>
          ${data.shippingAddress.country}
        </p>
        <p>Estimated Delivery: ${data.estimatedDelivery}</p>
      </div>
  
      <div style="text-align: center;">
        <a href="https://yourwebsite.com/account/orders/${data.orderNumber}" class="button">
          View Order Details
        </a>
      </div>
  
      <div style="margin-top: 30px; text-align: center;">
        <h3>What's Next?</h3>
        <p>1. We'll process your order within 24 hours</p>
        <p>2. You'll receive a shipping confirmation email with tracking details</p>
        <p>3. Your order will be delivered in 2-4 business days</p>
      </div>
  
      <div class="footer">
        <p>Need help? Contact our support team at support@impressionkbeauty.com</p>
        <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;