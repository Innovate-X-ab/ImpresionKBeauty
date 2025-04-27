//app/collections/[slug]/page.tsx
'use client';

import CollectionPageClient from './CollectionPageClient';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;
  return <CollectionPageClient slug={slug} />;
}