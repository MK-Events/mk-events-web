import type {
  BookingPass,
  BookingQrResponse,
  FindBookingsRequest,
  GetBookingQrRequest,
} from '@mk/types';

import { baseApi } from './base.api';

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findBookings: builder.mutation<BookingPass[], FindBookingsRequest>({
      query: ({ eventId, email }) => ({
        url: '/bookings/access/list',
        method: 'POST',
        body: {
          eventId,
          email: email.trim().toLowerCase(),
        },
      }),
    }),

    getBookingQr: builder.mutation<BookingQrResponse, GetBookingQrRequest>({
      query: ({ eventId, email, bookingId }) => ({
        url: '/bookings/access/qr',
        method: 'POST',
        body: {
          eventId,
          email: email.trim().toLowerCase(),
          bookingId,
        },
      }),
    }),
  }),
});

export const { useFindBookingsMutation, useGetBookingQrMutation } = bookingApi;
