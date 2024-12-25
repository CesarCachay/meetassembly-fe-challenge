// vendors
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// types
interface PexelPhoto {
  id: number;
  src: {
    original: string;
    medium: string;
    small: string;
  };
  photographer: string;
}

interface PexelResponse {
  data: {
    photos: PexelPhoto[];
    total_results: number;
    page: number;
    per_page: number;
  };
}

const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || '';
const BASE_URL = 'https://api.pexels.com/v1';

export const useFetchPexels = (query: string, perPage: number = 12) => {
  const [data, setData] = useState<PexelPhoto[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMorePhotos, setHasMorePhotos] = useState<boolean>(true);

  const handleFetchPhotos = useCallback(
    async (pageNumber: number = 1) => {
      if (!API_KEY) {
        console.error('Missing API key for Pexels API');
        setError('Missing API key.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response: PexelResponse = await axios.get(`${BASE_URL}/search`, {
          headers: {
            Authorization: API_KEY,
          },
          params: {
            query: query.trim(),
            per_page: perPage,
            page: pageNumber,
          },
        });
        const newPhotos = response.data.photos;
        setData((prevData) =>
          prevData
            ? pageNumber === 1
              ? newPhotos
              : [...prevData, ...newPhotos]
            : newPhotos,
        );
        setHasMorePhotos(newPhotos.length > 0);
      } catch (err) {
        const errorMessage = 'Error fetching images. Please try again.';
        setError(errorMessage);
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
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
    if (!query.trim()) {
      setPage(1);
      handleFetchPhotos(1);
    }
    handleFetchPhotos();
  }, [handleFetchPhotos, query]);

  return { data, loading, error, hasMorePhotos, fetchNextPage };
};
