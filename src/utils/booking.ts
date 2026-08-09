import type { BookingAttendee, BookingPass, BookingTicket } from '@mk/types';

export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const getBookingAttendees = (booking: BookingPass): BookingAttendee[] => {
  return booking.reservation.reservation.attendees ?? [];
};

export const getBookingTickets = (booking: BookingPass): BookingTicket[] => {
  return booking.reservation.reservation.tickets ?? [];
};

export const getTicketLabel = (ticket: BookingTicket): string => {
  return ticket.ticket.attendeeType;
};

export const getAttendeeTypeLabel = (type: string): string => {
  switch (type) {
    case 'Adult':
      return 'Adult';

    case 'College':
      return 'College Student';

    case 'School':
      return 'School Student';

    case 'Child':
      return 'Child';

    default:
      return type;
  }
};
