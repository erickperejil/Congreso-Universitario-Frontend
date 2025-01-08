import React from "react";

const UserInfoCard = () => {
  return (
      <div className="bg-indigo-700 text-white rounded-lg p-6 shadow-md max-w-xs w-full sm:max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-center">Información Usuario</h2>
        <div className="bg-indigo-800 rounded-lg p-4">
          <p className="text-lg font-semibold">Samuel Enoc Reyes Zelaya</p>
          <p className="text-sm mt-2">
            Conferencias Faltantes para obtener diploma:{" "}
            <span className="font-bold">5</span>
          </p>
          <p className="text-sm mt-4 text-center">¡Vamos tú puedes!</p>
        </div>
        <button
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded w-full"
          onClick={() => alert("Entrada validada!")}
        >
          Validar Entrada
        </button>
      </div>
    
  );
};

export default UserInfoCard;
