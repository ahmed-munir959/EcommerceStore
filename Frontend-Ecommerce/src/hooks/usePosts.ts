import { useState, useEffect } from 'react';
import { blogAPI } from '../api/endpoints';
import type { BlogPost } from '../types';

export function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await blogAPI.getAll();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}