import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Conferencia } from "@/interfaces/conferencias"; 
import { fetchConferencias } from "@/services/conferencias";
import Button from "@/components/Button";

interface ConferenciaProps {
  conferencia: Conferencia;
}

const ConferenciaComponent = ({ conferencia }: ConferenciaProps) => {
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
    <div className="w-full border border-slate-100 border-b-[#ffffff82] flex flex-col mb-12 rounded-t-md rounded-b-md">
      <div className="w-full h-14 flex items-center text-2xl p-3 font-bold montserrat-font">
        {conferencia.horario}
      </div>
      <div id="conferencia" className="w-full border border-slate-100 border-t-[#ffffff82] lg:h-48 lg:flex rounded-b-md">
        <div id="hora" className="p-5 lg:w-1/4 flex flex-col items-center justify-center">
          <div className="relative w-full lg:h-[80%] h-28 border border-slate-200">
            <Image
              src="/img/ponente.svg"
              alt={conferencia.nombre_ponente}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="border border-slate-200 w-full text-center text-sm">
            {conferencia.nombre_ponente}
          </div>
        </div>
        <div id="data" className="lg:w-2/4 flex flex-col p-5">
          <h2 className="text-lg font-bold">{conferencia.titulo}</h2>
          <div className="text-base my-3">{conferencia.lugar}</div>
          <Button
            text="Inscribirse"
            action={handleCupo}
            variant="secondary"
            styleType="outlined"
            className="w-full md:w-max"
          >
            <span className="material-symbols-outlined">
            how_to_reg
            </span>
          </Button>
        </div>
        <div
          id="datosimportantes"
          className="overflow-hidden lg:w-1/4 relative p-4 cursor-pointer flex items-center"
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

export default function Cronograma() {
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
  }, [diaSeleccionado]); // Actualizamos las conferencias cada vez que cambie el día

  return (
    <div className="my-16 w-full flex flex-col items-center">
      <h2 className="text-6xl mb-10">Conferencias</h2>
      <div className="flex lg:w-3/5 w-4/5 justify-between">
        {dias.map((dia) => (
          <div
            key={dia.fecha}
            onClick={() => setDiaSeleccionado(dia.fecha)}
            className={`border border-[#1f2257] w-[22%] lg:text-base text-sm text-center flex rounded-md h-10 items-center justify-center transition-all duration-300 cursor-pointer ${
              diaSeleccionado === dia.fecha
                ? "bg-[#F2AE30] text-[#32378C]"
                : "bg-[#32378C] hover:bg-[#F2AE30] hover:text-[#32378C]"
            }`}
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
            <ConferenciaComponent key={conferencia.horario} conferencia={conferencia} />
          ))
        )}
      </div>
    </div>
  );
}
