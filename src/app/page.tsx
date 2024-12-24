'use client'

import Cronograma from "@/components/cronograma";
import Carousel from "@/components/ejes_tematicos";
import Navbar from "@/components/Navbar";
import Ponentes from "@/components/ponentes";
import PrimaryButton from "@/components/PrimaryButton";
import Nav from "@/components/Navbar copy";

export default function Home() {
  const handleDownload = () => {
    console.log('Cronograma descargado');
  };

  return (
    <div className="bg-[#101017] text-white font-light">
      <Nav />

      {/* Imagen promocional y titulo */}
      <header className="relative w-full h-[100vh] overflow-hidden">
        <img
          src="/header.webp"
          alt="Imagen del congreso"
          className="w-full h-full object-cover scale-x-[-1] opacity-0 animate-fade-in"
        />
        <div className="absolute top-1/3 -translate-y-1/2 ml-14 text-6xl leading-none text-white text-shadow-lg opacity-0 translate-y-10 animate-slide-up gap-2 flex flex-col">
          <h1>
            CONGRESO DE <br />
            INNOVACIÓN Y <br />
            TECNOLOGÍA <br />
            <span className="text-[#f9b033] font-black text-shadow-none">UNAH 2025</span>
          </h1>
        </div>
      </header>
      <div className="h-16 w-full bg-gradient-to-b from-[#020202] to-[#101017]"></div>

      {/* Contenido principal */}
      <main>
        {/* seccion de invitacion a descargar cronograma */}
        <section className="w-full h-screen flex items-center justify-center gap-12 px-8">
          <img src="/promo.enc" alt="Cronograma del evento" className="w-[30rem] rounded-lg" />
          <div className="w-[30rem] flex flex-col gap-8 text-6xl leading-none">
            <h2>Conoce nuestro cronograma de conferencias</h2>
            <PrimaryButton text="Descargar Cronograma" action={handleDownload}>
              <span className="material-symbols-outlined">download</span>
        
              </PrimaryButton>

          </div>
        </section>



        <div className="w-full min-h-screen flex flex-col bg-[101017]">
          <div className="bg-[101017] flex-grow w-full mt-10">
            <div className="flex justify-center">
              <Cronograma></Cronograma>
            </div>

            <div className="container mx-auto px-4 py-10">
              <section className="mt-12">
                <div>
                  <Carousel></Carousel>
                </div>
              </section>
              <section>
                <div className="flex justify-center mt-[9%]">
                  <Ponentes></Ponentes>
                </div>
                <div>

                </div>
              </section>
            </div>
          </div>
        </div>

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

