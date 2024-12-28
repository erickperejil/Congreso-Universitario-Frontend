import { Participantes } from "@/interfaces/participantes";

export async function obtenerUsuarios(): Promise<Participantes[]> {
    try {
      const response = await fetch('https://backend-congreso.vercel.app/admin/validaciones', {
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