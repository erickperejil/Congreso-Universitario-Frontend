import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const options = [
        {
            name: "Inicio",
            icon: "home",
            link: "#",
        },
        {
            name: "Ponentes",
            icon: "group",
            link: "#",
        },
        {
            name: "Conferencias",
            icon: "import_contacts",
            link: "#",
        },
    ];

    const handleLogin = () => {
        console.log("Iniciar sesión");
    };

    return (
        <nav className="flex justify-between items-center h-14 px-4 text-sm fixed top-0 z-10 w-full bg-[#101017] text-white">
            {/* Logo */}
            <a href="#">
                <img
                    src="/logo_cit_blanco.webp"
                    alt="Logo del congreso"
                    className="w-14"
                />
            </a>

            {/* Menú de navegación */}
            <div className="flex items-center gap-4">
                {/* Botón de menú para dispositivos móviles */}
                <span
                    className="material-symbols-outlined cursor-pointer text-xl md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "close" : "menu"}
                </span>

                {/* Opciones de menú desplegable en móviles */}
                <ul
                    className={`absolute top-14 left-0 w-full bg-[#101017] flex flex-col items-center gap-4 p-4 transition-transform duration-300 md:hidden ${
                        menuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                >
                    {options.map((option) => (
                        <li key={option.name}>
                            <a
                                href={option.link}
                                className="flex items-center gap-1 hover:text-[#F8B133] transition"
                            >
                                <span className="material-symbols-outlined">
                                    {option.icon}
                                </span>
                                {option.name}
                            </a>
                        </li>
                    ))}
                    {/* Botón de inicio de sesión en móviles */}
                    <li>
                        <PrimaryButton text="Iniciar Sesión" action={handleLogin} />
                    </li>
                </ul>

                {/* Menú horizontal en pantallas más grandes */}
                <ul className="hidden md:flex items-center gap-8">
                    {options.map((option) => (
                        <li key={option.name}>
                            <a
                                href={option.link}
                                className="flex items-center gap-1 hover:text-[#F8B133] transition"
                            >
                                <span className="material-symbols-outlined">
                                    {option.icon}
                                </span>
                                {option.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Botón de inicio de sesión en pantallas grandes */}
                <div className="hidden md:block">
                    <PrimaryButton text="Iniciar Sesión" action={handleLogin} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
