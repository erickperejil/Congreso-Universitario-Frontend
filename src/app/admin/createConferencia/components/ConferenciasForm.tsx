import React, { useState, useRef,useEffect } from "react";
import Image from 'next/image';
import { crearConferencia } from "@/services/conferencias/conferencia";
import { Conferencia } from "@/interfaces/conferencias";
import Modal from "./modal";
import SubirPdf from "./subirArchivo";
import UploadModal from "./subirFoto";



const ConferenciaForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"main" | "gallery" | "pdf">();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfKit, setPdfKit] = useState<string | null>(null);
  const [direccion, setdireccion] = useState("");
  const [fecha_conferencia, setfecha_conferencia] = useState("");
  const [ hora_inicio, sethora_inicio] = useState("");
  const [hora_final, sethora_final] = useState("");
  const [cupos, setcupos] = useState("");
  const [nombre_conferencia, setnombre_conferencia] = useState("");
  const [nombres_ponente, setnombres_ponente] = useState("");
  const [descripcion_ponente, setdescripcion_ponente] = useState("");
  const [descripcion_conferencia, setdescripcion_conferencia] = useState("");
  const [apellidos_ponente, setapellidos_ponente] = useState("");
  
  // Estados para manejar las categorías y el menú
    const [, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    
    // Agregar o quitar categorías seleccionadas
     // Función para abrir el modal del PDF
      const handleOpenPdfModal = () => setIsPdfModalOpen(true);
      // Función para cerrar el modal del PDF
      const handleClosePdfModal = () => setIsPdfModalOpen(false);

      // Función para manejar la URL del PDF cargado
      const handlePdfUpload = (url: string) => {
        setPdfKit(url);
        handleClosePdfModal();
      };


  const handleRemoveGalleryImage = (url: string) => {
    setGalleryImages((prevImages) => prevImages.filter((img) => img !== url));
  };

  const handleOpenModal = (type: "main" | "gallery" | "pdf") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleUpload = (urls: string[]) => {
    if (modalType === "gallery") {
      setGalleryImages(urls);
    } else if (modalType === "main") {
      setMainImage(urls[0] || null);
    } else if (modalType === "pdf") {
      setPdfKit(urls[0] || null);
    }
    handleCloseModal();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isCreatingProduct) {
      console.log("isCreatingProduct flag is false, skipping submission");
      return;
    }
  
    try {
       
        const newProduct: Conferencia = {
          nombre_conferencia,
          nombres_ponente,
          apellidos_ponente,
          descripcion_ponente,
          img_perfil_ponente: mainImage || "",
          img_conferecia: galleryImages.length > 0 ? galleryImages : null,
          direccion,
          fecha_conferencia,
          hora_inicio,
          hora_final,
          cupos,
          descripcion_conferencia,
        };
        console.log("Creando Conferencia", newProduct);
        const response = await crearConferencia(newProduct);
        console.log("Respuesta del servidor kit", response);
      
  
      // Resetea el formulario tras la creación exitosa
      setIsCreatingProduct(false);
      resetForm();
    } catch (error) {
      console.error("Error al crear conferencia", error);
    }
  };

  const handleCreateProduct = () => {
    if (!mainImage) {
      alert("Debes cargar una imagen principal antes de continuar.");
      return; // Detén la ejecución si no hay imagen
    }

    if (!pdfKit) {
        alert("Debes cargar un tutorial antes de continuar");
        return; // Detén la ejecución si no hay imagen
      }
  
    console.log("Create button clicked, setting isCreatingProduct to true");
    setIsCreatingProduct(true);
    formRef.current?.requestSubmit(); // Envía el formulario si pasa la validación
  };

  const resetForm = () => {
    setnombre_conferencia("");
    setnombres_ponente("");
    setapellidos_ponente("");
    setdescripcion_ponente("");
    setdescripcion_conferencia("");
    setdireccion("");
    setfecha_conferencia("");
    sethora_inicio("");
    sethora_final("");
    setcupos("");
    setMainImage(null);
    setGalleryImages([]);
    setPdfKit(null);

  };


  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-koulen mb-6 text-black">Agregar una Nueva Conferencia</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={formRef} onSubmit={handleFormSubmit}>
        <div className="space-y-6">
          {/* Nombre de la Conferencia */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de la Conferencia</label>
            <input
              type="text"
              value={nombre_conferencia}
              onChange={(e) => setnombre_conferencia(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full text-black"
              placeholder="Escribe el nombre de la conferencia"
            />
          </div>

          
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Ponente</label>
                <input
                  type="text"
                  value={nombres_ponente}
                  onChange={(e) => setnombres_ponente(e.target.value)}
                  required
                  className="mt-2 p-2 text-black border border-gray-300 rounded-lg w-full"
                  placeholder="Nombres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                <input
                  type="text"
                  value={apellidos_ponente}
                  onChange={(e) => setapellidos_ponente(e.target.value)}
                  required
                  className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                  placeholder="Apellidos"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora Inicio</label>
                <input
                  type="number"
                  value={hora_inicio}
                  onChange={(e) => setnombres_ponente(e.target.value)}
                  required
                  className="mt-2 p-2 text-black border border-gray-300 rounded-lg w-full"
                  placeholder="12:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora Final</label>
                <input
                  type="number"
                  value={hora_final}
                  onChange={(e) => setapellidos_ponente(e.target.value)}
                  required
                  className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                  placeholder="1:00"
                  min="0"
                />
              </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="text"
              value={fecha_conferencia}
              onChange={(e) => setfecha_conferencia(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full text-black"
              placeholder="25 de Noviembre"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Lugar</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setdireccion(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full text-black"
              placeholder="Aula Magna"
            />
            </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripcion Conferencia</label>
            <textarea
              value={descripcion_conferencia}
              onChange={(e) => setcupos(e.target.value)}
              className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
              placeholder="Describe la Conferencia"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripcion Ponente</label>
            <textarea
              value={descripcion_ponente}
              onChange={(e) => setcupos(e.target.value)}
              className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
              placeholder="Describe el Ponente"
            />
          </div>
        </div>

        {/* Right Column - Image Uploads */}
        <div className="space-y-6">
          {/* Main Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto del Ponente</label>
            <div
              className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
              onClick={() => handleOpenModal("main")}
            >
              {mainImage ? (
                <Image src={mainImage} alt="Main Preview" width={250} height={250} className="mx-auto" style={{ width: 'auto', height: 'auto' }}/>
              ) : (
                <p>Click para cargar la imagen</p>
                
              )}
            
            </div>
          </div>

          {/* Gallery Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto de la Conferencia</label>
            <div
              className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
              onClick={() => handleOpenModal("gallery")}
            >
              {galleryImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((imgUrl, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={imgUrl}
                        alt={`Gallery Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full max-w-[100px]"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      <button
                        onClick={() => handleRemoveGalleryImage(imgUrl)}
                        className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Click para cargar la imagen</p>
              )}
            </div>
          </div>
          {/* PDF UPLOAD */}
          <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Archivos de la Conferencia</label>
            <div
              className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
              onClick={handleOpenPdfModal} // Función para abrir el modal del PDF
            >
              {pdfKit ? (
                <p className="text-sm text-gray-600">Archivo subido</p>
              ) : (
                <p>Click para cargar los archivos</p>
              )}
            </div>
          </div>
              {/* Modal exclusivo para cargar el PDF */}
            <Modal isVisible={isPdfModalOpen} onClose={handleClosePdfModal}>
              <SubirPdf onSubmit={handlePdfUpload} nombre_prod={nombre_conferencia} setNombre_prod={setnombre_conferencia}
              initialUploadedFileUrl={pdfKit} />
            </Modal>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end space-x-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={() => {
              window.location.href = "https://diancrochet-administrador.vercel.app/productos";
            }}
          >
            Volver
          </button>
          <button
              type="button"
              disabled={!mainImage}
              className={`px-4 py-2 rounded-lg ${
                mainImage
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              onClick={handleCreateProduct}
               // Deshabilita el botón si no hay imagen
            >
              Crear
            </button>

        </div>
      </form>

      {/* Upload Modal */}
      {isModalOpen && (
            <UploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onImageUpload={handleUpload} // Cambiado para manejar todos los tipos (main, gallery, pdf)
                existingImages={
                modalType === "gallery"
                    ? galleryImages
                    : modalType === "main"
                    ? mainImage
                    ? [mainImage]
                    : []
                    : pdfKit
                    ? [pdfKit]
                    : []
                } // Decide qué imágenes o PDF mostrar según el modalType
                isGallery={modalType === "gallery"} // Define si es galería para lógica de múltiples archivos
            />
            )}
    </div>
  );
};
export default ConferenciaForm;