// components/admin/AdminProductControls.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import AddProductButton from '@/components/admin/AddProductButton';

interface AdminProductControlsProps {
  title?: string;
  className?: string;
}

/**
 * A component that renders admin product controls (Add Product button)
 * Can be included in any collection or product page
 */
export default function AdminProductControls({ title, className = '' }: AdminProductControlsProps) {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  if (title) {
    return (
      <div className={`flex justify-between items-center mb-8 ${className}`}>
        <h1 className="text-3xl font-light text-black">{title}</h1>
        <AddProductButton showOnList={true} />
      </div>
    );
  }

  return (
    <>
      <div className={`mb-8 flex justify-end ${className}`}>
        <AddProductButton showOnList={true} />
      </div>
      <AddProductButton />
    </>
  );
}