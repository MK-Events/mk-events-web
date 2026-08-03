import type { Asset } from './Gallery.type';

export interface Hero {
  cover?: string;
  title: string;
  subtitle: string;
  cta?: {
    label: string;
    href: string;
  };
  coverImage?: Asset;
}
