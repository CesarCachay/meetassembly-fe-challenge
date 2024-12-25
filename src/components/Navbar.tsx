'use client';

// vendors
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// assets
import FavoritesIcon from '@/assets/icons/favourite-icon.svg';
import ArrowBackIcon from '@/assets/icons/arrow-back.svg';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex w-full flex-col items-start justify-between px-12 pt-8 sm:flex-row sm:items-center">
      <h1 className="mb-4 text-2xl font-semibold sm:mb-0">
        MeetAssembly Challenge Gallery
      </h1>
      {pathname === '/' ? (
        <Link
          href="/favorites"
          className="flex rounded-lg border border-black px-2 py-2 hover:bg-gray-500 hover:text-white hover:underline sm:border-none sm:px-3 sm:py-4"
        >
          <div className="sm:hidden">Go to:</div>
          <div className="hidden sm:block">Go to favorites</div>
          <Image
            src={FavoritesIcon}
            alt="favorites-images"
            width={24}
            height={24}
            className="ml-1 h-6 w-6"
          />
        </Link>
      ) : (
        <Link
          href="/"
          className="flex w-32 rounded-lg border border-black px-2 py-2 hover:bg-gray-500 hover:text-white hover:underline sm:border-none sm:px-3 sm:py-4"
        >
          <Image
            src={ArrowBackIcon}
            alt="arrow-back"
            width={20}
            className="mr-1"
          />
          <div>Go back</div>
        </Link>
      )}
    </header>
  );
};

export default Navbar;
