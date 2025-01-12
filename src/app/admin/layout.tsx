'use client';

import HomeLayout from '../layouts/HomeLayout';

import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}


export default function Home({ children }: HomeProps) {

    const navOptions = [
        { name: "Conferencias", icon: "person", link: "/admin/conferencias", default: false },
        { name: "Crear Conferencia", icon: "library_books", link: "/admin/createConferencia", default: false },
        { name: "Participantes", icon: "library_books", link: "/admin/home", default: true },
        
    ];

    return (
        <HomeLayout navOptions={navOptions}>
            { children }
        </HomeLayout >

    );
}