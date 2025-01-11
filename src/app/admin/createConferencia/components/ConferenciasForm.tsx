import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { crearConferencia } from "@/services/conferencias/conferencia";
import { CrearConferencia } from "@/interfaces/conferencias";
import { fetchPonentes } from "@/services/ponentes/ponentes";
import { Ponentes } from "@/interfaces/ponentes";
import Modal from "./modal";
import SubirPdf from "./subirArchivo";
import UploadModal from "./subirFoto";
import Loader from "@/components/Loading";

const ConferenciaForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string | null>(null);;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"main" | "gallery" | "pdf">();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [url_carpeta_zip, seturl_carpeta_zip] = useState<string | null>(null);
  const [direccion, setdireccion] = useState("");
  const [fecha_conferencia, setfecha_conferencia] = useState("");
  const [hora_inicio, sethora_inicio] = useState("");
  const [hora_final, sethora_final] = useState("");
  const [cupos, setcupos] = useState("");
  const [nombre_conferencia, setnombre_conferencia] = useState("");
  const [nombres_ponente, setnombres_ponente] = useState("");
  const [descripcion_ponente, setdescripcion_ponente] = useState("");
  const [descripcion_conferencia, setdescripcion_conferencia] = useState("");
  const [apellidos_ponente, setapellidos_ponente] = useState("");
  const [ponentes, setPonentes] = useState<Ponentes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [id_ponente, setId_ponente] = useState<number | null>(null);
  const [crearPonenteSeleccionado, setCrearPonenteSeleccionado] = useState<boolean>(true);

  // Estados para manejar las categorías y el menú
  const [, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPonentes = async () => {
      try {
        const data = await fetchPonentes();
        setPonentes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPonentes();
  }, []);

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
    seturl_carpeta_zip(url);
    handleClosePdfModal();
  };


  const handleRemoveGalleryImage = (url: string) => {
    setGalleryImages((prevImages) => {
      if (typeof prevImages === "string") {
        // Si el estado es una cadena única, la eliminamos solo si coincide con `url`
        return prevImages === url ? null : prevImages;
      }
      // Si `prevImages` es null, no hacemos cambios
      return prevImages;
    });
  };

  const handleOpenModal = (type: "main" | "gallery" | "pdf") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpload = (urls: string[]) => {
    if (modalType === "gallery") {
      // Solo guardamos la primera URL, ya que `galleryImages` es de tipo `string | null`
      setGalleryImages(urls[0] || null);
    } else if (modalType === "main") {
      setMainImage(urls[0] || null);
    } else if (modalType === "pdf") {
      seturl_carpeta_zip(urls[0] || null);
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
      // Validamos que la fecha y las horas no estén vacías
      if (!fecha_conferencia || !hora_inicio || !hora_final) {
        alert("Por favor, completa todos los campos de fecha y hora.");
        return;
      }

      // Convertimos la fecha y combinamos las horas
      const fechaConvertida = convertirFechaParaServidor(fecha_conferencia); // YYYY-MM-DD -> DD/MM/YYYY
      const horaInicioConvertida = combinarFechaYHora(fecha_conferencia, hora_inicio); // DD/MM/YYYY HH:mm
      const horaFinalConvertida = combinarFechaYHora(fecha_conferencia, hora_final); // DD/MM/YYYY HH:mm

      const obtenerInfoPonente = () => {
        if (crearPonenteSeleccionado) {
          return { id_ponente: null, nombres_ponente: nombres_ponente, apellidos_ponente: apellidos_ponente, descripcion_ponente: descripcion_ponente, img_perfil_ponente: mainImage || "" };
        } else {
          return { id_ponente: id_ponente, nombres_ponente: null, apellidos_ponente: null, descripcion_ponente: null, img_perfil_ponente: null };
        }
      }

      const infoPonente: { id_ponente: number | null, nombres_ponente: string | null, apellidos_ponente: string | null, descripcion_ponente: string | null, img_perfil_ponente: string | null } = obtenerInfoPonente();


      // Creamos el objeto para enviar al backend
      const newProduct: CrearConferencia = {
        nombre_conferencia,
        id_ponente: infoPonente.id_ponente,
        nombres_ponente: infoPonente.nombres_ponente,
        apellidos_ponente: infoPonente.apellidos_ponente,
        descripcion_ponente: infoPonente.apellidos_ponente,
        img_perfil_ponente: infoPonente.img_perfil_ponente,
        img_conferecia: galleryImages || "",
        direccion,
        fecha_conferencia: fechaConvertida,
        hora_inicio: horaInicioConvertida,
        hora_final: horaFinalConvertida,
        cupos,
        descripcion_conferencia,
        url_carpeta_zip: url_carpeta_zip || "",
      };

      console.log("Creando Conferencia", newProduct);

      // Llamada al backend
      const response = await crearConferencia(newProduct);
      console.log("Respuesta del servidor", response);

      // Reseteamos el estado y formulario
      setIsCreatingProduct(false);
      resetForm();
    } catch (error) {
      console.error("Error al crear conferencia", error);
    }
  };

  // Función para convertir la fecha de YYYY-MM-DD a DD/MM/YYYY
  const convertirFechaParaServidor = (fecha: string) => {
    if (!fecha) return ""; // Retorna vacío si no hay fecha
    const partes = fecha.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // Formato DD/MM/YYYY
  };

  // Función para combinar la fecha (DD/MM/YYYY) con la hora (HH:mm)
  const combinarFechaYHora = (fecha: string, hora: string) => {
    if (!fecha || !hora) return ""; // Retorna vacío si falta fecha o hora
    const partesFecha = fecha.split('-'); // YYYY-MM-DD
    return `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]} ${hora}`; // DD/MM/YYYY HH:mm
  };

  const handleCreateProduct = () => {
    if (!mainImage) {
      alert("Debes cargar una imagen principal antes de continuar.");
      return; // Detén la ejecución si no hay imagen
    }

    if (!url_carpeta_zip) {
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
    setGalleryImages(null);
    seturl_carpeta_zip(null);

  };

  if (loading) {
    return <div className="w-full flex justify-center items-center h-[80vh]"><Loader /></div>
  }


  return (
    <div className="rounded-lg max-w-5xl mx-auto">
      <h2 className="text-3xl text-black border-b-[1px] border-gray-300 pb-1 font-koulen mb-6">Agregar una Nueva Conferencia</h2>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl text-gray-800">Información de la conferencia</h2>
              <hr className="border-gray-300" />
            </div>
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
                <label className="block text-sm font-medium text-gray-700">Hora Inicio</label>
                <input
                  type="time"
                  value={hora_inicio}
                  onChange={(e) => sethora_inicio(e.target.value)}
                  required
                  className="mt-2 p-2 text-black border border-gray-300 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora Final</label>
                <input
                  type="time"
                  value={hora_final}
                  onChange={(e) => sethora_final(e.target.value)}
                  required
                  className="mt-2 p-2 text-black border border-gray-300 rounded-lg w-full"
                />
              </div>

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                value={fecha_conferencia}
                onChange={(e) => setfecha_conferencia(e.target.value)}
                required
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cupos</label>
              <input
                type="text"
                value={cupos}
                onChange={(e) => setcupos(e.target.value)}
                required
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full text-black"
                placeholder="Ingresa los Cupos necesarios"
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
                onChange={(e) => setdescripcion_conferencia(e.target.value)}
                className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                placeholder="Describe la Conferencia"
              />
            </div>

            {/* Info del ponente */}
            <div className="mt-6">
              <h2 className="text-xl text-gray-800">Información del ponente</h2>
              <hr />
            </div>
            <div>
              <div className="flex items-center space-x-4 font-sm text-gray-700 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="ponente"
                    id="crearPonente"
                    checked={crearPonenteSeleccionado}
                    onClick={() => setCrearPonenteSeleccionado(true)}
                  />
                  <span>Crear ponente</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="ponente"
                    id="seleccionarPonente"
                    onClick={() => setCrearPonenteSeleccionado(false)}
                  />
                  <span>Seleccionar ponente existente</span>
                </label>
              </div>
            </div>

            {
              crearPonenteSeleccionado && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombres</label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      value={descripcion_ponente}
                      onChange={(e) => setdescripcion_ponente(e.target.value)}
                      className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                      placeholder="Describe el Ponente"
                    />
                  </div>
                </>
              )
            }

            {!crearPonenteSeleccionado && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Selecciona un ponente</label>
                <select name="" id="" className="mt-2 p-2 text-black border border-gray-300 rounded-lg w-full" onChange={(e) => setId_ponente(Number(e.target.value))} >
                  <option value="" hidden selected>------</option>
                  {ponentes.map((ponente) => (
                    <option key={ponente.id_ponente} value={ponente.id_ponente}>
                      {ponente.nombres}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Right Column - Image Uploads */}
          <div className="space-y-6">
            {/* Gallery Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Foto de la Conferencia</label>
              <div
                className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => handleOpenModal("gallery")}
              >
                {galleryImages ? (
                    <div className="relative inline-block w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={galleryImages}
                        alt="Gallery Preview"
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveGalleryImage(galleryImages)}
                        className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                ) : (
                  <p>Click para subir una imagen</p>
                )}

              </div>
            </div>

            {/* Main Image Upload */}
            {crearPonenteSeleccionado && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Foto del Ponente</label>
                <div
                  className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => handleOpenModal("main")}
                >
                  {mainImage ? (
                    <div className="relative inline-block w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <Image src={mainImage} alt="Main Preview" layout="fill" objectFit="cover" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <p>Click para subir una imagen</p>

                  )}

                </div>
              </div>
            )}

            {/* PDF UPLOAD */}
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Archivos de la Conferencia</label>
                <div
                  className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  onClick={handleOpenPdfModal} // Función para abrir el modal del PDF
                >
                  {url_carpeta_zip ? (
                    <p className="text-sm text-gray-600">Archivo subido</p>
                  ) : (
                    <p>Click para cargar los archivos</p>
                  )}
                </div>
              </div>
              {/* Modal exclusivo para cargar el PDF */}
              <Modal isVisible={isPdfModalOpen} onClose={handleClosePdfModal}>
                <SubirPdf onSubmit={handlePdfUpload} nombre_prod={nombre_conferencia} setNombre_prod={setnombre_conferencia}
                  initialUploadedFileUrl={url_carpeta_zip} />
              </Modal>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end space-x-3 mt-10">
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
            className={`px-4 py-2 rounded-lg ${mainImage
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
          onImageUpload={handleUpload} // Maneja todos los tipos (main, gallery, pdf)
          existingImages={
            modalType === "gallery"
              ? galleryImages
                ? [galleryImages] // Convierte `galleryImages` en un arreglo si no es `null`
                : []
              : modalType === "main"
                ? mainImage
                  ? [mainImage] // Convierte `mainImage` en un arreglo si no es `null`
                  : []
                : url_carpeta_zip
                  ? [url_carpeta_zip] // Convierte `url_carpeta_zip` en un arreglo si no es `null`
                  : []
          } // Determina qué imágenes o PDF mostrar según el modalType
          isGallery={modalType === "gallery"} // Define si es galería para lógica de múltiples archivos
        />
      )}

    </div>
  );
};
export default ConferenciaForm;