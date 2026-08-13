import { Container, Group, Paper, Stack, Text, Title } from '@mantine/core';
import {
  ErrorScreen,
  EventHighlights,
  EventRegistrationPanel,
  EventSchedule,
  Faq,
  GallerySection,
  Hero,
  Loader,
  TicketNotice,
  TicketPricing,
} from '@mk/components';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import { useGetEventQuery } from '@mk/store/api/events.api';
import type { Event as EventDetails } from '@mk/types';
import { formatEventDate, formatEventTimeRange } from '@mk/utils';
import { IconBrandGoogleMaps, IconCalendar, IconClock, IconMapPin } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

import styles from './EventDetails.module.scss';
import NotFound from './NotFound';

export function EventDetails() {
  const { slug } = useParams();
  const config = usePageConfig('eventDetails');

  const { data: event, isLoading, error, isFetching, refetch } = useGetEventQuery(slug as string);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorScreen
        onRetry={refetch}
        title={`Failed to load ${slug?.split('-').join(' ')}`}
        message={`It's not you, it's us. We're trying to fix this.`}
      />
    );
  }

  if (!event) {
    return <NotFound />;
  }

  return (
    <>
      <Hero
        hero={{ title: event.name, subtitle: event.shortDescription, coverImage: event.coverImage }}
        opacity={0.5}
      >
        <EventRegistrationPanel event={event} />
      </Hero>

      <Container size="lg" py={80}>
        <Stack gap={'xl'}>
          <section>
            <Title order={2} mb="md">
              {config.sections.about.title}
            </Title>
            <Text size="lg" lh={1.8}>
              {event.description}
            </Text>
            <Stack gap="md" mt="lg">
              <Group gap="xl">
                <Group gap={6}>
                  <IconCalendar size={18} />
                  <Text>{formatEventDate(event.startDate)}</Text>
                </Group>

                <Group gap={6}>
                  <IconClock size={18} />
                  <Text>{formatEventTimeRange(event.startDate, event.endDate)}</Text>
                </Group>

                <Group gap={6}>
                  <IconMapPin size={18} />
                  <Text>{event.location.venue}</Text>
                </Group>

                <Group gap={6}>
                  <IconBrandGoogleMaps size={18} />
                  <Text className={styles.locationPin}>
                    <a href={event.location.locationPin} target="_blank">
                      {config.misc.locationPinLabel}
                    </a>
                  </Text>
                </Group>
              </Group>
            </Stack>
          </section>

          <section>
            <TicketPricing
              type={'All'}
              tickets={event.tickets}
              selectable={true}
              selectedTicket={event.tickets[0]}
              onTicketSelect={(ticket) => console.log(ticket)}
            />
          </section>

          <section>
            <TicketNotice notice={event.registration.notices} />
          </section>

          <section>
            {event.schedule.length > 0 && <EventSchedule schedule={event.schedule} />}
          </section>

          <section>
            {event.highlights.length > 0 && <EventHighlights highlights={event.highlights} />}
          </section>

          <section>
            {event.gallery.length > 0 && (
              <GallerySection
                images={event.gallery}
                usage={'EventDetails'}
                gallery={{
                  title: config.sections.gallery.title,
                }}
              />
            )}
          </section>
        </Stack>
      </Container>

      <Container>
        <Stack gap={'xl'}>
          <Paper withBorder radius="lg" p="xl" mt={'xl'}>
            <Stack align="center">
              <Title order={3}>{config.sections.cta.title}</Title>

              <Text ta="center" c="dimmed">
                {config.sections.cta.caption}
              </Text>

              <EventRegistrationPanel event={event} variant={'subtle'} />
            </Stack>
          </Paper>
          {event.faqs?.length > 0 && (
            <section>
              <Faq faqs={event.faqs} title={config.sections.faq.title} />
            </section>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default EventDetails;
