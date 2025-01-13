'use client'

import UserProfile from "@/components/editarPerfil";
export default function MiPerfil() {

    return (
        <div className='h-screen w-full py-12 px-2'>
            <h2 className="text-3xl text-black border-b-[1px] border-gray-300 ml-4 pb-1">Datos Personales</h2>
            <UserProfile
             />
        </div>
    );
}