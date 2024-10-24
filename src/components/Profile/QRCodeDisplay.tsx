import React, {useEffect, useState} from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  qrCodeUrl: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCodeUrl }) => {
  const [qrCodeImage, setQrCodeImage] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(qrCodeUrl, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        setQrCodeImage(url);
      }
    });
  }, [qrCodeUrl]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>Scan this QR code with your authenticator app:</p>
      <img src={qrCodeImage} alt="QR Code" style={{ margin: '20px 0', height: '200px' }} />
    </div>
  );
};

export default QRCodeDisplay;