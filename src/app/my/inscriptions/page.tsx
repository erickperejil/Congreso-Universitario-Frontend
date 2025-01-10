"use client";
import { useState, useEffect } from "react";
import Cronograma from "@/components/cronograma";
import Cookies from "js-cookie";
import { fetchAsistenciasByUsuarioId } from "@/services/user";
import { motion } from "framer-motion";
import Loader from "@/components/Loading";
import { Asistencias } from "@/interfaces/participantes";
import { cancelarInscripcionConferencia, inscribirseEnConferencia } from "@/services/conferencias/conferencia";
import { Conferencia } from "@/interfaces/conferencias";

export default function MyInscriptions() {
  const [idUsuario, setIdUsuario] = useState<number>(0);
  const [asistenciasInfo, setAsistenciasInfo] = useState< Asistencias| null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInscripcion = async (conferencia: Conferencia) => {
      try {
        let response;
        if (conferencia.inscrito) {
          console.log(`Cancelando inscripción para la conferencia: ${conferencia.id_conferencia}`);
          response = await cancelarInscripcionConferencia(idUsuario, conferencia.id_conferencia);
        } else {
          console.log(`Inscribiéndose a la conferencia: ${conferencia.id_conferencia}`);
          response = await inscribirseEnConferencia(idUsuario, conferencia.id_conferencia);
        }
    
        if (response.codigoResultado === -1) {
          setErrorMessage(response.message || "Ha ocurrido un error.");
        } else {
          console.log("Acción exitosa:", response);
        }
      } catch (error) {
        console.error("Error durante la acción (inscribir o cancelar):", error);
        setErrorMessage("Error inesperado. Por favor intenta nuevamente."); // Mensaje de error genérico
      }
    };
    

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const parts = token.split(".");
        const payload = JSON.parse(atob(parts[1]));
        setIdUsuario(payload.id_usuario);

        // Llamar al API después de setear el ID
        (async () => {
          const data = await fetchAsistenciasByUsuarioId(payload.id_usuario);
          console.log("asistencia", data)
          setAsistenciasInfo(data);
          setIsLoading(false);
        })();
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader/>
      </div>
    );
  }

  if (idUsuario === null || asistenciasInfo === null || idUsuario == 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>Error al cargar los datos del usuario o las asistencias.</p>
      </div>
    );
  }

  if (idUsuario === null || idUsuario === 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll flex flex-col">
      <h2 className="md:w-4/6 w-11/12 mx-auto text-3xl mt-10">
        Mis conferencias
      </h2>

      <div className="md:w-4/6 w-11/12 h-40 mx-auto flex flex-col">
        <div className="relative mt-10 lg:w-1/2 w-full h-8 rounded-full bg-[#14110b] shadow-lg ">
          <h2 className="absolute inset-0 flex items-center justify-center text-center top-0 text-white">
            {asistenciasInfo.cantidad_asistidas}/
            {asistenciasInfo.cantidad_total_conferencias}
          </h2>
          <motion.div
          className="h-full border border-[#F2AE30] bg-[#F2AE30] rounded-l-full"
          initial={{ width: "0%" }}
          animate={{ width: `${
            asistenciasInfo.cantidad_total_conferencias > 0
              ? (asistenciasInfo.cantidad_asistidas /
                  asistenciasInfo.cantidad_total_conferencias) *
                100
              : 0
          }%` }} 
          transition={{ duration: 2, ease: "easeInOut" }} 
         ></motion.div>
          {/* <div
            className="h-full border border-[#F2AE30] bg-[#F2AE30] rounded-l-full"
            style={{
              width: `${
                asistenciasInfo.cantidad_total_conferencias > 0
                  ? (asistenciasInfo.cantidad_asistencias /
                      asistenciasInfo.cantidad_total_conferencias) *
                    100
                  : 0
              }%`,
            }}
          ></div> */}

        </div>

        <div>
          <h2 className="montserrat-font mt-3">
            Necesitas asistir a {asistenciasInfo.cantidad_total_conferencias}{" "}
            conferencias para obtener tu certificado
          </h2>
        </div>
      </div>
      <Cronograma
        fetchPrompt="inscritas"
        idUsuario={idUsuario}
        customStyles={{
          container: "border-[#101017] shadow-md shadow-slate-700",
          header: "bg-[#101017] text-slate-100",
          button: "border-slate-800 text-slate-800",
          imageContainer: "border-blue-400 border-b-transparent",
          ponente: "border-b-blue-200 border-x-blue-200 border-t-transparent montserrat-font",
          content: "border-transparent",
          datosimportantes: "text-slate-900 montserrat-font"
        }}
        dayButtonStyles={{
          default: "text-[#101017] border-[#101017] hidden",
          selected: "bg-[#101017] text-slate-100 hidden",
          hover: "hover:text-[#101017] hidden",
        }}
        titleStyles="hidden"
        subtitleStyles="hidden"
        onInscribirse={handleInscripcion}
      />
      <Cronograma
        fetchPrompt="usuario"
        idUsuario={idUsuario}
        customStyles={{
          container: "border-[#101017] shadow-md shadow-slate-700",
          header: "bg-[#101017] text-slate-100",
          button: "border-slate-800 text-slate-800 hidden",
          imageContainer: "border-blue-400 border-b-transparent",
          ponente: "border-b-blue-200 border-x-blue-200 border-t-transparent montserrat-font",
          content: "border-transparent",
          datosimportantes: "text-slate-900 montserrat-font"
        }}
        dayButtonStyles={{
          default: "text-[#101017] border-[#101017] hidden",
          selected: "bg-[#101017] text-slate-100 hidden",
          hover: "hover:text-[#101017] hidden",
        }}
        titleStyles="hidden"
        subtitleStyles="hidden"
      />
    </div>
  );
}
