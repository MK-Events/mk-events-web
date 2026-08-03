import { Paper, Stack } from '@mantine/core';
import {
  EventCountdown,
  EventCTA,
  EventRegistrationClosingNotice,
  EventRegistrationProgress,
} from '@mk/components';
import { useEventStatus } from '@mk/hooks';
import type { Event } from '@mk/types';

interface EventRegistrationPanelProps {
  event: Event;
  variant?: 'subtle' | 'card';
}

export function EventRegistrationPanel({ event, variant = 'card' }: EventRegistrationPanelProps) {
  const { countdown, eventState, registrationState } = useEventStatus(event);
  const showExras = variant === 'card';

  const content = (
    <Stack gap="lg">
      {showExras && (
        <EventCountdown
          state={eventState}
          countdown={countdown}
          liveStreamUrl={event.liveStreamUrl}
          usage={'EventDetails'}
        />
      )}

      <EventCTA
        slug={event.slug}
        eventState={eventState}
        registrationState={registrationState}
        usage={'EventDetails'}
      />

      {registrationState === 'open' && showExras && (
        <EventRegistrationProgress
          capacity={event.registration.capacity}
          registered={event.registration.registered}
          usage={'EventDetails'}
        />
      )}

      {showExras && (
        <EventRegistrationClosingNotice
          closeAt={event.registration.closesAt}
          usage={'EventDetails'}
        />
      )}
    </Stack>
  );

  if (variant === 'subtle') {
    return content;
  }

  return (
    <Paper withBorder radius="lg" p="xl">
      {content}
    </Paper>
  );
}
