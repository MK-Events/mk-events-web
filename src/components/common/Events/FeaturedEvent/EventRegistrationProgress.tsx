import { Group, Progress, Stack, Text } from '@mantine/core';
import type { EventComponentUsage } from '@mk/types';

interface EventRegistrationProgressProps {
  capacity: number;
  registered: number;
  usage?: EventComponentUsage;
}

export function EventRegistrationProgress({
  capacity,
  registered,
  usage,
}: EventRegistrationProgressProps) {
  const percentage = Math.min((registered / capacity) * 100, 100);
  const remaining = Math.max(capacity - registered, 0);
  const showFilledPercentage = usage !== 'EventDetails';
  const color = percentage >= 85 ? 'red' : percentage >= 60 ? 'yellow' : 'green';

  return (
    <Stack gap={6}>
      <Progress value={percentage} color={color} radius="xl" size="lg" />

      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          {registered.toLocaleString()} of {capacity.toLocaleString()} spots filled
        </Text>

        <Text size="xs" c="dimmed">
          {remaining.toLocaleString()} spots remaining
        </Text>

        {showFilledPercentage && (
          <Text fw={600} size="sm">
            {Math.round(percentage)}%
          </Text>
        )}
      </Group>
    </Stack>
  );
}

export default EventRegistrationProgress;
