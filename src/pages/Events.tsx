import { Container, Stack } from '@mantine/core';
import {
  EmptyState,
  ErrorScreen,
  EventGrid,
  FeaturedEventCarousel,
  Hero,
  Loader,
} from '@mk/components';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import { useGetEventsQuery, useGetFeaturedEventsQuery } from '@mk/store/api/events.api';

import NotFound from './NotFound';

export function Events() {
  const config = usePageConfig('events');
  const {
    data: events,
    isLoading: isEventsQueryLoading,
    error: eventsQueryError,
    refetch: refetchEvents,
    isFetching: isEventsQueryFetching,
  } = useGetEventsQuery();

  const {
    data: featuredEvents = [],
    isLoading: isFeaturedEventsQueryLoading,
    error: featuredEventsQueryError,
    refetch: refetchFeaturedEvents,
    isFetching: isFeaturedEventsQueryFetching,
  } = useGetFeaturedEventsQuery();

  const isLoading = isEventsQueryLoading || isFeaturedEventsQueryLoading;
  const error = eventsQueryError || featuredEventsQueryError;
  const refetch = () => {
    refetchEvents();
    refetchFeaturedEvents();
  };
  const isFetching = isEventsQueryFetching || isFeaturedEventsQueryFetching;

  const upcomingEvents = events?.filter(
    (event) => new Date(event.startDate).getTime() > Date.now() && !event.featured
  );
  const pastEvents = events?.filter((event) => new Date(event.startDate).getTime() < Date.now());

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    return <ErrorScreen onRetry={refetch} />;
  }

  if (!events) {
    return <NotFound />;
  }

  if (events.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <Hero hero={config.hero} opacity={0.5} />

      <Container size="xl" py="xl">
        <Stack gap={80}>
          {/* <EventGrid
            title={config.sections.featuredEvents.title}
            subtitle={config.sections.featuredEvents.caption}
            events={featuredEvents}
          /> */}

          {featuredEvents.length > 0 && <FeaturedEventCarousel events={featuredEvents} />}

          <EventGrid
            title={config.sections.upcomingEvents.title}
            subtitle={config.sections.upcomingEvents.caption}
            events={upcomingEvents}
          />

          <EventGrid
            title={config.sections.pastEvents.title}
            subtitle={config.sections.pastEvents.caption}
            events={pastEvents}
          />
        </Stack>
      </Container>
    </>
  );
}

export default Events;
