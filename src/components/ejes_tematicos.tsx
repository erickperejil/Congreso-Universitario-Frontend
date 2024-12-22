"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const carouselItems = [
  {
    id: 1,
    title: "INTELIGENCIA ARTIFICIAL",
    description: "Analiza aplicaciones, retos y oportunidades de la IA en múltiples campos.",
    image: "/img/imagen.svg",
  },
  {
    id: 2,
    title: "TECNOLOGÍA AVANZADA",
    description: "Explora avances tecnológicos y su impacto en el futuro.",
    image: "/img/imagen.svg",
  },
  {
    id: 3,
    title: "INNOVACIÓN TECNOLÓGICA",
    description: "Descubre cómo la innovación impulsa cambios en la sociedad.",
    image: "/img/imagen.svg",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-lg">
      {/* Contenedor del carrusel */}
      <h1 className="text-[#E7E8F2] text-3xl font-bold text-center mb-6">
        Ejes Tematicos
      </h1>
      <div
        className="flex transition-transform duration-700 ease-in-out h-full rounded-sm"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="min-w-full flex-shrink-0 flex items-center justify-center relative h-full"
          >
            {/* Imagen */}
            <div className="relative w-full h-full rounded-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-sm"
              />
            </div>
            {/* Información superpuesta */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 bg-black bg-opacity-50">
              <h2 className="text-2xl md:text-4xl font-bold">{item.title}</h2>
              <p className="mt-4 text-sm md:text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón izquierdo */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        &#9664;
      </button>

      {/* Botón derecho */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        &#9654;
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
