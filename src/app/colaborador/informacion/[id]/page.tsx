'use client';
import React from 'react';
import Header from '../../components/header';
import UserInfoCard from './components/info';



const ScanPage: React.FC = () => {
  

  return (
    <div className="flex flex-col min-h-screen bg-[#101017] text-white">
      {/* Header siempre en la parte superior */}
      <Header />

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center flex-grow px-4">

        {/* Escáner QR */}
        <div className="">
          <UserInfoCard/>
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
