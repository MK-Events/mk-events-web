import { Button, Card, Divider, Stack, Text, Title } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import { IconArrowLeft, IconCalendarOff, IconRefresh, IconTicketOff } from '@tabler/icons-react';

import styles from './ReservationCancelled.module.scss';

interface ReservationCancelledProps {
  bookingId?: string | null;
  eventName?: string;
  cancelledAt?: string;
  onStartAgain: () => void;
  onGoBack: () => void;
}

export function ReservationCancelled({
  bookingId,
  eventName,
  cancelledAt,
  onStartAgain,
  onGoBack,
}: ReservationCancelledProps) {
  const {
    sections: { reservationCancelled },
  } = usePageConfig('registration');
  const formattedCancelledAt = cancelledAt
    ? new Date(cancelledAt).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  return (
    <div className={styles.wrapper}>
      <Card withBorder radius="xl" className={styles.card}>
        <Stack align="center" gap="lg">
          <div className={styles.icon}>
            <IconTicketOff size={34} />
          </div>

          <Stack align="center" gap={4}>
            <Title order={1} ta="center">
              {reservationCancelled.title}
            </Title>

            <Text size="sm" c="dimmed" ta="center" maw={500}>
              {reservationCancelled.description}
            </Text>
          </Stack>

          {(bookingId || eventName) && (
            <>
              <Divider w="100%" />

              <Stack gap="md" w="100%">
                {eventName && (
                  <div className={styles.detail}>
                    <IconCalendarOff size={19} />

                    <div>
                      <Text size="xs" c="dimmed">
                        {reservationCancelled.eventLabel}
                      </Text>

                      <Text size="sm" fw={600}>
                        {eventName}
                      </Text>
                    </div>
                  </div>
                )}

                {bookingId && (
                  <div className={styles.bookingId}>
                    <Text size="xs" c="dimmed">
                      {reservationCancelled.reservationIdLabel}
                    </Text>

                    <Text fw={700} ff="monospace">
                      {bookingId}
                    </Text>
                  </div>
                )}

                {formattedCancelledAt && (
                  <Text size="xs" c="dimmed" ta="center">
                    {reservationCancelled.cancelledOnLabel} {formattedCancelledAt}
                  </Text>
                )}
              </Stack>
            </>
          )}

          <Stack gap="sm" w="100%" mt="sm">
            <Button
              size="md"
              radius="xl"
              fullWidth
              leftSection={<IconRefresh size={18} />}
              onClick={onStartAgain}
            >
              {reservationCancelled.startAgainLabel}
            </Button>

            <Button
              variant="subtle"
              color="gray"
              fullWidth
              leftSection={<IconArrowLeft size={17} />}
              onClick={onGoBack}
            >
              {reservationCancelled.backToEventLabel}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

export default ReservationCancelled;
