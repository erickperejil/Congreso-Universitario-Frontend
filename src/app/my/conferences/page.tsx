
"use client"
import Cronograma from "@/components/cronograma";
import { Conferencia } from "@/interfaces/conferencias";
import { cancelarInscripcionConferencia, inscribirseEnConferencia } from "@/services/conferencias/conferencia";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
export default function Conferences() {
  const [idUsuario, setIdUsuario] = useState<number>(0);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const parts = token.split(".");
        const payload = JSON.parse(atob(parts[1]));
        setIdUsuario(payload.id_usuario);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } 
  }, []);

const handleInscripcion = async (conferencia : Conferencia) => {
  try {
    if (conferencia.inscrito) {
      console.log(`Cancelando inscripción para la conferencia: ${conferencia.id_conferencia}`);
      const response = await cancelarInscripcionConferencia(idUsuario, conferencia.id_conferencia);
      console.log("Cancelación exitosa:", response);
    } else {
      console.log(`Inscribiéndose a la conferencia: ${conferencia.id_conferencia}`);
      const response = await inscribirseEnConferencia(idUsuario, conferencia.id_conferencia);
      console.log("Inscripción exitosa:", response);
    }
  } catch (error) {
    console.error("Error durante la acción (inscribir o cancelar):", error);
  }
};
    return (
    <div className="h-screen w-full overflow-y-scroll">
      <h2 className="md:w-4/6 w-11/12 mx-auto text-3xl md:mt-10 mt-14">
        Conferencias
      </h2>
      <Cronograma
        fetchPrompt="general"
        idUsuario={idUsuario}
        customStyles={{
          container: "border-[#101017] shadow-md shadow-slate-700",
          header: "bg-[#101017] text-slate-100",
          button: "border-slate-800 text-slate-800",
          imageContainer: "border-blue-400 border-b-transparent",
          ponente: "border-b-blue-200 border-x-blue-200 border-t-transparent",
          content:"border-transparent",
          datosimportantes: "text-slate-800 "
        }}
        dayButtonStyles={{
          default: "text-[#101017] border-[#101017]",
          selected: "bg-[#101017] text-slate-100",
          hover: "hover:text-[#101017] ",
        }}
        titleStyles="hidden"
        onInscribirse={handleInscripcion}
        
        
      />
    </div>
    );
}