// components/Sidebar.tsx
import React, { useState } from "react";
import Image from "next/image"; // Importar el componente Image
import { FaUsers, FaLock, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Botón para abrir/cerrar la barra lateral */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden text-blue-900"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Barra lateral */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static w-64 transition-transform duration-300`}
      >
        {/* Header */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png" // Cambia esta ruta por la ruta de tu logo
              alt="Logo"
              width={64} // Tamaño del logo (en píxeles)
              height={64}
              className="mb-2"
            />
            <h1 className="text-center font-semibold text-blue-900">
              Congreso de Innovación y Tecnología
            </h1>
            <p className="text-center text-blue-600 text-sm">UNAH 2025</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-4 px-6">
          <button className="flex items-center gap-4 py-2 px-4 rounded-md text-white bg-blue-900 hover:bg-blue-800">
            <FaUsers />
            <span>Participantes</span>
          </button>
          <button className="flex items-center gap-4 py-2 px-4 rounded-md text-gray-600 hover:bg-gray-100">
            <FaLock />
            <span>Conferencias</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-6">
          <button className="flex items-center gap-4 py-2 px-4 rounded-md text-gray-600 hover:bg-gray-100">
            <FaSignOutAlt />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Fondo oscuro cuando la barra lateral está abierta */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
