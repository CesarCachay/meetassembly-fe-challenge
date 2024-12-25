// vendors
import { useEffect, useState } from 'react';

// types
import { PexelsPhotoType } from '@/types/pexels';

export function useFavorites() {
  const [favorites, setFavorites] = useState<PexelsPhotoType[]>([]);

  useEffect(() => {
    const storedPhotos = localStorage.getItem('favorites');
    if (storedPhotos) {
      setFavorites(JSON.parse(storedPhotos));
    }
  }, []);

  const isFavorite = (photoId: number) => {
    return favorites.some((photo) => photo.id === photoId);
  };

  const addFavorite = (photo: PexelsPhotoType) => {
    if (isFavorite(photo.id)) return;
    const updated = [...favorites, photo];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFavorite = (photoId: number) => {
    const updated = favorites.filter((photo) => photo.id !== photoId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
}
