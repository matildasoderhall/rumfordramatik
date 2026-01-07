import { useCallback, useEffect, useState } from 'react';
import type { WPIssue } from '@/models/wordpress';
import { getIssues } from '@services/api';

/**
 * Custom hook to fetch and manage the state of WordPress Issues.
 * This hook automatically triggers the `getIssues` API call when the component mounts.
 * It manages three states:
 * 1. `issues`: The array of data (empty by default).
 * 2. `loading`: Boolean status of the network request.
 * 3. `error`: Human-readable error string if the request fails.
 * @returns An object containing:
 * - `issues` {WPIssue[]} - The list of issues fetched from the API.
 * - `loading` {boolean} - True while the request is in flight.
 * - `error` {string | null} - Error message if the fetch failed, otherwise null.
 * - `refetch` {Function} - A function to manually re-trigger the API call.
 * @example
 * const { issues, loading, error, refetch } = useIssues();
 * if (loading) return <Spinner />;
 * if (error) return <ErrorMessage msg={error} retry={refetch} />;
 * return <IssuesList data={issues} />;
 */
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
