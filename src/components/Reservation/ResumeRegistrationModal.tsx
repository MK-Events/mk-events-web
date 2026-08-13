import { useState } from 'react';

import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import type { ReservationResponse } from '@mk/types';

import styles from './ResumeRegistrationModal.module.scss';

interface ResumeRegistrationModalProps {
  reservation: ReservationResponse | null;
  onContinue: () => void;
  onStartFresh: () => void;
  loading?: boolean;
}

export function ResumeRegistrationModal({
  reservation,
  onContinue,
  onStartFresh,
  loading = false,
}: ResumeRegistrationModalProps) {
  const config = usePageConfig('registration');
  const [closed, setClosed] = useState(false);

  const opened = Boolean(reservation) && !closed;

  if (!reservation) {
    return null;
  }

  const { reservation: data, summary } = reservation;
  const currentStage = summary?.stage ?? data?.stage ?? 'WELCOME';
  const ticketBreakdown = summary?.ticketBreakdown ?? [];
  const attendees = data?.attendees ?? [];

  const handleContinue = () => {
    setClosed(true);
    onContinue();
  };

  const handleStartFresh = () => {
    setClosed(true);
    onStartFresh();
  };

  const handleClose = () => {
    setClosed(true);
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      size="md"
      title={config.sections.resumeProgress.modalTitle}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          {config.sections.resumeProgress.continueUserQuery}
        </Text>

        <div className={styles.info}>
          <Text size="sm">
            <strong>{config.sections.resumeProgress.currentStepLabel}</strong>{' '}
            {config.sections.resumeProgress.stageLabels[currentStage] ?? 'Welcome'}
          </Text>

          {ticketBreakdown.length > 0 && (
            <Stack gap={4} mt="xs">
              <Text size="sm" fw={600}>
                {config.common.ticketsLabel}
              </Text>

              {ticketBreakdown.map((ticket) => (
                <Group key={ticket.reservationTicketId} justify="space-between">
                  <Text size="sm">
                    {ticket.ticketName} × {ticket.quantity}
                  </Text>

                  <Text size="sm">₹{(ticket.amount ?? 0).toLocaleString('en-IN')}</Text>
                </Group>
              ))}

              <Group justify="space-between" mt={4}>
                <Text size="sm" fw={700}>
                  {config.common.totalLabel}
                </Text>

                <Text size="sm" fw={700}>
                  ₹{(summary?.total ?? 0).toLocaleString('en-IN')}
                </Text>
              </Group>
            </Stack>
          )}

          {attendees.length > 0 && (
            <Stack gap={4} mt="xs">
              <Text size="sm" fw={600}>
                {config.common.attendeeLabel}
              </Text>

              {attendees.map((attendee) => (
                <Text key={attendee.id} size="sm">
                  {attendee.name} ({attendee.type})
                </Text>
              ))}
            </Stack>
          )}
        </div>

        <Group justify="space-between" mt="sm">
          <Button variant="subtle" color="gray" onClick={handleStartFresh} disabled={loading}>
            {config.common.startFreshLabel}
          </Button>

          <Button onClick={handleContinue} loading={loading}>
            {config.common.continueLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default ResumeRegistrationModal;
