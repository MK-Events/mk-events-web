import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
