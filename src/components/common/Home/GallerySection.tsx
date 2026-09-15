import { Accordion, Button, Container, Group, Image, Title } from '@mantine/core';
import { SectionLoader } from '@mk/components/States';
import { useGetGalleryAssetsQuery } from '@mk/store/api/gallery.api';
import type { Asset, EventComponentUsage, EventGallery, Section } from '@mk/types';
import { Link } from 'react-router-dom';

import styles from './GallerySection.module.scss';

interface GalleryProps {
  gallery?: Section;
  usage?: EventComponentUsage;
  images?: Asset[];
  galleries?: EventGallery[];
}

export function GallerySection({ gallery, usage, images, galleries }: GalleryProps) {
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

  if (!imageList?.length && !galleries?.some(({ items }) => items.length)) return null;

  const masonry = (galleryImages: Asset[]) => (
    <div className={styles.masonry}>
      {galleryImages.map((image) => (
          <div key={image.id} className={styles.item}>
          <Image src={image.thumbnail} radius="xs" alt={image.alt ?? image.title} />
        </div>
      ))}
    </div>
  );

  const galleryGroups = galleries?.length ? (
    <Accordion multiple defaultValue={galleries.map(({ id }) => id)} className={styles.groups}>
      {galleries.map((galleryGroup) => (
        <Accordion.Item key={galleryGroup.id} value={galleryGroup.id}>
          <Accordion.Control className={styles.galleryName}>{galleryGroup.name}</Accordion.Control>
          <Accordion.Panel>{masonry(galleryGroup.items)}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  ) : (
    masonry(imageList ?? [])
  );

  const galleryContent = (
    <Container fluid>
      <Group justify="space-between">
        <Title order={2}>{gallery?.title}</Title>

        {gallery !== undefined && (
          <Link to={{ pathname: `${gallery.cta?.href}` }}>
            <Button variant="subtle">{gallery.cta?.label}</Button>
          </Link>
        )}
      </Group>

      {galleryGroups}
    </Container>
  );

  if (iseventDetailsUsage) {
    return (
      <SectionLoader loading={isLoading || isFetching}>
        <section className={styles.fullWidthSection}>{galleryContent}</section>
      </SectionLoader>
    );
  } else {
    return (
      <SectionLoader loading={isLoading || isFetching}>
        <section className={styles.section}>{galleryContent}</section>
      </SectionLoader>
    );
  }
}

export default GallerySection;
