import { Container, Divider, Grid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { SectionLoader } from '@mk/components/States';
import { useGetAssetQuery } from '@mk/store/api/gallery.api';
import type { Section } from '@mk/types';
import { IconTargetArrow, IconWorld } from '@tabler/icons-react';

import styles from './MissionVisionSection.module.scss';

interface MissionVisionSectionProps {
  mission: Section;
  vision: Section;
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const { data: coverImage, isLoading, isFetching } = useGetAssetQuery(vision.cover ?? '');
  const heroStyle: React.CSSProperties = {
    backgroundImage: `url(${coverImage?.src ?? ''})`,
  };

  return (
    <SectionLoader loading={isLoading || isFetching} height={420}>
      <section className={styles.missionSection} style={heroStyle}>
        <div className={styles.backdrop}>
          <Container size="lg">
            <div className={styles.missionWrapper}>
              <Grid align="stretch">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack gap="lg" className={styles.content}>
                    <ThemeIcon size={72} radius="xl" className={styles.icon}>
                      <IconTargetArrow size={34} />
                    </ThemeIcon>

                    <Text className={styles.eyebrow}>{mission.label?.toUpperCase()}</Text>

                    <Title order={2}>{mission.title}</Title>

                    <Text className={styles.description}>{mission.content}</Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }} className={styles.rightColumn}>
                  <Divider orientation="vertical" className={styles.divider} />

                  <Stack gap="lg" className={styles.content}>
                    <ThemeIcon size={72} radius="xl" className={styles.icon}>
                      <IconWorld size={34} />
                    </ThemeIcon>

                    <Text className={styles.eyebrow}>{vision.label?.toUpperCase()}</Text>

                    <Title order={2}>{vision.title}</Title>

                    <Text className={styles.description}>{vision.content}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </div>
          </Container>
        </div>
      </section>
    </SectionLoader>
  );
}
