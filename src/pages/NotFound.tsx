import { Button, Container, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCalendarOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import classes from './NotFound.module.scss';

export function NotFound() {
  return (
    <Container size="md" className={classes.root}>
      <Stack align="center" gap="xl">
        <ThemeIcon size={110} radius="50%" variant="light" className={classes.icon}>
          <IconCalendarOff size={56} stroke={1.5} />
        </ThemeIcon>

        <Text className={classes.code}>404</Text>

        <Title order={1} ta="center">
          Looks like this event isn't on our schedule.
        </Title>

        <Text ta="center" size="lg" c="dimmed" maw={600}>
          The page you're looking for may have been moved, removed, or never existed. Let's get you
          back to the main stage and discover what's happening at MK Events.
        </Text>

        <Group>
          <Button component={Link} to="/" size="md" radius="xl">
            Back to Home
          </Button>

          <Button component={Link} to="/events" variant="light" size="md" radius="xl">
            Explore Events
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}

export default NotFound;
