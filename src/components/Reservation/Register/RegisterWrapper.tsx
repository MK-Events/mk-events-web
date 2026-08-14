import { useEffect, useRef, useState } from 'react';

import { Container, EmptyState } from '@mantine/core';
import {
  AttendeeStep,
  ContactStep,
  ErrorScreen,
  Loader,
  PaymentSuccess,
  RegistrationWelcome,
  ReservationCancelled,
  ReservationErrorModal,
  ResumeRegistrationModal,
  ReviewStep,
  StepLoader,
  TicketsStep,
} from '@mk/components';
import { useAppDispatch, useAppSelector, useReservationPayment } from '@mk/hooks';
import { useGetEventQuery } from '@mk/store/api/events.api';
import {
  useBackReservationMutation,
  useContinueReservationMutation,
  useNewReservationMutation,
  useUpdateReservationMutation,
} from '@mk/store/api/reservation.api';
import {
  clearReservationError,
  resetAll,
  setReservationData,
  setReservationError,
} from '@mk/store/slice/reservationSlice';
import type {
  PartialContact,
  ReservationErrorData,
  ReservationResponse,
} from '@mk/types/Reservation.type';
import { getDeviceId } from '@mk/utils/deviceIdUtility';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './RegisterWrapper.module.scss';

export function RegisterWrapper() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const deviceId = getDeviceId();
  const dispatch = useAppDispatch();
  const reservationData = useAppSelector((state) => state.reservation.reservationdata);
  const reservationError = useAppSelector((state) => state.reservation.reservationError);
  const [removeExistingProgress, setRemoveExistingProgress] = useState<boolean>(false);
  const [paymentSuccessInfo, setPaymentSuccessInfo] = useState<{
    bookingId: string;
    qrToken: string;
  } | null>(null);
  const removeExistingProgressRef = useRef(removeExistingProgress);
  const [resumePromptShown, setResumePromptShown] = useState(false);

  const setRemoveExistingProgressWithRef = (value: boolean) => {
    removeExistingProgressRef.current = value;
    setRemoveExistingProgress(value);
  };

  useEffect(() => {
    if (reservationData.reservation.stage === 'WELCOME') {
      setResumePromptShown(false);
    }
  }, [reservationData.reservation.stage]);

  const {
    data: eventData,
    isLoading: isEventDetailLoading,
    error: isEventDetailError,
    isFetching: isEventDetailFetching,
    refetch: refetchEventDetail,
  } = useGetEventQuery(slug as string);

  const [createReservation, { isLoading: isNewReservationLoading }] = useNewReservationMutation();
  const [updateReservation, { isLoading: isUpdateReservationLoading }] =
    useUpdateReservationMutation();
  const [continueReservation, { isLoading: isContinueReservationLoading }] =
    useContinueReservationMutation();
  const [backReservation, { isLoading: isBackReservationLoading }] = useBackReservationMutation();
  const hasExistingResumeData = Boolean(
    reservationData?.reservation?.id &&
    (reservationData.reservation.contact ||
      reservationData.reservation.tickets?.length ||
      reservationData.reservation.attendees?.length ||
      reservationData.summary?.ticketBreakdown?.length)
  );
  const canShowResumeOption =
    !resumePromptShown &&
    hasExistingResumeData &&
    reservationData.reservation.stage !== 'WELCOME' &&
    reservationData.reservation.stage !== 'PAYMENT_PENDING';

  const payment = useReservationPayment({
    reservationId: reservationData?.reservation?.id,
    contact: reservationData?.reservation?.contact,
    onReservationUpdated: (updatedReservation) => dispatch(setReservationData(updatedReservation)),
    onPaymentSuccess: (payload) => setPaymentSuccessInfo(payload),
    onError: (errorData) =>
      dispatch(
        setReservationError({
          data: errorData,
          loading: false,
        })
      ),
  });

  const isAnyReservationLoading =
    isNewReservationLoading ||
    isUpdateReservationLoading ||
    isContinueReservationLoading ||
    isBackReservationLoading ||
    payment.isLoading;

  //#region Event Detail loading and error scenarios

  // Main loader screen - only shows when the event detail is loading
  if (isEventDetailFetching || isEventDetailLoading) {
    return <Loader />;
  }

  // Main error screen - only shows when the event detail API call has any error
  if (isEventDetailError) {
    return <ErrorScreen onRetry={refetchEventDetail} />;
  }

  if (!eventData) {
    return <EmptyState />;
  }

  //#endregion

  const handleNewReservationCreation = async function () {
    try {
      const response = await createReservation({
        eventId: eventData?.id,
        deviceId,
        removeExisting: removeExistingProgressRef.current,
      }).unwrap();

      if (removeExistingProgressRef.current) {
        dispatch(resetAll());
      }

      dispatch(setReservationData(response));
    } catch (error: any) {
      const errorData = (error?.data as ReservationErrorData) ?? {
        error: 'REQUEST_FAILED',
        message: ['Something went wrong while creating the reservation. Please try again.'],
        statusCode: 500,
      };

      dispatch(
        setReservationError({
          data: errorData,
          loading: false,
        })
      );
    }
  };

  const handleReservationStageUpdate = async (
    stageName: 'CONTACT' | 'TICKETS' | 'ATTENDEES',
    payload: Partial<{
      contact: PartialContact;
      tickets: Array<{ ticketId: string; quantity: number }>;
      attendees: Array<{
        reservationTicketId: string;
        name: string;
        age?: number;
        gender?: string;
      }>;
    }>,
    options?: { continueAfterUpdate?: boolean }
  ) => {
    const reservationId = reservationData?.reservation?.id;

    if (!reservationId) {
      return;
    }

    try {
      const updatedReservation = await updateReservation({
        reservationId,
        body: {
          stage: stageName,
          ...(stageName === 'CONTACT' ? { contact: payload.contact } : {}),
          ...(stageName === 'TICKETS' ? { tickets: payload.tickets } : {}),
          ...(stageName === 'ATTENDEES' ? { attendees: payload.attendees } : {}),
        },
      }).unwrap();

      dispatch(setReservationData(updatedReservation));

      if (options?.continueAfterUpdate) {
        const continuedReservation = await continueReservation({ reservationId }).unwrap();
        dispatch(setReservationData(continuedReservation));
      }
    } catch (error: any) {
      const errorData = (error?.data as ReservationErrorData) ?? {
        error: 'REQUEST_FAILED',
        message: ['Something went wrong while saving the reservation data. Please try again.'],
        statusCode: 500,
      };

      dispatch(
        setReservationError({
          data: errorData,
          loading: false,
        })
      );
    }
  };

  const handleReservationBack = async () => {
    const reservationId = reservationData?.reservation?.id;

    if (!reservationId) {
      return;
    }

    setResumePromptShown(true);

    try {
      const previousReservation = await backReservation({ reservationId }).unwrap();
      dispatch(setReservationData(previousReservation));
    } catch (error: any) {
      const errorData = (error?.data as ReservationErrorData) ?? {
        error: 'REQUEST_FAILED',
        message: [
          'Something went wrong while going back in the reservation flow. Please try again.',
        ],
        statusCode: 500,
      };

      dispatch(
        setReservationError({
          data: errorData,
          loading: false,
        })
      );
    }
  };

  const handleMakePayment = async () => {
    await payment.openRazorpay();
  };

  let retryAPI = () => {};
  let reservationStageUI = null;
  const stage = reservationData.reservation.stage;

  if (stage === 'WELCOME') {
    retryAPI = handleNewReservationCreation;
    reservationStageUI = (
      <RegistrationWelcome
        event={eventData}
        onBegin={handleNewReservationCreation}
        loading={isNewReservationLoading}
      />
    );
  } else if (stage === 'CONTACT') {
    retryAPI = () => {};
    reservationStageUI = (
      <ContactStep
        key={reservationData.reservation.id ?? 'contact-step'}
        contactData={reservationData.reservation.contact}
        onContinue={(contact: PartialContact) =>
          handleReservationStageUpdate('CONTACT', { contact }, { continueAfterUpdate: true })
        }
        onBack={() =>
          dispatch(setReservationData({ reservation: { stage: 'WELCOME' } } as ReservationResponse))
        }
        onSave={(contact: PartialContact) => handleReservationStageUpdate('CONTACT', { contact })}
        loading={
          isUpdateReservationLoading || isContinueReservationLoading || isBackReservationLoading
        }
      />
    );
  } else if (stage === 'TICKETS') {
    const selectedTicketValues =
      reservationData.reservation.tickets?.map((item) => ({
        ticketId: item.ticketId,
        quantity: item.quantity,
      })) ?? [];

    retryAPI = () => {};
    reservationStageUI = (
      <TicketsStep
        tickets={eventData.tickets}
        value={{
          stage: 'TICKETS',
          tickets: selectedTicketValues,
        }}
        onContinue={(value) =>
          handleReservationStageUpdate(
            'TICKETS',
            { tickets: value.tickets },
            { continueAfterUpdate: true }
          )
        }
        onBack={handleReservationBack}
        onSave={(value) => handleReservationStageUpdate('TICKETS', { tickets: value.tickets })}
        loading={
          isUpdateReservationLoading || isContinueReservationLoading || isBackReservationLoading
        }
      />
    );
  } else if (stage === 'ATTENDEES') {
    retryAPI = () => {};
    reservationStageUI = (
      <AttendeeStep
        tickets={eventData.tickets}
        selectedTickets={
          reservationData.reservation.tickets?.map((item) => ({
            ticketId: item.ticketId,
            quantity: item.quantity,
          })) ?? []
        }
        value={{
          stage: 'ATTENDEES',
          attendees:
            reservationData.reservation.attendees?.map((attendee) => ({
              reservationTicketId: attendee.reservationTicketId,
              name: attendee.name,
              age: attendee.age,
              gender: attendee.gender,
            })) ?? [],
        }}
        existingAttendees={reservationData.reservation.attendees}
        onContinue={(value) =>
          handleReservationStageUpdate(
            'ATTENDEES',
            {
              attendees: value.attendees.map((attendee) => ({
                ...attendee,
                reservationTicketId:
                  reservationData.reservation.tickets?.find(
                    (ticket) => ticket.ticketId === attendee.reservationTicketId
                  )?.id ?? attendee.reservationTicketId,
              })),
            },
            { continueAfterUpdate: true }
          )
        }
        onBack={handleReservationBack}
        onSave={(value) =>
          handleReservationStageUpdate('ATTENDEES', {
            attendees: value.attendees.map((attendee) => ({
              ...attendee,
              reservationTicketId:
                reservationData.reservation.tickets?.find(
                  (ticket) => ticket.ticketId === attendee.reservationTicketId
                )?.id ?? attendee.reservationTicketId,
            })),
          })
        }
        loading={
          isUpdateReservationLoading || isContinueReservationLoading || isBackReservationLoading
        }
      />
    );
  } else if (stage === 'REVIEW') {
    retryAPI = () => {};
    reservationStageUI = (
      <ReviewStep
        data={reservationData}
        onBack={handleReservationBack}
        onMakePayment={handleMakePayment}
        loading={
          isUpdateReservationLoading ||
          isContinueReservationLoading ||
          isBackReservationLoading ||
          payment.isLoading
        }
      />
    );
  } else if (stage === 'CANCELLED') {
    retryAPI = () => {};
    reservationStageUI = (
      <ReservationCancelled
        bookingId={reservationData.reservation.bookingId}
        eventName={eventData?.name}
        cancelledAt={reservationData.reservation.updatedAt}
        onStartAgain={() => {
          dispatch(resetAll());
          setResumePromptShown(false);
        }}
        onGoBack={() => {
          dispatch(resetAll());
          navigate(`/events/${slug ?? ''}`);
        }}
      />
    );
  } else if (stage === 'CONFIRMED') {
    retryAPI = () => {};
    reservationStageUI = (
      <PaymentSuccess
        bookingResult={{
          booking: {
            bookingId: reservationData.reservation.bookingId || paymentSuccessInfo?.bookingId || '',
            bookedAt: reservationData.reservation.confirmedAt,
            email: reservationData.reservation.contact?.email,
          },
          event: {
            name: eventData?.name,
            startDate: eventData?.startDate,
            endDate: eventData?.endDate,
            location: {
              venue: eventData?.location?.venue,
              city: eventData?.location?.city,
            },
          },
        }}
        qrToken={paymentSuccessInfo?.qrToken ?? null}
        onViewTickets={() => {
          dispatch(resetAll());
          navigate('/tickets');
        }}
        onBookAgain={() => {
          dispatch(resetAll());
          navigate(`/register/${slug ?? ''}`);
        }}
      />
    );
  } else {
    retryAPI = handleNewReservationCreation;
    reservationStageUI = (
      <RegistrationWelcome
        event={eventData}
        onBegin={handleNewReservationCreation}
        loading={isNewReservationLoading}
      />
    );
  }

  return (
    <Container fluid className={styles.container}>
      {reservationStageUI}
      {reservationError.data?.message && (
        <ReservationErrorModal
          error={reservationError}
          onClose={() => dispatch(clearReservationError())}
          retryLoading={reservationError.loading}
          retry={retryAPI}
        />
      )}
      {canShowResumeOption && (
        <ResumeRegistrationModal
          reservation={reservationData}
          onContinue={() => {
            setResumePromptShown(true);
          }}
          onStartFresh={() => {
            setResumePromptShown(true);
            setRemoveExistingProgressWithRef(true);
            handleNewReservationCreation();
          }}
          loading={isNewReservationLoading}
        />
      )}
      <StepLoader visible={isAnyReservationLoading} />
    </Container>
  );
}

export default RegisterWrapper;
