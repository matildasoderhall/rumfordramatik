import axios, { AxiosError } from "axios";
import type { WPOpenCall, WPPost } from "../models/wordpress";

const BASE_URL = import.meta.env.VITE_API_URL; 

export const wpApi = axios.create({
  baseURL: BASE_URL
});

export const getPosts = async (): Promise<WPPost[]> => {

  try {
    const response = await wpApi.get<WPPost[]>('/posts', {
    params: {
      _embed: true,
      per_page: 6,
      status: 'publish',
    },
  });

  return response.data;

  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string, code?: string }>;

    const wpMessage = axiosError.response?.data?.message;

    if (wpMessage) {
      throw new Error(wpMessage);
    }
    
    if (axiosError.response?.status === 404) {
      throw new Error("No posts found.");
    }

    if (axiosError.response?.status === 500) {
      throw new Error("WordPress server error. Please try again later.");
    }

    throw new Error("Failed to load posts. Please check your connection.");
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