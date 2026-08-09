import { lazy, Suspense, useState } from 'react';

import {
  Alert,
  Badge,
  Button,
  Divider,
  Group,
  Loader,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { BookingCard, EventQrCode } from '@mk/components';
import { useAppConfig } from '@mk/hooks';
import { useFindBookingsMutation, useGetBookingQrMutation } from '@mk/store/api/booking.api';
import { useGetEventQuery, useGetEventsQuery } from '@mk/store/api/events.api';
import type { BookingPass, EventTicketData } from '@mk/types';
import {
  formatEventScheduleTime,
  getAttendeeTypeLabel,
  getBookingAttendees,
  normalizeEmail,
} from '@mk/utils';
import { IconAlertCircle, IconArrowLeft, IconTicket } from '@tabler/icons-react';

import classes from './Tickets.module.scss';

type Step = 'event' | 'lookup' | 'bookings' | 'qr';

const EventTicketDownload = lazy(() => import('@mk/components/Bookings/EventTicketDownload'));

export function Tickets() {
  const config = useAppConfig();
  const [step, setStep] = useState<Step>('event');

  const [eventId, setEventId] = useState<string | null>(null);

  const [email, setEmail] = useState('');

  const [bookings, setBookings] = useState<BookingPass[]>([]);

  const [selectedBooking, setSelectedBooking] = useState<BookingPass | null>(null);

  const [qrToken, setQrToken] = useState<string | null>(null);

  // --------------------------------------------------
  // EVENT LIST
  // --------------------------------------------------

  const { data: events, isLoading: isLoadingEvents, isError: isEventsError } = useGetEventsQuery();

  // --------------------------------------------------
  // COMPLETE EVENT
  // --------------------------------------------------

  const {
    data: eventDetails,
    isLoading: isLoadingEventDetails,
    isError: isEventDetailsError,
  } = useGetEventQuery(eventId!, {
    skip: !eventId,
  });

  // --------------------------------------------------
  // BOOKINGS
  // --------------------------------------------------

  const [findBookings, { isLoading: isFindingBookings, error: findBookingsError }] =
    useFindBookingsMutation();

  const [getBookingQr, { isLoading: isGettingQr, error: getBookingQrError }] =
    useGetBookingQrMutation();

  // --------------------------------------------------
  // SELECTED EVENT FROM LIST
  // --------------------------------------------------

  const selectedEvent = events?.find((event) => event.id === eventId);

  // --------------------------------------------------
  // ERROR HELPER
  // --------------------------------------------------

  const getErrorMessage = (error: unknown, fallback: string): string => {
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const errorData = error as {
        data?: {
          message?: string;
        };
      };

      if (errorData.data?.message) {
        return errorData.data.message;
      }
    }

    return fallback;
  };

  // --------------------------------------------------
  // EVENT SELECT
  // --------------------------------------------------

  const handleEventChange = (value: string | null) => {
    setEventId(value);

    setEmail('');
    setBookings([]);
    setSelectedBooking(null);
    setQrToken(null);

    if (value) {
      setStep('lookup');
    } else {
      setStep('event');
    }
  };

  // --------------------------------------------------
  // FIND BOOKINGS
  // --------------------------------------------------

  const handleFindBookings = async () => {
    if (!eventId || !email.trim()) {
      return;
    }

    try {
      const result = await findBookings({
        eventId,
        email: normalizeEmail(email),
      }).unwrap();

      setBookings(result);
      setSelectedBooking(null);
      setQrToken(null);

      setStep('bookings');
    } catch {
      // RTK Query exposes the error.
    }
  };

  // --------------------------------------------------
  // GET QR
  // --------------------------------------------------

  const handleGetPass = async (booking: BookingPass) => {
    if (!eventId) {
      return;
    }

    try {
      const result = await getBookingQr({
        eventId,
        email: normalizeEmail(email),
        bookingId: booking.bookingId,
      }).unwrap();

      setSelectedBooking(booking);
      setQrToken(result.qrToken);

      setStep('qr');
    } catch {
      // RTK Query exposes the error.
    }
  };

  // --------------------------------------------------
  // BACK TO BOOKINGS
  // --------------------------------------------------

  const handleBackToBookings = () => {
    setSelectedBooking(null);
    setQrToken(null);

    setStep('bookings');
  };

  // --------------------------------------------------
  // CHANGE EVENT
  // --------------------------------------------------

  const handleChangeEvent = () => {
    setEventId(null);
    setEmail('');
    setBookings([]);
    setSelectedBooking(null);
    setQrToken(null);

    setStep('event');
  };

  // --------------------------------------------------
  // SEARCH AGAIN
  // --------------------------------------------------

  const handleSearchAgain = () => {
    setBookings([]);
    setSelectedBooking(null);
    setQrToken(null);
    setEmail('');

    setStep('lookup');
  };

  // ==================================================
  // STEP 1
  // EVENT SELECTION
  // ==================================================

  if (step === 'event') {
    return (
      <Stack className={classes.container} gap="xl">
        <Stack gap={4}>
          <Title order={2}>Get Your Event Pass</Title>

          <Text c="dimmed">Select the event you booked for.</Text>
        </Stack>

        {isEventsError && (
          <Alert icon={<IconAlertCircle size={18} />} color="red">
            Unable to load events. Please try again later.
          </Alert>
        )}

        {isLoadingEvents ? (
          <Paper withBorder radius="lg" p="xl" className={classes.loadingCard}>
            <Loader />
          </Paper>
        ) : (
          <Stack gap="md">
            <Select
              label="Event"
              placeholder="Select your event"
              searchable
              clearable
              data={
                events?.map((event) => ({
                  value: event.id,
                  label: event.name,
                })) ?? []
              }
              value={eventId}
              onChange={handleEventChange}
            />

            <Text size="sm" c="dimmed">
              Select the event first, then enter the email address used during booking.
            </Text>
          </Stack>
        )}
      </Stack>
    );
  }

  // ==================================================
  // STEP 2
  // EMAIL LOOKUP
  // ==================================================

  if (step === 'lookup' && selectedEvent) {
    return (
      <Stack className={classes.container} gap="xl">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={2}>Get Your Event Pass</Title>

            <Text c="dimmed">Enter the email address used during booking.</Text>
          </Stack>

          <Button variant="subtle" onClick={handleChangeEvent}>
            Change Event
          </Button>
        </Group>

        <Paper withBorder radius="xl" p="xl">
          <Stack gap="lg">
            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Selected Event
              </Text>

              <Text fw={700} size="lg">
                {selectedEvent.name}
              </Text>
            </Stack>

            <TextInput
              label="Email used during booking"
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  void handleFindBookings();
                }
              }}
            />

            {findBookingsError && (
              <Alert icon={<IconAlertCircle size={18} />} color="red">
                {getErrorMessage(findBookingsError, 'Unable to find your bookings.')}
              </Alert>
            )}

            <Button
              fullWidth
              size="md"
              leftSection={<IconTicket size={18} />}
              loading={isFindingBookings}
              disabled={!email.trim()}
              onClick={() => void handleFindBookings()}
            >
              Find My Passes
            </Button>
          </Stack>
        </Paper>
      </Stack>
    );
  }

  // ==================================================
  // STEP 3
  // BOOKING LIST
  // ==================================================

  if (step === 'bookings' && selectedEvent) {
    return (
      <Stack className={classes.container} gap="xl">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={2}>Your Event Passes</Title>

            <Text c="dimmed">{selectedEvent.name}</Text>
          </Stack>

          <Button variant="subtle" onClick={handleSearchAgain}>
            Search Again
          </Button>
        </Group>

        <Text size="sm" c="dimmed">
          {bookings.length === 1
            ? 'We found 1 booking.'
            : `We found ${bookings.length} bookings. Select the pass you want to view.`}
        </Text>

        {bookings.length === 0 && (
          <Alert icon={<IconAlertCircle size={18} />} color="yellow">
            No confirmed bookings were found for this email and event.
          </Alert>
        )}

        <Stack gap="md">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              booking={booking}
              loading={isGettingQr && selectedBooking?.bookingId === booking.bookingId}
              onGetPass={handleGetPass}
            />
          ))}
        </Stack>
      </Stack>
    );
  }

  // ==================================================
  // STEP 4
  // QR + PDF
  // ==================================================

  if (step === 'qr' && selectedEvent && selectedBooking && qrToken) {
    // -----------------------------------------------
    // WAIT FOR COMPLETE EVENT
    // -----------------------------------------------

    if (isLoadingEventDetails) {
      return (
        <Stack className={classes.container} align="center" justify="center" gap="md">
          <Loader />

          <Text c="dimmed">Preparing your event pass...</Text>
        </Stack>
      );
    }

    // -----------------------------------------------
    // EVENT ERROR
    // -----------------------------------------------

    if (isEventDetailsError || !eventDetails) {
      return (
        <Stack className={classes.container} gap="md">
          <Alert icon={<IconAlertCircle size={18} />} color="red">
            Unable to load the event details required for your ticket.
          </Alert>

          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleBackToBookings}
          >
            Back to Passes
          </Button>
        </Stack>
      );
    }

    const attendees = getBookingAttendees(selectedBooking);

    // -----------------------------------------------
    // PDF DATA
    // -----------------------------------------------

    const ticketData: EventTicketData = {
      event: {
        id: eventDetails.id,
        name: eventDetails.name,

        date: eventDetails.startDate,
        startTime: eventDetails.startDate,
        endTime: eventDetails.endDate,

        venue: eventDetails.location.venue,
        address: eventDetails.location.address,

        contactPhone: config.global.supportContact,
        contactEmail: config.global.supportEmail,
        website: config.global.website,

        logoUrl: config.global.logoPng.logoIconLight,

        notices: eventDetails.registration?.notices?.map((notice) => notice.message) ?? [],

        schedule: eventDetails.schedule.map((item) => ({
          time: formatEventScheduleTime(item.time),
          title: item.title,
          description: item.description ?? '',
        })),
      },

      booking: selectedBooking,
      qrToken,
    };

    // -----------------------------------------------
    // QR / PASS PAGE
    // -----------------------------------------------

    return (
      <Stack className={classes.container} gap="xl">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={handleBackToBookings}
          className={classes.backButton}
        >
          Back to Passes
        </Button>

        <Paper withBorder radius="xl" p="xl">
          <Stack align="center" gap="lg">
            {/* EVENT HEADER */}

            <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                Event Pass
              </Text>

              <Title order={2} ta="center">
                {eventDetails.name}
              </Title>

              <Text size="sm" fw={600}>
                {selectedBooking.bookingId}
              </Text>
            </Stack>

            {/* QR */}

            <Paper withBorder radius="md" p="lg">
              <EventQrCode value={qrToken} size={260} imageUrl={config.global.logo.logoIconLight} />
            </Paper>

            <Text size="sm" c="dimmed" ta="center">
              Keep this QR code ready for entry at the event.
            </Text>

            <Divider w="100%" />

            {/* ATTENDEES */}

            <Stack gap="xs" w="100%">
              <Text fw={600}>Attendees</Text>

              {attendees.map((attendee, index) => (
                <Group
                  key={attendee.id ?? `${selectedBooking.bookingId}-${index}`}
                  justify="space-between"
                >
                  <Text size="sm">{attendee.name}</Text>

                  <Badge size="sm" variant="light">
                    {getAttendeeTypeLabel(attendee.type)}
                  </Badge>
                </Group>
              ))}
            </Stack>

            <Divider w="100%" />

            {/* PDF DOWNLOAD */}

            <Suspense
              fallback={
                <Button fullWidth loading>
                  Preparing download...
                </Button>
              }
            >
              <EventTicketDownload data={ticketData} />
            </Suspense>
          </Stack>
        </Paper>

        {getBookingQrError && (
          <Alert icon={<IconAlertCircle size={18} />} color="red">
            {getErrorMessage(getBookingQrError, 'Unable to retrieve your event pass.')}
          </Alert>
        )}
      </Stack>
    );
  }

  return null;
}

export default Tickets;
