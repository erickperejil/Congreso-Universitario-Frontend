import Image from "next/image";
import { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Conferencia {
  horario: string;
  titulo: string;
  lugar: string;
  requerimientos?: string | null;
  expositor: {
    nombre: string;
    imagen: string;
  };
  datosImportantes: string[];
  fecha: string; // Fecha asociada a la conferencia en formato YYYY-MM-DD
}

const conferencias = [
  // Lunes
  {
    horario: "10:00 - 11:00",
    titulo: "Economía del Futuro: Transformación Digital y Nuevos Modelos Financieros",
    lugar: "Auditorio Principal",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Nuevas tendencias en la economía digital, como fintech, pagos digitales y criptomonedas.",
      "Concepto de economía circular y su papel en la sostenibilidad.",
      "Modelos de negocio emergentes basados en tecnología y datos, como la economía de suscripción, economía colaborativa y gig economy.",
      "Desafíos y oportunidades de la digitalización en los sistemas económicos actuales.",
    ],
    fecha: "2024-01-27",
  },
  {
    horario: "11:30 - 12:30",
    titulo: "Blockchain para Todos: Cambiando la Sociedad sin Programación",
    lugar: "Sala 2",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Explicación accesible de blockchain y su funcionamiento en términos sencillos.",
      "Aplicaciones de blockchain en distintos sectores: trazabilidad de productos, votación electrónica, transparencia gubernamental y propiedad intelectual.",
      "Ejemplos prácticos de cómo blockchain puede beneficiar a la sociedad sin necesidad de ser programador.",
      "Potenciales usos futuros y limitaciones de esta tecnología.",
    ],
    fecha: "2024-01-27",
  },
  {
    horario: "13:00 - 14:00",
    titulo: "El Comercio del Futuro: Innovaciones en el Consumo y la Experiencia del Cliente",
    lugar: "Sala 3",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "La evolución del comercio digital: de tiendas online a experiencias inmersivas.",
      "Personalización de la experiencia del cliente usando IA y realidad aumentada.",
      "Comercio sin fricciones: desde pagos sin contacto hasta tiendas automatizadas.",
      "El papel de la sostenibilidad y las preferencias del consumidor en el diseño de productos y estrategias de marketing.",
    ],
    fecha: "2024-01-27",
  },
  {
    horario: "14:30 - 15:30",
    titulo: "Logística del Futuro: Drones, Vehículos Autónomos y Entregas Inteligentes",
    lugar: "Auditorio B",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Drones y vehículos autónomos en la logística y transporte de mercancías.",
      "El papel de los almacenes automatizados y robots en la gestión de inventarios.",
      "Ejemplos de cómo empresas están utilizando IA para optimizar rutas y reducir costos.",
      "Futuras regulaciones y desafíos éticos en la logística autónoma.",
    ],
    fecha: "2024-01-27",
  },
  // Martes
  {
    horario: "10:00 - 11:00",
    titulo: "Introducción a la Inteligencia Artificial: Oportunidades y Desafíos",
    lugar: "Auditorio Principal",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Historia de la IA y sus hitos más importantes.",
      "Conceptos básicos de IA (Machine Learning, Deep Learning, Redes Neuronales).",
      "Discusión sobre los tipos de IA (IA Débil, IA Fuerte, IA General).",
      "Oportunidades de la IA en diversas disciplinas: humanidades, medicina, ciencias sociales, industria, etc.",
      "Presentación de ejemplos de IA que ya forman parte de nuestra vida diaria.",
    ],
    fecha: "2024-01-28",
  },
  {
    horario: "11:30 - 12:30",
    titulo: "IA en Salud: Innovaciones para el Bienestar y el Cuidado Personalizado",
    lugar: "Sala 2",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Aplicaciones de la IA en el diagnóstico médico, tratamientos personalizados y cirugía asistida.",
      "IA para el análisis de imágenes médicas y detección temprana de enfermedades.",
      "Uso de IA en la gestión hospitalaria y eficiencia de recursos.",
      "Desafíos éticos: privacidad de los datos, decisión clínica automatizada y dilemas sobre la responsabilidad.",
    ],
    fecha: "2024-01-28",
  },
  {
    horario: "13:00 - 14:00",
    titulo: "Optimización Industrial con IA: Eficiencia y Automatización en la Era Digital",
    lugar: "Sala 3",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Aplicaciones de IA en la cadena de suministro, gestión de inventarios y producción.",
      "Casos de éxito de IA en la industria 4.0: robots autónomos, predicción de fallas y mantenimiento predictivo.",
      "Uso de IA en la logística para optimizar rutas y reducir costos.",
      "Perspectiva sobre la transformación digital en la industria y el impacto en los empleos.",
    ],
    fecha: "2024-01-28",
  },
  {
    horario: "10:00 - 11:00",
    titulo: "Introducción a la Sostenibilidad: Conceptos y Desafíos para un Futuro Sostenible",
    lugar: "Auditorio Principal",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Introducción al concepto de sostenibilidad y sus tres pilares: ambiental, económico y social.",
      "Análisis de los Objetivos de Desarrollo Sostenible (ODS) y su relevancia en el contexto global y local.",
      "Principales desafíos sostenibles que enfrenta la humanidad, como el cambio climático, la desigualdad económica y la conservación de los recursos naturales.",
      "Ejemplos de cómo diversas disciplinas pueden contribuir al logro de los ODS.",
    ],
    fecha: "2024-01-29",
  },
  {
    horario: "11:30 - 12:30",
    titulo: "Economía Circular: Hacia un Modelo de Producción y Consumo Responsable",
    lugar: "Sala 2",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Definición y principios de la economía circular, en contraste con la economía lineal.",
      "Ejemplos de implementación en la industria: reciclaje, reuso, reparación y diseño de productos sostenibles.",
      "Beneficios ambientales y económicos de la economía circular: reducción de residuos y uso eficiente de los recursos.",
      "Casos de estudio sobre economía circular en sectores como la moda, electrónica y construcción.",
    ],
    fecha: "2024-01-29",
  },
  {
    horario: "13:00 - 14:00",
    titulo: "Energía Renovable y Gestión de Recursos Naturales: Camino hacia la Sostenibilidad Energética",
    lugar: "Sala 3",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Tipos de energías renovables y su importancia en la reducción de emisiones de carbono (solar, eólica, hidroeléctrica, biomasa).",
      "Gestión de recursos naturales y su relación con la sostenibilidad.",
      "Desafíos de la implementación de energías renovables: inversión inicial, tecnología y almacenamiento.",
      "Perspectivas de crecimiento de las energías renovables en Honduras y Latinoamérica.",
    ],
    fecha: "2024-01-29",
  },
  {
    horario: "14:30 - 15:30",
    titulo: "Sostenibilidad Social: Equidad, Educación y Responsabilidad Corporativa",
    lugar: "Auditorio B",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Definición de sostenibilidad social y su importancia en la cohesión de la sociedad.",
      "Equidad en el acceso a recursos, educación y oportunidades para comunidades vulnerables.",
      "Responsabilidad social corporativa (RSC) y cómo las empresas pueden contribuir a la sostenibilidad social.",
      "Ejemplos de programas de RSC exitosos en la región que apoyan a la educación, salud y desarrollo comunitario.",
    ],
    fecha: "2024-01-29",
  },
  {
    horario: "16:00 - 17:00",
    titulo: "Innovación y Ecodiseño: Construyendo un Futuro con Productos Sostenibles",
    lugar: "Auditorio Principal",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Concepto de ecodiseño y su rol en la creación de productos que minimicen el impacto ambiental.",
      "Innovación sostenible: cómo se puede integrar la sostenibilidad en el desarrollo de productos y procesos.",
      "Herramientas y metodologías de ecodiseño (análisis de ciclo de vida, selección de materiales sostenibles).",
      "Ejemplos de productos y servicios creados con un enfoque sostenible y el valor añadido que aportan al mercado.",
    ],
    fecha: "2024-01-29",
  },
  // Jueves
  {
    horario: "10:00 - 11:00",
    titulo: "Diseño Disruptivo: Innovación desde el Problema hasta la Solución",
    lugar: "Auditorio Principal",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Principios del diseño disruptivo y su aplicación en resolver problemas sociales y económicos.",
      "Ejemplos de diseño disruptivo en sectores como la salud, tecnología, educación y servicios.",
      "Estrategias para identificar oportunidades de innovación mediante observación y empatía.",
      "Cómo el diseño disruptivo transforma mercados y redefine la experiencia del usuario.",
    ],
    fecha: "2024-01-30",
  },
  {
    horario: "11:30 - 12:30",
    titulo: "Aplicaciones Originales de Nuevas Tecnologías: De la IA a la Realidad Extendida",
    lugar: "Sala 2",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Ejemplos innovadores de cómo se aplican tecnologías como la inteligencia artificial, realidad aumentada y realidad virtual en sectores como la educación, entretenimiento, industria y comercio.",
      "Casos de estudio de empresas que utilizan estas tecnologías de manera única para crear valor.",
      "Exploración de cómo la innovación en tecnología está cambiando la forma en que interactuamos con el mundo.",
      "Oportunidades y desafíos de implementar estas tecnologías en el contexto local y regional.",
    ],
    fecha: "2024-01-30",
  },
  {
    horario: "13:00 - 14:00",
    titulo: "Industrias 4.0 y 5.0: Evolución hacia la Industria Inteligente y Humana",
    lugar: "Sala 3",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Definición y diferencias entre las industrias 4.0 y 5.0.",
      "Tecnología y automatización en la Industria 4.0: IoT, robótica avanzada y análisis de datos.",
      "La Industria 5.0 y el enfoque en colaboración hombre-máquina para un entorno de trabajo más inclusivo y humanizado.",
      "Ejemplos de cómo la industria inteligente ya está transformando sectores clave como la manufactura, logística y salud.",
    ],
    fecha: "2024-01-30",
  },
  {
    horario: "14:30 - 15:30",
    titulo: "La Universidad del Futuro: Adaptación de las Instituciones Educativas a las Nuevas Tecnologías",
    lugar: "Auditorio B",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Cómo las universidades están integrando nuevas tecnologías en la educación: aulas virtuales, laboratorios digitales y uso de IA en la personalización del aprendizaje.",
      "Habilidades digitales y técnicas que las universidades deben enseñar para preparar a los profesionales del futuro.",
      "Retos y oportunidades de adaptar los programas académicos a la tecnología en un contexto de rápida evolución.",
      "Ejemplos de universidades que han implementado modelos de enseñanza innovadores.",
    ],
    fecha: "2024-01-30",
  },
  {
    horario: "16:00 - 17:00",
    titulo: "Las Profesiones del Futuro y el Profesional del Futuro: Adaptarse a una Sociedad en Constante Cambio",
    lugar: "Auditorio Principal",
    requerimientos: "Traer laptop y material de escritura.",
    expositor: {
      nombre: "Dr. Juan Pérez",
      imagen: "/img/ponente.svg",
    },
    datosImportantes: [
      "Análisis de las habilidades y competencias más demandadas en el futuro: pensamiento crítico, adaptabilidad, colaboración interdisciplinaria y habilidades tecnológicas.",
      "Profesiones emergentes y nuevos roles creados por el avance de la tecnología y la globalización.",
      "Estrategias para que los estudiantes y profesionales se preparen para un entorno laboral en constante cambio.",
      "Ejemplos de carreras actuales que evolucionarán y profesiones futuras en auge.",
    ],
    fecha: "2024-01-30",
  }
];


