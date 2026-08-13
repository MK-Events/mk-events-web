import { useEffect, useState } from 'react';

import { Badge, Button, Card, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import {
  IconCalendar,
  IconCheck,
  IconDownload,
  IconMapPin,
  IconTicket,
  IconUser,
} from '@tabler/icons-react';

import styles from './PaymentSuccess.module.scss';

interface BookingResult {
  booking: {
    bookingId: string;
    bookedAt?: string;
    email?: string | null;
  };
  event?: {
    name?: string;
    startDate?: string;
    endDate?: string;
    location?: {
      venue?: string;
      city?: string;
    };
  };
}

interface PaymentSuccessProps {
  bookingResult: BookingResult;
  qrToken?: string | null;
  onViewTickets: () => void;
  onBookAgain: () => void;
}

export function PaymentSuccess({
  bookingResult,
  qrToken,
  onViewTickets,
  onBookAgain,
}: PaymentSuccessProps) {
  const {
    sections: { paymentSuccess },
  } = usePageConfig('registration');
  const [savedQrToken, setSavedQrToken] = useState<string | null>(qrToken ?? null);

  useEffect(() => {
    setSavedQrToken(qrToken ?? null);
  }, [qrToken]);

  const { booking } = bookingResult;

  const event = bookingResult.event;

  const formattedDate = event?.startDate
    ? new Date(event.startDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const formattedTime = event?.startDate
    ? new Date(event.startDate).toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  return (
    <div className={styles.wrapper}>
      <Card withBorder radius="xl" className={styles.card}>
        <Stack align="center" gap="lg">
          <div className={styles.successIcon}>
            <IconCheck size={34} stroke={2.5} />
          </div>

          <Stack align="center" gap={4}>
            <Badge color="green" variant="light" size="lg" leftSection={<IconCheck size={14} />}>
              {paymentSuccess.badge}
            </Badge>

            <Title order={1} ta="center">
              {paymentSuccess.title}
            </Title>

            <Text c="dimmed" ta="center" maw={520}>
              {paymentSuccess.description}
            </Text>
          </Stack>

          <div className={styles.bookingId}>
            <Text size="xs" c="dimmed" ta="center">
              {paymentSuccess.bookingIdLabel}
            </Text>

            <Text fw={800} size="xl" ta="center" ff="monospace">
              {booking.bookingId}
            </Text>
          </div>

          <Divider w="100%" />

          {event && (
            <Stack gap="md" w="100%">
              <Text fw={700}>{paymentSuccess.detailsTitle}</Text>

              <div className={styles.details}>
                {event.name && (
                  <Group gap="sm" wrap="nowrap">
                    <IconTicket size={19} className={styles.detailIcon} />

                    <div>
                      <Text size="xs" c="dimmed">
                        {paymentSuccess.eventLabel}
                      </Text>

                      <Text size="sm" fw={600}>
                        {event.name}
                      </Text>
                    </div>
                  </Group>
                )}

                {formattedDate && (
                  <Group gap="sm" wrap="nowrap">
                    <IconCalendar size={19} className={styles.detailIcon} />

                    <div>
                      <Text size="xs" c="dimmed">
                        {paymentSuccess.dateTimeLabel}
                      </Text>

                      <Text size="sm" fw={600}>
                        {formattedDate}
                        {formattedTime && ` · ${formattedTime}`}
                      </Text>
                    </div>
                  </Group>
                )}

                {event.location?.venue && (
                  <Group gap="sm" wrap="nowrap">
                    <IconMapPin size={19} className={styles.detailIcon} />

                    <div>
                      <Text size="xs" c="dimmed">
                        {paymentSuccess.venueLabel}
                      </Text>

                      <Text size="sm" fw={600}>
                        {event.location.venue}
                        {event.location.city && `, ${event.location.city}`}
                      </Text>
                    </div>
                  </Group>
                )}

                {booking.email && (
                  <Group gap="sm" wrap="nowrap">
                    <IconUser size={19} className={styles.detailIcon} />

                    <div>
                      <Text size="xs" c="dimmed">
                        {paymentSuccess.confirmationLabel}
                      </Text>

                      <Text size="sm" fw={600}>
                        {booking.email}
                      </Text>
                    </div>
                  </Group>
                )}
              </div>
            </Stack>
          )}

          <Stack gap="sm" w="100%" mt="sm">
            {savedQrToken && (
              <Text size="xs" c="dimmed" ta="center">
                {paymentSuccess.qrReadyMessage}
              </Text>
            )}

            <Button
              size="md"
              radius="xl"
              fullWidth
              leftSection={<IconDownload size={18} />}
              onClick={onViewTickets}
            >
              {paymentSuccess.viewTicketsLabel}
            </Button>

            <Button variant="light" size="md" radius="xl" fullWidth onClick={onBookAgain}>
              {paymentSuccess.bookAgainLabel}
            </Button>

            <Text size="xs" c="dimmed" ta="center">
              {paymentSuccess.referenceMessage}
            </Text>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

export default PaymentSuccess;
