import type { GalleryImage } from './Gallery.type';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  responsibility: string;
  avatarId: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface TeamMemberView {
  id: string;
  name: string;
  designation: string;
  responsibility: string;
  avatar: GalleryImage;
}
