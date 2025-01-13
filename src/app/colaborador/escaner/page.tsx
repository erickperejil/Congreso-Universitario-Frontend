'use client';
import React from 'react';
import QrScanner from './components/QrScanner';
import Header from '../components/header';

const ScanPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen bg-[#fff] text-white">
      {/* Header siempre en la parte superior */}
      <Header />

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Escáner QR */}
        <div className="">
          <QrScanner/>
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
