import { StyleSheet } from '@react-pdf/renderer';

export const eventTicketStyles = StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: '#FAF8F0',
    fontFamily: 'Helvetica',
    color: '#171717',
  },

  // ==================================================
  // HEADER
  // ==================================================

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 90,
    height: 50,
    objectFit: 'contain',
    marginBottom: 12,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: 700,
    color: '#8A8A8A',
    marginBottom: 6,
    letterSpacing: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#171717',
    marginBottom: 6,
    textAlign: 'center',
  },

  bookingId: {
    fontSize: 10,
    fontWeight: 700,
    color: '#555555',
  },

  // ==================================================
  // SECTIONS
  // ==================================================

  section: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD9CC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#171717',
    marginBottom: 10,
  },

  // ==================================================
  // QR
  // ==================================================

  qrSection: {
    alignItems: 'center',
  },

  qr: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },

  qrHint: {
    fontSize: 8.5,
    color: '#777777',
    textAlign: 'center',
  },

  // ==================================================
  // EVENT DETAILS
  // ==================================================

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  label: {
    fontSize: 9,
    color: '#777777',
    width: '30%',
  },

  value: {
    fontSize: 9,
    fontWeight: 700,
    color: '#171717',
    maxWidth: '68%',
    textAlign: 'right',
  },

  // ==================================================
  // ATTENDEES
  // ==================================================

  attendeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 8,
  },

  attendeeName: {
    fontSize: 9.5,
    color: '#171717',
    maxWidth: '65%',
  },

  attendeeType: {
    fontSize: 7.5,
    fontWeight: 700,
    color: '#6E5518',
    maxWidth: '30%',
    textAlign: 'right',
  },

  // ==================================================
  // TICKETS
  // ==================================================

  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },

  ticketName: {
    fontSize: 9.5,
    color: '#171717',
    maxWidth: '75%',
  },

  ticketQuantity: {
    fontSize: 9.5,
    fontWeight: 700,
    color: '#171717',
  },

  // ==================================================
  // IMPORTANT INFORMATION
  // ==================================================

  bullet: {
    fontSize: 8.5,
    lineHeight: 1.5,
    marginBottom: 5,
    color: '#333333',
  },

  // ==================================================
  // EVENT SCHEDULE
  // ==================================================

  scheduleRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  scheduleTime: {
    width: 72,
    fontSize: 8.5,
    fontWeight: 700,
    color: '#6E5518',
    paddingRight: 8,
  },

  scheduleContent: {
    flex: 1,
  },

  scheduleTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: '#171717',
    marginBottom: 2,
  },

  scheduleDescription: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#666666',
  },

  // ==================================================
  // CONTACT
  // ==================================================

  contact: {
    fontSize: 8.5,
    color: '#555555',
    marginBottom: 4,
    lineHeight: 1.4,
  },

  // ==================================================
  // FOOTER
  // ==================================================

  footer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#DDD9CC',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 7.5,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 3,
  },
});
