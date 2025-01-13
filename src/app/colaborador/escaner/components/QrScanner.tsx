import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerProps {
  onScanError?: (errorMessage: string) => void;
  onScanSuccess: (decodedText: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanError, onScanSuccess }) => {
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage(
          "Tu navegador no soporta acceso a la cámara. Actualízalo o utiliza un navegador como Chrome."
        );
        setLoading(false);
        return;
      }

      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermissionGranted(true);
      } catch (error) {
        console.error("Error al solicitar acceso a la cámara:", error);
        setErrorMessage(
          "No se pudo acceder a la cámara. Asegúrate de otorgar permisos en la configuración del navegador."
        );
        setCameraPermissionGranted(false);
      } finally {
        setLoading(false);
      }
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (cameraPermissionGranted) {
      const html5QrCode = new Html5Qrcode("qr-reader");

      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.333, // Configuración estándar para cámaras
          },
          (decodedText) => {
            if (isRedirecting) return;

            try {
              const url = new URL(decodedText); // Validar URL
              console.log("Código QR escaneado:", url.href);
              setIsRedirecting(true); // Evitar redirecciones múltiples
              onScanSuccess(url.href);
              window.location.href = url.href; // Redirección
            } catch {
              console.error("Texto escaneado no es una URL válida:", decodedText);
              onScanError?.("El código QR no contiene una URL válida.");
            }
          },
          (errorMessage) => {
            console.warn("Error al escanear:", errorMessage);
            onScanError?.(errorMessage);
          }
        )
        .catch((err) => {
          console.error("Error al iniciar el escáner:", err);
          setErrorMessage("Hubo un problema al iniciar el escáner de QR.");
        });

      return () => {
        html5QrCode.stop().catch(console.error);
      };
    }
  }, [cameraPermissionGranted, onScanError, onScanSuccess, isRedirecting]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {loading ? (
        <p className="text-lg font-medium text-gray-700">Cargando...</p>
      ) : errorMessage ? (
        <div className="text-center">
          <p className="text-red-500 font-medium">{errorMessage}</p>
          <p className="text-gray-400 mt-2">
            Habilita el acceso a la cámara en la configuración del navegador.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
            Escanea el Código QR
          </h1>
          <div
            id="qr-reader"
            className="border-2 border-gray-600 rounded-lg w-full max-w-[90vw] h-auto aspect-square"
          ></div>
        </div>
      )}
      {cameraPermissionGranted && (
        <p className="mt-4 text-sm text-center text-gray-700">
          Asegúrate de que el código QR esté completamente dentro del recuadro.
        </p>
      )}
    </div>
  );
};

export default QrScanner;
