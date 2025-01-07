'use client';

import { useParams } from 'next/navigation';
import ConferenciaForm from "./components/EditConferenceForm";
import { useRouter } from 'next/router';

const EditarConferenciaPage: React.FC = () => {
  // Usar useParams para obtener el ID desde la URL
  const router = useRouter();
  const { id } = useParams();
  const { visualizar } = router.query;
  const isVisualizing = visualizar === 'true';

  return (
    <main className="container mx-auto pt-1">
      <ConferenciaForm id={id as string} isVisualizing={isVisualizing} />
    </main>
  );
};

export default EditarConferenciaPage;
