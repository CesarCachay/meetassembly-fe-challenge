// vendors
import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

// components
import { Button } from './ui/button';

// utils
import { handleDownload } from '@/lib/utils';

// images
import EmptyAvatar from '@/assets/images/empty-avatar.jpg';

// hooks
import { useFavorites } from '@/hooks/useFavorites';

// types
import { PexelsPhotoType } from '@/types/pexels';

interface ImageDetailsProps {
  photo: PexelsPhotoType;
}

const ImageDetail: React.FC<ImageDetailsProps> = ({ photo }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleToggleFavorite = () => {
    if (isFavorite(photo.id)) {
      removeFavorite(photo.id);
      toast.success('Removed from favorites!');
    } else {
      addFavorite(photo);
      toast.success('Added to favorites!');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-5">
      <div className="mb-4 flex flex-col items-center text-center">
        <Image
          src={EmptyAvatar}
          alt={photo.photographer || 'Pexels Photographer'}
          width={100}
          height={100}
          className="mb-2 h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
        />
        <div className="text-lg text-black">
          Picture by:
          <a
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 cursor-pointer font-semibold hover:text-blue-500"
          >
            {photo.photographer || 'Pexels Photographer'}
          </a>
        </div>
      </div>

      <div className="mb-4 w-full max-w-[90vw] overflow-hidden sm:max-w-[600px] md:max-h-[450px] md:max-w-[700px]">
        <Image
          src={photo.src.medium}
          alt={photo.alt || 'Picture from Pexels API'}
          width={photo.width / 2}
          height={photo.height / 2}
          className="mb-4 rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          onClick={() => {
            handleDownload(photo.src.original, `pexels-${photo.id}.jpg`);
            toast.success('Image download initiated!');
          }}
          className="w-full max-w-xs text-lg font-medium"
        >
          Download
        </Button>
        <Button
          variant={isFavorite(photo.id) ? 'destructive' : 'default'}
          onClick={handleToggleFavorite}
          className="w-full max-w-xs text-lg font-medium"
        >
          {isFavorite(photo.id) ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </div>
    </div>
  );
};

export default ImageDetail;
