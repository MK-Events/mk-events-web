import type { GalleryImage } from './Gallery.type';
import type { TeamMemberView } from './TeamMember.type';

export interface About {
  title: string;
  mission: string;
  vision: string;
  story: string;
  imageId: string[];
  values: Value[];
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface AboutView {
  about: {
    title: string;
    story: string;
    mission: string;
    vision: string;
    values: Value[];
    team: GalleryImage;
    mastHead: GalleryImage;
  };

  team: TeamMemberView[];
}
