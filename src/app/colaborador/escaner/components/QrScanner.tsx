import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (errorMessage: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, onScanError }) => {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermissionGranted(true);
        setErrorMessage(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setErrorMessage('No se pudo acceder a la cámara. Por favor, verifica los permisos.');
        setCameraPermissionGranted(false);
      } finally {
        setLoading(false);
      }
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (cameraPermissionGranted && scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const smallerDimension = Math.min(viewfinderWidth, viewfinderHeight);
            const qrboxSize = Math.floor(smallerDimension * 0.8);
            return { width: qrboxSize, height: qrboxSize };
          },
        },
        false
      );

      scanner.render(
        (decodedText) => {
          onScanSuccess(decodedText);
        },
        (error) => {
          if (onScanError) {
            onScanError(error);
          }
        }
      );

      return () => {
        scanner.clear().catch(console.error);
      };
    }
  }, [cameraPermissionGranted, onScanSuccess, onScanError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff] px-4">
      {loading ? (
        <p className="text-lg font-medium text-white">Cargando...</p>
      ) : errorMessage ? (
        <div className="text-center">
          <p className="text-red-500 font-medium">{errorMessage}</p>
          <p className="text-gray-400 mt-2">
            Por favor, habilita el acceso a la cámara en la configuración de tu navegador.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Escanea el Código QR</h1>
          <div
            id="qr-reader"
            ref={scannerRef}
            className="border-2 border-gray-600 rounded-lg w-full max-w-[90vw] h-auto aspect-square"
          ></div>
        </div>
      )}
      {cameraPermissionGranted && (
        <p className="mt-4 text-sm text-center text-white">
          Asegúrate de que el código QR esté completamente dentro del recuadro.
        </p>
      )}
    </div>
  );
};

export default QrScanner;
