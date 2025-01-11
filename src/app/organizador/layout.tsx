'use client';

import HomeLayout from '@/app/layouts/HomeLayout';

import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}


export default function Home({ children }: HomeProps) {

    const navOptions = [
        { name: "Participantes", icon: "person", link: "/org/conferencias" },
        { name: "Escanear QR", icon: "qr_code_scanner", link: "/org" },
        
    ];

    return (
        <HomeLayout navOptions={navOptions}>
            { children }
        </HomeLayout >

    );
}