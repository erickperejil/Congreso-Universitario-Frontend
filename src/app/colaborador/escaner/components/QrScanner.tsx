import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerProps {
  onScanError?: (errorMessage: string) => void;
  onScanSuccess: (decodedText: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanError, onScanSuccess }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initializeScanner = async () => {
      const scanner = new Html5Qrcode("qr-reader");

      try {
        // Solicitar acceso a la cámara y obtener la lista de cámaras disponibles
        const cameras = await Html5Qrcode.getCameras();

        if (cameras.length === 0) {
          throw new Error("No se encontraron cámaras disponibles.");
        }

        // Seleccionar la cámara trasera si está disponible
        const backCamera = cameras.find((camera) =>
          camera.label.toLowerCase().includes("back")
        ) || cameras[0]; // Si no hay cámara trasera, usar la primera disponible

        console.log("Usando cámara:", backCamera.label);

        // Iniciar el escáner con la cámara seleccionada
        await scanner.start(
          backCamera.id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            try {
              const url = new URL(decodedText); // Validar si es una URL
              console.log("Código QR escaneado:", url.href);
              onScanSuccess(url.href); // Ejecutar callback en caso de éxito
              window.location.href = url.href; // Redirigir al enlace
            } catch {
              console.error("Texto escaneado no es una URL válida:", decodedText);
              onScanError?.("El código QR no contiene una URL válida.");
            }
          },
          (scanError) => {
            console.warn("Error al escanear:", scanError);
            onScanError?.(scanError); // Manejar errores de escaneo
          }
        );
      } catch (error) {
        console.error("Error al inicializar el escáner:", error);
        setErrorMessage(
          "No se pudo acceder a la cámara. Asegúrate de otorgar permisos."
        );
      }

      // Limpiar el escáner al desmontar
      return () => {
        scanner.stop().catch(console.error);
        scanner.clear();
      };
    };

    initializeScanner();
  }, [onScanError, onScanSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Escanea el Código QR
        </h1>
        {errorMessage && (
          <p className="text-red-500 text-center font-medium">{errorMessage}</p>
        )}
        <div
          id="qr-reader"
          className="border-2 border-gray-600 rounded-lg w-full max-w-[90vw] h-auto aspect-square"
        ></div>
        <p className="mt-4 text-sm text-center text-gray-700">
          Asegúrate de que el código QR esté completamente dentro del recuadro.
        </p>
      </div>
    </div>
  );
};

export default QrScanner;