interface ConferenciaProps {
  conferencia: Conferencia;
}

const ConferenciaComponent: FC<ConferenciaProps> = ({ conferencia }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % conferencia.datosImportantes.length);
    }, 7500);
    return () => clearInterval(intervalo);
  }, [conferencia.datosImportantes]);

  return (
    <div className="w-full border border-slate-100 border-b-[#ffffff82] flex flex-col mb-12">
      <div className="w-full h-14 flex items-center text-2xl p-3 font-bold">
        {conferencia.horario}
      </div>
      <div id="conferencia" className="w-full border border-slate-100 border-t-[#ffffff82] lg:h-48 lg:flex">
        <div
          id="hora"
          className="p-5 px-7 lg:w-1/4 flex flex-col items-center justify-center"
        >
          <div className="relative w-full lg:h-[80%] h-28 border border-slate-200">
            <Image
              src={conferencia.expositor.imagen}
              alt={conferencia.expositor.nombre}
              fill
              className="object-contain object-top"
            />
          </div>
          <div className="border border-slate-200 w-full h-[20%] text-center">
            {conferencia.expositor.nombre}
          </div>
        </div>
        <div id="data" className="lg:w-2/4 flex flex-col p-5">
          <h2 className="text-lg font-bold">{conferencia.titulo}</h2>
          <div className="text-base mt-3">{conferencia.lugar}</div>
          {/* {conferencia.requerimientos && (
            <div className="text-sm">{conferencia.requerimientos}</div>
          )} */}
        </div>
        <div
          id="datosImportantes"
          className="overflow-hidden lg:w-1/4 relative p-4 cursor-pointer flex items-center"
          onClick={() =>
            setIndex((prev) => (prev + 1) % conferencia.datosImportantes.length)
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-slate-200 font-medium text-sm"
            >
              {conferencia.datosImportantes[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function Cronograma() {
  const [diaSeleccionado, setDiaSeleccionado] = useState("2024-01-27");

  const dias = [
    { fecha: "2024-01-27", label: "Lunes 27" },
    { fecha: "2024-01-28", label: "Martes 28" },
    { fecha: "2024-01-29", label: "Miércoles 29" },
    { fecha: "2024-01-30", label: "Jueves 30" },
  ];

  const conferenciasFiltradas = conferencias.filter(
    (conf) => conf.fecha === diaSeleccionado
  );

  return (
    <div className="my-16 w-full flex flex-col items-center">
      <h2 className="text-6xl mb-10">Conferencias</h2>
      <div className="flex lg:w-3/5 w-4/5 justify-between">
        {dias.map((dia) => (
          <div
            key={dia.fecha}
            onClick={() => setDiaSeleccionado(dia.fecha)}
            className={`border border-[#1f2257] w-[22%] lg:text-base text-sm text-center flex rounded-md h-10 items-center justify-center transition-all duration-300 cursor-pointer ${
              diaSeleccionado === dia.fecha
                ? "bg-[#F2AE30] text-[#32378C]"
                : "bg-[#32378C] hover:bg-[#F2AE30] hover:text-[#32378C]"
            }`}
          >
            {dia.label}
          </div>
        ))}
      </div>
      <h3 className="text-4xl m-10">
        {dias.find((dia) => dia.fecha === diaSeleccionado)?.label}
      </h3>
      <div id="conferencias" className="w-3/5">
        {conferenciasFiltradas.map((conf, idx) => (
          <ConferenciaComponent key={idx} conferencia={conf} />
        ))}
      </div>
    </div>
  );
}
