import { usePWAInstall } from '@mk/hooks/usePWAInstall';
import { IconDownload, IconX } from '@tabler/icons-react';

import styles from './PWAInstallButton.module.scss';

export const PWAInstallButton = () => {
  const { installable, installApp, isInstalled, dismissInstall } = usePWAInstall();

  if (!installable || isInstalled) {
    return null;
  }

  return (
    <div className={styles.pwaWrapper} role="dialog" aria-live="polite">
      <button onClick={installApp} className={styles.pwaButton} type="button">
        <div className={styles.pwaContent}>
          <IconDownload className={styles.pwaIcon} />
          Install app
        </div>
      </button>

      <button
        className={styles.pwaClose}
        onClick={dismissInstall}
        type="button"
        aria-label="Dismiss install prompt"
      >
        <IconX />
      </button>
    </div>
  );
};

PWAInstallButton.displayName = 'PWAInstallButton';

export default PWAInstallButton;
