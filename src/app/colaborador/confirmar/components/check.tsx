'use client'
import { useState } from 'react';

const CheckComponent = () => {
  const [selectedConference, setSelectedConference] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  

  const handleConferenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConference(event.target.value);
  };

  const handleButtonClick = (type: 'entrada' | 'salida') => {
    const currentTimestamp = new Date().toISOString();
    setModalMessage(`Hora ${type} guardada exitosamente: ${currentTimestamp}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href ='http://localhost:3000/colaborador/escaner'; // Navegar a la página principal
  };

  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-900 text-white p-6 rounded-md w-full max-w-md mx-auto sm:p-8">
      {/* Dropdown menu */}
      <div className="w-full">
        <label htmlFor="conference" className="block text-sm font-medium text-white mb-2">
          Conferencias
        </label>
        <select
          id="conference"
          value={selectedConference || ''}
          onChange={handleConferenceChange}
          className="w-full bg-white text-black px-4 py-2 rounded-md"
        >
          <option value="" disabled>
            Selecciona una conferencia
          </option>
          <option value="Conferencia 1">Conferencia 1</option>
          <option value="Conferencia 2">Conferencia 2</option>
          <option value="Conferencia 3">Conferencia 3</option>
          <option value="Conferencia 4">Conferencia 4</option>
          <option value="Conferencia 5">Conferencia 5</option>
        </select>
      </div>

      {/* Buttons */}
      <button
        onClick={() => handleButtonClick('entrada')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        Hora Entrada
      </button>
      <button
        onClick={() => handleButtonClick('salida')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        Hora Salida
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white text-black p-6 rounded-md text-center w-full max-w-sm">
            <p className="mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Volver a la página principal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckComponent;
