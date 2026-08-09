import { QRCodeSVG } from 'qrcode.react';

interface EventQrCodeProps {
  value: string;
  size?: number;
  imageUrl?: string;
  imageSize?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  className?: string;
}

export function EventQrCode({
  value,
  size = 260,
  imageUrl,
  imageSize,
  level = 'H',
  includeMargin = true,
  className,
}: EventQrCodeProps) {
  const logoSize = imageSize ?? Math.round(size * 0.2);

  return (
    <QRCodeSVG
      value={value}
      size={size}
      level={level}
      includeMargin={includeMargin}
      className={className}
      imageSettings={
        imageUrl
          ? {
              src: imageUrl,
              width: logoSize,
              height: logoSize,
              excavate: true,
            }
          : undefined
      }
    />
  );
}

export default EventQrCode;
