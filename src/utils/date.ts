// utils/date.ts
import dayjs from 'dayjs';

/**
 * Returns true if both dates fall on the same calendar day.
 */
export function isSameDay(startDate: Date | string, endDate: Date | string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  );
}

/**
 * Sunday, 8 November 2026
 */
export function formatEventDate(date: Date | string, locale = 'en-GB'): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * 9:00 AM
 */
export function formatEventTime(date: Date | string, locale = 'en-GB'): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
}

/**
 * 9:00 AM to 9:00 PM
 */
export function formatEventTimeRange(startDate: Date | string, endDate: Date | string): string {
  return `${formatEventTime(startDate)} to ${formatEventTime(endDate)}`;
}

/**
 * Sunday, 8 November 2026 • 9:00 AM to 9:00 PM
 *
 * Saturday, 7 November 2026, 6:00 PM
 * to
 * Sunday, 8 November 2026, 9:00 PM
 */
export function formatEventDuration(startDate: Date | string, endDate: Date | string): string {
  if (isSameDay(startDate, endDate)) {
    return `${formatEventDate(startDate)} • ${formatEventTimeRange(startDate, endDate)}`;
  }

  return `${formatEventDate(startDate)}, ${formatEventTime(
    startDate
  )} to ${formatEventDate(endDate)}, ${formatEventTime(endDate)}`;
}

export function formatRegistrationClose(closeAt: string | Date): string {
  const closeDate = dayjs(closeAt);
  const now = dayjs();

  const days = closeDate.startOf('day').diff(now.startOf('day'), 'day');

  if (days === 0) {
    return `Registrations close today at ${closeDate.format('h:mm A')}`;
  }

  if (days === 1) {
    return `Registrations close tomorrow at ${closeDate.format('h:mm A')}`;
  }

  if (days > 1 && days <= 7) {
    return `Registrations close in ${days} days (${closeDate.format('D MMM, h:mm A')})`;
  }

  return `Registrations close on ${closeDate.format('D MMMM YYYY')} at ${closeDate.format('h:mm A')}`;
}

export function formatEventScheduleTime(time: string) {
  const date = new Date(time);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC', // Keep it in UTC
  });
}
