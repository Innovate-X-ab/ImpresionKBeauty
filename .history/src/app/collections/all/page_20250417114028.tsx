import { use } from 'react';
import CollectionPageClient from '../[slug]/CollectionPageClient';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default function AllProductsPage() {
  return <CollectionPageClient slug="all" />;
}