import { useEffect, useState } from 'react';

import {
  Button,
  Card,
  Divider,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import type { Gender, Ticket } from '@mk/types';
import { IconArrowLeft, IconUser } from '@tabler/icons-react';

import styles from './AttendeeStep.module.scss';

export interface AttendeeStepValue {
  stage: 'ATTENDEES';
  attendees: {
    reservationTicketId: string;
    name: string;
    age: number;
    gender: Gender;
  }[];
}

type ExistingAttendee = {
  reservationTicketId: string;
  name: string;
  age: number;
  gender: Gender;
};

interface AttendeeStepProps {
  tickets: Ticket[];
  value?: AttendeeStepValue | null;
  selectedTickets?: Array<{ ticketId: string; quantity: number }> | null;
  existingAttendees?: ExistingAttendee[] | null;
  onContinue: (value: AttendeeStepValue) => void;
  onBack: () => void;
  onSave: (value: AttendeeStepValue) => void;
  loading?: boolean;
}

interface AttendeeForm {
  reservationTicketId: string;
  name: string;
  age: number;
  gender: Gender;
}

export function AttendeeStep({
  tickets,
  value,
  selectedTickets = [],
  existingAttendees,
  onContinue,
  onBack,
  onSave,
  loading = false,
}: AttendeeStepProps) {
  const {
    sections: { attendeeStep },
  } = usePageConfig('registration');
  const genderOptions = attendeeStep.genderOptions;
  const [attendees, setAttendees] = useState<AttendeeForm[]>(value?.attendees ?? []);
  const normalizedSelectedTickets = selectedTickets ?? [];

  const resolveTicketId = (reservationTicketId: string) => {
    const matchingTicket = tickets.find(
      (ticket) =>
        ticket.id === reservationTicketId ||
        ticket.id === reservationTicketId ||
        ticket.id === reservationTicketId
    );

    return matchingTicket?.id ?? reservationTicketId;
  };

  const normalizeAttendee = (attendee: {
    reservationTicketId: string;
    name: string;
    age: number;
    gender: Gender;
  }) => ({
    ...attendee,
    reservationTicketId: resolveTicketId(attendee.reservationTicketId),
  });

  const buildDefaultAttendees = () => {
    const attendeesByTicket = new Map<string, ExistingAttendee[]>();

    existingAttendees?.forEach((attendee) => {
      const current = attendeesByTicket.get(attendee.reservationTicketId) ?? [];
      current.push(attendee);
      attendeesByTicket.set(attendee.reservationTicketId, current);
    });

    const reservationTicketIdByTicketId = new Map<string, string>();
    const reservationTicketRows =
      value?.attendees?.length || existingAttendees?.length
        ? (value?.attendees ?? existingAttendees ?? [])
        : [];

    reservationTicketRows.forEach((attendee) => {
      const ticket = tickets.find((item) => item.id === attendee.reservationTicketId);
      if (ticket) {
        reservationTicketIdByTicketId.set(ticket.id, attendee.reservationTicketId);
      }
    });

    const generated: AttendeeForm[] = [];

    normalizedSelectedTickets.forEach(({ ticketId, quantity }) => {
      const matchingTicket = tickets.find((ticket) => ticket.id === ticketId);
      const existingForTicket = attendeesByTicket.get(ticketId) ?? [];
      const reservationTicketId = reservationTicketIdByTicketId.get(ticketId) ?? ticketId;

      if (!matchingTicket || quantity <= 0) {
        return;
      }

      for (let index = 0; index < quantity; index += 1) {
        const attendee = existingForTicket[index];
        generated.push({
          reservationTicketId,
          name: attendee?.name ?? '',
          age: attendee?.age ?? 0,
          gender: attendee?.gender ?? 'Male',
        });
      }
    });

    return generated;
  };

  const sourceAttendees = (() => {
    if (value?.attendees?.length) {
      return value.attendees.map(normalizeAttendee);
    }

    if (existingAttendees?.length) {
      return existingAttendees.map((attendee) =>
        normalizeAttendee({
          reservationTicketId: attendee.reservationTicketId,
          name: attendee.name,
          age: attendee.age,
          gender: attendee.gender,
        })
      );
    }

    if (normalizedSelectedTickets.length) {
      return buildDefaultAttendees();
    }

    return [];
  })();

  useEffect(() => {
    setAttendees((current) => {
      const currentSignature = JSON.stringify(current);
      const nextSignature = JSON.stringify(sourceAttendees);

      if (currentSignature === nextSignature) {
        return current;
      }

      if (current.length === 0 && sourceAttendees.length > 0) {
        return sourceAttendees;
      }

      if (sourceAttendees.length === 0) {
        return current;
      }

      const hasUnsavedEdits = current.some((entry, index) => {
        const sourceEntry = sourceAttendees[index];

        if (!sourceEntry) {
          return true;
        }

        return (
          entry.name !== sourceEntry.name ||
          entry.age !== sourceEntry.age ||
          entry.gender !== sourceEntry.gender ||
          entry.reservationTicketId !== sourceEntry.reservationTicketId
        );
      });

      return hasUnsavedEdits ? current : sourceAttendees;
    });
  }, [sourceAttendees]);

  const updateAttendee = <K extends keyof AttendeeForm>(
    index: number,
    field: K,
    fieldValue: AttendeeForm[K]
  ) => {
    setAttendees((current) =>
      current.map((attendee, attendeeIndex) =>
        attendeeIndex === index
          ? {
              ...attendee,
              [field]: fieldValue,
            }
          : attendee
      )
    );
  };

  const output: AttendeeStepValue = {
    stage: 'ATTENDEES',
    attendees,
  };

  const hasValidAttendeeData =
    attendees.length > 0 && attendees.every((attendee) => attendee.name.trim().length > 0);

  const groupedAttendees = tickets
    .filter((ticket) => attendees.some((attendee) => attendee.reservationTicketId === ticket.id))
    .map((ticket) => ({
      ticket,
      attendees: attendees.filter((attendee) => attendee.reservationTicketId === ticket.id),
    }));

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
                {attendeeStep.backLabel}
              </Button>
            </section>

            <Title order={2}>{attendeeStep.title}</Title>

            <Text size="sm" c="dimmed">
              {attendeeStep.description}
            </Text>
          </Stack>

          <Stack gap="lg">
            {groupedAttendees.map(({ ticket, attendees: groupAttendees }) => (
              <div key={ticket.id} className={styles.groupSection}>
                <Group justify="space-between" align="center" className={styles.groupHeader}>
                  <Group gap="xs" align="center">
                    <div className={styles.icon}>
                      <IconUser size={17} />
                    </div>

                    <Text fw={700}>{ticket.attendeeType || attendeeStep.attendeeLabel}</Text>
                  </Group>

                  <Text size="xs" c="dimmed">
                    {groupAttendees.length}{' '}
                    {groupAttendees.length === 1
                      ? attendeeStep.personLabel
                      : attendeeStep.peopleLabel}
                  </Text>
                </Group>

                <Divider className={styles.groupDivider} />

                <Stack gap="md">
                  {groupAttendees.map((attendee, attendeeIndex) => {
                    const absoluteIndex = attendees.findIndex((item) => item === attendee);

                    return (
                      <div key={`${attendee.reservationTicketId}-${absoluteIndex}`} className={styles.attendee}>
                        <Stack gap="md">
                          <Text fw={600}>Attendee {attendeeIndex + 1}</Text>

                          <TextInput
                            label={attendeeStep.fullNameLabel}
                            placeholder={attendeeStep.fullNamePlaceholder}
                            required
                            value={attendee.name}
                            onChange={(event) =>
                              updateAttendee(absoluteIndex, 'name', event.currentTarget.value)
                            }
                          />

                          <Group grow align="flex-start">
                            <NumberInput
                              label={attendeeStep.ageLabel}
                              placeholder={attendeeStep.agePlaceholder}
                              min={1}
                              max={120}
                              value={attendee.age}
                              onChange={(value) =>
                                updateAttendee(absoluteIndex, 'age', Number(value) || 0)
                              }
                            />

                            <Select
                              label={attendeeStep.genderLabel}
                              data={genderOptions}
                              value={attendee.gender}
                              searchable
                              nothingFoundMessage={attendeeStep.genderNotFoundMessage}
                              onChange={(value) =>
                                updateAttendee(absoluteIndex, 'gender', (value ?? 'Male') as Gender)
                              }
                            />
                          </Group>
                        </Stack>
                      </div>
                    );
                  })}
                </Stack>
              </div>
            ))}
          </Stack>

          <div className={styles.footer}>
            <Button
              variant="light"
              onClick={() => onSave(output)}
              disabled={loading || !hasValidAttendeeData}
            >
              {attendeeStep.saveLabel}
            </Button>

            <Button
              loading={loading}
              disabled={loading || !hasValidAttendeeData}
              onClick={() => onContinue(output)}
            >
              {attendeeStep.continueLabel}
            </Button>
          </div>
        </Stack>
      </Card>
    </div>
  );
}

export default AttendeeStep;
