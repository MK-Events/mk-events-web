import type { BookingPass } from './Booking.type';

export interface TicketEvent {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  logoUrl?: string;
}

export interface TicketRequirements {
  dos: string[];
  donts: string[];
}

export interface EventTicketData {
  event: {
    id: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    address: string;
    contactPhone: string;
    contactEmail: string;
    website: string;
    logoUrl: string;

    notices: string[];

    schedule: Array<{
      time: string;
      title: string;
      description: string;
    }>;
  };

  booking: BookingPass;

  qrToken: string;
}
