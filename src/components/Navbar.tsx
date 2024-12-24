import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


const Nav = () => {
    const options = [
        {
            name: "Inicio",
            icon: "home",
            link: "#",
        },
        {
            name: "Ponentes",
            icon: "group",
            link: "#",
        },
        {
            name: "Conferencias",
            icon: "import_contacts",
            link: "#",
        },
    ];

    const handleLogin = () => {
        console.log("Iniciar sesión");
    };

    return (
        <Disclosure as="nav" className="h-14 px-4 text-sm fixed top-0 z-10 w-full bg-[#101017] text-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-14 items-center">

                    <div className="flex flex-1 items-center justify-between">
                        <div className="inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span aria-hidden="true"
                                    className="block material-symbols-outlined cursor-pointer text-xl group-data-[open]:hidden"
                                >
                                    menu
                                </span>

                                <span aria-hidden="true"
                                    className="hidden material-symbols-outlined cursor-pointer text-xl group-data-[open]:block"
                                >
                                    close
                                </span>

                            </DisclosureButton>
                        </div>
                        <div className="flex shrink-0 items-center">
                            <a href="#">
                                <img
                                    src="/logo_cit_blanco.webp"
                                    alt="Logo del congreso"
                                    className="w-14"
                                />
                            </a>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {options.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.link}
                                        className="text-gray-300 hover:text-[#F8B133] transition px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined">
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </a>

                                ))}
                            </div>
                        </div>
                        <PrimaryButton text="Iniciar sesión" action={handleLogin} />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 bg-[#101017]">
                    {options.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.link}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined">
                                {item.icon}
                            </span>
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export default Nav;
