import { type ReactNode } from 'react';

import { Container, Stack, Text, Title } from '@mantine/core';

interface Props {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <Container size="md" py={80}>
      <Stack gap="xl">
        <div>
          <Title order={1}>{title}</Title>

          <Text c="dimmed" mt={8}>
            Last Updated: {lastUpdated}
          </Text>
        </div>

        {children}
      </Stack>
    </Container>
  );
}

export default LegalLayout;
