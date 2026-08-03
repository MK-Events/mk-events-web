import type { Event, EventList, FeaturedEvent } from '@mk/types';

import { baseApi } from './base.api';

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventList[], void>({
      query: () => '/events',

      providesTags: (_, __) => [
        {
          type: 'Event',
          id: 'LIST',
        },
      ],
    }),

    getFeaturedEvents: builder.query<FeaturedEvent[], void>({
      query: () => '/events/featured',

      providesTags: (_, __) => [
        {
          type: 'Event',
          id: 'FEATURED_LIST',
        },
      ],
    }),

    getEvent: builder.query<Event, string>({
      query: (slug) => `/events/${slug}`,

      providesTags: (_, __, slug) => [
        {
          type: 'Event',
          id: slug,
        },
      ],
    }),
  }),
});

export const { useGetEventsQuery, useGetFeaturedEventsQuery, useGetEventQuery } = eventsApi;
