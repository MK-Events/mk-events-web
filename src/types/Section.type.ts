import type { Hero } from './Hero.type';

interface SectionBase {
  title: string;
  label?: string;
  content?: string;
  cover?: string;
  icon?: string;
}

export interface Section extends SectionBase, Pick<Hero, 'cta'> {
  list?: SectionBase[];
  plainList?: string[];
  visible?: boolean;
}
