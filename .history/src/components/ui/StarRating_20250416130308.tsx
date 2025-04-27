import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
}

export default function StarRating({ 
  rating, 
  size = 'sm', 
  showCount = false, 
  count = 0 
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-1.5">
      <div className="flex space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizes[size]} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500">
          {count > 0 ? `(${count})` : 'No reviews'}
        </span>
      )}
    </div>
  );
}