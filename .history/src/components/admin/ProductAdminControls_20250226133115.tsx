// components/admin/ProductAdminControls.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

interface ProductAdminControlsProps {
  product: Product;
  position?: 'top-right' | 'bottom';
}

export default function ProductAdminControls({ product, position = 'top-right' }: ProductAdminControlsProps) {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAdmin) return null;

  const handleEdit = () => {
    router.push(`/admin/products/edit/${product.id}`);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Navigate back or refresh
      router.refresh();
      router.push('/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  const positionClasses = position === 'top-right' 
    ? 'absolute top-2 right-2 z-10' 
    : 'flex justify-end mt-4';

  return (
    <div className={`${positionClasses}`}>
      <div className="flex space-x-2 bg-white p-2 rounded-md shadow-md">
        <button
          onClick={handleEdit}
          className="p-1 text-blue-600 hover:text-blue-800"
          title="Edit product"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-red-600 hover:text-red-800"
          title="Delete product"
          disabled={isDeleting}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      {error && (
        <div className="mt-2 bg-red-100 text-red-600 p-2 rounded-md flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}