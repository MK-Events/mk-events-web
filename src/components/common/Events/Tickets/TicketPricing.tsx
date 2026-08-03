import {
  Button,
  Center,
  Divider,
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
  onTicketSelect?: (ticket: Ticket) => void;
}

interface TicketCardProps {
  ticket: Ticket;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (ticket: Ticket) => void;
}

function TicketCard({ ticket, selectable, selected, onSelect }: TicketCardProps) {
  const pageConfig = usePageConfig('eventDetails');
  const includedBenefits = ticket.includedBenefits;
  const config = useAppConfig();

  return (
    <Paper
      withBorder
      radius="xl"
      p="lg"
      className={`${classes.ticket} ${selected ? classes.selected : ''}`}
      onClick={() => selectable && onSelect?.(ticket)}
      style={{
        cursor: selectable ? 'pointer' : 'default',
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
              <Text fw={600} size="sm">
                <ThemeIcon size={18} variant="transparent" color="blue" mr={6}>
                  <IconInfoCircle size={16} />
                </ThemeIcon>
                {pageConfig.misc.noteLabel}
              </Text>

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

            <Button
              fullWidth
              radius="xl"
              variant={selected ? 'filled' : 'light'}
              leftSection={selected ? <IconCircleCheckFilled size={18} /> : undefined}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(ticket);
              }}
            >
              {selected ? 'Selected' : 'Select Ticket'}
            </Button>
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
  onTicketSelect,
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
        {filteredTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            selectable={selectable}
            selected={selectedTicket?.id === ticket.id}
            onSelect={onTicketSelect}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
