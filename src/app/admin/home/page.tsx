'use client'

import Sidebar from "../components/sidebar";
import TableComponent from "./components/participantes";

const HomePage: React.FC = () => {
  return (
      <main className="container mx-auto px-4 py-10">
        <TableComponent/>
      </main>
  );
};

export default HomePage;
