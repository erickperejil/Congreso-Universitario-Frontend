// components/QRScanner.tsx
'use client'
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";
import Link from "next/link"; // Importar Link de Next.js

const QRScanner: React.FC = () => {
  const qrCodeReaderRef = useRef<Html5Qrcode | null>(null);
  const [currentCamera, setCurrentCamera] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [decodedText, setDecodedText] = useState<string | null>(null);

  const config: Html5QrcodeCameraScanConfig = { fps: 10, qrbox: 300 };

  // Obtener cámaras
  const getCameras = async () => {
    const cameras = await Html5Qrcode.getCameras();
    if (cameras.length > 0) {
      setCurrentCamera(cameras[0].id);
    } else {
      console.error("No se encontraron cámaras.");
    }
  };

  // Cambiar de cámara
  const switchCamera = async () => {
    const cameras = await Html5Qrcode.getCameras();
    if (cameras.length > 1) {
      const nextCamera = cameras.find((camera) => camera.id !== currentCamera);
      if (nextCamera) setCurrentCamera(nextCamera.id);
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
          setDecodedText(decodedText);
          console.log("Texto decodificado:", decodedText);
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
    getCameras();

    return () => {
      qrCodeReaderRef.current?.stop();
      qrCodeReaderRef.current?.clear();
    };
  }, []);

  return (
    <div className="container">
      <h1>QR Code Detector</h1>

      <div className="qr-box">
        <div className="box info" id="info">
          <Image
            src="https://img.icons8.com/3d-fluency/94/info.png"
            alt="info"
            width={30}
            height={30}
          />
          <span>{decodedText || "Escaneando..."}</span>
        </div>
        <div className="reader-container">
          <div id="reader" className="border-2 border-gray-300"></div>
          <div className="absolute bottom-2 right-4 w-12 cursor-pointer">
            <Image
              id="changeCamera"
              src="https://img.icons8.com/stickers/100/switch-camera.png"
              alt="switch-camera"
              width={48}
              height={48}
              onClick={switchCamera}
            />
          </div>
        </div>
        <div id="qr-reader-results"></div>
        <button
          id="startButton"
          className={`mt-4 px-4 py-2 rounded-md font-semibold text-white ${
            scanning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={scanning ? stopScanning : startScanning}
        >
          {scanning ? "Detener escaneo" : "Iniciar escaneo"}
        </button>
        {decodedText && isValidUrl(decodedText) && (
          <div className="mt-4">
            <Link href={decodedText}>
              <a className="text-blue-500 hover:underline">Ir a la URL escaneada</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
