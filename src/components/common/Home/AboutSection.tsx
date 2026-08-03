import { Button, Container, List, Text, ThemeIcon, Title } from '@mantine/core';
import type { Section } from '@mk/types';
import { IconCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import styles from './AboutSection.module.scss';

interface AboutSectionProps {
  about: Section;
}

export function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null;

  return (
    <section className={styles.section}>
      <Container size="lg">
        <Title order={2}>{about.title}</Title>

        <Text mt="md">{about.content}</Text>

        <List
          mt="xl"
          spacing="sm"
          icon={
            <ThemeIcon color="primary" radius="xl">
              <IconCheck size={14} />
            </ThemeIcon>
          }
        >
          {about.plainList?.map((item) => (
            <List.Item key={item}>{item}</List.Item>
          ))}
        </List>

        <Link to={{ pathname: `${about.cta?.href}` }}>
          <Button mt="xl" variant="light">
            {about.cta?.label}
          </Button>
        </Link>
      </Container>
    </section>
  );
}

export default AboutSection;
