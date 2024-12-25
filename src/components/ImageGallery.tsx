// vendors
import React from 'react';

// components
import ImageCard from './ImageCard';

// types
import { PexelsPhotoType } from '@/types/pexels';

interface ImageGalleryProps {
  photos: PexelsPhotoType[];
  onImageClick: (photo: PexelsPhotoType) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onImageClick,
}) => {
  if (!photos || photos.length === 0) {
    return <p className="mt-4 text-center">No images found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.id} onClick={() => onImageClick(photo)}>
          <ImageCard photo={photo} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
