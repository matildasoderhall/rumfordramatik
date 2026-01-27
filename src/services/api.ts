import axios, { AxiosError } from 'axios';
import type { WPEvent, WPIssue, WPOpenCall } from '../models/wordpress';
import type { CF7Response } from '@/models/CF7Response';

const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_SUBMIT_CONTACT_URL = import.meta.env.VITE_API_CONTACT_URL;

/**
 * Pre-configured Axios instance for WordPress API requests.
 * Uses the base URL defined in environment variables (VITE_API_URL).
 */
export const wpApi = axios.create({
  baseURL: BASE_URL,
});

/**
 * Fetches a list of "Issue" custom post types from the WordPress REST API.
 * Automatically handles:
 * - Embedding linked resources (`_embed=true`)
 * - Filtering for 'publish' status
 * - Error normalization (converts Axios errors to user-friendly strings)
 * @returns {Promise<WPIssue[]>} A promise that resolves to an array of WPIssue objects.
 * @throws {Error} Throws a friendly error message if the request fails (e.g., "No issues found", "Server error").
 * @example
 * try {
 * const issues = await getIssues();
 * console.log(issues);
 * } catch (err) {
 * console.error(err.message);
 * }
 */
export const getIssues = async (): Promise<WPIssue[]> => {
  try {
    const response = await wpApi.get<WPIssue[]>('/issue', {
      params: {
        _embed: true,
        status: 'publish',
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; code?: string }>;

    const wpMessage = axiosError.response?.data?.message;

    if (wpMessage) {
      throw new Error(wpMessage);
    }

    if (axiosError.response?.status === 404) {
      throw new Error('No issues found.');
    }

    if (axiosError.response?.status === 500) {
      throw new Error('WordPress server error. Please try again later.');
    }

    throw new Error('Failed to load issues. Please check your connection.');
  }
};

/**
 * Fetches a list of "Event" custom post types from the WordPress REST API.
 * Automatically handles:
 * - Embedding linked resources (`_embed=true`)
 * - Filtering for 'publish' status
 * - Error normalization
 * @returns {Promise<WPEvent[]>} A promise that resolves to an array of WPEvent objects.
 * @throws {Error} Throws a friendly error message if the request fails.
 */
export const getEvents = async (): Promise<WPEvent[]> => {
  try {
    const response = await wpApi.get<WPEvent[]>('/event', {
      params: {
        _embed: true,
        status: 'publish',
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; code?: string }>;

    const wpMessage = axiosError.response?.data?.message;

    if (wpMessage) {
      throw new Error(wpMessage);
    }

    if (axiosError.response?.status === 404) {
      throw new Error('No events found.');
    }

    if (axiosError.response?.status === 500) {
      throw new Error('WordPress server error. Please try again later.');
    }

    throw new Error('Failed to load events. Please check your connection.');
  }
};

export const getOpenCall = async (): Promise<WPOpenCall> => {
  try {
    const response = await wpApi.get<WPOpenCall[]>('/pages', {
      params: {
        slug: 'open-call',
        _embed: true,
        status: 'publish',
      },
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Open Call page not found.');
    }

    return response.data[0];
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string, code?: string }>;
    const wpMessage = axiosError.response?.data?.message;

    if (wpMessage) throw new Error(wpMessage);
    if (axiosError.response?.status === 404) throw new Error('Open Call page not found.');
    if (axiosError.response?.status === 500) throw new Error('Server error.');
    
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to load Open Call data.");
  }
}

export const submitContactForm = async (formId: string, data: FormData): Promise<CF7Response> => {
  const url = `${BASE_SUBMIT_CONTACT_URL}/${formId}/feedback`;
  const response = await axios.post<CF7Response>(url, data); 

  return response.data;
}
