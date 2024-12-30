"use client";

import Cronograma from "@/components/cronograma";
import Carousel from "@/components/ejes_tematicos";
import Navbar from "@/components/Navbar";
import Ponentes from "@/components/ponentes";
import Button from "@/components/Button";

export default function Home() {

  const navbarOptions = [
    { name: "Inicio", icon: "home", link: "#" },
    { name: "Ponentes", icon: "group", link: "#ponentes" },
    { name: "Conferencias", icon: "import_contacts", link: "#conferencias" },
  ];

  const handleDownload = () => {
    console.log("Cronograma descargado");
  };

  return (
    <div className="flex flex-col justify-center bg-[#101017] text-white font-extralight w-full">
      <Navbar options={navbarOptions} />

      {/* imagen promocional de inicio */}
      <header className="relative w-full h-screen overflow-hidden">
        <img
          src="/img/landing/header.webp"
          alt="Imagen del congreso"
          className="w-full h-full object-cover scale-x-[-1] opacity-0 animate-fade-in"
        />
        <h1 className="absolute top-1/4 -translate-y-1/2 transform text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white text-shadow-lg opacity-0 translate-y-10 animate-slide-up px-4 ml-8 tracking-widest">
          CONGRESO DE <br />
          INNOVACIÓN Y <br />
          TECNOLOGÍA <br />
          <span className="text-[#f8b133] text-shadow-none montserrat-font">
            UNAH 2025
          </span>
        </h1>
      </header>
      <div className="h-16 w-full bg-gradient-to-b from-[#020202] to-[#101017]"></div>

      {/* Contenido principal */}
      <main className="w-4/5 mx-auto">
        {/* seccion de invitacion a descargar cronograma */}
        <section className="w-full mt-12 xl:mt-0 xl:h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-8">
          <img
            src="/img/landing/promo.enc"
            alt="Cronograma del evento"
            className="rounded-lg w-full md:w-[50%] max-w-[450px] shadow-[8px_8px_15px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.2)]"
          />
          <div className="flex flex-col gap-8 text-center md:text-left text-3xl md:text-6xl leading-none">
            <h2>Conoce nuestro cronograma de conferencias</h2>
            <Button
              text="Descargar Cronograma"
              action={handleDownload}
              variant="primary"
              styleType="outlined"
              className="w-full md:w-max"
            >
              <span className="material-symbols-outlined">
                download
              </span>
            </Button>
          </div>
        </section>

        <div className="w-full min-h-screen flex flex-col bg-[101017]">
          <div className="bg-[101017] flex-grow w-full mt-10">
            <div className="container flex flex-col gap-10 mx-auto px-4">
              <section className="mt-12">
                <div>
                  <Carousel></Carousel>
                </div>
              </section>
              <section id="ponentes" className="pt-20">
                <div className="flex justify-center">
                  <Ponentes></Ponentes>
                </div>
                <div></div>
              </section>
              <section id="conferencias">
                <Cronograma></Cronograma>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-4">
        <p>UNAH 2025</p>
        <ul className="list-none">
          <li>
            <strong>Teléfono:</strong> 2234-5678
          </li>
          <li>
            <strong>Email:</strong> contacto@unah.edu
          </li>
          <li>
            <strong>Dirección:</strong> Tegucigalpa, Honduras
          </li>
        </ul>
      </footer>
    </div>
  );
}