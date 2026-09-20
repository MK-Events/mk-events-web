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

  const getYoutubeEmbedUrl = (src: string) => {
    try {
      const url = new URL(src);

      if (url.hostname === 'youtu.be') {
        return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
      }

      if (url.hostname.endsWith('youtube.com')) {
        if (url.pathname === '/watch') {
          const videoId = url.searchParams.get('v');
          return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }

        const videoId = url.pathname.split('/').filter(Boolean).at(-1);
        return videoId &&
          ['/embed', '/live', '/shorts'].some((path) => url.pathname.startsWith(path))
          ? `https://www.youtube.com/embed/${videoId}`
          : null;
      }
    } catch {
      return null;
    }

    return null;
  };

  const masonry = (galleryImages: Asset[], isYoutubeGallery = false) => (
    <div className={styles.masonry}>
      {galleryImages.map((image) => (
        <div key={image.id} className={styles.item}>
          {isYoutubeGallery ? (
            <iframe
              className={styles.video}
              src={getYoutubeEmbedUrl(image.src) ?? image.src}
              title={image.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <Image src={image.thumbnail} radius="xs" alt={image.alt ?? image.title} />
          )}
        </div>
      ))}
    </div>
  );

  const galleryGroups = galleries?.length ? (
    <Accordion multiple defaultValue={galleries.map(({ id }) => id)} className={styles.groups}>
      {galleries.map((galleryGroup) => (
        <Accordion.Item key={galleryGroup.id} value={galleryGroup.id}>
          <Accordion.Control className={styles.galleryName}>{galleryGroup.name}</Accordion.Control>
          <Accordion.Panel>
            {masonry(galleryGroup.items, galleryGroup.name.toLowerCase() === 'youtube')}
          </Accordion.Panel>
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
