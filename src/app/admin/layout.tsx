import HomeLayout from '../layouts/HomeLayout';

import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}


export default function Home({ children }: HomeProps) {

    const navOptions = [
        { name: "Conferencias", icon: "person", link: "/admin/home" },
        { name: "Crear Conferencia", icon: "library_books", link: "/admin/createConferencia" },
        { name: "Participantes", icon: "library_books", link: "/my/conferences" },
        
    ];

    return (
        <HomeLayout navOptions={navOptions}>
            { children }
        </HomeLayout >

    );
}