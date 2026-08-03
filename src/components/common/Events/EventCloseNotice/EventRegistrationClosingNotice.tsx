import type { EventComponentUsage } from '@mk/types';
import { IconAlarm, IconAlertTriangle, IconCalendarDue } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { Notice } from './Notice';

interface EventRegistrationClosingNoticeProps {
  closeAt: string | Date;
  usage: EventComponentUsage;
}

export function EventRegistrationClosingNotice({
  closeAt,
  usage,
}: EventRegistrationClosingNoticeProps) {
  const closeDate = dayjs(closeAt);
  const now = dayjs();

  if (closeDate.isBefore(now)) {
    return null;
  }

  const daysRemaining = closeDate.startOf('day').diff(now.startOf('day'), 'day');

  if (daysRemaining > 30) {
    return null;
  }

  if (daysRemaining === 0) {
    return (
      <Notice
        icon={IconAlarm}
        color="red"
        text={`Last day to register. Closes at ${closeDate.format('h:mm A')}`}
        usage={usage}
      />
    );
  }

  if (daysRemaining === 1) {
    return (
      <Notice
        icon={IconAlertTriangle}
        color="orange"
        text={`Registration closes tomorrow at ${closeDate.format('h:mm A')}`}
        usage={usage}
      />
    );
  }

  if (daysRemaining <= 7) {
    return (
      <Notice
        icon={IconAlertTriangle}
        color="yellow"
        text={`Only ${daysRemaining} days left to register`}
        usage={usage}
      />
    );
  }

  if (daysRemaining <= 14) {
    return (
      <Notice
        icon={IconCalendarDue}
        color="dimmed"
        text={`Registration closes on ${closeDate.format('D MMM YYYY')}`}
        usage={usage}
      />
    );
  }

  return null;
}

export default EventRegistrationClosingNotice;
