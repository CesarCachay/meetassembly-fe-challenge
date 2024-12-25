'use client';

// vendors
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

// components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GalleryWrapper from '@/components/GalleryWrapper';

// hooks
import { useFetchPexels } from '@/hooks/useFetchPexels';

// assets
import FavoritesIcon from '@/assets/icons/favourite-icon.svg';

export default function Home() {
  const [searchValue, setSearchValue] = useState('nature');
  const { data, loading, error, hasMorePhotos, fetchNextPage, hasFetchedOnce } =
    useFetchPexels(searchValue, 12);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInput = formData.get('search');
    if (!userInput) {
      toast.error('Please try different search or do not leave it empty.');
      return;
    }
    setSearchValue(userInput.toString());
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="flex w-full flex-col items-center gap-8 sm:items-start">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">
            MeetAssembly Challenge Gallery
          </h1>
          <Link
            href="/favorites"
            className="flex rounded-lg px-3 py-4 hover:bg-gray-500 hover:text-white hover:underline"
          >
            <div>Go to favorites</div>
            <Image
              src={FavoritesIcon}
              alt="favorites-images"
              width={24}
              height={24}
              className="ml-1 h-6 w-6"
            />
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start gap-4 sm:flex-row"
        >
          <Input
            type="text"
            name="search"
            defaultValue={searchValue}
            placeholder="Search for categories"
            className="h-10 border border-gray-300 bg-white text-lg transition-all duration-200 hover:border-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:h-14"
          />
          <Button
            type="submit"
            variant="default"
            className="h-10 w-full max-w-xs text-lg font-semibold md:h-14"
          >
            Search
          </Button>
        </form>

        <GalleryWrapper
          photos={data ?? []}
          loading={loading}
          hasMorePhotos={hasMorePhotos}
          fetchNextPage={fetchNextPage}
          hasFetchedOnce={hasFetchedOnce}
        />
      </main>
    </div>
  );
}
