import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
          <Image
            src="/logos/logocongreso.svg" // Asegúrate de reemplazar este path con tu imagen
            alt="Congreso de Innovación y Tecnología UNAH 2025"
            width={160}
            height={160}
            className="mr-3"
          />
    </header>
  );
};

export default Header;
