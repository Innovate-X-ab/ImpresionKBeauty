//components/ui/Breadcrumb.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // If no items provided, generate from pathname
  const breadcrumbItems = items || generateBreadcrumbItems(pathname);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
          >
            Home
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link 
                href={item.href}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 text-sm font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  // Remove leading slash and split into segments
  const segments = pathname.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    // Create the href for this segment
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    
    // Format the label (capitalize and replace hyphens with spaces)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      label,
      href
    };
  });
}