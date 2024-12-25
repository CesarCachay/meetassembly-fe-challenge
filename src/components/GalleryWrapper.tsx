'use client';
// vendors
import React, { useState } from 'react';

// components
import ImageGallery from './ImageGallery';

// types
import { PexelsPhotoType } from '@/types/pexels';

interface GalleryWrapperProps {
  photos: PexelsPhotoType[];
}

const GalleryWrapper: React.FC<GalleryWrapperProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhotoType | null>(
    null,
  );

  const handleImageClick = (photo: PexelsPhotoType) => {
    setSelectedPhoto(photo);
  };

  console.log('selectedPhoto', selectedPhoto);
  return (
    <div className="container mx-auto">
      <ImageGallery photos={photos} onImageClick={handleImageClick} />
    </div>
  );
};

export default GalleryWrapper;
