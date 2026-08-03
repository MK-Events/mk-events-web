import { useEffect, useMemo, useState } from 'react';

import type {
  Countdown,
  Event,
  EventList,
  EventState,
  FeaturedEvent,
  RegistrationState,
} from '@mk/types';

function getCountdown(target: Date): Countdown {
  const diff = Math.max(target.getTime() - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function useEventStatus(event: FeaturedEvent | Event) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return useMemo(() => {
    const eventState = useEventState(event);

    const isSoldOut =
      event.registration.capacity > 0 &&
      event.registration.registered >= event.registration.capacity;
    const registrationOpen = new Date(event.registration.opensAt).getTime();
    const registrationClose = new Date(event.registration.closesAt).getTime();

    let registrationState: RegistrationState;

    if (isSoldOut) {
      registrationState = 'soldOut';
    } else if (now < registrationOpen) {
      registrationState = 'opensSoon';
    } else if (now <= registrationClose) {
      registrationState = 'open';
    } else {
      registrationState = 'closed';
    }

    return {
      eventState,
      registrationState,
      isSoldOut,
      countdown: getCountdown(new Date(event.startDate)),
    };
  }, [event, now]);
}

export function useEventState(event: FeaturedEvent | Event | EventList) {
  const now = Date.now();

  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();

  let eventState: EventState;

  if (now < start) {
    eventState = 'upcoming';
  } else if (now <= end) {
    eventState = 'ongoing';
  } else {
    eventState = 'completed';
  }

  return eventState;
}
