import { Button, Stack, Text } from '@mantine/core';
import type { EventComponentUsage, EventState, RegistrationState } from '@mk/types';
import { Link } from 'react-router-dom';

interface Props {
  slug: string;
  eventState: EventState;
  registrationState: RegistrationState;
  usage?: EventComponentUsage;
}

export function EventCTA({ slug, eventState, registrationState, usage }: Props) {
  const textAlign = usage === 'EventDetails' ? 'center' : 'left';
  if (eventState === 'completed') {
    return (
      <Button component={Link} to={`/events/${slug}`} variant="light" radius="xl">
        View Event Details
      </Button>
    );
  }

  if (registrationState === 'soldOut') {
    return (
      <Stack gap={4} align={textAlign}>
        <Text fw={600}>Tickets Sold Out!</Text>

        <Text size="sm" c="dimmed" ta={textAlign}>
          Thanks for overwhelming response.
        </Text>
      </Stack>
    );
  }

  if (registrationState === 'opensSoon') {
    return (
      <Stack gap={4} align={textAlign}>
        <Text fw={600} ta={textAlign}>
          Registrations Open Soon
        </Text>

        <Text size="sm" c="dimmed" ta={textAlign}>
          Stay tuned!
        </Text>
      </Stack>
    );
  }

  if (registrationState === 'closed') {
    return (
      <Stack gap={4} align={textAlign}>
        <Text fw={600} ta={textAlign}>
          Registrations Closed
        </Text>

        <Text size="sm" c="dimmed" ta={textAlign}>
          We hope to see you next time.
        </Text>
      </Stack>
    );
  }

  return (
    <Button component={Link} to={`/register/${slug}`} size="lg">
      Register Now
    </Button>
  );
}

export default EventCTA;
