'use client'

import { useState } from "react";

import PrimaryButton from "@/components/PrimaryButton";
import InputForm from "@/components/InputForm";

const login = () => {
    const [forgotPassword, setForgotPassword] = useState(false);
    const [showInputCode, setShowInputCode] = useState(false);

    /* estados de inputs */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

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

    function handleSendEmail(e: React.FormEvent): void {
        e.preventDefault();
        setShowInputCode(true);
        const email = (document.getElementById("email") as HTMLInputElement).value;



        alert("Email sent!");
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(e.target.value);
    }

    function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setCode(e.target.value);
    }

    return (
        <div className="flex h-screen">

            {/* banner izquierdo */}
            <div className="w-full md:w-2/5 xl:w-3/5 hidden md:grid place-items-center md:bg-[url('/promo.enc')] md:bg-repeat md:bg-center md:bg-black md:brightness-75 xl:bg-[#2e2f7f] xl:bg-none z-10 h-screen">
                <img
                    src="/promo.enc"
                    alt="login ilustracion"
                    className="w-[60%] rounded-lg shadow-[8px_8px_15px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.2)]"
                />
            </div>
            
            {/* formulario de login */}
            <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col justify-center items-center bg-[#101017] text-white">
                <img src="/logo_cit_blanco.webp" alt="logo" className="w-16" />

                <h1 className="text-4xl">{forgotPassword ? "Recupera tu cuenta" : "Bienvenido!"}</h1>

                <form action="" className="flex justify-center flex-col gap-4 py-16 px-2 md:w-3/5 w-3/5">

                    {!forgotPassword && (<>

                        <InputForm placeholder="Correo Electrónico" iconName="email" type="email" id="email" onChange={handleEmailChange} />
                        <div>
                            <InputForm placeholder="Contraseña" iconName="lock" type="password" id="password" value={password} onChange={handlePasswordChange}/>
                            <p className="text-right text-sm text-[#f8b133] hover:cursor-pointer hover:underline" onClick={() => setForgotPassword(true)} >¿Olvidaste tu contraseña?</p>
                        </div>


                        <div className="mt-4">
                            <PrimaryButton text="Iniciar Sesión" action={handleSendEmail} type='secondary' className="w-[100%] mb-2" />
                        </div>

                    </>)}

                    {forgotPassword && (
                        <div className="flex flex-col gap-4">
                            {!showInputCode ? (
                                <>
                                    <p className="text-sm text-white">
                                        Ingresa tu correo electrónico para recibir un código de recuperación.
                                    </p>


                                    <InputForm
                                        placeholder="Correo Electrónico"
                                        iconName="email"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </>
                            ) : (
                                <InputForm
                                    placeholder="Código"
                                    iconName="lock"
                                    type="text"
                                    id="code"
                                    value={code}
                                    onChange={handleCodeChange}
                                />
                            )}
                            <PrimaryButton
                                text={!showInputCode ? "Enviar Correo" : "Validar Código"}
                                action={handleSendEmail}
                                type="secondary"
                                className="w-full mb-2"
                            />
                        </div>
                    )}


                    <p className="text-sm text-white text-center">No tengo cuenta, <a href="/register" className="text-[#f8b133] underline decoration-solid">registrarme</a></p>
                </form>

            </div>

        </div>);
}

export default login;