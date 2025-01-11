'use client';
import React from 'react';
import QrScanner from './components/QrScanner';
import Header from '../components/header';

const ScanPage: React.FC = () => {
  const handleScanSuccess = (decodedText: string) => {
    alert(`QR Code Detected: ${decodedText}`);
    console.log(decodedText);
  };

  const handleScanError = (errorMessage: string) => {
    console.warn(`QR Scan Error: ${errorMessage}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#101017] text-white">
      {/* Header siempre en la parte superior */}
      <Header />

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center flex-grow px-4">

        {/* Escáner QR */}
        <div className="">
          <QrScanner onScanSuccess={handleScanSuccess} onScanError={handleScanError} />
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
