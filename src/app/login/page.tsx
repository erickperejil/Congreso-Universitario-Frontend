'use client'

import PrimaryButton from "@/components/PrimaryButton";
import InputForm from "@/components/InputForm";
import { Input } from "postcss";

const login = () => {
    function handleLogin(event: React.FormEvent): void {
        event.preventDefault();
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        // Implement your login logic here, for example, making an API call
        console.log("Email:", email);
        console.log("Password:", password);

        // Example of handling login success or failure
        if (email === "test@example.com" && password === "password") {
            alert("Login successful!");
        } else {
            alert("Invalid email or password.");
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-3/5 bg-[#2e2f7f] grid place-items-center">
                <img src="/promo.enc" alt="login ilustracion" className="w-[60%] rounded-lg shadow-[8px_8px_15px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.2)]" />
            </div>
            <div className="w-2/5 flex flex-col justify-center items-center bg-[#101017] text-white border-left-2 border-black" >
                <img src="/logo_cit_blanco.webp" alt="" className="w-16" />

                <h1 className="text-4xl">¡Bienvenido!</h1>
                <form action="
        " className="flex justify-center flex-col gap-4 py-16 px-2 md:w-3/5 w-3/5">

                    <InputForm placeholder="Correo Electrónico" iconName="email" type="email" id="email" />
                    <InputForm placeholder="Contraseña" iconName="lock" type="password" id="password" />


                    <div className="mt-4">
                        <PrimaryButton text="Iniciar Sesión" action={handleLogin} type='primary' className="w-[100%] mb-2" />
                    </div>

                    <p className="text-sm text-white text-center">No tengo cuenta, <a href="/register" className="text-[#f8b133] underline underline-offset-4 decoration-solid">registrame</a></p>






                </form>

            </div>

        </div>);
}

export default login;