import {CreateConferencia } from "@/interfaces/conferencias";
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
  