export default function PreHomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">

            {/* banner izquierdo */}
            <div className="w-full md:w-2/5 xl:w-3/5 hidden md:grid place-items-center md:bg-[url('/promo.enc')] md:bg-repeat md:bg-center md:bg-black md:brightness-75 xl:bg-[#080816] xl:bg-none z-10 h-screen">
                <img
                    src="/promo.enc"
                    alt="login ilustracion"
                    className="w-[60%] rounded-lg shadow-[8px_8px_15px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.2)] hidden xl:grid"
                />
            </div>

            {/* formulario de login */}
            <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col justify-center items-center bg-[#101017] text-white">
                <img src="/logo_cit_blanco.webp" alt="logo" className="w-16" />

                {children}
            </div>

        </div>);
}