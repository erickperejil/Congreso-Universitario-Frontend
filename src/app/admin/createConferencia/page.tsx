'use client'

import Sidebar from "../components/sidebar";
import ConferenciaForm from "./components/ConferenciasForm";



const HomePage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="container mx-auto px-4 pt-1">
       <ConferenciaForm/> 
      </main>
    </div>
  );
};

export default HomePage;