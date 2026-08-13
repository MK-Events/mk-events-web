import { useMemo } from 'react';

import about from '@mk/config/pages/aboutConfig.json';
import contact from '@mk/config/pages/contactConfig.json';
import eventDetails from '@mk/config/pages/eventDetailsConfig.json';
import events from '@mk/config/pages/eventsConfig.json';
import gallery from '@mk/config/pages/galleryConfig.json';
import home from '@mk/config/pages/homeConfig.json';
import privacy from '@mk/config/pages/privacyConfig.json';
import refund from '@mk/config/pages/refundPolicy.json';
import registration from '@mk/config/pages/registrationConfig.json';
import terms from '@mk/config/pages/termsConfig.json';

const pageConfigs = {
  home,
  events,
  gallery,
  contact,
  eventDetails,
  privacy,
  terms,
  refund,
  about,
  registration,
} as const;

export type PageSlug = keyof typeof pageConfigs;

export function usePageConfig<T extends PageSlug>(slug: T): (typeof pageConfigs)[T] {
  return useMemo(() => pageConfigs[slug], [slug]);
}
