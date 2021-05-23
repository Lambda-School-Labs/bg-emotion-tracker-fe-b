import React from 'react';
import QrReader from 'modern-react-qr-reader';

const QRCodeReader = props => {
  const { handleScan, handleError } = props;

  return (
    <div className="qrReader">
      <QrReader
        delay={300}
        facingMode={'environment'}
        style={{ width: 'auto' }}
        onError={handleError}
        onScan={handleScan}
        style={{ marginBottom: '1rem' }}
      />
    </div>
  );
};

export default QRCodeReader;
