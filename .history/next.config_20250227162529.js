/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Add your Hostinger domain here for production
  },
  // Enable static file uploads
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      type: 'asset',
    });
    return config;
  },
  // Enable uploads in API routes
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    }
  }
};

module.exports = nextConfig;