import { useCallback, useEffect, useState } from "react"
import type { WPPost } from "@/models/wordpress"
import { getPosts } from "@services/api";

export const usePosts = () => {
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await getPosts();
          setPosts(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unexpected error occurred');
          }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return { posts, loading, error, refetch: fetchPosts };
}