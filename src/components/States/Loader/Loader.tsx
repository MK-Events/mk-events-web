import { Box, Center, Stack, Text } from '@mantine/core';
import { MKEventsLogo as Logo } from '@mk/components';

import classes from './Loader.module.scss';

interface LoaderProps {
  message?: string;
  fullscreen?: boolean;
}

export function Loader({
  message = 'Preparing your experience...',
  fullscreen = true,
}: LoaderProps) {
  return (
    <Center
      className={fullscreen ? classes.root : undefined}
      h={fullscreen ? undefined : 500}
      px="lg"
    >
      <Stack align="center" gap="xl">
        <Box className={classes.logo}>
          <Logo />
        </Box>

        <Text size="sm" c="dimmed" ta="center">
          {message}
        </Text>

        <Box className={classes.dots}>
          <Box className={classes.dot} />
          <Box className={classes.dot} />
          <Box className={classes.dot} />
        </Box>
      </Stack>
    </Center>
  );
}

export default Loader;
