import HomeLayout from '../layouts/HomeLayout';

import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}


export default function Home({ children }: HomeProps) {

    const navOptions = [
        { name: "Mi Perfil", icon: "person", link: "/my" },
        { name: "Conferencias", icon: "library_books", link: "/my/conferences" },
        { name: "Mis Inscripciones", icon: "school", link: "/my/inscriptions" },
        
    ];

    return (
        <HomeLayout navOptions={navOptions}>
            { children }
        </HomeLayout >

    );
}