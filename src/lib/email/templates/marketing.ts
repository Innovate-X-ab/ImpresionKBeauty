// src/lib/email/templates/marketing.ts
export const specialOfferTemplate = (data: {
    name: string;
    offer: string;
    expiryDate: string;
    promoCode?: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .offer { 
        background-color: #f8f8f8; 
        padding: 20px; 
        margin: 20px 0; 
        border-radius: 5px;
      }
      .promo-code {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        padding: 10px;
        background-color: #000;
        color: #fff;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Special Offer Just for You!</h1>
      </div>
  
      <div class="content">
        <p>Hello ${data.name},</p>
        <div class="offer">
          <h2>${data.offer}</h2>
          ${data.promoCode ? `
            <div class="promo-code">
              ${data.promoCode}
            </div>
          ` : ''}
          <p>Offer expires: ${data.expiryDate}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;