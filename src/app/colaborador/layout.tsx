'use client';

import HomeLayout from '../layouts/HomeLayout';

import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}


export default function Home({ children }: HomeProps) {

    const navOptions = [
        { name: "Mi Perfil", icon: "person", link: "/colaborador", default: true },
        { name: "Escanear", icon: "qr_code_scanner", link: "/colaborador/escaner", default: false },
    ];

    return (
        <HomeLayout navOptions={navOptions} className="px-0 lg:px-0"> 
            { children }
        </HomeLayout >

    );
}