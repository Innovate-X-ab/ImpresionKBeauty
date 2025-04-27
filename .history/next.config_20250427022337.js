/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing env configuration
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    // Add other env variables here if needed
  },

  // Add the images configuration here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '7koygs3zczdoaij0.public.blob.vercel-storage.com', // Your specific Vercel Blob hostname
        port: '',
        pathname: '/**', // Allow any path under this hostname
      },
      // Add any other hostnames you might need here (e.g., placeholders)
      {
        protocol: 'http', // Or https if your placeholder uses it
        hostname: 'localhost', // If you use local placeholders like /api/placeholder
        port: '3000', // Adjust port if needed
        pathname: '/api/placeholder/**',
      },
      // You might need to add hostnames for product images if they are external
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'images.example-cdn.com',
      //   port: '',
      //   pathname: '/products/**',
      // },
    ],
  },

  // ... any other future configurations ...
};

module.exports = nextConfig;