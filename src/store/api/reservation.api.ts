// store/api/reservation.api.ts
import type { ReservationResponse } from '@mk/types/Reservation.type';

import { baseApi } from './base.api';

interface newReservationRequest {
  eventId: string;
  deviceId: string;
  removeExisting: boolean;
}

interface ReservationStageUpdate {
  stage: 'CONTACT' | 'TICKETS' | 'ATTENDEES' | 'REVIEW' | 'PAYMENT_FAILED' | 'CANCELLED';
  contact?: {
    name: string;
    age?: number;
    gender?: string;
    phone: string;
    email: string;
  };
  tickets?: Array<{
    ticketId: string;
    quantity: number;
  }>;
  attendees?: Array<{
    reservationTicketId: string;
    name: string;
    age?: number;
    gender?: string;
  }>;
}

interface getReservationRequest {
  reservationId: string;
}

export const registrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    newReservation: builder.mutation<ReservationResponse, newReservationRequest>({
      query: ({ eventId, deviceId, removeExisting }) => ({
        url: '/reservations',
        method: 'POST',
        body: {
          eventId,
          deviceId,
          removeExisting,
        },
      }),
      invalidatesTags: ['Reservation'],
    }),

    getReservation: builder.query<ReservationResponse, getReservationRequest>({
      query: ({ reservationId }) => ({
        url: `/reservations/${reservationId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { reservationId }) => [
        { type: 'Reservation', id: reservationId },
      ],
    }),

    updateReservation: builder.mutation<
      ReservationResponse,
      getReservationRequest & { body: ReservationStageUpdate }
    >({
      query: ({ reservationId, body }) => ({
        url: `/reservations/${reservationId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { reservationId }) => [
        { type: 'Reservation', id: reservationId },
      ],
    }),

    continueReservation: builder.mutation<ReservationResponse, getReservationRequest>({
      query: ({ reservationId }) => ({
        url: `/reservations/${reservationId}/continue`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { reservationId }) => [
        { type: 'Reservation', id: reservationId },
      ],
    }),

    backReservation: builder.mutation<ReservationResponse, getReservationRequest>({
      query: ({ reservationId }) => ({
        url: `/reservations/${reservationId}/back`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { reservationId }) => [
        { type: 'Reservation', id: reservationId },
      ],
    }),
  }),
});

export const {
  useNewReservationMutation,
  useGetReservationQuery,
  useLazyGetReservationQuery,
  useUpdateReservationMutation,
  useContinueReservationMutation,
  useBackReservationMutation,
} = registrationApi;
