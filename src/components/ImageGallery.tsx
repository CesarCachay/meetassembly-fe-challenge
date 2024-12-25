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
  hasFetchedOnce: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  loading,
  photos,
  onImageClick,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          onClick={() => onImageClick(photo)}
          className="relative aspect-square rounded-md"
        >
          <ImageCard photo={photo} />
        </div>
      ))}

      {loading &&
        Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="relative aspect-square rounded-md">
            <Skeleton className="h-[300px] w-[300px]" />
          </div>
        ))}
    </div>
  );
};

export default ImageGallery;
