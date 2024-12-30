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
