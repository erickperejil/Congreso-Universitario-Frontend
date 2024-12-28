import Link from "next/link";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
    const navOptions = [
        { name: "Conferencias", icon: "", link: "/" },
        { name: "Mis Conferencias", icon: "", link: "/my-conferences" },
        { name: "Mis Datos", icon: "", link: "/my-data" },
    ];

    return (
        <div className="flex w-full min-h-screen">
            <nav className="w-1/5 bg-gray-800 text-white p-4 h-full">
                <img src="/logo_cit_blanco.webp" alt="Logo" className="w-16" />
                <div className="flex flex-col items-between mt-4 h-full">
                    <ul className="flex flex-col">
                        {navOptions.map((option, index) => (
                            <li key={index}>
                                <span className="mr-2">{option.icon}</span>
                                <Link href={option.link}>{option.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full text-left">
                        <span></span>
                        Cerrar sesión
                    </button>

                </div>
            </nav>
            <main className="sm:w-4/5 w-full h-full flex justify-center" >{children}

            </main>
        </div>
    );
}
