'use client';
import { useState, useEffect } from 'react';

type SubirPdfProps = {
  onSubmit: (url: string) => void;
  initialUploadedFileUrl?: string | null;
  setNombre_prod: React.Dispatch<React.SetStateAction<string>>; 
  nombre_prod: string;// URL inicial del archivo cargado
};

export default function SubirPdf({ onSubmit, initialUploadedFileUrl,nombre_prod }: SubirPdfProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(initialUploadedFileUrl || null); // Estado inicial
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    setUploadedFileUrl(initialUploadedFileUrl || null); // Sincronizar estado si cambia la prop
  }, [initialUploadedFileUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setUploadedFileUrl(null); // Permitir cargar un archivo nuevo
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || uploadedFileUrl) return; // Evitar subir nuevamente si ya hay un archivo cargado

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nombre_archivo', nombre_prod);

    setIsLoading(true);

    try {
      const res = await fetch('https://deploybackenddiancrochet.onrender.com/admin/uploadFile', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadedFileUrl(data.fileUrl); // Guardar la URL del archivo cargado
        onSubmit(data.fileUrl); // Pasar la URL al componente padre
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Resetear el estado cuando el usuario quiera cargar un archivo nuevo
  const handleResetFile = () => {
    setFile(null);
    setUploadedFileUrl(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Selecciona un archivo PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={!!uploadedFileUrl} // Deshabilitar si ya hay un archivo cargado
          className={`mt-2 block w-full text-sm border text-black border-gray-300 rounded-lg p-2 ${
            uploadedFileUrl ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
        {uploadedFileUrl && (
          <div className="text-sm text-green-600 mt-2">
            <p>Archivo ya cargado: <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" className="underline">Ver archivo</a></p>
            <button
              type="button"
              onClick={handleResetFile}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Cambiar archivo
            </button>
          </div>
        )}
      </div>
      
      <button
        type="submit"
        className={`w-full py-2 text-black rounded-lg ${isLoading || uploadedFileUrl ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        disabled={isLoading || !!uploadedFileUrl} // Deshabilitar si ya hay un archivo cargado
      >
        {isLoading ? 'Subiendo...' : uploadedFileUrl ? 'Archivo cargado' : 'Subir archivo'}
      </button>
    </form>
  );
}
