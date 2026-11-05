import React from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  className = '',
}) => {
  // Gyors és megbízható QR kód generálás nagy felbontásban
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    value
  )}&color=4a3525&bgcolor=ffffff&margin=1`;

  return (
    <div
      className={`qr-display-container ${className}`}
      style={{
        display: 'inline-flex',
        padding: '12px',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(190, 150, 109, 0.18)',
        border: '1px solid rgba(190, 150, 109, 0.25)',
      }}
    >
      <img
        src={qrUrl}
        alt="Hűségkártya QR Kód"
        width={size}
        height={size}
        style={{ display: 'block', borderRadius: '8px' }}
      />
    </div>
  );
};
