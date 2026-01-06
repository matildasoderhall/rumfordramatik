import { useCallback, useEffect, useState } from 'react';
import type { WPIssue } from '@/models/wordpress';
import { getIssues } from '@services/api';

export const useIssues = () => {
  const [issues, setIssues] = useState<WPIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getIssues();
      setIssues(data);
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
    fetchIssues();
  }, [fetchIssues]);

  return { issues, loading, error, refetch: fetchIssues };
};
