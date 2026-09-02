import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const resolveBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const isDevelopment = import.meta.env.NODE_ENV === 'development';

  if (!isDevelopment) {
    return apiUrl;
  }

  // Route through Vite dev proxy in development to prevent LAN-device CORS issues.
  return '/api';
};

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: resolveBaseUrl(),
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_API_KEY;

      if (apiKey) {
        headers.set('x-api-key', apiKey);
      }

      return headers;
    },
  }),

  tagTypes: ['Event', 'Gallery', 'Asset', 'GalleryAssets', 'Reservation', 'Payment'],

  endpoints: () => ({}),
});
