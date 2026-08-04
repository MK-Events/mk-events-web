import { Tooltip } from '@mantine/core';
import { useAppConfig } from '@mk/hooks';
import {
  defaultSocialLinksSize,
  iconSizeMap,
  type SocialLinksLayout,
  type SocialLinksSize,
} from '@mk/types';
import { capitalizeFirstLetter } from '@mk/utils';
import {
  IconBrandFacebook as Facebook,
  IconBrandGithub as Github,
  IconBrandGmail as Gmail,
  IconBrandInstagram as Instagram,
  IconBrandWhatsapp as Whatsapp,
  IconBrandYoutube as Youtube,
} from '@tabler/icons-react';

import styles from './SocialLinks.module.scss';

const socialIconMap = {
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: Whatsapp,
  github: Github,
  gmail: Gmail,
  youtube: Youtube,
} as const;

export interface SocialLinksProps {
  layout?: SocialLinksLayout;
  size?: SocialLinksSize;
  className?: string;
  style?: React.CSSProperties;
  iconTheme?: 'light' | 'dark';
}

export const SocialLinks = ({
  layout,
  size,
  className,
  style,
  iconTheme = 'light',
}: SocialLinksProps) => {
  const config = useAppConfig();
  const strokeWidth = config.misc.socialIconStrokeWidth;
  const iconSize = iconSizeMap[size || defaultSocialLinksSize];
  const iconColor = iconTheme === 'dark' ? '#fff' : '#000';

  return (
    <div
      className={`social-links ${layout === 'vertical' ? 'flex-col' : 'flex-row'} ${className}`}
      style={style}
    >
      {config.social.links.map(({ platform, url }) => {
        const Icon = socialIconMap[platform as keyof typeof socialIconMap];
        if (!Icon) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <Tooltip label={capitalizeFirstLetter(platform)}>
              <Icon strokeWidth={strokeWidth} size={iconSize} color={iconColor} />
            </Tooltip>
          </a>
        );
      })}
    </div>
  );
};
