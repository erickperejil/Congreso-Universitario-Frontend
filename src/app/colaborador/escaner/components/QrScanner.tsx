'use client'
import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";

const QRScanner: React.FC = () => {
  const qrCodeReaderRef = useRef<Html5Qrcode | null>(null);
  const [currentCamera, setCurrentCamera] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  // Configuración optimizada para teléfonos
  const config: Html5QrcodeCameraScanConfig = {
    fps: 10,
    qrbox: { width: 300, height: 400 }, // Área de escaneo vertical
    aspectRatio: 0.75, // Relación 3:4 típica de teléfonos
  };

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
            window.location.href = decodedText; // Redirigir automáticamente
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

  // Validar si el texto es una URL
  const isValidUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
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
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <h1 className="text-lg font-bold mb-4">QR Code Detector</h1>

      <div className="relative w-full max-w-md h-[70%]">
        {/* Aquí se muestra el área del escaneo */}
        <div id="reader" className="w-full h-full rounded-lg shadow-md"></div>
      </div>

      <button
        id="startButton"
        className={`mt-4 px-6 py-3 rounded-md font-semibold text-white ${
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
