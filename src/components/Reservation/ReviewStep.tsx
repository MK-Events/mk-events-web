import { Button, Card, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import type { ReservationResponse } from '@mk/types';
import {
  IconArrowLeft,
  IconAt,
  IconCheck,
  IconPhone,
  IconTicket,
  IconUser,
} from '@tabler/icons-react';

import styles from './ReviewStep.module.scss';

interface ReviewStepProps {
  data: ReservationResponse;
  onBack: () => void;
  onMakePayment: () => void;
  loading?: boolean;
}

export function ReviewStep({ data, onBack, onMakePayment, loading = false }: ReviewStepProps) {
  const {
    sections: { reviewStep },
  } = usePageConfig('registration');
  const { reservation, summary } = data;
  const contact = reservation.contact;

  return (
    <div className={styles.wrapper}>
      <Card withBorder radius="xl" className={styles.card}>
        <Stack gap="xl">
          <Stack gap={4}>
            <section className={styles.backButton}>
              <Button
                variant="subtle"
                color="gray"
                leftSection={<IconArrowLeft size={17} />}
                onClick={onBack}
                disabled={loading}
              >
                {reviewStep.backLabel}
              </Button>
            </section>

            <Title order={2}>{reviewStep.title}</Title>

            <Text size="sm" c="dimmed">
              {reviewStep.description}
            </Text>
          </Stack>

          {/* Contact */}
          {contact && (
            <Stack gap="sm">
              <Group gap="xs">
                <IconUser size={18} />
                <Text fw={700}>{reviewStep.contactSectionTitle}</Text>
              </Group>

              <div className={styles.section}>
                <Text fw={600}>{contact.name}</Text>

                <Group gap="lg">
                  <Group gap={6}>
                    <IconPhone size={15} />
                    <Text size="sm" c="dimmed">
                      {contact.phone}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <IconAt size={15} />
                    <Text size="sm" c="dimmed">
                      {contact.email}
                    </Text>
                  </Group>
                </Group>

                <Text size="sm" c="dimmed">
                  {contact.age} years · {contact.gender}
                </Text>
              </div>
            </Stack>
          )}

          {/* Tickets */}
          <Stack gap="sm">
            <Group gap="xs">
              <IconTicket size={18} />
              <Text fw={700}>{reviewStep.selectedTicketsSectionTitle}</Text>
            </Group>

            <div className={styles.section}>
              <Stack gap="sm">
                {summary.ticketBreakdown.map((ticket) => (
                  <Group key={ticket.reservationTicketId} justify="space-between" align="center">
                    <div>
                      <Text size="sm" fw={600}>
                        {ticket.ticketName}
                      </Text>

                      <Text size="xs" c="dimmed">
                        ₹{ticket.unitPrice.toLocaleString('en-IN')} × {ticket.quantity}
                      </Text>
                    </div>

                    <Text fw={600}>₹{ticket.amount.toLocaleString('en-IN')}</Text>
                  </Group>
                ))}
              </Stack>
            </div>
          </Stack>

          {/* Attendees */}
          <Stack gap="sm">
            <Group gap="xs">
              <IconUser size={18} />
              <Text fw={700}>{reviewStep.attendeesSectionTitle}</Text>
            </Group>

            <div className={styles.section}>
              <Stack gap="sm">
                {reservation.attendees.map((attendee) => (
                  <Group key={attendee.id} justify="space-between">
                    <div>
                      <Text size="sm" fw={600}>
                        {attendee.name}
                      </Text>

                      <Text size="xs" c="dimmed">
                        {attendee.type} · {attendee.age} years · {attendee.gender}
                      </Text>
                    </div>

                    <IconCheck size={18} className={styles.check} />
                  </Group>
                ))}
              </Stack>
            </div>
          </Stack>

          {/* Amount */}
          <div className={styles.total}>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">{reviewStep.subtotalLabel}</Text>

                <Text size="sm">₹{summary.subtotal.toLocaleString('en-IN')}</Text>
              </Group>

              {summary.discount > 0 && (
                <Group justify="space-between">
                  <Text size="sm">{reviewStep.discountLabel}</Text>

                  <Text size="sm">
                    -₹
                    {summary.discount.toLocaleString('en-IN')}
                  </Text>
                </Group>
              )}

              <Divider />

              <Group justify="space-between">
                <Text fw={700}>{reviewStep.totalLabel}</Text>

                <Text fw={800} size="xl">
                  ₹{summary.total.toLocaleString('en-IN')}
                </Text>
              </Group>
            </Stack>
          </div>

          <div className={styles.footer}>
            <Button loading={loading} onClick={onMakePayment}>
              {reviewStep.makePaymentLabel}
            </Button>
          </div>
        </Stack>
      </Card>
    </div>
  );
}

export default ReviewStep;
