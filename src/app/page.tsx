'use client';

// vendors
import { useState } from 'react';

// components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GalleryWrapper from '@/components/GalleryWrapper';

// hooks
import { useFetchPexels } from '@/hooks/useFetchPexels';

export default function Home() {
  const [searchValue, setSearchValue] = useState('nature');
  const { data, loading, error } = useFetchPexels(searchValue, 12);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInput = formData.get('search');
    if (!userInput) return;
    setSearchValue(userInput.toString());
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1>MeetAssembly Challenge Gallery</h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-[80%] flex-col items-start gap-4 sm:flex-row"
        >
          <Input
            type="text"
            name="search"
            defaultValue={searchValue}
            placeholder="Search for categories"
          />
          <Button type="submit" variant="default">
            Search
          </Button>
        </form>

        <GalleryWrapper photos={data ?? []} loading={loading} />
      </main>
    </div>
  );
}
