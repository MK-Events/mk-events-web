import { Card, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import type { EventHighlight } from '@mk/types';
import { getIcon } from '@mk/utils';

import styles from './EventHighlights.module.scss';

interface EventHighlightsProps {
  highlights: EventHighlight[];
}

export function EventHighlights({ highlights }: EventHighlightsProps) {
  const config = usePageConfig('eventDetails');
  if (highlights.length === 0) return null;

  return (
    <Stack gap="xl">
      <Title order={2}>{config.misc.eventHighlightLabel}</Title>

      <Grid>
        {highlights.map((highlight) => {
          const Icon = getIcon(highlight.icon);

          return (
            <Grid.Col
              key={highlight.title}
              span={{
                base: 12,
                sm: 6,
                lg: 4,
              }}
            >
              <Card
                withBorder
                radius="lg"
                h="100%"
                padding="lg"
                shadow={'sm'}
                className={styles.card}
              >
                <Group align="flex-start" wrap="nowrap">
                  <ThemeIcon size={48} radius="xl" variant="light">
                    <Icon size={24} />
                  </ThemeIcon>

                  <Stack gap={4}>
                    <Text fw={600}>{highlight.title}</Text>

                    {highlight.description && (
                      <Text size="sm" c="dimmed" lh={1.6}>
                        {highlight.description}
                      </Text>
                    )}
                  </Stack>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default EventHighlights;
