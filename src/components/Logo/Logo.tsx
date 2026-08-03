import { useCallback } from 'react';

import { useAppConfig } from '@mk/hooks';
import type { LogoRelativeSize, LogoTheme, LogoType } from '@mk/types';
import { isMobile, isTablet } from 'react-device-detect';

interface LogoProps {
  size?: number;
  relativeSize?: LogoRelativeSize;
  type?: LogoType;
  theme?: LogoTheme;
}

const Logo = ({ size, relativeSize, type, theme }: LogoProps) => {
  const config = useAppConfig();
  const getSize = useCallback(() => {
    if (size) return size;

    const iconDefaultRelativeSize =
      isMobile && !isTablet ? config.global.logoSize.sm : config.global.logoSize.md;

    const logoDefaultRelativeSize =
      isMobile && !isTablet ? config.global.logoSize.lg : config.global.logoSize.xl;

    switch (relativeSize) {
      case 'small':
        return config.global.logoSize.sm;
      case 'medium':
        return config.global.logoSize.md;
      case 'large':
        return config.global.logoSize.lg;
      default:
        return type === 'icon' ? iconDefaultRelativeSize : logoDefaultRelativeSize;
    }
  }, [size, relativeSize]);

  const logoSize = getSize();

  const logo =
    type === 'icon'
      ? theme === 'dark'
        ? config.global.logo.logoIconDark
        : config.global.logo.logoIconLight
      : theme === 'dark'
        ? config.global.logo.logoFullDark
        : config.global.logo.logoFullLight;

  return <img src={logo} alt="Logo" width={logoSize} height={logoSize} />;
};

export const MKEventsLogo = Logo;

export default MKEventsLogo;
