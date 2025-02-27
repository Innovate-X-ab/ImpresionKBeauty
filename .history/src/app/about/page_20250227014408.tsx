//app/about/page.tsx
'use client';
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Image from 'next/image';
import { Heart, Shield, Truck, Medal } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-light text-black mb-6">About Impression K Beauty</h1>
            <p className="text-lg text-gray-600 mb-8">
              We believe in the transformative power of Korean beauty products and their 
              innovative approach to skincare. Our mission is to bring the best of K-beauty 
              to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Authentic Products",
                description: "We source directly from Korea to ensure 100% authentic products"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Quality Assured",
                description: "Every product is carefully vetted for quality and effectiveness"
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Fast Delivery",
                description: "Quick and reliable shipping to your doorstep"
              },
              {
                icon: <Medal className="w-8 h-8" />,
                title: "Expert Curation",
                description: "Products selected by skincare experts"
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-block p-3 bg-white rounded-full shadow-sm mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, Impression K Beauty was born from a passion for Korean 
                skincare and beauty products. We understand that everyone&apos;s skin is unique, 
                which is why we carefully curate our selection to cater to all skin types 
                and concerns.
              </p>
              <p className="text-gray-600">
                Our team of experts works directly with Korean manufacturers and brands 
                to bring you the latest innovations in K-beauty. We believe in transparent 
                pricing, authentic products, and exceptional customer service.
              </p>
            </div>
            <div className="relative h-96">
              <Image 
                src="/api/placeholder/600/800"
                alt="Our story"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Kim",
                role: "Founder & CEO",
                image: "/api/placeholder/400/400"
              },
              {
                name: "David Park",
                role: "Head of Product Curation",
                image: "/api/placeholder/400/400"
              },
              {
                name: "Emily Chen",
                role: "Beauty Expert",
                image: "/api/placeholder/400/400"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}