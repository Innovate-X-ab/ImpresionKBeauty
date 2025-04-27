//app/collections/[slug]/page.tsx
'use client';

import { use } from 'react';
import CollectionPageClient from './CollectionPageClient';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = use(params);
  return <CollectionPageClient slug={slug} />;
}