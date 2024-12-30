export default function PreHomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">

            {/* banner izquierdo */}
            <div className="w-full md:w-2/5 xl:w-3/5 hidden md:grid md:bg-[url('/promo.enc')] md:bg-repeat md:bg-center md:bg-black md:brightness-75 xl:bg-[#080816] xl:bg-none z-10 relative">
    <img
        src="/img/landing/promo.enc"
        alt="login ilustracion"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] rounded-lg shadow-[8px_8px_15px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.2)]"
    />
</div>



            {/* formulario de login */}
            <div className="box-border w-full md:w-3/5 xl:w-2/5 flex flex-col justify-center items-center bg-[#101017] text-white py-4">
                <img src="/logos/logo_cit_blanco.webp" alt="logo" className="w-16" />

                {children}
            </div>

        </div>);
}