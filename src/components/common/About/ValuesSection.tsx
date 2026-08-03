import { Card, Container, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import type { Section } from '@mk/types';
import { getIcon } from '@mk/utils';

import styles from './ValuesSection.module.scss';

interface ValuesSectionProps {
  values: Section;
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className={styles.valuesSection}>
      <Container size="lg">
        <Stack align="center" mb="xl">
          <Title order={2}>{values.title}</Title>

          <Text ta="center" c="dimmed">
            {values.label}
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {values.list?.map((value) => {
            const Icon = getIcon(value.icon ?? '');

            return (
              <Card key={value.title} className={styles.valueCard} radius="lg" p="xl">
                <Stack>
                  <ThemeIcon size={54} radius="xl" variant="light">
                    <Icon />
                  </ThemeIcon>

                  <Title order={4}>{value.title}</Title>

                  <Text c="dimmed">{value.content}</Text>
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    </section>
  );
}

export default ValuesSection;
