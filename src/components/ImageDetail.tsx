// vendors
import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

// components
import { Button } from './ui/button';

// utils
import { handleDownload } from '@/lib/utils';

// types
import { PexelsPhotoType } from '@/types/pexels';

interface ImageDetailsProps {
  photo: PexelsPhotoType;
}

const ImageDetail: React.FC<ImageDetailsProps> = ({ photo }) => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-5">
      <div className="mb-2 text-center text-lg text-black">
        Picture by:
        <span className="ml-1 font-semibold">
          {photo.photographer || 'Pexels Photographer'}
        </span>
      </div>

      <div className="mb-4 w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px]">
        <Image
          src={photo.src.large}
          alt={photo.alt || 'Picture from Pexels API'}
          width={photo.width / 2}
          height={photo.height / 2}
          className="rounded-lg object-cover"
        />
      </div>

      <Button
        onClick={() => {
          handleDownload(photo.src.original, `pexels-${photo.id}.jpg`);
          toast.success('Image download initiated!');
        }}
        className="w-full max-w-xs"
      >
        Download
      </Button>
    </div>
  );
};

export default ImageDetail;
