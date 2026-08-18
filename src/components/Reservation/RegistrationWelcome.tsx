import { Badge, Button, Card, Group, Image, Stack, Text, Title, Tooltip } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import type { Event } from '@mk/types';
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconTicket,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import styles from './RegistrationWelcome.module.scss';

interface RegistrationWelcomeProps {
  event: Event;
  onBegin: () => void;
  loading?: boolean;
}

export function RegistrationWelcome({ event, onBegin, loading = false }: RegistrationWelcomeProps) {
  const registration = event.registration;
  const {
    sections: { welcomeScreen },
    otherRegistrationPlatforms,
  } = usePageConfig('registration');

  const lowestNonZeroTicketPrice = event.tickets.reduce<number>((lowest, ticket) => {
    if (ticket.price > 0 && ticket.price < lowest) {
      return ticket.price;
    }

    return lowest;
  }, Number.POSITIVE_INFINITY);

  const displayTicketPrice = Number.isFinite(lowestNonZeroTicketPrice)
    ? lowestNonZeroTicketPrice
    : 0;

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card} withBorder radius="xl" padding={0}>
        {event.coverImage?.src && (
          <Image src={event.coverImage.src} alt={event.coverImage.title} className={styles.cover} />
        )}

        <Stack className={styles.content} gap="xl">
          <Stack gap="xs">
            <Group gap="xs" justify={'space-between'}>
              <Badge
                leftSection={<IconTicket size={14} />}
                variant="light"
                size="lg"
                className={styles.badge}
              >
                {welcomeScreen.title}
              </Badge>
              <Button
                component={Link}
                to={`/events/${event.slug}`}
                variant="subtle"
                rightSection={<IconArrowRight size={16} />}
              >
                {welcomeScreen.viewDetailsLabel}
              </Button>
            </Group>

            <Title order={1}>{event.name}</Title>

            <Text size="md" c="dimmed" className={styles.description}>
              {event.shortDescription}
            </Text>
          </Stack>

          <div className={styles.footer}>
            <Stack w={'100%'} gap="xl">
              <Group gap="xs" className={styles.ticketPrice} justify={'space-between'}>
                <Text size="xl" fw={700}>
                  {welcomeScreen.continueUserDetailMessage
                    .split('{price}')
                    .join(`₹${displayTicketPrice}`)}
                </Text>
                <Stack align={'center'} gap={'xs'}>
                  <Button size="lg" loading={loading} onClick={onBegin}>
                    {welcomeScreen.beginRegistrationLabel}
                  </Button>
                  <Text size="sm" c="dimmed">
                    {welcomeScreen.registrationDurationLabel}
                  </Text>
                </Stack>
              </Group>

              <Group justify={'space-between'}>
                {otherRegistrationPlatforms.length > 0 ? (
                  <>
                    <Text size={'sm'} c="dimmed">
                      {welcomeScreen.otherWaysToRegisterLabel}
                    </Text>
                    {otherRegistrationPlatforms.map((platform, index: number) => (
                      <Tooltip
                        key={`${platform.title}-${index}`}
                        label={platform.description}
                        position="top"
                        withArrow
                      >
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: platform.color,
                            textDecoration: 'none',
                          }}
                        >
                          <Group gap={6} align="center" wrap="nowrap">
                            <Text size={'sm'} fw={600} c={'dimmed'}>
                              {platform.title}
                            </Text>
                            <IconArrowRight size={18} />
                          </Group>
                        </a>
                      </Tooltip>
                    ))}
                  </>
                ) : null}
              </Group>
            </Stack>
          </div>

          <Group className={styles.eventMeta}>
            <div className={styles.metaItem}>
              <IconCalendar size={19} />
              <div>
                <Text size="xs" c="dimmed">
                  {welcomeScreen.dateLabel}
                </Text>

                <Text size="sm" fw={600}>
                  {new Date(event.startDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </div>
            </div>

            <div className={styles.metaItem}>
              <IconClock size={19} />
              <div>
                <Text size="xs" c="dimmed">
                  {welcomeScreen.timeLabel}
                </Text>

                <Text size="sm" fw={600}>
                  {new Date(event.startDate).toLocaleTimeString('en-IN', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </Text>
              </div>
            </div>

            <div className={styles.metaItem}>
              <IconMapPin size={19} />
              <div>
                <Text size="xs" c="dimmed">
                  {welcomeScreen.venueLabel}
                </Text>

                <a href={event.location.locationPin} target={'_blank'} className={styles.link}>
                  <Text size="sm" fw={600}>
                    {event.location.venue}
                  </Text>
                </a>
              </div>
            </div>
          </Group>

          {registration.notices?.length > 0 && (
            <div className={styles.notices}>
              <Text fw={700} size="sm" mb="sm">
                {welcomeScreen.beforeYouRegisterLabel}
              </Text>

              <Stack gap="xs">
                {registration.notices.map((notice, index) => (
                  <Text key={index} size="sm" c="dimmed">
                    • {notice.message}
                  </Text>
                ))}
              </Stack>
            </div>
          )}
        </Stack>
      </Card>
    </div>
  );
}

export default RegistrationWelcome;
