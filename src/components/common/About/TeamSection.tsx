import { useMemo } from 'react';

import { Avatar, Container, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { SectionLoader } from '@mk/components/States';
import { useGetAssetsByIdsQuery } from '@mk/store/api/gallery.api';
import type { Asset, Section } from '@mk/types';

import styles from './TeamSection.module.scss';

interface TeamSectionProps {
  teamDetails: Section;
}

export function TeamSection({ teamDetails }: TeamSectionProps) {
  const { data, isLoading, isFetching } = useGetAssetsByIdsQuery(
    teamDetails.list?.map((e) => (e.cover ? e.cover : '')) ?? []
  );

  const assets = useMemo(() => {
    if (!data) return new Map<string, Asset>();

    return new Map(data.map((asset) => [asset.title, asset]));
  }, [data]);

  return (
    <SectionLoader loading={isLoading || isFetching}>
      <section className={styles.teamSection}>
        <Container size="lg">
          <Stack align="center" mb="xl">
            <Title order={2}>{teamDetails.title}</Title>

            <Text ta="center" c="dimmed">
              {teamDetails.label}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {teamDetails.list?.map((member) => (
              <Paper key={member.cover} className={styles.memberCard} radius="lg" p="xl">
                <Stack align="center">
                  <Avatar
                    src={assets.get(member.title)?.src}
                    name={member.title}
                    size={110}
                    radius="50%"
                  />

                  <Stack gap={2} align="center">
                    <Title order={4}>{member.title}</Title>

                    <Text size="sm" fw={600} c="primary">
                      {member.label}
                    </Text>
                  </Stack>

                  <Text ta="center" size="sm" c="dimmed">
                    {member.content}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </section>
    </SectionLoader>
  );
}

export default TeamSection;
