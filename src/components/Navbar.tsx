'use client';

// vendors
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

// assets
import ArrowBackIcon from '@/assets/icons/arrow-back.svg';
import FavoritesIcon from '@/assets/icons/favourite-icon.svg';
import UnplashifyLogo from '@/assets/icons/unplash-icon.svg';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirectHome = () => {
    router.push('/');
  };

  return (
    <header className="flex w-full items-start justify-between px-12 pt-8 sm:items-center">
      <div
        className="mb-4 flex cursor-pointer items-center text-xl font-semibold sm:mb-0 sm:text-2xl"
        onClick={handleRedirectHome}
      >
        <Image
          src={UnplashifyLogo}
          alt="Unplashigy-logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="ml-2">Unplashify</span>
      </div>
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
            className="ml-2 h-6 w-6"
          />
        </Link>
      ) : (
        <Link
          href="/"
          className="flex w-28 rounded-lg border border-black px-2 py-2 hover:bg-gray-500 hover:text-white hover:underline sm:w-32 sm:border-none sm:px-3 sm:py-4"
        >
          <Image
            src={ArrowBackIcon}
            alt="arrow-back"
            width={20}
            className="mr-2"
          />
          <div>Go back</div>
        </Link>
      )}
    </header>
  );
};

export default Navbar;
