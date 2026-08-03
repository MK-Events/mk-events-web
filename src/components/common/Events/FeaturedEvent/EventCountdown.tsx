import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import type { Countdown, EventComponentUsage, EventState } from '@mk/types';
import { isMobile } from 'react-device-detect';

import styles from './EventCountdown.module.scss';

interface Props {
  state: EventState;
  countdown: Countdown;
  liveStreamUrl: string;
  usage?: EventComponentUsage;
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <Paper
      radius={isMobile ? 'sm' : 'md'}
      p={isMobile ? 'xs' : 'md'}
      className={styles.box}
      shadow={isMobile ? 'md' : 'lg'}
    >
      <Title order={isMobile ? 6 : 2}>{String(value).padStart(2, '0')}</Title>

      <Text size="xs">{label}</Text>
    </Paper>
  );
}

export function EventCountdown({ state, countdown, liveStreamUrl, usage }: Props) {
  const align = usage === 'EventDetails' ? 'center' : 'left';
  if (state === 'ongoing') {
    return (
      <a href={liveStreamUrl} target={'_blank'} className={styles.noStyle}>
        <Paper className={styles.status} radius="lg">
          <Title order={3}>🟢 Event Ongoing</Title>

          <Text c="dimmed">Join the celebration!</Text>
        </Paper>
      </a>
    );
  }

  if (state === 'completed') {
    return (
      <Paper className={styles.status} radius="lg">
        <Title order={3}>🎉 Event Completed</Title>

        <Text c="dimmed">Thank you for being part of it.</Text>
      </Paper>
    );
  }

  return (
    <Stack gap="sm">
      <Text fw={700} tt="uppercase" size="sm" ta={align}>
        Event Begins In
      </Text>

      <Group gap={isMobile ? 'xs' : 'md'} justify={align}>
        <TimeBox value={countdown.days} label="Days" />

        <TimeBox value={countdown.hours} label="Hours" />

        <TimeBox value={countdown.minutes} label="Minutes" />

        <TimeBox value={countdown.seconds} label="Seconds" />
      </Group>
    </Stack>
  );
}

export default EventCountdown;
