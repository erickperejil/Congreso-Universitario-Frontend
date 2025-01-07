import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { obtenerUsuariosParaChequear, actualizarEstadoUsuario } from "@/services/participantes/participantes";
import { Participantes } from "@/interfaces/participantes";
import InvoiceModal from "./modalVerificación";

const TablaParticipantes = () => {
  const [usuarios, setUsuarios] = useState<Participantes[]>([]);
  const [filteredData, setFilteredData] = useState<Participantes[]>([]);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [actions, setActions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedUser, setSelectedUser] = useState<Participantes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const data = await obtenerUsuariosParaChequear();
        setUsuarios(data);
        setFilteredData(data);
        setActions(data.map(() => "Validar"));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
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
    const filtered = usuarios.filter(
      (usuario) =>
        usuario.nombre_completo.toLowerCase().includes(term.toLowerCase()) ||
        usuario.correo.toLowerCase().includes(term.toLowerCase()) ||
        usuario.dni.includes(term)
    );
    setFilteredData(filtered);
  };

  const handleOpenModal = (usuario: Participantes) => {
    setSelectedUser(usuario);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleValidate = async () => {
    if (selectedUser) {
      try {
        const response = await actualizarEstadoUsuario(selectedUser.id_usuario.toString(), true);
        console.log("Usuario validado con éxito:", response);
  
        const updatedActions = actions.map((action, index) =>
          usuarios[index].id_usuario === selectedUser.id_usuario ? "Validado" : action
        );
        setActions(updatedActions);
      } catch (err) {
        console.error("Error al validar el usuario:", err);
        setError("No se pudo validar el usuario.");
      }
    }
    handleCloseModal();
  };
  
  const handleDeny = async () => {
    if (selectedUser) {
      try {
        const response = await actualizarEstadoUsuario(selectedUser.id_usuario.toString(), false);
        console.log("Usuario denegado con éxito:", response);
  
        const updatedActions = actions.map((action, index) =>
          usuarios[index].id_usuario === selectedUser.id_usuario ? "Denegado" : action
        );
        setActions(updatedActions);
      } catch (err) {
        console.error("Error al denegar el usuario:", err);
        setError("No se pudo denegar el usuario.");
      }
    }
    handleCloseModal();
  };

  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h1 className="text-lg font-bold">Participantes</h1>
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
              <th className="px-4 py-2 text-left border-b">DNI</th>
              <th className="px-4 py-2 text-left border-b">Nombre</th>
              <th className="px-4 py-2 text-left border-b">Correo</th>
              <th className="px-4 py-2 text-center border-b">Certificado</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((usuario, index) => (
              <tr
                key={usuario.id_usuario}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-2 border-b">{usuario.dni}</td>
                <td className="px-4 py-2 border-b">{usuario.nombre_completo}</td>
                <td className="px-4 py-2 border-b">{usuario.correo}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    onClick={() => handleOpenModal(usuario)}
                  >
                    {actions[index]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <InvoiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onValidate={handleValidate}
          onDeny={handleDeny}
          invoiceCode={selectedUser.codigo_recibo}
          invoiceImage={selectedUser.img_recibo}
        />
      )}
    </div>
  );
};

export default TablaParticipantes;
