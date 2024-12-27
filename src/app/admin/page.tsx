import Sidebar from "./sidebar/components/sidebar";


const HomePage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Contenido principal */}
        <h1 className="text-2xl font-bold">Bienvenido al Congreso</h1>
        <p>Aquí va el contenido de la página principal.</p>
      </main>
    </div>
  );
};

export default HomePage;
