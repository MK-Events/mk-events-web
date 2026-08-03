import { Carousel } from '@mantine/carousel';
import { Container } from '@mantine/core';
import type { FeaturedEvent as FeaturedEventList } from '@mk/types';
import { isDesktop } from 'react-device-detect';

import { FeaturedEvent } from './FeaturedEvent';
import styles from './FeaturedEventCarousal.module.scss';

interface Props {
  events: FeaturedEventList[];
}

export function FeaturedEventCarousel({ events }: Props) {
  if (events.length === 0) {
    return null;
  }

  return (
    <Carousel
      slideSize={'100%'}
      withControls={events.length > 1 && isDesktop ? true : false}
      slideGap="xl"
      emblaOptions={{
        loop: true,
        align: 'start',
      }}
    >
      {events.map((event) => (
        <Carousel.Slide key={event.id}>
          <section className={styles.section}>
            <Container size="xl" mt={'xl'}>
              <FeaturedEvent event={event} />
            </Container>
          </section>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default FeaturedEventCarousel;
