'use client'

import { useState, useEffect } from "react";
import  Button from "@/components/Button"; // Adjust the import path as necessary
import { FaEdit, FaSearch } from "react-icons/fa";
import { obtenerConferencias } from "@/services/conferencias/conferencia";
import { Conferencia } from "@/interfaces/conferencias";

const TableComponent = () => {
  const [conferencias, setConferencias] = useState<Conferencia[]>([]);
  const [filteredData, setFilteredData] = useState<Conferencia[]>([]);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isMounted, setIsMounted] = useState<boolean>(false); // Para evitar problemas de hidratación

  // Fetch data from backend
  useEffect(() => {
    const fetchConferencias = async () => {
      try {
        setLoading(true);
        const data = await obtenerConferencias();
        console.log(data);
        setConferencias(data);
        setFilteredData(data);
      } catch (err) {
        setError("Error al cargar las conferencias.");
      } finally {
        setLoading(false);
      }
    };

    fetchConferencias();
  }, []);

  // Marcar que el componente se montó
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSortOrder = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const comparison = a.nombre_completo.localeCompare(b.nombre_completo);
      return sortOrder === "ASC" ? -comparison : comparison;
    });

    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    setFilteredData(sortedData);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = conferencias.filter(
      (conferencia) =>
        conferencia.titulo.toLowerCase().includes(term.toLowerCase()) ||
        conferencia.nombre_ponente.toLowerCase().includes(term.toLowerCase()) ||
        conferencia.lugar.includes(term)
    );
    setFilteredData(filtered);
  };

  if (!isMounted) {
    return null; // Evitar el renderizado hasta que el componente esté montado
  }

  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h1 className="text-lg font-bold">Conferencias</h1>
        <div className="flex items-center w-full sm:w-1/3 bg-gray-100 rounded-full px-4 py-1">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-transparent border-none text-gray-600 focus:outline-none"
          />
          <button title="buscar" className="ml-2">
            <FaSearch className="text-blue-500" />
          </button>
        </div>
        <div className="relative">
          <button
            onClick={toggleSortOrder}
            className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
          >
            Ordenar por: {sortOrder}
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[700px] border border-gray-300 rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">Titulo</th>
              <th className="px-4 py-2 text-left border-b">Ponente</th>
              <th className="px-4 py-2 text-left border-b">Lugar</th>
              <th className="px-4 py-2 text-center border-b">Horario</th>
              <th className="px-4 py-2 text-center border-b">Descripción</th>
              <th className="px-4 py-2 text-center border-b">Fecha</th>
              <th className="px-4 py-2 text-center border-b">Cupos Disponibles</th>
              <th className="px-4 py-2 text-center border-b">Finalizado</th>
              <th className="px-4 py-2 text-center border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((conferencia, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-2 border-b">{conferencia.titulo}</td>
                <td className="px-4 py-2 border-b">{conferencia.nombre_ponente}</td>
                <td className="px-4 py-2 border-b">{conferencia.lugar}</td>
                <td className="px-4 py-2 border-b">{conferencia.horario}</td>
                <td className="px-4 py-2 border-b">
                  {Array.isArray(conferencia.datosimportantes) ? (
                    conferencia.datosimportantes.map((dato, i) => (
                      <p key={i}>{dato}</p>
                    ))
                  ) : (
                    <p>{conferencia.datosimportantes}</p>
                  )}
                </td>
                <td className="px-4 py-2 border-b">{conferencia.fecha}</td>
                <td className="px-4 py-2 border-b">{conferencia.cupos_disponibles}</td>
                <td className="px-4 py-2 border-b">{conferencia.finalizado ? "Sí" : "No"}</td>
                <td className="px-4 py-2 border-b text-center">
                  <Button
                  text="Editar"
                  action={() => {}}
                  variant="primary"
                  styleType="fill"
                  
                    

                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    />


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
