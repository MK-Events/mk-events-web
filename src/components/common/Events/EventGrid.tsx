import { SimpleGrid, Stack, Text, Title } from '@mantine/core';
import type { EventList } from '@mk/types';

import EventCard from './EventCard';

interface Props {
  title: string;
  subtitle?: string;
  events: EventList[] | undefined;
}

export function EventGrid({ title, subtitle, events }: Props) {
  if (!events || !events.length) return null;

  return (
    <Stack gap="xl">
      <div>
        <Title order={2}>{title}</Title>

        {subtitle && (
          <Text c="dimmed" mt={4}>
            {subtitle}
          </Text>
        )}
      </div>

      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 3,
        }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default EventGrid;
