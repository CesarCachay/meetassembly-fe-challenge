// vendors
import React from 'react';
import Image from 'next/image';

// types
import { PexelsPhotoType } from '@/types/pexels';

interface ImageCardProps {
  photo: PexelsPhotoType;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  const { src, alt, id } = photo || {};
  return (
    <div className="rounded-lg shadow-xl hover:opacity-80">
      <Image
        src={src.medium}
        alt={alt || `Pexels picture ${id}`}
        width={300}
        height={200}
        className="h-auto w-full object-cover"
      />
    </div>
  );
};

export default ImageCard;
