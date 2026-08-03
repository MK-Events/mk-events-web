import { Button, Card, Container, Image, Stack, Text, Title } from '@mantine/core';
import type { Event } from '@mk/types';
import { Link } from 'react-router-dom';

import styles from './FeaturedEventSection.module.scss';

export function FeaturedEventSection({ event }: { event?: Event }) {
  if (!event) return null;

  return (
    <section className={styles.section}>
      <Container size="lg">
        <Title order={2}>Upcoming Event</Title>

        <Card withBorder radius="md" mt="lg">
          <Image src={event.coverImage} h={260} />

          <Stack mt="md">
            <Title order={3}>{event.name}</Title>

            <Text>{event.shortDescription}</Text>

            <Text>
              📍 {event.location.venue}, {event.location.city}
            </Text>

            <Text>🗓 {event.startDate}</Text>

            <Link to={'/register'}>
              <Button>Register Now</Button>
            </Link>
          </Stack>
        </Card>
      </Container>
    </section>
  );
}

export default FeaturedEventSection;
