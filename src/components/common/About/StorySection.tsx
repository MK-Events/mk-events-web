import { Container, Grid, Stack, Text, Title } from '@mantine/core';
import { SectionLoader } from '@mk/components/States';
import { useGetAssetQuery } from '@mk/store/api/gallery.api';
import type { Section } from '@mk/types';

import styles from './StorySection.module.scss';

interface StorySectionProps {
  overview: Section;
}

export function StorySection({ overview }: StorySectionProps) {
  const { data: heroImage, isLoading, isFetching } = useGetAssetQuery(overview.cover ?? '');

  return (
    <SectionLoader loading={isLoading || isFetching}>
      <section className={styles.storySection}>
        <Container size="lg">
          <Grid align="center" columnGap={{ base: 'xl', md: 60 }}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <Title order={1}>{overview.title}</Title>

                <Text className={styles.story}>{overview.content}</Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <img src={heroImage?.src} alt={heroImage?.title} className={styles.storyImage} />
            </Grid.Col>
          </Grid>
        </Container>
      </section>
    </SectionLoader>
  );
}

export default StorySection;
