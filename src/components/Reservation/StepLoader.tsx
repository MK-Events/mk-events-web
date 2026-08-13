import { Loader } from '@mantine/core';

import styles from './StepLoader.module.scss';

interface StepLoaderProps {
  visible: boolean;
}

export function StepLoader({ visible }: StepLoaderProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <Loader size="md" />
    </div>
  );
}

export default StepLoader;
