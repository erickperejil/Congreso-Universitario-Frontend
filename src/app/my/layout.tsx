import HomeLayout from '../layouts/HomeLayout';

import { ReactNode } from 'react';

interface HomeProps {
    children: ReactNode;
}

export default function Home({ children }: HomeProps) {
    return (
        <HomeLayout>
            {children}
        </HomeLayout>

    );
}