'use client';
// vendors
import { useState, useEffect, useRef } from 'react';

// components
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import ImageDetail from './ImageDetail';

// types
import { PexelsPhotoType } from '@/types/pexels';
import { EmptyState } from './EmptyState';

interface GalleryWrapperProps {
  photos: PexelsPhotoType[];
  loading: boolean;
  hasMorePhotos: boolean;
  fetchNextPage: () => void;
  hasFetchedOnce: boolean;
}

const GalleryWrapper: React.FC<GalleryWrapperProps> = ({
  photos,
  loading,
  hasMorePhotos,
  fetchNextPage,
  hasFetchedOnce,
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhotoType | null>(
    null,
  );

  const handleImageClick = (photo: PexelsPhotoType) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => setSelectedPhoto(null);

  useEffect(() => {
    if (loading || !hasMorePhotos) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMorePhotos, fetchNextPage]);

  if (!hasFetchedOnce) {
    return (
      <div className="container mx-auto">
        <ImageGallery
          photos={[]}
          loading={true}
          onImageClick={() => {}}
          hasFetchedOnce={hasFetchedOnce}
        />
      </div>
    );
  }

  if (hasFetchedOnce && photos.length === 0 && !loading) {
    return (
      <div className="container mx-auto w-full p-4 text-center">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <ImageGallery
        photos={photos}
        loading={loading}
        hasFetchedOnce={hasFetchedOnce}
        onImageClick={handleImageClick}
      />
      {hasMorePhotos && !loading && (
        <div ref={observerRef} className="mt-4 h-10 w-full"></div>
      )}

      {!hasMorePhotos && !loading && (
        <div className="mt-4 text-center">
          <p>No more photos to load.</p>
        </div>
      )}
      <Modal isOpen={Boolean(selectedPhoto)} onClose={closeModal}>
        {selectedPhoto && <ImageDetail photo={selectedPhoto} />}
      </Modal>
    </div>
  );
};

export default GalleryWrapper;
