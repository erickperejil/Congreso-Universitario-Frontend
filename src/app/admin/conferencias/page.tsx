'use client'
import TableComponent from "./components/Table";

const Conferencias: React.FC = () => {
  return (
    <div className="flex">
      <main className="container mx-auto px-4 py-10">
        <TableComponent/>
      </main>
    </div>
  );
};

export default Conferencias;
