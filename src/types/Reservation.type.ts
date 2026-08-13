import type { AttendeeTypes } from './Tickets.type';

type ReservationStage =
  | 'WELCOME'
  | 'CONTACT'
  | 'TICKETS'
  | 'ATTENDEES'
  | 'REVIEW'
  | 'PAYMENT_PENDING'
  | 'CONFIRMED'
  | 'PAYMENT_FAILED'
  | 'CANCELLED';

type PaymentStatus =
  'CREATED' | 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';

export type Gender = 'Male' | 'Female' | 'Others';

type PaymentMethod = 'RAZORPAY' | null;

type TicketType = 'PAID' | 'FREE';

type Currency = 'INR';

interface Payment {
  id: string;
  reservationId: string;
  provider: string;
  paymentMethod: PaymentMethod;
  paidAt: string;
  orderId: string;
  paymentId: string;
  signature: string;
  receipt: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
}

interface Contact {
  reservationId: string;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type PartialContact = Omit<Contact, 'reservationId' | 'createdAt' | 'updatedAt'>;

interface ReservationTicket {
  id: string;
  reservationId: string;
  ticketId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  ticket: Ticket[];
}

interface Ticket {
  id: string;
  eventId: string;
  attendeeType: AttendeeTypes;
  currency: Currency;
  price: number;
  availableQuantity: number;
  soldCount: number;
  maxPerBooking: number;
  maxChild: number;
  requirements: string[];
  type: TicketType;
  maxAge: number | null;
  attendees: Attendee[];
}

interface Attendee {
  id: string;
  reservationId: string;
  reservationTicketId: string;
  type: AttendeeTypes;
  name: string;
  age: number;
  gender: Gender;
  checkedInAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Reservation {
  id: string;
  eventId: string;
  stage: ReservationStage;
  bookingId: string;
  confirmedAt: string;
  createdAt: string;
  updatedAt: string;
  deviceId: string;
  canProceed: true;
  payment: Payment;
  contact: Contact;
  attendees: Attendee[];
  tickets: ReservationTicket[];
}

interface TicketBreakdown {
  reservationTicketId: string;
  ticketId: string;
  ticketName: AttendeeTypes;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Summary {
  stage: ReservationStage;
  ticketBreakdown: TicketBreakdown[];
  subtotal: number;
  discount: number;
  total: number;
  totalChildren: number;
  freeChildrenAllowed: number;
  paymentStatus: PaymentStatus;
  canProceed: boolean;
}

export interface ReservationResponse {
  reservation: Reservation;
  summary: Summary;
}

export interface ReservationErrorData {
  error: string;
  message: string[] | string;
  statusCode: number;
}
