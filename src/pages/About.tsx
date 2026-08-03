import { Stack } from '@mantine/core';
import {
  Hero,
  MissionVisionSection,
  StorySection,
  TeamSection,
  ValuesSection,
} from '@mk/components';
import { usePageConfig } from '@mk/hooks/usePageConfig';

export function About() {
  const config = usePageConfig('about');

  return (
    <Stack gap={0}>
      <Hero hero={config.hero} />

      <StorySection overview={config.sections.overview} />

      <MissionVisionSection mission={config.sections.mission} vision={config.sections.vision} />

      <ValuesSection values={config.sections.values} />

      <TeamSection teamDetails={config.sections.team} />
    </Stack>
  );
}

export default About;
