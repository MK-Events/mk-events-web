import { EventRegistrationClosingNotice } from '../EventCloseNotice';

import { Grid, Image, Paper, Stack } from '@mantine/core';
import { useEventStatus } from '@mk/hooks';
import type { FeaturedEvent } from '@mk/types';
import { isMobile, isTablet } from 'react-device-detect';

import EventCTA from './EventCTA';
import EventCountdown from './EventCountdown';
import EventMeta from './EventMeta';
import EventRegistrationProgress from './EventRegistrationProgress';
import styles from './FeaturedEvent.module.scss';

interface FeaturedEventProps {
  event: FeaturedEvent;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const { countdown, eventState, registrationState } = useEventStatus(event);

  return (
    <Paper
      radius={isMobile ? 'sm' : isTablet ? 'lg' : 'xl'}
      className={styles.wrapper}
      withBorder={false}
      shadow="md"
    >
      <Grid className={styles.grid}>
        {/* Image */}
        <Grid.Col
          span={{
            base: 12,
            md: 7,
          }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={event.coverImage.src}
              alt={event.coverImage.title}
              className={styles.image}
            />
          </div>
        </Grid.Col>

        {/* Content */}

        <Grid.Col
          span={{
            base: 12,
            md: 5,
          }}
        >
          <Stack className={styles.content}>
            {/* Top */}

            <EventMeta event={event} />

            {/* Bottom */}

            <Stack gap="xl" className={styles.bottom}>
              <EventCountdown
                state={eventState}
                countdown={countdown}
                liveStreamUrl={event.liveStreamUrl}
                usage={'FeaturedEvent'}
              />

              <EventCTA
                slug={event.slug}
                eventState={eventState}
                registrationState={registrationState}
              />

              {registrationState === 'open' && (
                <EventRegistrationProgress
                  capacity={event.registration.capacity}
                  registered={event.registration.registered}
                  usage={'FeaturedEvent'}
                />
              )}

              <EventRegistrationClosingNotice
                usage={'FeaturedEvent'}
                closeAt={event.registration.closesAt}
              />
            </Stack>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

export default FeaturedEvent;
