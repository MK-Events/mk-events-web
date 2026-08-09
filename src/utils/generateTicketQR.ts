import QRCode from 'qrcode';

interface GenerateTicketQrOptions {
  value: string;
  size?: number;
}

export async function generateTicketQr(options: GenerateTicketQrOptions): Promise<string> {
  const { value, size = 800 } = options;

  return QRCode.toDataURL(value, {
    type: 'image/png',
    width: size,
    margin: 2,
    errorCorrectionLevel: 'H',
  });
}
