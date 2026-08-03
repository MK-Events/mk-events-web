import { Badge, Button, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import { useEventState } from '@mk/hooks';
import type { EventList } from '@mk/types';
import { formatEventDate } from '@mk/utils';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface Props {
  event: EventList;
}

export function EventCard({ event }: Props) {
  const eventState = useEventState(event);

  const badge =
    eventState === 'ongoing' ? 'Live' : eventState === 'completed' ? 'Completed' : 'Upcoming';

  return (
    <Card withBorder radius="xl" padding="md" h="100%">
      <Card.Section>
        <Image src={event.coverImage.src} h={220} />
      </Card.Section>

      <Stack mt="md" h="calc(100% - 220px)" justify="space-between">
        <Stack gap="xs">
          <Badge variant="light">{badge}</Badge>

          <Title order={4}>{event.name}</Title>

          <Text size="sm" c="dimmed">
            {formatEventDate(event.startDate)}
          </Text>

          <Text size="sm">{event.location.venue}</Text>
        </Stack>

        <Group justify={'space-between'}>
          <Button component={Link} to={`/register/${event.slug}`} variant={'filled'}>
            Register Now
          </Button>
          <Button
            component={Link}
            to={`/events/${event.slug}`}
            variant="subtle"
            rightSection={<IconArrowRight size={16} />}
          >
            View Details
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}

export default EventCard;
