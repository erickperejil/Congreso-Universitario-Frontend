import { Conferencia } from "@/interfaces/conferencias";

export const fetchConferencias = async (dia: string): Promise<Conferencia[]> => {
  const response = await fetch("https://backend-congreso.vercel.app/conferencias", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dia }),
  });

  if (!response.ok) {
    throw new Error("Error al obtener las conferencias");
  }

  const data = await response.json();
  console.log("data",data)
  return data.conferencias;
};


export const fetchConferenciasPorUsuario = async (idUsuario: number, dia: string | null): Promise<Conferencia[]> => {
  const response = await fetch("https://backend-congreso.vercel.app/conferencias/usuario", {
    method: "POST", // Cambié el método a POST porque coincide con el ejemplo que proporcionaste.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idUsuario, dia }),
  });

  if (!response.ok) {
    throw new Error("Error al obtener las conferencias del usuario");
  }

  const data = await response.json();
  console.log("data de usuario", data);
  return data.conferencias;
};

export const fetchConferenciasPorUsuarioGeneral = async (idUsuario: number, fecha: string | null): Promise<Conferencia[]> => {
  const response = await fetch("https://backend-congreso.vercel.app/conferencias/usuario/general", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idUsuario, fecha }),
  });

  if (!response.ok) {
    throw new Error("Error al obtener las conferencias del usuario");
  }

  const data = await response.json();
  console.log("data de usuario general", data);
  return data.conferencias;
};
