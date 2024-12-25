'use client';
// vendors
import React, { useState } from 'react';
import Image from 'next/image';

// components
import Modal from './Modal';
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

  const closeModal = () => setSelectedPhoto(null);

  return (
    <div className="container mx-auto">
      <ImageGallery photos={photos} onImageClick={handleImageClick} />
      <Modal isOpen={Boolean(selectedPhoto)} onClose={closeModal}>
        {selectedPhoto && (
          <div className="flex flex-col items-center p-5">
            <div className="mb-2 text-lg text-black">
              Picture by:
              <span className="ml-1 font-semibold">
                {selectedPhoto?.photographer || 'Pexels Photographer'}
              </span>
            </div>

            <Image
              src={selectedPhoto.src.large}
              alt={selectedPhoto.alt || 'Picture from Pexels API'}
              width={selectedPhoto.width / 2}
              height={selectedPhoto.height / 2}
              className="mb-4 max-h-[650px] max-w-[600px] object-cover"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GalleryWrapper;
