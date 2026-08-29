import {
  Badge,
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
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';

import classes from './TicketPricing.module.scss';

interface TicketPricingProps {
  tickets: Ticket[];
  type: TicketFilterOptions;
  selectable?: boolean;
  selectedTicket?: Ticket | null;
  selectedTickets?: Array<{ ticketId: string; quantity: number }>;
  onTicketSelect?: (ticket: Ticket) => void;
  onTicketQuantityChange?: (ticket: Ticket, quantity: number) => void;
  usage?: 'eventDetails' | 'registration';
}

interface TicketCardProps {
  ticket: Ticket;
  selectable?: boolean;
  selected?: boolean;
  selectedQuantity?: number;
  maxQuantity?: number;
  soldOut?: boolean;
  compact?: boolean;
  onSelect?: (ticket: Ticket) => void;
  onQuantityChange?: (ticket: Ticket, quantity: number) => void;
}

function TicketCard({
  ticket,
  selectable = false,
  selected,
  selectedQuantity = 0,
  maxQuantity,
  soldOut = false,
  compact = false,
  onSelect,
  onQuantityChange,
}: TicketCardProps) {
  const pageConfig = usePageConfig('eventDetails');
  const includedBenefits = ticket.includedBenefits;
  const config = useAppConfig();

  const getRequirement = (requirement: string, selectable: boolean) => {
    const requirementDescription =
      config.event.ticketRequirementDescriptions[
        requirement as keyof typeof config.event.ticketRequirementDescriptions
      ];
    const requirementLabel =
      config.event.ticketRequirementLabels[
        requirement as keyof typeof config.event.ticketRequirementLabels
      ];
    return selectable ? requirementLabel : requirementDescription;
  };

  const attendeeLabel = ticket.attendeeType
    ? config.event.attendeeLabels[ticket.attendeeType]
    : 'General';

  const quantityControl = (
    <Group justify="center" align="center" gap={6} wrap="nowrap">
      <Button
        variant="light"
        size="compact-sm"
        radius="xl"
        className={compact ? classes.quantityButton : undefined}
        disabled={selectedQuantity === 0 || soldOut}
        onClick={(e) => {
          e.stopPropagation();
          onQuantityChange?.(ticket, Math.max(0, selectedQuantity - 1));
        }}
      >
        -
      </Button>

      <Text
        size={compact ? 'md' : 'sm'}
        fw={700}
        c={selectedQuantity > 0 ? 'var(--mantine-primary-color-filled)' : 'dimmed'}
        px="xs"
        className={compact ? classes.quantityValue : undefined}
        style={compact ? undefined : { minWidth: 64, textAlign: 'center' }}
      >
        {compact ? selectedQuantity : `${selectedQuantity}/${maxQuantity ?? 0}`}
      </Text>

      <Button
        variant="light"
        size="compact-sm"
        radius="xl"
        className={compact ? classes.quantityButton : undefined}
        disabled={soldOut || selectedQuantity >= (maxQuantity ?? Number.MAX_SAFE_INTEGER)}
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
  );

  if (compact) {
    return (
      <Paper
        withBorder
        radius="lg"
        p="sm"
        className={`${classes.ticket} ${classes.compactTicket} ${
          selected ? classes.compactSelected : ''
        } ${soldOut ? classes.soldOut : ''}`}
        onClick={() => selectable && !soldOut && onSelect?.(ticket)}
        style={{
          cursor: selectable && !soldOut ? 'default' : 'not-allowed',
        }}
      >
        <Stack gap="xs">
          <Group justify="space-between" align="center" wrap="nowrap" gap="xs">
            <Text fw={600} fz="sm" lh={1.2}>
              {attendeeLabel}
            </Text>

            <Text fw={800} fz="sm" c="var(--mantine-primary-color-filled)">
              {ticket.price === 0 ? 'FREE' : `₹${ticket.price.toLocaleString('en-IN')}`}
            </Text>
          </Group>

          {includedBenefits.length ? (
            <Group gap={6}>
              {includedBenefits.map((benefit) => (
                <Badge
                  key={benefit}
                  size="xs"
                  radius="sm"
                  variant="light"
                  className={`${classes.badge} ${classes.benefitBadge}`}
                >
                  {benefit}
                </Badge>
              ))}
            </Group>
          ) : null}

          {ticket.requirements?.length ? (
            <Group gap={6}>
              {ticket.requirements.map((requirement: string) => (
                <Badge
                  key={requirement}
                  size="xs"
                  radius="sm"
                  variant="light"
                  className={`${classes.badge} ${classes.requirementBadge}`}
                >
                  {getRequirement(requirement, selectable)}
                </Badge>
              ))}
            </Group>
          ) : null}

          <Group justify="space-between" align="center" mt={4}>
            {soldOut ? (
              <Text size="xs" fw={700} c="red">
                Sold Out
              </Text>
            ) : (
              <Text size="xs" c="dimmed">
                Quantity
              </Text>
            )}

            {quantityControl}
          </Group>

          {maxQuantity !== undefined && maxQuantity <= 0 && !soldOut ? (
            <Text size="xs" c="red">
              This ticket is restricted by the current selection rules.
            </Text>
          ) : null}
        </Stack>
      </Paper>
    );
  }

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
          <Text fw={600} fz="lg">
            {attendeeLabel}
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
                {ticket.requirements.map((requirement: string) => (
                  <List.Item key={requirement}>{getRequirement(requirement, selectable)}</List.Item>
                ))}
              </List>
            </Stack>
          </>
        ) : null}

        <div style={{ flex: 1 }} />

        {/* Footer */}
        {selectable ? (
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
                quantityControl
              )}

              {maxQuantity !== undefined && maxQuantity <= 0 && !soldOut ? (
                <Text size="xs" c="red">
                  This ticket is restricted by the current selection rules.
                </Text>
              ) : null}
            </Stack>
          </>
        ) : null}
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
  usage = 'registration',
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

  const renderTicketCard = (ticket: Ticket, compact = false) => {
    const isSoldOut = ticket.availableQuantity <= ticket.soldCount;
    const selectedQuantity =
      selectedTickets.find((selection) => selection.ticketId === ticket.id)?.quantity ?? 0;

    const paidChildCapacity = tickets.reduce((total, ticketItem) => {
      if (!ticketItem || ticketItem.price === 0 || ticketItem.attendeeType === 'Child') {
        return total;
      }

      const ticketQuantity =
        selectedTickets.find((selection) => selection.ticketId === ticketItem.id)?.quantity ?? 0;

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
              (selectedTickets.find((selection) => selection.ticketId === ticket.id)?.quantity ?? 0)
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
        compact={compact}
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
  };

  const renderedTickets = filteredTickets.map((ticket) => renderTicketCard(ticket));
  const paidTickets = filteredTickets.filter((ticket) => ticket.price > 0);
  const freeEntryTickets = filteredTickets.filter((ticket) => ticket.price === 0);

  const isEventDetailsScrollable = usage === 'eventDetails';
  const showSelectableMobileView = selectable && !isEventDetailsScrollable;
  const showScrollableMobileView = isEventDetailsScrollable || !selectable;

  return (
    <Stack gap={'xxl'}>
      {usage === 'eventDetails' ? <Title order={3}>{config.sections.tickets.title}</Title> : null}

      {showScrollableMobileView ? (
        <div
          className={`${classes.mobileScroll} ${isEventDetailsScrollable ? classes.eventDetailsScroll : ''}`}
        >
          {renderedTickets}
        </div>
      ) : null}

      {showSelectableMobileView ? (
        <div className={classes.mobileSelectable}>
          {paidTickets.length ? (
            <Stack gap="sm" className={classes.mobileSection}>
              <Text size="sm" fw={700} className={classes.mobileSectionTitle}>
                Paid Tickets
              </Text>

              <Stack gap="sm">{paidTickets.map((ticket) => renderTicketCard(ticket, true))}</Stack>
            </Stack>
          ) : null}

          {freeEntryTickets.length ? (
            <Stack gap="sm" className={`${classes.mobileSection} ${classes.freeEntrySection}`}>
              <Text size="sm" fw={700} className={classes.mobileSectionTitle}>
                Free Entry
              </Text>

              <Stack gap="sm">
                {freeEntryTickets.map((ticket) => renderTicketCard(ticket, true))}
              </Stack>
            </Stack>
          ) : null}
        </div>
      ) : null}

      {!isEventDetailsScrollable && (
        <SimpleGrid
          cols={selectable ? { base: 1, sm: 2, lg: 2, xl: 3 } : { base: 1, sm: 2, lg: 3, xl: 4 }}
          spacing="lg"
          className={classes.desktopGrid}
        >
          {renderedTickets}
        </SimpleGrid>
      )}
    </Stack>
  );
}
