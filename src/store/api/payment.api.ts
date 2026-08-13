import { baseApi } from './base.api';

interface CreateReservationPaymentRequest {
  reservationId: string;
}

interface CreateReservationPaymentResponse {
  key: string;
  orderId: string;
  amount: number;
  currency: string;
  reservationId: string;
}

interface VerifyReservationPaymentRequest {
  reservationId: string;
  body: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  };
}

interface VerifyReservationPaymentResponse {
  success: boolean;
  bookingId: string;
  qrToken: string;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReservationPayment: builder.mutation<
      CreateReservationPaymentResponse,
      CreateReservationPaymentRequest
    >({
      query: ({ reservationId }) => ({
        url: `/payments/reservations/${reservationId}`,
        method: 'POST',
        body: undefined,
      }),
      invalidatesTags: (_result, _error, { reservationId }) => [
        { type: 'Payment', id: reservationId },
      ],
    }),

    verifyReservationPayment: builder.mutation<
      VerifyReservationPaymentResponse,
      VerifyReservationPaymentRequest
    >({
      query: ({ reservationId, body }) => ({
        url: `/payments/verify/${reservationId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { reservationId }) => [
        { type: 'Payment', id: reservationId },
      ],
    }),
  }),
});

export const { useCreateReservationPaymentMutation, useVerifyReservationPaymentMutation } =
  paymentApi;
