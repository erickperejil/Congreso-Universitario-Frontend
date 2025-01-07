import { Conferencia, ConferenciaCompleta, CreateConferencia } from "@/interfaces/conferencias";
import axios from "axios";
const BASE_URL = "https://backend-congreso.vercel.app";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://backend-congreso.vercel.app/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const data = await response.json();
    return data.imageUrl; // Devuelve la URL de la imagen cargada
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};


export const crearConferencia = async (data: CreateConferencia) => {
  try {
    const response = await axios.post(`${BASE_URL}/conferencias/insertar`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear la conferencia:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al crear la conferencia");
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Error inesperado al crear la conferencia");
    }
  }
};  

export const editarConferencia = async (data: CreateConferencia) => {
  try {
    const response = await axios.put(`${BASE_URL}/conferencias/editar`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al editar la conferencia:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al editar la conferencia");
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Error inesperado al editar la conferencia");
    }
  }
}

export async function obtenerConferencia(id : string): Promise<ConferenciaCompleta> {
  try {
    const response = await fetch(`${BASE_URL}/conferencias/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data.conferencia[0] as ConferenciaCompleta;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}


export async function obtenerConferencias(): Promise<Conferencia[]> {
    try {
      const response = await fetch(`${BASE_URL}/conferencias`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      return data as Conferencia[];
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }



