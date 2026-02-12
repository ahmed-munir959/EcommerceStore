import { useState, useEffect } from 'react';
import { galleryAPI } from '../api/endpoints';
import type { Photo } from '../types';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await galleryAPI.getAll();
        setPhotos(response.data);
      } catch (err) {
        setError('Failed to fetch photos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
}