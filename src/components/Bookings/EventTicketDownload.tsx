import { useEffect, useState } from 'react';

import { Button } from '@mantine/core';
import type { EventTicketData } from '@mk/types';
import { generateTicketQr } from '@mk/utils';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { IconDownload } from '@tabler/icons-react';

import { EventTicketDocument } from './EventTicketDocument';

interface EventTicketDownloadProps {
  data: EventTicketData;
}

export function EventTicketDownload({ data }: EventTicketDownloadProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const [isGeneratingQr, setIsGeneratingQr] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function generateQr() {
      try {
        setIsGeneratingQr(true);

        const result = await generateTicketQr({
          value: data.qrToken,
          size: 1000,
        });

        if (!cancelled) {
          setQrDataUrl(result);
        }
      } finally {
        if (!cancelled) {
          setIsGeneratingQr(false);
        }
      }
    }

    generateQr();

    return () => {
      cancelled = true;
    };
  }, [data.qrToken]);

  if (isGeneratingQr || !qrDataUrl) {
    return (
      <Button loading fullWidth>
        Preparing Ticket
      </Button>
    );
  }

  const fileName = `${data.event.name}-${data.booking.bookingId}`
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase();

  return (
    <PDFDownloadLink
      document={<EventTicketDocument data={data} qrDataUrl={qrDataUrl} />}
      fileName={`${fileName}.pdf`}
      style={{ textDecoration: 'unset' }}
    >
      {({ loading }) => (
        <Button fullWidth leftSection={<IconDownload size={18} />} loading={loading}>
          Download Ticket PDF
        </Button>
      )}
    </PDFDownloadLink>
  );
}

export default EventTicketDownload;
