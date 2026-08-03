import { type ReactNode } from 'react';

import { Stack, Title } from '@mantine/core';

interface Props {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: Props) {
  return (
    <Stack gap="sm">
      <Title order={3}>{title}</Title>
      {children}
    </Stack>
  );
}

export default LegalSection;
