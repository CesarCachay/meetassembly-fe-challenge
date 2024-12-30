// vendors
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// types
import { PexelsPhotoType, PexelsSearchResponse } from '@/types/pexels';

export const useFetchPexels = (query: string, perPage: number = 12) => {
  const [data, setData] = useState<PexelsPhotoType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMorePhotos, setHasMorePhotos] = useState<boolean>(true);
  const [hasFetchedOnce, setHasFetchedOnce] = useState<boolean>(false);

  const handleFetchPhotos = useCallback(
    async (pageNumber: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const response: PexelsSearchResponse = await axios.get(
          `/api/get-images`,
          {
            params: {
              query: query.trim(),
              per_page: perPage,
              page: pageNumber,
            },
          },
        );
        const newPhotos = response.data.photos;
        setData((prevData) => {
          if (prevData == null) {
            return newPhotos;
          }
          const combinedPhotos = [...prevData, ...newPhotos];
          const uniquePhotos = combinedPhotos.filter(
            (item, index, arr) =>
              arr.findIndex((p) => p.id === item.id) === index,
          );
          return uniquePhotos;
        });
        setHasMorePhotos(newPhotos.length > 0);
      } catch (err) {
        const errorMessage = 'Error fetching images. Please try again.';
        setError(errorMessage);
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
        setHasFetchedOnce(true);
      }
    },
    [query, perPage],
  );

  const fetchNextPage = useCallback(() => {
    if (hasMorePhotos) {
      const nextPage = page + 1;
      setPage(nextPage);
      handleFetchPhotos(nextPage);
    }
  }, [hasMorePhotos, page, handleFetchPhotos]);

  useEffect(() => {
    setPage(1);
    setData([]);
    setHasFetchedOnce(false);
    handleFetchPhotos(1);
  }, [query, handleFetchPhotos]);

  return { data, loading, error, hasMorePhotos, fetchNextPage, hasFetchedOnce };
};
