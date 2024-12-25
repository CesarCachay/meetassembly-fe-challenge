'use client';

// vendors
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

// components
import { Button } from '@/components/ui/button';

// hooks
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        <p className="mt-4">No favorites yet.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Your Favorites</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((photo) => (
          <div
            key={`favorite-${photo.id}`}
            className="relative flex flex-col items-center justify-center border border-black p-5"
          >
            <Image
              src={photo.src.medium}
              alt={photo.alt ?? `Pexels picture number ${photo.id}`}
              width={400}
              height={300}
              className="mb-4 mt-2 w-[90%] rounded-md object-cover sm:max-h-[400px] sm:max-w-[400px]"
            />
            <div className="text-md text-medium mb-4 text-center">
              {photo.alt ?? 'Picture from Pexels API'}
            </div>
            <Button
              onClick={() => {
                removeFavorite(photo.id);
                toast.success('Removed from favorites!');
              }}
              className="w-24 rounded bg-red-500 px-2 py-1 text-white"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
