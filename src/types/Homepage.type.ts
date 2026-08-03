import type { EventView, GalleryImage, Hero, TestimonialView } from '@mk/types';

export interface HomepageData {
  hero: Hero;

  aboutPreview?: {
    title: string;

    description: string;

    highlights: string[];
  };

  testimonialIds?: string[];

  galleryIds?: string[];
}

export interface HomepageView {
  hero: Hero;

  featuredEvents: EventView[];

  aboutPreview?: HomepageData['aboutPreview'];

  testimonials: TestimonialView[];

  gallery: GalleryImage[];
}
