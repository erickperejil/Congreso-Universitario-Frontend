'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import { logout } from "@/services/userService";
import Cookies from 'js-cookie'; // Paquete para manejar cookies en cliente
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function HomeLayout({ navOptions, children }: { navOptions: { name: string; icon: string; link: string; }[]; children: ReactNode }) {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState<string>(
    );
    /* sessionStorage.getItem("optionSelected") || "Mi Perfil" */

    const handleOptionChange = (newOption:string) => {
        setOptionSelected(newOption);
        sessionStorage.setItem("optionSelected", newOption);
        setSidebarOpen(false);
      };

    // Manejador para cerrar el sidebar al hacer clic fuera
    const handleClickOutside = (event: MouseEvent) => {
        const sidebar = document.getElementById("logo-sidebar");
        if (
            isSidebarOpen &&
            sidebar &&
            !sidebar.contains(event.target as Node) // Si el clic no está dentro del sidebar
        ) {
            setSidebarOpen(false);
        }
    };

    // Agregar y limpiar el evento de clic
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isSidebarOpen, handleClickOutside]);

    async function handleLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): Promise<void> {
        event.preventDefault();

        try {
            // Obtén el token de la cookie
            const token = Cookies.get('authToken');
            if (!token) {
                console.warn('No token found in cookies.');
                router.push('/login');
                return;
            }

            // Decodifica el token para obtener información como el email
            const { correo } = JSON.parse(atob(token.split('.')[1]));

            const response = await logout(correo);
            if (response?.error) {
                console.error('Error during logout:', response.error);
                return;
            }

            Cookies.remove('authToken');
            router.push('/login');
        } catch (error) {
            console.error('Unexpected error during logout:', error);
        }
    }


    return (
        <>
            {/* Botón para abrir/cerrar el sidebar */}
            <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                aria-controls="logo-sidebar"
                type="button"
                className="absolute inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full bg-[#101017] px-4"
                    } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#101017]">
                    <Link
                        href="/my/"
                        className="w-full mb-5 flex items-start justify-start"
                    >
                        <Image
                            src="/logos/logo_cit_completo_blanco.webp"
                            className=" w-full"
                            alt="Flowbite Logo"
                            width={200}
                            height={50}

                        />
                    </Link>
                    <div className="flex flex-col justify-between space-y-4">
                        <ul className="space-y-2 font-medium">
                            {navOptions.map((option, index) => (
                                <li key={index}>
                                    <Link
                                        href={option.link}
                                        className={`flex items-center p-2 rounded-lg group ${optionSelected === option.name ? "bg-[#F8B133] text-black hover:bg-[#F8B133]" : "text-white hover:bg-gray-700 dark:hover:bg-gray-700"}`}
                                        onClick={() => handleOptionChange(option.name)}
                                    >
                                        <span className="material-symbols-outlined">
                                            {option.icon}
                                        </span>
                                        <span className="ms-3">{option.name}</span>
                                    </Link>
                                </li>

                            ))}
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    onClick={handleLogout}
                                >
                                    <span className="material-symbols-outlined">
                                        logout
                                    </span>
                                    <span className="ms-3">Cerrar Sesión</span>
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </aside>

            {/* Contenido principal */}
            <div className="px-10 lg:px-16 py-10 sm:ml-64">
                <main>
                    {children}
                </main>
            </div>

        </>
    );
}
