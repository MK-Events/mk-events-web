import { Anchor, Badge, Button, Group, Stack, Text, Title } from '@mantine/core';
import type { FeaturedEvent } from '@mk/types';
import { formatEventDate } from '@mk/utils';
import {
  IconArrowRight,
  IconCalendarEvent,
  IconExternalLink,
  IconMapPin,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import styles from './EventMeta.module.scss';

interface EventMetaProps {
  event: FeaturedEvent;
}

export default function EventMeta({ event }: EventMetaProps) {
  return (
    <Stack gap="lg" className={styles.meta}>
      <Group justify={'space-between'}>
        <Badge variant="light" radius="xl" size="md">
          ⭐ Featured Event
        </Badge>
        <Button
          component={Link}
          to={`/events/${event.slug}`}
          variant="subtle"
          rightSection={<IconArrowRight size={16} />}
        >
          View Details
        </Button>
      </Group>

      <Title order={1}>{event.name}</Title>

      <Text size="lg" c="dimmed">
        {event.shortDescription}
      </Text>

      <Stack gap="sm">
        <Group gap="xs">
          <IconMapPin size={18} />

          <Text fw={500}>{event.location.venue}</Text>
        </Group>

        <Group gap="xs">
          <IconCalendarEvent size={18} />

          <Text>{formatEventDate(event.startDate)}</Text>
        </Group>

        <Anchor href={event.location.locationPin} target="_blank">
          <Group gap={4}>
            View on Google Maps
            <IconExternalLink size={16} />
          </Group>
        </Anchor>
      </Stack>
    </Stack>
  );
}
