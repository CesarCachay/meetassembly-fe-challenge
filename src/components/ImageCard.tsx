// vendors
import { useState } from 'react';
import Image from 'next/image';

// components
import { Skeleton } from './Skeleton';

// types
import { PexelsPhotoType } from '@/types/pexels';

interface ImageCardProps {
  photo: PexelsPhotoType;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  const { src, alt, id } = photo || {};
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="rounded-lg shadow-xl hover:opacity-80">
      {isLoading && <Skeleton className="h-[300px] w-[300px]" />}
      {hasError ? (
        <div className="flex h-[300px] w-[300px] items-center justify-center bg-gray-200 text-gray-500">
          Failed to load image
        </div>
      ) : (
        <Image
          src={src.medium}
          alt={alt || `Pexels picture ${id}`}
          height={300}
          width={300}
          loading="lazy"
          className={`h-auto w-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} `}
          onError={() => setHasError(true)}
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}
    </div>
  );
};

export default ImageCard;
