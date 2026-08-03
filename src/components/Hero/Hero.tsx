import { SectionLoader } from '../States';

import type { ReactNode } from 'react';

import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { useGetAssetQuery } from '@mk/store/api/gallery.api';
import type { Hero } from '@mk/types';
import { Link } from 'react-router-dom';

import styles from './Hero.module.scss';

interface HeroProps {
  hero: Hero;
  opacity?: number;
  children?: ReactNode;
}

export function Hero({ hero, opacity, children }: HeroProps) {
  const {
    data: heroImage,
    isLoading,
    isFetching,
  } = useGetAssetQuery(hero.cover || '', {
    skip: !hero.cover,
  });
  const coverImageUrl = hero.cover && heroImage ? heroImage?.src : hero.coverImage?.src;
  const defaultOpacity: number = 0.0901960784;
  const heroStyle: React.CSSProperties = {
    backgroundImage: `url(${coverImageUrl})`,
  };
  const backdropStyle: React.CSSProperties = {
    background: `rgba(0, 0, 0, ${opacity ?? defaultOpacity}`,
  };

  return (
    <SectionLoader loading={isLoading || isFetching}>
      <section className={styles.hero} style={heroStyle}>
        <div className={styles.backdrop} style={backdropStyle}>
          <Container size="lg">
            <Stack align="center" gap="md">
              <Title order={1} className={styles.title}>
                {hero.title}
              </Title>

              <Text size="lg" className={styles.subtitle}>
                {hero.subtitle}
              </Text>

              {hero.cta && (
                <Link to={hero.cta.href}>
                  <Button size="md">{hero.cta.label}</Button>
                </Link>
              )}

              {children}
            </Stack>
          </Container>
        </div>
      </section>
    </SectionLoader>
  );
}

export default Hero;
