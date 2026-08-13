import { useCallback } from 'react';

import {
  useCreateReservationPaymentMutation,
  useVerifyReservationPaymentMutation,
} from '@mk/store/api/payment.api';
import {
  useLazyGetReservationQuery,
  useUpdateReservationMutation,
} from '@mk/store/api/reservation.api';
import type { ReservationErrorData, ReservationResponse } from '@mk/types/Reservation.type';

interface UseReservationPaymentArgs {
  reservationId?: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
  onReservationUpdated?: (reservation: ReservationResponse) => void;
  onPaymentSuccess?: (payload: { bookingId: string; qrToken: string }) => void;
  onError?: (error: ReservationErrorData) => void;
}

export function useReservationPayment({
  reservationId,
  contact,
  onReservationUpdated,
  onPaymentSuccess,
  onError,
}: UseReservationPaymentArgs) {
  const [createReservationPayment, { isLoading: isCreatePaymentLoading }] =
    useCreateReservationPaymentMutation();
  const [verifyReservationPayment, { isLoading: isVerifyPaymentLoading }] =
    useVerifyReservationPaymentMutation();
  const [fetchReservation, { isLoading: isFetchingReservationLoading }] =
    useLazyGetReservationQuery();
  const [updateReservation, { isLoading: isPaymentStageLoading }] = useUpdateReservationMutation();

  const updatePaymentStage = useCallback(
    async (stage: 'PAYMENT_FAILED' | 'CANCELLED') => {
      if (!reservationId) {
        return;
      }

      try {
        const updatedReservation = await updateReservation({
          reservationId,
          body: {
            stage,
          },
        }).unwrap();

        onReservationUpdated?.(updatedReservation);
      } catch (error: any) {
        const errorData = (error?.data as ReservationErrorData) ?? {
          error: 'PAYMENT_STAGE_UPDATE_FAILED',
          message: ['Something went wrong while updating the payment status. Please try again.'],
          statusCode: 500,
        };

        onError?.(errorData);
      }
    },
    [onError, onReservationUpdated, reservationId, updateReservation]
  );

  const openRazorpay = useCallback(async () => {
    if (!reservationId) {
      return;
    }

    try {
      const paymentOrder = await createReservationPayment({ reservationId }).unwrap();

      const loadRazorpayScript = () =>
        new Promise<void>((resolve, reject) => {
          if (typeof window === 'undefined') {
            reject(new Error('Window is not available.'));
            return;
          }

          if ((window as typeof window & { Razorpay?: unknown }).Razorpay) {
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Unable to load Razorpay checkout script.'));
          document.body.appendChild(script);
        });

      await loadRazorpayScript();

      const RazorpayCtor = (window as typeof window & { Razorpay?: new (options: any) => any })
        .Razorpay;

      if (!RazorpayCtor) {
        throw new Error('Razorpay checkout is not available.');
      }

      const razorpayInstance = new RazorpayCtor({
        key: paymentOrder.key,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: 'MK Events',
        description: 'Event Registration Payment',
        order_id: paymentOrder.orderId,
        handler: async (response: any) => {
          try {
            const verificationResult = await verifyReservationPayment({
              reservationId,
              body: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            }).unwrap();

            const latestReservation = await fetchReservation({ reservationId }).unwrap();

            onReservationUpdated?.(latestReservation);
            onPaymentSuccess?.({
              bookingId: verificationResult.bookingId,
              qrToken: verificationResult.qrToken,
            });
          } catch (error: any) {
            const errorData = (error?.data as ReservationErrorData) ?? {
              error: 'PAYMENT_VERIFICATION_FAILED',
              message: ['Something went wrong while verifying the payment. Please try again.'],
              statusCode: 500,
            };

            await updatePaymentStage('PAYMENT_FAILED');
            onError?.(errorData);
          }
        },
        modal: {
          ondismiss: async () => {
            await updatePaymentStage('CANCELLED');
          },
        },
        prefill: {
          name: contact?.name,
          email: contact?.email,
          contact: contact?.phone,
        },
        theme: {
          color: '#228be6',
        },
      });

      razorpayInstance.open();
    } catch (error: any) {
      const errorData = (error?.data as ReservationErrorData) ?? {
        error: 'PAYMENT_REQUEST_FAILED',
        message: ['Something went wrong while initiating the payment. Please try again.'],
        statusCode: 500,
      };

      await updatePaymentStage('PAYMENT_FAILED');
      onError?.(errorData);
    }
  }, [
    contact,
    createReservationPayment,
    fetchReservation,
    onError,
    onPaymentSuccess,
    reservationId,
    updatePaymentStage,
    verifyReservationPayment,
  ]);

  return {
    openRazorpay,
    setPaymentStage: updatePaymentStage,
    isLoading:
      isCreatePaymentLoading ||
      isVerifyPaymentLoading ||
      isPaymentStageLoading ||
      isFetchingReservationLoading,
  };
}
