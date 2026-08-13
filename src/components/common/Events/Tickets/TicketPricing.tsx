import {
  Button,
  Center,
  Divider,
  Group,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useAppConfig } from '@mk/hooks';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import type { Ticket, TicketFilterOptions } from '@mk/types';
import { IconCheck, IconCircleCheckFilled, IconInfoCircle } from '@tabler/icons-react';

import classes from './TicketPricing.module.scss';

interface TicketPricingProps {
  tickets: Ticket[];
  type: TicketFilterOptions;
  selectable?: boolean;
  selectedTicket?: Ticket | null;
  selectedTickets?: Array<{ ticketId: string; quantity: number }>;
  onTicketSelect?: (ticket: Ticket) => void;
  onTicketQuantityChange?: (ticket: Ticket, quantity: number) => void;
}

interface TicketCardProps {
  ticket: Ticket;
  selectable?: boolean;
  selected?: boolean;
  selectedQuantity?: number;
  maxQuantity?: number;
  soldOut?: boolean;
  onSelect?: (ticket: Ticket) => void;
  onQuantityChange?: (ticket: Ticket, quantity: number) => void;
}

function TicketCard({
  ticket,
  selectable,
  selected,
  selectedQuantity = 0,
  maxQuantity,
  soldOut = false,
  onSelect,
  onQuantityChange,
}: TicketCardProps) {
  const pageConfig = usePageConfig('eventDetails');
  const includedBenefits = ticket.includedBenefits;
  const config = useAppConfig();

  return (
    <Paper
      withBorder
      radius="xl"
      p="lg"
      className={`${classes.ticket} ${selected ? classes.selected : ''} ${
        selectable ? classes.selectable : ''
      } ${soldOut ? classes.soldOut : ''}`}
      onClick={() => selectable && !soldOut && onSelect?.(ticket)}
      style={{
        cursor: selectable && !soldOut ? 'default' : 'not-allowed',
      }}
    >
      <Stack gap="md" h="100%">
        {/* Header */}
        <Stack gap={4} align="center">
          <Title order={3}>
            {ticket.attendeeType ? config.event.attendeeLabels[ticket.attendeeType] : 'General'}
          </Title>

          <Text c="dimmed" size="sm">
            {pageConfig.misc.eventPassLabel}
          </Text>
        </Stack>

        {/* Price */}
        <Center>
          <Stack gap={0} align="center">
            <Text fw={800} fz={40} c="var(--mantine-primary-color-filled)">
              {ticket.price === 0 ? 'FREE' : `₹${ticket.price.toLocaleString('en-IN')}`}
            </Text>

            <Text size="sm" c="dimmed">
              {pageConfig.misc.perPersonLabel}
            </Text>
          </Stack>
        </Center>

        <Divider variant="dashed" />

        {/* Benefits */}
        <Stack gap="xs">
          <List
            spacing="sm"
            icon={
              <ThemeIcon size={20} radius="xl" color="green" variant="light">
                <IconCheck size={14} />
              </ThemeIcon>
            }
          >
            {includedBenefits.map((benefit) => (
              <List.Item key={benefit}>
                <Text size="sm">{benefit}</Text>
              </List.Item>
            ))}
          </List>
        </Stack>

        {/* Requirements */}
        {ticket.requirements?.length ? (
          <>
            <Divider variant="dashed" />

            <Stack gap="xs">
              <Group gap={6} align="center">
                <ThemeIcon size={18} variant="transparent" color="blue">
                  <IconInfoCircle size={16} />
                </ThemeIcon>
                <Text fw={600} size="sm">
                  {pageConfig.misc.noteLabel}
                </Text>
              </Group>

              <List spacing={4} size="xs">
                {ticket.requirements.map((requirement) => (
                  <List.Item key={requirement}>{requirement}</List.Item>
                ))}
              </List>
            </Stack>
          </>
        ) : null}

        <div style={{ flex: 1 }} />

        {/* Footer */}
        {selectable && (
          <>
            <Divider variant="dashed" />

            <Stack gap="xs">
              {soldOut ? (
                <Group justify="space-between" align="center" style={{ minHeight: 42 }}>
                  <Text size="sm" fw={700} c="red">
                    Sold Out
                  </Text>

                  <Group gap={6} opacity={0.7}>
                    <Button variant="light" size="compact-sm" radius="xl" disabled>
                      -
                    </Button>
                    <Button variant="light" size="compact-sm" radius="xl" disabled>
                      Select
                    </Button>
                    <Button variant="light" size="compact-sm" radius="xl" disabled>
                      +
                    </Button>
                  </Group>
                </Group>
              ) : (
                <Group justify="space-between" align="center">
                  <Text size="sm" fw={600}>
                    {selectedQuantity > 0
                      ? `Selected: ${selectedQuantity} / Max: ${maxQuantity ?? 0}`
                      : `Select quantity (Max: ${maxQuantity ?? 0})`}
                  </Text>

                  <Group gap={6}>
                    <Button
                      variant="light"
                      size="compact-sm"
                      radius="xl"
                      disabled={selectedQuantity === 0 || soldOut}
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuantityChange?.(ticket, Math.max(0, selectedQuantity - 1));
                      }}
                    >
                      -
                    </Button>

                    <Button
                      variant={selected ? 'filled' : 'light'}
                      size="compact-sm"
                      radius="xl"
                      leftSection={selected ? <IconCircleCheckFilled size={16} /> : undefined}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect?.(ticket);
                      }}
                      disabled={
                        soldOut || selectedQuantity >= (maxQuantity ?? Number.MAX_SAFE_INTEGER)
                      }
                    >
                      {selected ? 'Selected' : 'Select'}
                    </Button>

                    <Button
                      variant="light"
                      size="compact-sm"
                      radius="xl"
                      disabled={
                        soldOut || selectedQuantity >= (maxQuantity ?? Number.MAX_SAFE_INTEGER)
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuantityChange?.(
                          ticket,
                          Math.min(maxQuantity ?? Number.MAX_SAFE_INTEGER, selectedQuantity + 1)
                        );
                      }}
                    >
                      +
                    </Button>
                  </Group>
                </Group>
              )}

              {maxQuantity !== undefined && maxQuantity <= 0 && !soldOut ? (
                <Text size="xs" c="red">
                  This ticket is restricted by the current selection rules.
                </Text>
              ) : null}
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
}

