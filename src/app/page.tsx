'use client';

// vendors
import { useState } from 'react';

import toast from 'react-hot-toast';

// components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GalleryWrapper from '@/components/GalleryWrapper';

// hooks
import { useFetchPexels } from '@/hooks/useFetchPexels';

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
    <div className="w-full items-center justify-items-center gap-16 p-8 pb-20 sm:p-16">
      <main className="flex w-full flex-col items-center gap-8 sm:items-start">
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
