'use client'

import Cronograma from "@/components/cronograma";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  const handleDownload = () => {
    console.log('Cronograma descargado');
  };

  return (
    <div className="bg-[#101017] text-white font-light">
      <Navbar />

      {/* Imagen promocional y titulo */}
      <header className="relative w-full h-[90vh] overflow-hidden">
        <img
          src="/header.webp"
          alt="Imagen del congreso"
          className="w-full h-full object-cover scale-x-[-1] opacity-0 animate-fade-in"
        />
        <h1 className="absolute top-1/4 -translate-y-1/2 ml-8 text-6xl leading-none text-white text-shadow-lg opacity-0 translate-y-10 animate-slide-up">
          CONGRESO DE <br />
          INNOVACIÓN Y <br />
          TECNOLOGÍA <br />
          <span className="text-[#32378C] font-extrabold text-shadow-none">UNAH 2025</span>
        </h1>
      </header>
      <div className="h-16 w-full bg-gradient-to-b from-[#020202] to-[#101017]"></div>

      {/* Contenido principal */}
      <main>
        {/* seccion de invitacion a descargar cronograma */}
        <section className="w-full h-screen flex items-center justify-center gap-12 px-8">
          <img src="/promo.enc" alt="Cronograma del evento" className="w-[30rem] rounded-lg" />
          <div className="w-[30rem] flex flex-col gap-8 text-6xl leading-none">
            <h2>Conoce nuestro cronograma de conferencias</h2>
            <PrimaryButton text="Descargar Cronograma" action={handleDownload} />

          </div>
        </section>

        <Cronograma />
      </main>

      <footer className="text-center py-4">
        <p>UNAH 2025</p>
        <ul className="list-none">
          <li><strong>Teléfono:</strong> 2234-5678</li>
          <li><strong>Email:</strong> contacto@unah.edu</li>
          <li><strong>Dirección:</strong> Tegucigalpa, Honduras</li>
        </ul>
      </footer>
    </div>

  );
}

