import { Badge, Button, Card, Divider, Group, Stack, Text } from '@mantine/core';
import type { BookingPass } from '@mk/types';
import {
  getAttendeeTypeLabel,
  getBookingAttendees,
  getBookingTickets,
  getTicketLabel,
} from '@mk/utils';

interface BookingCardProps {
  booking: BookingPass;
  loading: boolean;
  onGetPass: (booking: BookingPass) => void;
}

export function BookingCard({ booking, loading, onGetPass }: BookingCardProps) {
  const attendees = getBookingAttendees(booking);

  const tickets = getBookingTickets(booking);

  return (
    <Card withBorder radius="lg" padding="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Booking ID
            </Text>

            <Text fw={700}>{booking.bookingId}</Text>
          </Stack>

          <Badge variant="light">
            {attendees.length} {attendees.length === 1 ? 'Attendee' : 'Attendees'}
          </Badge>
        </Group>

        <Divider />

        {tickets.length > 0 && (
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Tickets
            </Text>

            {tickets.map((ticket, index) => (
              <Group key={ticket.id ?? ticket.ticketId ?? index} justify="space-between">
                <Text size="sm">{getTicketLabel(ticket)}</Text>

                <Text size="sm" fw={600}>
                  × {ticket.quantity}
                </Text>
              </Group>
            ))}
          </Stack>
        )}

        {attendees.length > 0 && (
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Attendees
            </Text>

            {attendees.map((attendee, index) => (
              <Group key={attendee.id ?? `${booking.bookingId}-${index}`} justify="space-between">
                <Text size="sm">{attendee.name}</Text>

                <Badge size="sm" variant="light">
                  {getAttendeeTypeLabel(attendee.type)}
                </Badge>
              </Group>
            ))}
          </Stack>
        )}

        <Button fullWidth mt="xs" loading={loading} onClick={() => onGetPass(booking)}>
          Get Pass
        </Button>
      </Stack>
    </Card>
  );
}

export default BookingCard;
