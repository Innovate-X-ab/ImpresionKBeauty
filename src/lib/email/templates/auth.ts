// src/lib/email/templates/auth.ts
export const welcomeTemplate = (data: { name: string }) => `
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
      <h1>Welcome to Impression K Beauty!</h1>
    </div>

    <div class="content">
      <p>Hello ${data.name},</p>
      <p>Thank you for creating an account with us. We're excited to have you join our community!</p>
      <p>At Impression K Beauty, you'll find:</p>
      <ul>
        <li>Premium Korean beauty products</li>
        <li>Vegan and cruelty-free options</li>
        <li>Expert skincare advice</li>
        <li>Exclusive offers and updates</li>
      </ul>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Impression K Beauty. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const passwordResetTemplate = (data: { resetLink: string }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .button { 
      display: inline-block; 
      padding: 10px 20px; 
      background-color: #000; 
      color: #fff; 
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>

    <div class="content">
      <p>You've requested to reset your password. Click the button below to set a new password:</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${data.resetLink}" class="button">Reset Password</a>
      </p>
      <p>If you didn't request this, please ignore this email or contact support if you have concerns.</p>
      <p>This link will expire in 1 hour.</p>
    </div>
  </div>
</body>
</html>
`;