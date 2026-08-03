export type SocialLinksLayout = 'horizontal' | 'vertical';
export type SocialLinksSize = 'small' | 'medium' | 'large';
export const defaultSocialLinksLayout: SocialLinksLayout = 'horizontal';
export const defaultSocialLinksSize: SocialLinksSize = 'medium';

export const iconSizeMap: Record<SocialLinksSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
};

type allowedSocialPlatforms = 'facebook' | 'instagram' | 'whatsapp' | 'github' | 'gmail';

export interface SocialLink {
  platform: allowedSocialPlatforms;
  url: string;
}
