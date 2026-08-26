export interface Ticket {
  id: string;

  attendeeType?: AttendeeTypes;
  currency: 'INR';

  price: number;

  availableQuantity: number;
  soldCount: number;

  maxPerBooking: number;
  maxChild?: number;

  requirements?: string[];
  includedBenefits: string[];
}

export type AttendeeTypes = 'School' | 'College' | 'Adult' | 'Child' | 'Guest' | 'Corporate';

export type TicketFilterOptions = 'Free' | 'Paid' | 'All';
