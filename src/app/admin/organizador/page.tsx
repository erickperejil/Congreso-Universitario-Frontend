'use client'

import TablaParticipantes from "./components/participantes2";
import Sidebar2 from "./components/sidebar2";

const HomePage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar2/>
      <main className="container mx-auto px-4 py-10">
        <TablaParticipantes/>
      </main>
    </div>
  );
};

export default HomePage;
