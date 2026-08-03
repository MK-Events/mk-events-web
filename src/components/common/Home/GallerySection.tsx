import { Button, Container, Group, Image, Title } from '@mantine/core';
import { SectionLoader } from '@mk/components/States';
import { useGetGalleryAssetsQuery } from '@mk/store/api/gallery.api';
import type { Asset, EventComponentUsage, Section } from '@mk/types';
import { Link } from 'react-router-dom';

import styles from './GallerySection.module.scss';

interface GalleryProps {
  gallery?: Section;
  usage?: EventComponentUsage;
  images?: Asset[];
}

export function GallerySection({ gallery, usage, images }: GalleryProps) {
  const iseventDetailsUsage = usage === 'EventDetails';
  const {
    data: galleryImages,
    isLoading,
    isFetching,
  } = useGetGalleryAssetsQuery(
    {
      galleryId: gallery?.cover ?? '',
      page: 1,
      limit: 24,
    },
    {
      skip: !gallery?.cover,
    }
  );

  const imageList = gallery?.cover && galleryImages ? galleryImages.data : images;

  if (!imageList?.length) return null;

  const galleryContent = (
    <Container size={iseventDetailsUsage ? 'lg' : 'xl'}>
      <Group justify="space-between">
        <Title order={2}>{gallery?.title}</Title>

        {gallery !== undefined && (
          <Link to={{ pathname: `${gallery.cta?.href}` }}>
            <Button variant="subtle">{gallery.cta?.label}</Button>
          </Link>
        )}
      </Group>

      <div className={styles.masonry}>
        {(imageList ?? []).map((image) => (
          <div key={image.id} className={styles.item}>
            <Image src={image.src} radius="md" alt={image.title} />
          </div>
        ))}
      </div>
    </Container>
  );

  if (iseventDetailsUsage) {
    return <SectionLoader loading={isLoading || isFetching}>{galleryContent}</SectionLoader>;
  } else {
    return (
      <SectionLoader loading={isLoading || isFetching}>
        <section className={styles.section}>{galleryContent}</section>
      </SectionLoader>
    );
  }
}

export default GallerySection;
