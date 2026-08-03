import { useMemo } from 'react';

import appConfig from '@mk/config/appConfig.json';

export type AppConfig = typeof appConfig;

export function useAppConfig(): AppConfig {
  return useMemo(() => appConfig, []);
}
