import {
  IconCalendar,
  IconCamera,
  IconEPassport,
  IconFlagCheck,
  IconGift,
  IconHeart,
  IconHelp,
  IconMasksTheater,
  IconMicrophone2,
  IconMoodKid,
  IconMusic,
  IconPlayCard,
  IconRosetteDiscountCheck,
  IconShoppingBag,
  IconSoup,
  IconSparkles,
  IconTicket,
  IconUsers,
  type Icon,
} from '@tabler/icons-react';

export const iconRegistry = {
  registration: IconTicket,
  food: IconSoup,
  ceremony: IconRosetteDiscountCheck,
  culture: IconMasksTheater,
  music: IconMicrophone2,
  games: IconPlayCard,
  kids: IconMoodKid,
  passport: IconEPassport,
  competition: IconGift,
  shopping: IconShoppingBag,
  photo: IconCamera,
  celebrity: IconSparkles,
  dj: IconMusic,
  finish: IconFlagCheck,
  users: IconUsers,
  heart: IconHeart,
  calendar: IconCalendar,
} as const satisfies Record<string, Icon>;

export type AppIconName = keyof typeof iconRegistry;

export function getIcon(name: AppIconName | string): Icon {
  return iconRegistry[name as AppIconName] ?? IconHelp;
}