export function TicketPricing({
  tickets,
  type,
  selectable = false,
  selectedTicket,
  selectedTickets = [],
  onTicketSelect,
  onTicketQuantityChange,
}: TicketPricingProps) {
  const config = usePageConfig('eventDetails');
  const filteredTickets = tickets.filter((ticket) => {
    switch (type) {
      case 'Free':
        return ticket.price === 0;

      case 'Paid':
        return ticket.price > 0;

      case 'All':
      default:
        return true;
    }
  });

  return (
    <Stack gap={'xl'}>
      <Title order={2}>{config.sections.tickets.title}</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
        {filteredTickets.map((ticket) => {
          const isSoldOut = ticket.availableQuantity <= ticket.soldCount;
          const selectedQuantity =
            selectedTickets.find((selection) => selection.ticketId === ticket.id)?.quantity ?? 0;

          const paidChildCapacity = tickets.reduce((total, ticketItem) => {
            if (!ticketItem || ticketItem.price === 0 || ticketItem.attendeeType === 'Child') {
              return total;
            }

            const ticketQuantity =
              selectedTickets.find((selection) => selection.ticketId === ticketItem.id)?.quantity ??
              0;

            return total + (ticketItem.maxChild ?? 0) * ticketQuantity;
          }, 0);

          const selectedChildQuantity = selectedTickets.reduce((total, selection) => {
            const ticketItem = tickets.find((item) => item.id === selection.ticketId);

            if (!ticketItem || ticketItem.price !== 0 || ticketItem.attendeeType !== 'Child') {
              return total;
            }

            return total + selection.quantity;
          }, 0);

          const childLimit =
            ticket.price === 0 && ticket.attendeeType === 'Child'
              ? Math.max(
                  0,
                  paidChildCapacity -
                    selectedChildQuantity +
                    (selectedTickets.find((selection) => selection.ticketId === ticket.id)
                      ?.quantity ?? 0)
                )
              : (ticket.maxPerBooking ?? Number.MAX_SAFE_INTEGER);

          const maxQuantity =
            ticket.price === 0 && ticket.attendeeType === 'Child'
              ? childLimit
              : (ticket.maxPerBooking ?? Number.MAX_SAFE_INTEGER);

          return (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              selectable={selectable}
              selected={selectedTicket?.id === ticket.id || selectedQuantity > 0}
              selectedQuantity={selectedQuantity}
              maxQuantity={isSoldOut ? 0 : maxQuantity}
              soldOut={isSoldOut}
              onSelect={(selectedTicketItem) => {
                const currentQuantity =
                  selectedTickets.find((selection) => selection.ticketId === selectedTicketItem.id)
                    ?.quantity ?? 0;
                const nextQuantity =
                  selectedTicketItem.price === 0 && selectedTicketItem.attendeeType === 'Child'
                    ? currentQuantity > 0
                      ? currentQuantity
                      : 1
                    : currentQuantity > 0
                      ? 0
                      : 1;

                onTicketQuantityChange?.(selectedTicketItem, nextQuantity);
                onTicketSelect?.(selectedTicketItem);
              }}
              onQuantityChange={onTicketQuantityChange}
            />
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
