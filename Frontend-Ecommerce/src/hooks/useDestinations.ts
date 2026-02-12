import { useState, useEffect, useCallback, useMemo } from 'react';
import { destinationsAPI } from '../api/endpoints';
import type { Destination } from '../types';

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch destinations
  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await destinationsAPI.getAll();
      setDestinations(response.data);
    } catch (err) {
      setError('Failed to fetch destinations. Please try again.');
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // Memoized featured destinations (first 6)
  const featuredDestinations = useMemo(() => {
    return destinations.slice(0, 6);
  }, [destinations]);

  return {
    destinations,
    featuredDestinations,
    loading,
    error,
    refetch: fetchDestinations,
  };
}