import {
  AboutSection,
  ErrorScreen,
  FeaturedEventCarousel,
  GallerySection,
  Hero,
  Loader,
  TestimonialsSection,
} from '@mk/components';
import { usePageConfig } from '@mk/hooks/usePageConfig';
import { useGetFeaturedEventsQuery } from '@mk/store/api/events.api';

export function Home() {
  const {
    data: featuredEvents = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetFeaturedEventsQuery();
  const config = usePageConfig('home');

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    return <ErrorScreen onRetry={refetch} />;
  }

  return (
    <>
      <Hero hero={config.hero} />
      {featuredEvents.length > 0 && <FeaturedEventCarousel events={featuredEvents} />}
      <AboutSection about={config.sections.about} />
      <TestimonialsSection testimonials={config.sections.testimonials} />
      <GallerySection gallery={config.sections.gallery} />
    </>
  );
}

export default Home;
