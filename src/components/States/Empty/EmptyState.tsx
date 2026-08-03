import type { ReactNode } from 'react';

import { Center, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconBoxOff } from '@tabler/icons-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  fullscreen?: boolean;
}

export function EmptyState({
  title = 'Nothing here yet',
  message = 'There is currently nothing to display.',
  icon,
  action,
  fullscreen = false,
}: EmptyStateProps) {
  return (
    <Center mih={fullscreen ? '100dvh' : 420} px="md">
      <Stack align="center" gap="lg" maw={480}>
        <ThemeIcon size={72} radius="xl" variant="light">
          {icon ?? <IconBoxOff size={36} />}
        </ThemeIcon>

        <Stack gap={6} align="center">
          <Title order={3} ta="center">
            {title}
          </Title>

          <Text c="dimmed" ta="center">
            {message}
          </Text>
        </Stack>

        {action}
      </Stack>
    </Center>
  );
}

export default EmptyState;
