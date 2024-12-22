import Image from "next/image";
import { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Conferencia {
  horario: string;
  titulo: string;
  lugar: string;
  requerimientos?: string | null;
  expositor: {
    nombre: string;
    imagen: string;
  };
  datosImportantes: string[];
}

const conferencias: Conferencia[] = [
  {
    horario: "10:00 - 11:00",
    titulo: "Economía del Futuro: Transformación Digital y Nuevos Modelos Financieros",
    lugar: "Auditorio Principal",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Nuevas tendencias en la economía digital, como fintech, pagos digitales y criptomonedas.",
      "Concepto de economía circular y su papel en la sostenibilidad.",
      "Modelos de negocio emergentes basados en tecnología y datos, como la economía de suscripción, economía colaborativa y gig economy.",
      "Desafíos y oportunidades de la digitalización en los sistemas económicos actuales.",
    ],
  },
  {
    horario: "11:30 - 12:30",
    titulo: "El impacto de las criptomonedas en mercados internacionales",
    lugar: "Sala 2",
    requerimientos: null,
    expositor: {
      nombre: "Ing. Ana López",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Analizar el impacto global de las criptomonedas.",
      "Entender las oportunidades de inversión a futuro.",
      "Identificar desafíos en la regulación de activos digitales.",
    ],
  },
];

interface ConferenciaProps {
  conferencia: Conferencia;
}

const ConferenciaComponent: FC<ConferenciaProps> = ({ conferencia }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % conferencia.datosImportantes.length);
    }, 7500);
    return () => clearInterval(intervalo);
  }, [conferencia.datosImportantes]);

  return (
    <div className="w-full border border-slate-100 flex flex-col mb-16">
      <div className="w-full h-14 flex items-center text-2xl p-3 font-bold">
        {conferencia.horario}
      </div>
      <div id="conferencia" className="w-full border border-slate-100 h-48 flex">
        <div
          id="hora"
          className="p-5 px-7 w-1/4 flex flex-col items-center justify-center"
        >
          <div className="relative w-full h-[80%] border border-slate-200">
            <Image
              src={conferencia.expositor.imagen}
              alt={conferencia.expositor.nombre}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="border border-slate-200 w-full h-[20%] text-center">
            {conferencia.expositor.nombre}
          </div>
        </div>
        <div id="data" className="w-2/4 flex flex-col p-5">
          <h2 className="text-lg font-bold">{conferencia.titulo}</h2>
          <div className="text-base">{conferencia.lugar}</div>
          {conferencia.requerimientos && (
            <div className="text-sm">{conferencia.requerimientos}</div>
          )}
        </div>
        <div
          id="datosImportantes"
          className="overflow-hidden w-1/4 relative p-4 cursor-pointer flex items-center"
          onClick={() =>
            setIndex((prev) => (prev + 1) % conferencia.datosImportantes.length)
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-slate-200 font-medium text-sm"
            >
              {conferencia.datosImportantes[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function Cronograma() {
  return (
    <div className="my-16 w-full flex flex-col items-center">
      <h2 className="text-6xl mb-10">Conferencias</h2>
      <div className="flex w-3/5 justify-between">
        <div className="border border-[#1f2257] w-36 flex rounded-md bg-[#32378C] justify-center h-10 items-center">
          Lunes 16
        </div>
        <div className="border border-[#1f2257] w-36 flex rounded-md bg-[#32378C] justify-center h-10 items-center">
          Martes 17
        </div>
        <div className="border border-[#1f2257] w-36 flex rounded-md bg-[#32378C] justify-center h-10 items-center">
          Miércoles 18
        </div>
        <div className="border border-[#1f2257] w-36 flex rounded-md bg-[#32378C] justify-center h-10 items-center">
          Jueves 19
        </div>
      </div>
      <h3 className="text-4xl m-10">Lunes 27 de enero</h3>
      <div id="conferencias" className="w-3/5">
        {conferencias.map((conf, idx) => (
          <ConferenciaComponent key={idx} conferencia={conf} />
        ))}
      </div>
    </div>
  );
}
