import { Participantes } from "@/interfaces/participantes";
import axios from "axios";
const BASE_URL = "https://backend-congreso.vercel.app";

export async function obtenerUsuarios(): Promise<Participantes[]> {
    try {
      const response = await fetch('https://backend-congreso.vercel.app/admin/certificates/accepted/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: true,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data.resultado as Participantes[];
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }

  
export async function obtenerUsuariosParaChequear(estado: boolean | null): Promise<Participantes[]> {
  try {
    const response = await fetch('https://backend-congreso.vercel.app/admin/validaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        estado: estado,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.resultado as Participantes[];
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}

export const actualizarEstadoUsuario = async (idUsuario: string, nuevoEstado: boolean) => {
  try {
    const response = await axios.put(`${BASE_URL}/admin/validar/usuario/${idUsuario}`, {
      nuevo_estado: nuevoEstado,
    });
    return response.data; // Retorna la respuesta del backend
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
