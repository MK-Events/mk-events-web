import { useEffect, useState } from 'react';

import { Button, Card, Stack, Text, Title } from '@mantine/core';
import { TicketPricing } from '@mk/components';
import { usePageConfig } from '@mk/hooks';
import type { Ticket } from '@mk/types';
import { IconArrowLeft } from '@tabler/icons-react';

import styles from './TicketStep.module.scss';

export interface TicketSelection {
  ticketId: string;
  quantity: number;
}

export interface TicketsStepValue {
  stage: 'TICKETS';
  tickets: TicketSelection[];
}

interface TicketsStepProps {
  tickets: Ticket[];
  value?: TicketsStepValue | null;
  onContinue: (value: TicketsStepValue) => void;
  onBack: () => void;
  onSave: (value: TicketsStepValue) => void;
  loading?: boolean;
}

export function TicketsStep({
  tickets,
  value,
  onContinue,
  onBack,
  onSave,
  loading = false,
}: TicketsStepProps) {
  const {
    sections: { ticketStep },
  } = usePageConfig('registration');
  const [selections, setSelections] = useState<TicketSelection[]>(value?.tickets ?? []);

  useEffect(() => {
    setSelections(value?.tickets ?? []);
  }, [value]);

  const getPaidChildCapacity = (selected: TicketSelection[] = selections) =>
    tickets.reduce((total, ticket) => {
      if (!ticket || ticket.price === 0 || ticket.attendeeType === 'Child') {
        return total;
      }

      const selectedQuantity = selected.find((item) => item.ticketId === ticket.id)?.quantity ?? 0;
      return total + (ticket.maxChild ?? 0) * selectedQuantity;
    }, 0);

  const getSelectedChildQuantity = (selected: TicketSelection[] = selections) =>
    selected.reduce((total, selection) => {
      const ticket = tickets.find((item) => item.id === selection.ticketId);

      if (!ticket || ticket.price !== 0 || ticket.attendeeType !== 'Child') {
        return total;
      }

      return total + selection.quantity;
    }, 0);

  const getChildTicketLimit = (selected: TicketSelection[] = selections, ticketId?: string) => {
    const currentSelection =
      selected.find((selection) => selection.ticketId === ticketId)?.quantity ?? 0;
    const otherChildQuantity = selected.reduce((total, selection) => {
      const ticket = tickets.find((item) => item.id === selection.ticketId);

      if (
        !ticket ||
        ticket.price !== 0 ||
        ticket.attendeeType !== 'Child' ||
        selection.ticketId === ticketId
      ) {
        return total;
      }

      return total + selection.quantity;
    }, 0);

    return Math.max(0, getPaidChildCapacity(selected) - otherChildQuantity + currentSelection);
  };

  const handleQuantityChange = (ticket: Ticket, quantity: number) => {
    setSelections((current) => {
      if (ticket.price === 0 && ticket.attendeeType === 'Child') {
        const maxAllowedForThisTicket = getChildTicketLimit(current, ticket.id);
        const nextQuantity = Math.max(0, Math.min(quantity, maxAllowedForThisTicket));

        if (nextQuantity === 0) {
          return current.filter((item) => item.ticketId !== ticket.id);
        }

        const updated = current.some((item) => item.ticketId === ticket.id)
          ? current.map((item) =>
              item.ticketId === ticket.id ? { ...item, quantity: nextQuantity } : item
            )
          : [...current, { ticketId: ticket.id, quantity: nextQuantity }];

        return updated.filter((item) => item.quantity > 0);
      }

      const nextQuantity = Math.max(0, Math.min(quantity, ticket.maxPerBooking));
      const nextSelections =
        nextQuantity === 0
          ? current.filter((item) => item.ticketId !== ticket.id)
          : current.some((item) => item.ticketId === ticket.id)
            ? current.map((item) =>
                item.ticketId === ticket.id ? { ...item, quantity: nextQuantity } : item
              )
            : [...current, { ticketId: ticket.id, quantity: nextQuantity }];

      const childCapacity = getPaidChildCapacity(nextSelections);
      const selectedChildQuantity = getSelectedChildQuantity(nextSelections);

      return nextSelections.map((selection) => {
        const matchingTicket = tickets.find((item) => item.id === selection.ticketId);

        if (
          !matchingTicket ||
          matchingTicket.price !== 0 ||
          matchingTicket.attendeeType !== 'Child'
        ) {
          return selection;
        }

        const remainingCapacity = Math.max(
          0,
          childCapacity - selectedChildQuantity + selection.quantity
        );
        return {
          ...selection,
          quantity: Math.min(selection.quantity, remainingCapacity),
        };
      });
    });
  };

  const output: TicketsStepValue = {
    stage: 'TICKETS',
    tickets: selections,
  };

  const totalQuantity = selections.reduce((sum, item) => sum + item.quantity, 0);

  const getSelectedTickets: Ticket[] = selections
    .map((selection) => tickets.find((ticket) => ticket.id === selection.ticketId))
    .filter((ticket): ticket is Ticket => ticket !== undefined);

  const selectedTicket = getSelectedTickets[0] ?? null;

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
                {ticketStep.backLabel}
              </Button>
            </section>

            <Title order={2}>{ticketStep.title}</Title>

            <Text size="sm" c="dimmed">
              {ticketStep.description}
            </Text>
          </Stack>

          <TicketPricing
            tickets={tickets}
            type="All"
            selectable
            selectedTicket={selectedTicket}
            selectedTickets={selections}
            onTicketQuantityChange={handleQuantityChange}
            onTicketSelect={(ticket) => {
              const currentSelection = selections.find((item) => item.ticketId === ticket.id);
              handleQuantityChange(ticket, currentSelection ? 0 : 1);
            }}
          />

          <div className={styles.summary}>
            <Text size="sm" c="dimmed">
              {ticketStep.summaryLabel}
            </Text>

            <Text fw={700}>{totalQuantity}</Text>
          </div>

          <div className={styles.footer}>
            <Button
              variant="light"
              onClick={() => onSave(output)}
              disabled={loading || selections.length === 0}
            >
              {ticketStep.saveLabel}
            </Button>

            <Button
              loading={loading}
              disabled={loading || selections.length === 0}
              onClick={() => onContinue(output)}
            >
              {ticketStep.continueLabel}
            </Button>
          </div>
        </Stack>
      </Card>
    </div>
  );
}

export default TicketsStep;
