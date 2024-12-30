"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Conferencia } from "@/interfaces/conferencias";
import { fetchConferencias } from "@/services/conferencias";
import Button from "@/components/Button";

interface ConferenciaComponentProps {
  conferencia: Conferencia;
  customStyles?: {
    container?: string;
    header?: string;
    content?: string;
    imageContainer?: string;
    image?: string;
    ponente?: string;
    title?: string;
    lugar?: string;
    datosimportantes?: string;
    button?: string;
  };
}

const ConferenciaComponent = ({ conferencia, customStyles }: ConferenciaComponentProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % conferencia.datosimportantes.length);
    }, 7500);
    return () => clearInterval(intervalo);
  }, [conferencia.datosimportantes]);

  const handleCupo = () => {
    console.log("Cronograma descargado");
  };

  return (
    <div className={`w-full border flex flex-col mb-12 rounded-md ${customStyles?.container || "border-slate-100 border-b-[#ffffff82]"}`}>
      <div className={`w-full h-14 flex items-center text-2xl p-3 font-bold montserrat-font ${customStyles?.header || ""}`}>
        {conferencia.horario}
      </div>
      <div className={`w-full border lg:h-48 lg:flex rounded-b-md ${customStyles?.content || "border-slate-100 border-t-[#ffffff82]"}`}>
        <div className={`p-5 lg:w-1/4 flex flex-col items-center justify-center ${customStyles?.imageContainer || ""}`}>
          <div className={`relative w-full lg:h-[80%] h-28 border ${customStyles?.image || "border-slate-200"}`}>
            <Image
              src={conferencia.img_ponente}
              alt={conferencia.nombre_ponente}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className={`border w-full text-center text-sm ${customStyles?.ponente || "border-slate-200"}`}>
            {conferencia.nombre_ponente}
          </div>
        </div>
        <div className={`lg:w-2/4 flex flex-col p-5 ${customStyles?.content || ""}`}>
          <h2 className={`text-lg font-bold ${customStyles?.title || ""}`}>{conferencia.titulo}</h2>
          <div className={`text-base my-3 ${customStyles?.lugar || ""}`}>{conferencia.lugar}</div>
          <Button
            text="Inscribirse"
            action={handleCupo}
            variant="secondary"
            styleType="outlined"
            className={`w-full md:w-max ${customStyles?.button || ""}`}
          >
            <span className="material-symbols-outlined">how_to_reg</span>
          </Button>
        </div>
        <div
          className={`overflow-hidden lg:w-1/4 relative p-4 cursor-pointer flex items-center ${customStyles?.datosimportantes || ""}`}
          onClick={() =>
            setIndex((prev) => (prev + 1) % conferencia.datosimportantes.length)
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
              {conferencia.datosimportantes[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface CronogramaProps {
  customStyles?: ConferenciaComponentProps["customStyles"];
  dayButtonStyles?: {
    default?: string;
    selected?: string;
    hover?: string;
  };
  titleStyles?: string;
}

export default function Cronograma({ customStyles, dayButtonStyles, titleStyles }: CronogramaProps) {
  const [diaSeleccionado, setDiaSeleccionado] = useState("24/01/2025");
  const [conferencias, setConferencias] = useState<Conferencia[]>([]);
  const [loading, setLoading] = useState(true);

  const dias = [
    { fecha: "24/01/2025", label: "Lunes 27" },
    { fecha: "25/01/2025", label: "Martes 28" },
    { fecha: "26/01/2025", label: "Miércoles 29" },
    { fecha: "27/01/2025", label: "Jueves 30" },
  ];

  useEffect(() => {
    async function fetchGets() {
      try {
        const respuesta = await fetchConferencias(diaSeleccionado);
        setConferencias(respuesta);
      } catch (error) {
        console.error("Error al traer conferencias:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGets();
  }, [diaSeleccionado]);

  return (
    <div className="my-16 w-full flex flex-col items-center">
      <h2 className={`text-6xl mb-10 ${titleStyles || ""}`}>Conferencias</h2>
      <div className="flex lg:w-3/5 w-4/5 justify-between">
        {dias.map((dia) => (
          <div
            key={dia.fecha}
            onClick={() => setDiaSeleccionado(dia.fecha)}
            className={`border w-[22%] lg:text-base text-sm text-center flex rounded-md h-10 items-center justify-center transition-all duration-300 cursor-pointer ${
              diaSeleccionado === dia.fecha
                ? dayButtonStyles?.selected || "bg-[#F2AE30] text-[#32378C]"
                : dayButtonStyles?.default || "bg-[#32378C]"
            } ${diaSeleccionado !== dia.fecha ? dayButtonStyles?.hover || "hover:bg-[#F2AE30] hover:text-[#32378C]" : ""}`}
          >
            {dia.label}
          </div>
        ))}
      </div>
      <h3 className="text-4xl m-10">
        {dias.find((dia) => dia.fecha === diaSeleccionado)?.label}
      </h3>

      <div id="conferencias" className="w-4/6">
        {loading ? (
          <div>Cargando...</div>
        ) : (
          conferencias.map((conferencia) => (
            <ConferenciaComponent
              key={conferencia.horario}
              conferencia={conferencia}
              customStyles={customStyles}
            />
          ))
        )}
      </div>
    </div>
  );
}
