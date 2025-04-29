import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable TypeScript build errors to resolve the dynamic route parameter issue
  typescript: {
    // This allows production builds to complete even with type errors
   // ignoreBuildErrors: true,
  },
  
  // Your existing configuration
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

export default nextConfig;