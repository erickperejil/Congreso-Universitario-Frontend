'use client'

import { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";

import { isLoginInputsValids } from "@/utils/loginFormValidators";

function Login() {
    /* estados de inputs */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [areInputsValids, setAreInputsValids] = useState(false);
    const [loginError, setLoginError] = useState("Lo sentimos, revisa tus credenciales");

    function handleLogin(event: React.FormEvent): void {
        event.preventDefault();

        /* aca llamar a la funcion del backend */

        console.log("Login successful");
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setAreInputsValids(isLoginInputsValids(e.target.value, password));
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setAreInputsValids(isLoginInputsValids(email, e.target.value));
        setPassword(e.target.value);
    }

    return (
        <>
            {/* formulario de login */}
            <h1 className="text-4xl">¡Bienvenido!</h1>

            <form action="" className="flex justify-center flex-col gap-4 py-16 px-2 md:w-3/5 w-3/5">

                <InputForm placeholder="Correo Electrónico" iconName="email" type="email" id="email" onChange={handleEmailChange} />


                <div>
                    <InputForm placeholder="Contraseña" iconName="lock" type="password" id="password" value={password} onChange={handlePasswordChange} />

                    <Link className="block text-right text-xs text-[#f8b133] hover:cursor-pointer hover:underline" href="/login/forgot-password">¿Olvidaste tu contraseña?</Link>
                </div>


                {loginError && <p className="flex justify-center items-start gap-1 text-red-400 text-sm text-center my-2">
                    <span className="material-symbols-outlined">
                        error
                    </span> {loginError}</p>}

                <div className="mt-4">
                    <Button text="Iniciar Sesión" action={handleLogin} variant='primary' styleType="fill" className="w-[100%] mb-2" disabled={!areInputsValids} />
                </div>

                <p className="text-sm text-white text-center">No tengo cuenta, <Link href="/register" className="text-[#f8b133] underline decoration-solid">registrarme</Link></p>
            </form>

        </>);
}

export default Login;