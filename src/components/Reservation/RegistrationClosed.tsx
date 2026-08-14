import { Badge, Card, Stack, Text, Title } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import { IconCalendarOff, IconTicketOff } from '@tabler/icons-react';

import styles from './RegistrationClosed.module.scss';

export function RegistrationClosed() {
  const {
    sections: { registrationClosed },
  } = usePageConfig('registration');

  return (
    <div className={styles.wrapper}>
      <Card withBorder radius="xl" className={styles.card}>
        <Stack align="center" gap="lg">
          <div className={styles.icon}>
            <IconCalendarOff size={32} />
          </div>

          <Stack align="center" gap="xs">
            <Badge variant="light" size="lg" color="red" leftSection={<IconTicketOff size={14} />}>
              {registrationClosed.badge}
            </Badge>

            <Title order={2} ta="center">
              {registrationClosed.title}
            </Title>

            <Text size="sm" c="dimmed" ta="center" maw={480}>
              {registrationClosed.description}
            </Text>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

export default RegistrationClosed;
