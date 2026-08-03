import { useMemo } from 'react';

import { Avatar, Card, Container, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { SectionLoader } from '@mk/components/States';
import { useGetAssetsByIdsQuery } from '@mk/store/api/gallery.api';
import type { Asset, Section } from '@mk/types';

import styles from './TestimonialsSection.module.scss';

interface TestimonialsSectionProps {
  testimonials: Section;
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials.list?.length) return null;
  const { data, isLoading, isFetching } = useGetAssetsByIdsQuery(
    testimonials.list?.map((e) => (e.cover ? e.cover : '')) ?? []
  );

  const assets = useMemo(() => {
    if (!data) return new Map<string, Asset>();

    return new Map(data.map((asset) => [asset.title, asset]));
  }, [data]);

  return (
    <SectionLoader loading={isLoading || isFetching}>
      <section className={`${styles.section} ${styles.testimonials}`}>
        <Container size="lg">
          <Title order={2} className={styles.testimonialTitle}>
            {testimonials.title}
          </Title>

          <SimpleGrid cols={{ base: 1, md: 3 }} mt="xl">
            {testimonials.list.map((item) => (
              <Card key={item.cover} withBorder>
                <Group wrap={'nowrap'} gap={25}>
                  <Group justify={'center'}>
                    <Avatar
                      src={assets.get(item.title)?.src}
                      radius={50}
                      size={100}
                      alt="customer"
                    ></Avatar>
                    <Text fw={600}>{item.title}</Text>
                  </Group>
                  <Text fw={500} size="xs">
                    "{item.content}"
                  </Text>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </section>
    </SectionLoader>
  );
}

export default TestimonialsSection;
