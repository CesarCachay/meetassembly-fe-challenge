// vendors
import React from 'react';

// components
import ImageCard from './ImageCard';
import { Skeleton } from './Skeleton';

// types
import { PexelsPhotoType } from '@/types/pexels';

interface ImageGalleryProps {
  photos: PexelsPhotoType[];
  onImageClick: (photo: PexelsPhotoType) => void;
  loading: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  loading,
  photos,
  onImageClick,
}) => {
  const getSkeletonCount = () => {
    if (typeof window !== 'undefined') {
      return Math.ceil(window.innerWidth / 300) * 2;
    }
    return 12;
  };
  const skeletonCount = getSkeletonCount();

  if (loading || photos.length === 0) {
    return (
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className="relative aspect-square rounded-md">
              <Skeleton className="h-[300px] w-[300px]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          onClick={() => onImageClick(photo)}
          className="relative aspect-square rounded-md"
        >
          <ImageCard photo={photo} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
