import type { GalleryImage } from './Gallery.type';

export interface Testimonial {
  id: string;

  name: string;

  review: string;

  avatar?: string;
}

export interface TestimonialView {
  id: string;

  name: string;

  review: string;

  avatar: GalleryImage;
}
