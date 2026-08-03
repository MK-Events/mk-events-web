import type { AppIconName } from '@mk/icons';

import type { Asset, GalleryImage } from './Gallery.type';
import type { Hero } from './Hero.type';
import type { Ticket } from './Tickets.type';

// Data types for backend

export interface Event {
  id: string;

  slug: string;
  name: string;

  shortDescription: string;
  description: string;

  startDate: string;
  endDate: string;

  liveStreamUrl: string;

  coverImage: Asset;

  location: EventLocation;
  registration: Registration;

  gallery: Asset[];
  highlights: EventHighlight[];
  schedule: EventScheduleItem[];
  faqs: FAQ[];
  tickets: Ticket[];
}

export type FeaturedEvent = Omit<
  Event,
  | 'description'
  | 'location'
  | 'registration'
  | 'gallery'
  | 'highlights'
  | 'schedule'
  | 'faqs'
  | 'tickets'
> & {
  location: Pick<EventLocation, 'venue' | 'locationPin'>;
  registration: Omit<Registration, 'notices'>;
};

export type EventList = Omit<FeaturedEvent, 'registration' | 'liveStreamUrl' | 'location'> & {
  location: Pick<EventLocation, 'venue'>;
  featured: boolean;
};

export interface Registration {
  opensAt: string;
  closesAt: string;
  capacity: number;
  registered: number;
  notices: RegistrationNotice[];
}

export interface RegistrationNotice {
  message: string;
}

export interface EventLocation {
  venue: string;
  address: string;
  locationPin: string;
  city: string;
  state: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Event schedule and highlights
export interface EventFeature {
  title: string;
  description?: string;
  icon: AppIconName;
}

export interface EventScheduleItem extends EventFeature {
  time: string;
}

export interface EventHighlight extends EventFeature {}

// Types used for frontend UIs

export type EventState = 'upcoming' | 'ongoing' | 'completed';

export type RegistrationState = 'opensSoon' | 'open' | 'closed' | 'soldOut';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface EventView extends Omit<Event, 'coverImage' | 'gallery'> {
  coverImage: GalleryImage;
  gallery: GalleryImage[];
}

export interface EventsView {
  featured: EventView[];
  upcoming: EventView[];
  completed: EventView[];
  hero: Hero;
}

export type EventComponentUsage = 'EventDetails' | 'FeaturedEvent';
