import { Badge, Card, Stack, Text, Title } from '@mantine/core';
import { usePageConfig } from '@mk/hooks';
import { IconBell } from '@tabler/icons-react';

import styles from './RegistrationComingSoon.module.scss';

export function RegistrationComingSoon() {
  const {
    sections: { registrationComingSoon },
  } = usePageConfig('registration');

  return (
    <div className={styles.wrapper}>
      <Card withBorder radius="xl" className={styles.card}>
        <Stack align="center" gap="lg">
          <div className={styles.icon}>
            <IconBell size={32} />
          </div>

          <Stack align="center" gap="xs">
            <Badge variant="light" size="lg" color="orange">
              {registrationComingSoon.badge}
            </Badge>

            <Title order={2} ta="center">
              {registrationComingSoon.title}
            </Title>

            <Text size="sm" c="dimmed" ta="center" maw={480}>
              {registrationComingSoon.description}
            </Text>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

export default RegistrationComingSoon;
