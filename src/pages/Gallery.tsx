import { EmptyState, Hero } from '@mk/components';
import { usePageConfig } from '@mk/hooks/usePageConfig';

export const Gallery = () => {
  const config = usePageConfig('gallery');

  return (
    <>
      <Hero hero={config.hero} />
      <EmptyState />
    </>
  );
};
