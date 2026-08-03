import { Button, Center, Group, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconHome, IconRefresh, IconWifiOff } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export function ErrorScreen({
  title = "Couldn't connect",
  message = 'Please check your internet connection and try again.',
  onRetry,
  showHomeButton = true,
}: ErrorScreenProps) {
  const navigate = useNavigate();

  return (
    <Center mih="100dvh" p="md">
      <Paper withBorder radius="xl" p="xl" maw={480} w="100%">
        <Stack align="center" gap="lg">
          <ThemeIcon size={80} radius="xl" variant="light" color="red">
            <IconWifiOff size={40} />
          </ThemeIcon>

          <Stack gap={6} align="center">
            <Title order={2} ta="center">
              {title}
            </Title>

            <Text c="dimmed" ta="center">
              {message}
            </Text>
          </Stack>

          <Group>
            <Button leftSection={<IconRefresh size={18} />} onClick={onRetry}>
              Try Again
            </Button>

            {showHomeButton && (
              <Button
                variant="light"
                leftSection={<IconHome size={18} />}
                onClick={() => navigate('/')}
              >
                Home
              </Button>
            )}
          </Group>
        </Stack>
      </Paper>
    </Center>
  );
}
