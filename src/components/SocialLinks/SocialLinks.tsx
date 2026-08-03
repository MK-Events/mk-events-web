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
} from '@tabler/icons-react';

import styles from './SocialLinks.module.scss';

export interface SocialLinksProps {
  layout?: SocialLinksLayout;
  size?: SocialLinksSize;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
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
  const iconColor = iconTheme === 'dark' ? '#FFFFFF' : '#000000';
  const socialIcons = config.social.links.map((socialPlatform) => {
    return (
      <a
        href={socialPlatform.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialIcon}
        key={socialPlatform.platform}
      >
        {socialPlatform.platform === 'facebook' && (
          <Tooltip label={capitalizeFirstLetter(socialPlatform.platform)}>
            <Facebook strokeWidth={strokeWidth} size={iconSize} color={iconColor} />
          </Tooltip>
        )}
        {socialPlatform.platform === 'instagram' && (
          <Tooltip label={capitalizeFirstLetter(socialPlatform.platform)}>
            <Instagram strokeWidth={strokeWidth} size={iconSize} color={iconColor} />
          </Tooltip>
        )}
        {socialPlatform.platform === 'whatsapp' && (
          <Tooltip label={capitalizeFirstLetter(socialPlatform.platform)}>
            <Whatsapp strokeWidth={strokeWidth} size={iconSize} color={iconColor} />
          </Tooltip>
        )}
        {socialPlatform.platform === 'github' && (
          <Tooltip label={capitalizeFirstLetter(socialPlatform.platform)}>
            <Github strokeWidth={strokeWidth} size={iconSize} color={iconColor} />
          </Tooltip>
        )}
        {socialPlatform.platform === 'gmail' && (
          <Tooltip label={capitalizeFirstLetter(socialPlatform.platform)}>
            <Gmail strokeWidth={strokeWidth} size={iconSize} color={iconColor} />
          </Tooltip>
        )}
      </a>
    );
  });

  return (
    <div
      className={`social-links ${layout === 'vertical' ? 'flex-col' : 'flex-row'} ${className}`}
      style={style}
    >
      {socialIcons}
    </div>
  );
};
