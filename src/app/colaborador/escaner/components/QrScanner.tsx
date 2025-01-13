// components/QRScanner.tsx
'use client'
import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";

const QRScanner: React.FC = () => {
  const qrCodeReaderRef = useRef<Html5Qrcode | null>(null);
  const [currentCamera, setCurrentCamera] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const config: Html5QrcodeCameraScanConfig = { fps: 10, qrbox: 400 };

  // Obtener la cámara trasera
  const getBackCamera = async () => {
    const cameras = await Html5Qrcode.getCameras();
    if (cameras.length > 0) {
      const backCamera = cameras.find((camera) =>
        camera.label.toLowerCase().includes("back")
      );
      setCurrentCamera(backCamera ? backCamera.id : cameras[0].id);
    } else {
      console.error("No se encontraron cámaras.");
    }
  };

  // Validar si el texto es una URL
  const isValidUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  // Iniciar escaneo
  const startScanning = () => {
    if (!currentCamera || !qrCodeReaderRef.current) return;

    qrCodeReaderRef.current
      .start(
        currentCamera,
        config,
        (decodedText) => {
          console.log("Texto decodificado:", decodedText);
          if (isValidUrl(decodedText)) {
            // Redirigir automáticamente
            window.location.href = decodedText;
          } else {
            console.warn("Texto escaneado no es una URL válida:", decodedText);
          }
        },
        (errorMessage) => {
          console.warn("Error de escaneo:", errorMessage);
        }
      )
      .then(() => setScanning(true))
      .catch((err) => console.error("Error al iniciar el escaneo:", err));
  };

  // Detener escaneo
  const stopScanning = () => {
    if (qrCodeReaderRef.current) {
      qrCodeReaderRef.current.stop().then(() => setScanning(false));
    }
  };

  useEffect(() => {
    qrCodeReaderRef.current = new Html5Qrcode("reader");
    getBackCamera();

    return () => {
      qrCodeReaderRef.current?.stop();
      qrCodeReaderRef.current?.clear();
    };
  }, []);

  return (
    <div className="container">
      <h1>QR Code Detector</h1>

      <div className="reader-container relative">
        <div id="reader" className="border-2 border-gray-300 w-full h-96"></div>
      </div>
      <button
        id="startButton"
        className={`mt-4 px-4 py-2 rounded-md font-semibold text-white ${
          scanning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }`}
        onClick={scanning ? stopScanning : startScanning}
      >
        {scanning ? "Detener escaneo" : "Iniciar escaneo"}
      </button>
    </div>
  );
};

export default QRScanner;
