import { Divider, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import type { EventScheduleItem } from '@mk/types';
import { formatEventScheduleTime, getIcon } from '@mk/utils';

interface EventScheduleProps {
  schedule: EventScheduleItem[];
}

export function EventSchedule({ schedule }: EventScheduleProps) {
  const config = usePageConfig('eventDetails');
  if (!schedule.length) return null;

  return (
    <Stack gap="xl">
      <Title order={2}>{config.misc.eventScheduleLabel}</Title>

      <Stack gap={0}>
        {schedule.map((item, index) => {
          const Icon = getIcon(item.icon);
          const eventScheduleTime = formatEventScheduleTime(item.time);

          return (
            <div key={`${item.time}-${item.title}`}>
              <Group align="flex-start" wrap="nowrap" py="lg">
                <ThemeIcon size={42} radius="xl" variant="light">
                  <Icon size={20} />
                </ThemeIcon>

                <Stack gap={4} flex={1}>
                  <Text size="sm" fw={700} c="orange">
                    {eventScheduleTime}
                  </Text>

                  <Text fw={600}>{item.title}</Text>

                  {item.description && (
                    <Text size="sm" c="dimmed" lh={1.7}>
                      {item.description}
                    </Text>
                  )}
                </Stack>
              </Group>

              {index < schedule.length - 1 && <Divider />}
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default EventSchedule;
