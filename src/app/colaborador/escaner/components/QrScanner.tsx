import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrScannerProps {
  onScanError?: (errorMessage: string) => void;
  onScanSuccess: (decodedText: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanError, onScanSuccess }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });

        setTimeout(() => {
          const scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              rememberLastUsedCamera: true,
            },
            false
          );

          scanner.render(
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
            (errorMessage) => {
              console.warn("Error al escanear:", errorMessage);
              onScanError?.(errorMessage); // Ejecutar callback en caso de error
            }
          );

          // Limpiar al desmontar
          return () => {
            scanner.clear().catch(console.error);
          };
        }, 1000); // Delay de 1 segundo antes de iniciar el escáner
      } catch (error) {
        console.error("Error al solicitar acceso a la cámara:", error);
        setErrorMessage(
          "No se pudo acceder a la cámara. Asegúrate de otorgar permisos."
        );
      }
    };

    requestCameraPermission();
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
