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
  };
}

const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || '';
const BASE_URL = 'https://api.pexels.com/v1';

export const useFetchPexels = (query: string, perPage: number = 12) => {
  const [data, setData] = useState<PexelPhoto[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: PexelResponse = await axios.get(`${BASE_URL}/search`, {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query,
          per_page: perPage,
        },
      });
      setData(response.data.photos);
    } catch (err) {
      const errorMessage = 'Error fetching images. Please try again.';
      setError(errorMessage);
      throw Error(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [query, perPage]);

  useEffect(() => {
    if (!query) return;
    handleFetchPhotos();
  }, [handleFetchPhotos, query]);

  return { data, loading, error };
};
