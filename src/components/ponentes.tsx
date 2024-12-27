import Image from "next/image";

export default function Ponentes() {
  const ponentes = [
    {
      name: "Dr Nombre1 Apellido1",
      description:
        "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
      image: "/img/ponente.svg",
    },
    {
      name: "Dr Nombre2 Apellido2",
      description:
        "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
      image: "/img/ponente.svg",
    },
    {
      name: "Dr Nombre3 Apellido3",
      description:
        "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
      image: "/img/ponente.svg",
    },
    {
        name: "Dr Nombre1 Apellido1",
        description:
          "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
        image: "/img/ponente.svg",
      },
      {
        name: "Dr Nombre2 Apellido2",
        description:
          "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
        image: "/img/ponente.svg",
      },
      {
        name: "Dr Nombre3 Apellido3",
        description:
          "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
        image: "/img/ponente.svg",
      },
      {
        name: "Dr Nombre1 Apellido1",
        description:
          "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
        image: "/img/ponente.svg",
      },
      {
        name: "Dr Nombre2 Apellido2",
        description:
          "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
        image: "/img/ponente.svg",
      },
      {
        name: "Dr Nombre3 Apellido3",
        description:
          "Doctor en ciencias de la computación de la Universidad Nacional Autónoma de Honduras. Aquí puede ir más info.",
        image: "/img/ponente.svg",
      }
  ];

  return (
    <div>
      <h1 className="text-[#E7E8F2] text-3xl md:text-5xl text-center mb-6">
        Ponentes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {ponentes.map((ponente, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            {/* Imagen */}
            <Image
              src={ponente.image}
              alt={ponente.name}
              width={468}
              height={592}
              className="w-full h-64 object-cover group-hover:opacity-20 transition-opacity duration-300"
            />
            {/* Nombre con fondo semitransparente */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-center p-4">
              <h3 className="text-lg font-bold">{ponente.name}</h3>
            </div>
            {/* Descripción en hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-75 p-4">
              <p className="text-sm text-gray-300">{ponente.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
