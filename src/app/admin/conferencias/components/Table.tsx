'use client'

import { useState, useEffect } from "react";
import { FaEdit, FaSearch, FaEye, FaFolderMinus } from "react-icons/fa";
import { eliminarConferencia, obtenerConferencias } from "@/services/conferencias/conferencia";
import { Conferencia } from "@/interfaces/conferencias";
import { useRouter } from "next/navigation";

const TableComponent = () => {
  const router = useRouter();
  const [conferencias, setConferencias] = useState<Conferencia[]>([]);
  const [filteredData, setFilteredData] = useState<Conferencia[]>([]);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [, setActions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConferencias = async () => {
      try {
        setLoading(true);
        const data = await obtenerConferencias(null);
        setConferencias(data);
        setFilteredData(data);
        setActions(data.map(() => "Enviar"));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar los conferencias.");
      } finally {
        setLoading(false);
      }
    };

    fetchConferencias();
  }, []);

  const toggleSortOrder = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const comparison = a.nombre_ponente.localeCompare(b.nombre_ponente);
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
        conferencia.datosimportantes.join(", ").toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };


  const handleView = (index: number) => {
    router.push(`/admin/conferencias/${index}?visualizar=true`);
  };

  const handleEdit = (index: number) => {
    router.push(`/admin/conferencias/${index}?visualizar=false`);
  };

  const handleDelete = async (id: number) => {
    console.log(id)
    try {
      const result = await eliminarConferencia(id);
      console.log(result.message);
    } catch (error) {
      console.error("No se pudo eliminar la conferencia:", error);
    }
  };
  
  
  // const handleActionChange = (index: number) => {
  //   setActions((prev) => {
  //     const updatedActions = [...prev];
  //     updatedActions[index] = updatedActions[index] === "Enviar" ? "Editar" : "Enviar";
  //     return updatedActions;
  //   });
  // };

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
          <button title="Buscar" className="ml-2">
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
              <th className="px-4 py-2 text-left border-b">Título</th>
              <th className="px-4 py-2 text-left border-b">Ponente</th>
              <th className="px-4 py-2 text-left border-b">Lugar</th>
              <th className="px-4 py-2 text-left border-b">Horario</th>
              <th className="px-4 py-2 text-left border-b">Fecha</th>
              <th className="px-4 py-2 text-left border-b">Cupos</th>
              <th className="px-4 py-2 text-left border-b">Finalizado</th>
              <th className="px-4 py-2 text-left border-b">Acciones</th>
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
                <td className="px-4 py-2 border-b">{conferencia.fecha}</td>
                <td className="px-4 py-2 border-b">{conferencia.cupos_disponibles}</td>
                <td className="px-4 py-2 border-b">{conferencia.finalizado ? "Sí" : "No"}</td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="flex items-center justify-center space-x-4">
                    {/* <button
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                      onClick={() => {}}
                    >
                      {actions[index]}
                    </button> */}
                    <button
                      onClick={() => handleView(conferencia.id_conferencia)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(conferencia.id_conferencia)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(conferencia.id_conferencia)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <FaFolderMinus size={20} />
                    </button>
                  </div>
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
