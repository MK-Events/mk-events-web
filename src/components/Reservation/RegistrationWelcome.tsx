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
    registrationModes,
  } = usePageConfig('registration');

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

          <Group className={styles.eventMeta} gap="lg">
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

          <div className={styles.footer}>
            <Stack gap={3}>
              <Text size="sm" fw={600}>
                {welcomeScreen.readyToRegisterLabel}
              </Text>

              <Text size="xs" c="dimmed">
                {welcomeScreen.continueUserDetailMessage}
              </Text>
            </Stack>

            {registrationModes.length > 0 ? (
              <Group gap="xs" justify="flex-end" className={styles.modeActions}>
                {registrationModes.map((mode, index) => {
                  const buttonStyle = mode.color
                    ? {
                        backgroundColor: mode.color,
                        borderColor: mode.color,
                      }
                    : undefined;
                  const hasUrl = Boolean(mode.url && mode.url.trim());
                  const isEnabled = Boolean(mode.enabled);
                  const tooltipLabel = mode.description?.trim() || mode.title;

                  if (hasUrl && isEnabled) {
                    return (
                      <Tooltip
                        key={`${mode.registerButtonLabel}-link-${index}`}
                        label={tooltipLabel}
                      >
                        <span>
                          <Button
                            size="md"
                            component="a"
                            href={mode.url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={buttonStyle}
                          >
                            {mode.registerButtonLabel}
                          </Button>
                        </span>
                      </Tooltip>
                    );
                  }

                  return (
                    <Tooltip
                      key={`${mode.registerButtonLabel}-local-${index}`}
                      label={tooltipLabel}
                    >
                      <span>
                        <Button
                          size="md"
                          disabled={!isEnabled}
                          loading={isEnabled ? loading : false}
                          onClick={!isEnabled || hasUrl ? undefined : onBegin}
                          style={buttonStyle}
                        >
                          {mode.registerButtonLabel}
                        </Button>
                      </span>
                    </Tooltip>
                  );
                })}
              </Group>
            ) : (
              <Button size="md" loading={loading} onClick={onBegin}>
                {welcomeScreen.beginRegistrationLabel}
              </Button>
            )}
          </div>
        </Stack>
      </Card>
    </div>
  );
}

export default RegistrationWelcome;
