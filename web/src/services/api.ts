import axios from 'axios';
import { User, UrlShortner, Analytics, AnalyticsSummary, CreateUrlShortnerDto } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  create: async (name: string, email: string): Promise<User> => {
    const response = await api.post<User>('/users', { name, email });
    return response.data;
  },
  
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  
  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  
  getByEmail: async (email: string): Promise<User> => {
    const response = await api.get<User>(`/users/email/${email}`);
    return response.data;
  }
};

// URL Shortener API
export const urlShortenerAPI = {
  create: async (data: CreateUrlShortnerDto): Promise<UrlShortner> => {
    const response = await api.post<UrlShortner>('/url-shortner', data);
    return response.data;
  },
  
  getAllByUser: async (userId: string): Promise<UrlShortner[]> => {
    const response = await api.get<UrlShortner[]>(`/url-shortner/user/${userId}`);
    return response.data;
  },
  
  getByShortUrl: async (shortUrl: string): Promise<UrlShortner> => {
    const response = await api.get<UrlShortner>(`/url-shortner/${shortUrl}`);
    return response.data;
  },
  
  delete: async (id: string, userId: string): Promise<UrlShortner> => {
    const response = await api.delete<UrlShortner>(`/url-shortner/${id}?userId=${userId}`);
    return response.data;
  }
};

// Analytics API
export const analyticsAPI = {
  getByUrlId: async (urlShortnerId: string): Promise<Analytics[]> => {
    const response = await api.get<Analytics[]>(`/analytics/${urlShortnerId}`);
    return response.data;
  },
  
  getSummary: async (urlShortnerId: string): Promise<AnalyticsSummary> => {
    // Use a workaround for the routing conflict by adding a query parameter
    // This ensures our request doesn't match the generic ":urlShortnerId" route
    const response = await api.get<AnalyticsSummary>(`/analytics/${urlShortnerId}`, {
      params: {
        summary: true
      }
    });
    return response.data;
  }
};

export default { userAPI, urlShortenerAPI, analyticsAPI };
