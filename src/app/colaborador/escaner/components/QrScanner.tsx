import React, { useEffect, useState } from "react";
import { Html5Qrcode, CameraDevice } from "html5-qrcode";

interface QrScannerProps {
  onScanError?: (errorMessage: string) => void;
  onScanSuccess: (decodedText: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanError, onScanSuccess }) => {
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraList, setCameraList] = useState<CameraDevice[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermissionGranted(true);

        const cameras = await Html5Qrcode.getCameras(); // Retorna CameraDevice[]
        if (cameras && cameras.length > 0) {
          setCameraList(cameras); // Guardamos las cámaras directamente
        } else {
          setErrorMessage("No se detectaron cámaras disponibles.");
        }
      } catch (error) {
        console.error("Error al solicitar acceso a la cámara:", error);
        setErrorMessage(
          "No se pudo acceder a la cámara. Asegúrate de otorgar permisos."
        );
      } finally {
        setLoading(false);
      }
    };

    requestCameraPermission();
  }, []);

  const startScanning = async () => {
    if (html5QrCode) {
      try {
        await html5QrCode.start(
          cameraList[currentCameraIndex]?.id, // Usamos el ID de la cámara actual
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            console.log("Código QR escaneado:", decodedText);
            onScanSuccess(decodedText);
          },
          (errorMessage) => {
            console.warn("Error al escanear:", errorMessage);
            onScanError?.(errorMessage);
          }
        );
        setIsScanning(true);
      } catch (err) {
        console.error("Error al iniciar el escáner:", err);
      }
    }
  };

  const stopScanning = async () => {
    if (html5QrCode) {
      try {
        await html5QrCode.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Error al detener el escáner:", err);
      }
    }
  };

  const changeCamera = () => {
    stopScanning().then(() => {
      const nextIndex = (currentCameraIndex + 1) % cameraList.length;
      setCurrentCameraIndex(nextIndex);
      startScanning();
    });
  };

  useEffect(() => {
    if (cameraPermissionGranted) {
      const qrCodeScanner = new Html5Qrcode("qr-reader");
      setHtml5QrCode(qrCodeScanner);

      return () => {
        qrCodeScanner.stop().catch(console.error);
        qrCodeScanner.clear();
      };
    }
  }, [cameraPermissionGranted]);

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
          <div className="flex justify-center mt-4 space-x-4">
            {isScanning ? (
              <button
                className="px-4 py-2 bg-red-500 text-white font-medium rounded"
                onClick={stopScanning}
              >
                Detener
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-500 text-white font-medium rounded"
                onClick={startScanning}
              >
                Iniciar
              </button>
            )}
            {cameraList.length > 1 && (
              <button
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded"
                onClick={changeCamera}
              >
                Cambiar Cámara
              </button>
            )}
          </div>
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
