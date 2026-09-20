import { Badge, Button, Card, Group, Image, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useAppConfig, usePageConfig } from '@mk/hooks';
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
    district,
    bookMyShow,
  } = usePageConfig('registration');
  const {
    global: { districtLogo, bookMyShowLogo },
  } = useAppConfig();

  const isDistrictButtonEnabled = event.district.length > 0 && district.enabled;
  const isBookMyShowButtonEnabled = event.bookMyShow.length > 0 && bookMyShow.enabled;

  console.log(isDistrictButtonEnabled, isBookMyShowButtonEnabled);

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
                <Stack align={'center'} gap={'xs'} className={styles.durationBlock}>
                  <Button size="lg" loading={loading} onClick={onBegin}>
                    {welcomeScreen.beginRegistrationLabel}
                  </Button>
                  <Text size="sm" c="dimmed">
                    {welcomeScreen.registrationDurationLabel}
                  </Text>
                </Stack>
              </Group>

              {isDistrictButtonEnabled || isBookMyShowButtonEnabled ? (
                <div className={styles.otherWaysRow}>
                  <Text size={'sm'} c="dimmed">
                    {welcomeScreen.otherWaysToRegisterLabel}
                  </Text>

                  <div className={styles.platformList}>
                    {isDistrictButtonEnabled ? (
                      <Tooltip
                        key={district.title}
                        label={district.description}
                        position="top"
                        withArrow
                      >
                        <a
                          href={event.district}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: district.color,
                            textDecoration: 'none',
                          }}
                        >
                          <Button color={district.color} radius="sm" size="lg">
                            <img
                              src={districtLogo}
                              alt={district.registerButtonLabel}
                              className={styles.platformIcon}
                            />
                          </Button>
                        </a>
                      </Tooltip>
                    ) : null}

                    {isBookMyShowButtonEnabled ? (
                      <Tooltip
                        key={bookMyShow.title}
                        label={bookMyShow.description}
                        position="top"
                        withArrow
                      >
                        <a
                          href={event.bookMyShow}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: bookMyShow.color,
                            textDecoration: 'none',
                          }}
                        >
                          <Button color={bookMyShow.color} radius="sm" size="lg">
                            <img
                              src={bookMyShowLogo}
                              alt={bookMyShow.registerButtonLabel}
                              className={styles.platformIcon}
                            />
                          </Button>
                        </a>
                      </Tooltip>
                    ) : null}
                  </div>
                </div>
              ) : null}
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
