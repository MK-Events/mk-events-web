import type { EventTicketData } from '@mk/types';
import { getAttendeeTypeLabel, getBookingAttendees, getBookingTickets } from '@mk/utils';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';

import { eventTicketStyles } from './EventTicketDocument.styles';

interface EventTicketDocumentProps {
  data: EventTicketData;
  qrDataUrl: string;
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function EventTicketDocument({ data, qrDataUrl }: EventTicketDocumentProps) {
  const { event, booking } = data;

  const attendees = getBookingAttendees(booking);

  const tickets = getBookingTickets(booking);

  return (
    <Document
      title={`${event.name} - ${booking.bookingId}`}
      author="MK Events"
      subject="Event Pass"
    >
      <Page size="A4" style={[eventTicketStyles.page, { fontFamily: 'Helvetica' }]}>
        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <View style={eventTicketStyles.header}>
          {event.logoUrl && <Image src={event.logoUrl} style={eventTicketStyles.logo} />}

          <Text style={eventTicketStyles.eyebrow}>EVENT PASS</Text>

          <Text style={eventTicketStyles.title}>{event.name}</Text>

          <Text style={eventTicketStyles.bookingId}>Booking ID: {booking.bookingId}</Text>
        </View>

        {/* ================================================== */}
        {/* QR */}
        {/* ================================================== */}

        <View style={[eventTicketStyles.section, eventTicketStyles.qrSection]}>
          <Text style={eventTicketStyles.sectionTitle}>Entry Pass</Text>

          <Image src={qrDataUrl} style={eventTicketStyles.qr} />

          <Text style={eventTicketStyles.qrHint}>Present this QR code at the event entrance.</Text>
        </View>

        {/* ================================================== */}
        {/* EVENT DETAILS */}
        {/* ================================================== */}

        <View style={eventTicketStyles.section}>
          <Text style={eventTicketStyles.sectionTitle}>Event Details</Text>

          <View style={eventTicketStyles.row}>
            <Text style={eventTicketStyles.label}>Date</Text>

            <Text style={eventTicketStyles.value}>{formatDate(event.date)}</Text>
          </View>

          <View style={eventTicketStyles.row}>
            <Text style={eventTicketStyles.label}>Timing</Text>

            <Text style={eventTicketStyles.value}>
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </Text>
          </View>

          <View style={eventTicketStyles.row}>
            <Text style={eventTicketStyles.label}>Venue</Text>

            <Text style={eventTicketStyles.value}>{event.venue}</Text>
          </View>

          {event.address && (
            <View style={eventTicketStyles.row}>
              <Text style={eventTicketStyles.label}>Address</Text>

              <Text style={eventTicketStyles.value}>{event.address}</Text>
            </View>
          )}
        </View>

        {/* ================================================== */}
        {/* ATTENDEES */}
        {/* ================================================== */}

        <View style={eventTicketStyles.section}>
          <Text style={eventTicketStyles.sectionTitle}>Attendees</Text>

          {attendees.map((attendee) => (
            <View key={attendee.id} style={eventTicketStyles.attendeeRow}>
              <Text style={eventTicketStyles.attendeeName}>{attendee.name}</Text>

              <Text style={eventTicketStyles.attendeeType}>
                {getAttendeeTypeLabel(attendee.type).toUpperCase()}
              </Text>
            </View>
          ))}
        </View>

        {/* ================================================== */}
        {/* TICKETS */}
        {/* ================================================== */}

        {tickets.length > 0 && (
          <View style={eventTicketStyles.section}>
            <Text style={eventTicketStyles.sectionTitle}>Tickets</Text>

            {tickets.map((ticket) => (
              <View key={ticket.id} style={eventTicketStyles.ticketRow}>
                <Text style={eventTicketStyles.ticketName}>{ticket.ticket.attendeeType}</Text>

                <Text style={eventTicketStyles.ticketQuantity}>× {ticket.quantity}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ================================================== */}
        {/* IMPORTANT INFORMATION */}
        {/* ================================================== */}

        {event.notices.length > 0 && (
          <View style={eventTicketStyles.section}>
            <Text style={eventTicketStyles.sectionTitle}>Important Information</Text>

            {event.notices.map((notice, index) => (
              <Text key={index} style={eventTicketStyles.bullet}>
                • {notice}
              </Text>
            ))}
          </View>
        )}

        {/* ================================================== */}
        {/* EVENT SCHEDULE */}
        {/* ================================================== */}

        {event.schedule.length > 0 && (
          <View style={eventTicketStyles.section}>
            <Text style={eventTicketStyles.sectionTitle}>Event Schedule</Text>

            {event.schedule.map((item, index) => (
              <View key={`${item.time}-${index}`} style={eventTicketStyles.scheduleRow}>
                <Text style={eventTicketStyles.scheduleTime}>{item.time}</Text>

                <View style={eventTicketStyles.scheduleContent}>
                  <Text style={eventTicketStyles.scheduleTitle}>{item.title}</Text>

                  {item.description && (
                    <Text style={eventTicketStyles.scheduleDescription}>{item.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ================================================== */}
        {/* CONTACT */}
        {/* ================================================== */}

        <View style={eventTicketStyles.section}>
          <Text style={eventTicketStyles.sectionTitle}>Contact</Text>

          {event.contactPhone && (
            <Text style={eventTicketStyles.contact}>Phone: {event.contactPhone}</Text>
          )}

          {event.contactEmail && (
            <Text style={eventTicketStyles.contact}>Email: {event.contactEmail}</Text>
          )}

          {event.website && <Text style={eventTicketStyles.contact}>Website: {event.website}</Text>}
        </View>

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <View style={eventTicketStyles.footer}>
          <Text style={eventTicketStyles.footerText}>Booking ID: {booking.bookingId}</Text>

          <Text style={eventTicketStyles.footerText}>
            Please keep this pass available throughout your visit.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default EventTicketDocument;
