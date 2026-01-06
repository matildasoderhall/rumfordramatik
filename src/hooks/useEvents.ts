import { useCallback, useEffect, useState } from 'react';
import type { WPEvent } from '@/models/wordpress';
import { getEvents } from '@services/api';

/**
 * Custom hook to fetch and manage the state of WordPress Events.
 * This hook automatically triggers the `getEvents` API call when the component mounts.
 * It manages three states:
 * 1. `events`: The array of data (empty by default).
 * 2. `loading`: Boolean status of the network request.
 * 3. `error`: Human-readable error string if the request fails.
 * @returns An object containing:
 * - `events` {WPEvents[]} - The list of events fetched from the API.
 * - `loading` {boolean} - True while the request is in flight.
 * - `error` {string | null} - Error message if the fetch failed, otherwise null.
 * - `refetch` {Function} - A function to manually re-trigger the API call.
 * @example
 * const { events, loading, error, refetch } = useEvents();
 * if (loading) return <Spinner />;
 * if (error) return <ErrorMessage msg={error} retry={refetch} />;
 * return <EventsList data={events} />;
 */
export const useEvents = () => {
  const [events, setEvents] = useState<WPEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getEvents();
      setEvents(data);
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
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};
