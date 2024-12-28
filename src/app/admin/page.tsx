'use client'

import Sidebar from "./components/sidebar";
import TableComponent from "./home/components/participantes";


const HomePage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="container mx-auto px-4 py-10">
        <TableComponent/>
      </main>
    </div>
  );
};

export default HomePage;
