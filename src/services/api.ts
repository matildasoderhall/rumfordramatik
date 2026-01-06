import axios, { AxiosError } from 'axios';
import type { WPEvent, WPIssue } from '../models/wordpress';

const BASE_URL = import.meta.env.VITE_API_URL;

export const wpApi = axios.create({
  baseURL: BASE_URL,
});

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
