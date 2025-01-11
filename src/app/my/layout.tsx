'use client';

import { NotificationProvider } from '@/app/contexts/NotificationContext';
import FloatingNotification from '@/components/FloatingNotification';
import HomeLayout from '../layouts/HomeLayout';
import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}

export default function Home({ children }: HomeProps) {
    const navOptions = [
        { name: "Mi Perfil", icon: "person", link: "/my/profile" },
        { name: "Conferencias", icon: "library_books", link: "/my/conferences" },
        { name: "Mis Inscripciones", icon: "school", link: "/my/inscriptions" },
        { name: "Mi Progreso", icon: "school", link: "/my/progress" },
    ];

    return (
        <NotificationProvider>
            <HomeLayout navOptions={navOptions}>
                {/* Mostrar la notificación flotante */}
                <FloatingNotification />
                {children}
            </HomeLayout>
        </NotificationProvider>
    );
}
