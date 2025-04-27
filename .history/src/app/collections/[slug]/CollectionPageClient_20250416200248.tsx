'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { useAuth } from '@/contexts/AuthContext';
import AdminProductControls from '@/components/admin/AdminProductControls';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface CollectionPageClientProps {
  slug: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CollectionPageClient({ slug }: CollectionPageClientProps) {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Convert slug to display name without async
  const displayName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // ...rest of your existing code...
}