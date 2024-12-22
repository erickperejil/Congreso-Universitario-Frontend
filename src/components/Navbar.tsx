import PrimaryButton from "./PrimaryButton";

const Navbar = () => {
    const options = [
        {
            name: "Inicio",
            icon: "home",
            link: "#"
        },
        {
            name: "Ponentes",
            icon: "group",
            link: "#"
        },
        {
            name: "Conferencias",
            icon: "import_contacts",
            link: "#"
        }    
    ]

    const handleLogin = () => {
        console.log('Iniciar sesion');
    }

    return (
        <nav className="flex justify-between items-center h-16 px-4">
            <a href="#"><img src="/logo_cit_blanco.png" alt="Logo del congreso" className="w-32" />
            </a>
            <ul className="flex items-center list-none gap-8">
                {options.map((option) => (
                    <li key={option.name}>
                        <a href={option.link} className="flex items-center gap-1">
                            <span className="material-symbols-outlined">{option.icon}</span>
                            {option.name}
                        </a>
                    </li>
                ))}
            </ul>
            <PrimaryButton text="Iniciar Sesion" action={handleLogin} />

        </nav>
    );
}

export default Navbar;