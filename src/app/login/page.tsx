'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Cookies from 'js-cookie';

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";

import { isLoginInputsValids } from "@/utils/loginFormValidators";
import { login } from "./actions";
import { Warning } from "postcss";
import ModalWarning from "@/components/ModalWarning";

function Login() {
    const router = useRouter();
    const [sendingLogin, setSendingLogin] = useState(false);
    const [showModal, setShowModal] = useState(false);

    /* estados de inputs */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [areInputsValids, setAreInputsValids] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSendingLogin(true);

        // Llamada al servicio de login
        const response = await login(email, password);

        if (response.error) {
            // Mostrar modal si no ha sido validado
            if (response.statusCode === 403) {
                console.log('Mostrar modal de 403 pq no ha sido validado del lado del admin');
                setShowModal(true); // Mostrar el modal
                setSendingLogin(false);
                return;
            }
            setLoginError(response.error);
            console.error('Login failed:', response.error);
            setSendingLogin(false);
            return;
        }

        // Limpiar el error si el login es exitoso
        setLoginError('');
        setEmail('');
        setPassword('');
        setAreInputsValids(false);
        console.log('Login successful, token:', response.token);

        // Guardar el token en la cookie
        if (response.token) {
            Cookies.set('authToken', response.token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
        }


        // Redirigir a la página protegida (por ejemplo, al dashboard o página principal)
        router.push('/my');
    };




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

            <form action="" className="flex justify-center flex-col gap-4 py-16 px-2 w-[80%] md:w-[70%] lg:w-3/5">

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
                    <Button text="Iniciar Sesión" action={handleLogin} variant='primary' styleType="fill" className="w-[100%] mb-2" disabled={!areInputsValids || sendingLogin} />
                </div>

                <p className="text-sm text-white text-center">No tengo cuenta, <Link href="/register" className="text-[#f8b133] underline decoration-solid">registrarme</Link></p>
            </form>

            {/* Modal de advertencia */}
            {showModal && (
                <ModalWarning
                    title="Estamos procesando la validación de tu recibo de pago. Por favor, espera la aprobación del administrador. Te notificaremos tan pronto como esté listo. ¡Gracias por tu paciencia!"
                    setIsOpen={setShowModal}
                    isOpen={showModal}
                />
            )}


        </>);
}

export default Login;