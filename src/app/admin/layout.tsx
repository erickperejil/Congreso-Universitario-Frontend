import HomeLayout from '../layouts/HomeLayout';

import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}

export default function Home({ children }: HomeProps) {

    const navOptions = [
        { name: "Participantes", icon: "groups", link: "/admin/participants" },
        { name: "Conferencias", icon: "cast_for_education", link: "/admin/conferences" },
        { name: "Ponentes", icon: "group", link: "/admin/speakers" },
    ];

    return (
        <HomeLayout navOptions={navOptions}>
            { children }
        </HomeLayout >

    );
}