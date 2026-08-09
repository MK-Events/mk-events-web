export interface BookingAttendee {
  id: string;
  name: string;
  type: string;
  age: number | null;
  gender: string | null;
  checkedInAt: string | null;
  createdAt: string;
  updatedAt: string;
  reservationId: string;
  reservationTicketId: string;
}

export interface BookingTicket {
  id: string;
  ticket: {
    id: string;
    type: string;
    price: number;
    maxAge: number | null;
    eventId: string;
    currency: string;
    maxChild: number;
    soldCount: number;
    attendeeType: string;
    requirements: string | null;
    maxPerBooking: number;
    availableQuantity: number;
  };
  quantity: number;
  ticketId: string;
  attendees: BookingAttendee[];
  createdAt: string;
  updatedAt: string;
  reservationId: string;
}

export interface BookingContact {
  age: number | null;
  name: string;
  email: string;
  phone: string;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
  reservationId: string;
}

export interface BookingPayment {
  id: string;
  amount: number;
  paidAt: string | null;
  status: string;
  orderId: string;
  receipt: string | null;
  currency: string;
  provider: string;
  paymentId: string | null;
  signature: string | null;
  updatedAt: string;
  createdAt: string;
  reservationId: string;
}

export interface BookingReservation {
  id: string;
  stage: string;
  contact: BookingContact;
  eventId: string;
  payment: BookingPayment;
  tickets: BookingTicket[];
  attendees: BookingAttendee[];
  deviceId: string;
  bookingId: string | null;
  createdAt: string;
  updatedAt: string;
  canProceed: boolean;
  confirmedAt: string | null;
}

export interface BookingSummary {
  stage: string;
  total: number;
  discount: number;
  subtotal: number;
  canProceed: boolean;
  paymentStatus: string;
  totalChildren: number;
  freeChildrenAllowed: number;

  ticketBreakdown: Array<{
    amount: number;
    quantity: number;
    ticketId: string;
    unitPrice: number;
    ticketName: string;
    reservationTicketId: string;
  }>;
}

export interface BookingReservationResponse {
  summary: BookingSummary;
  reservation: BookingReservation;
}

export interface BookingPass {
  bookingId: string;
  reservation: BookingReservationResponse;
}

export interface FindBookingsRequest {
  eventId: string;
  email: string;
}

export interface GetBookingQrRequest {
  eventId: string;
  email: string;
  bookingId: string;
}

export interface BookingQrResponse {
  bookingId: string;
  qrToken: string;
}
