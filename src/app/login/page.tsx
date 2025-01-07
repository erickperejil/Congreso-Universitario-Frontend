'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Cookies from 'js-cookie';

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";

import { isLoginInputsValids } from "@/utils/loginFormValidators";
import { login } from "./actions";
import ModalWarning from "@/components/ModalWarning";

function Login() {
    const router = useRouter();
    const [sendingLogin, setSendingLogin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    /* estados de inputs */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [areInputsValids, setAreInputsValids] = useState(false);
    const [loginError, setLoginError] = useState("");
    
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSendingLogin(true);

        try {
            // Llamada al servicio de login
            const response = await login(email, password);

            if (response.error) {
                if (response.statusCode === 403) {
                    switch (response.codigoResultado) {
                        case -1:
                            setModalMessage(
                                'Tu recibo de pago ha sido rechazado. Si crees que fue un error, por favor contáctanos en congresofacultadingenieriaunah@gmail.com.'
                            );
                            break;
                        case -2:
                            setModalMessage(
                                'Ocurrió un error inesperado. Por favor, inténtalo más tarde o contáctanos en congresofacultadingenieriaunah@gmail.com.'
                            );
                            break;
                        case 2:
                            setModalMessage(
                                'Estamos procesando la validación de tu recibo de pago. Te notificaremos tan pronto como esté listo. Gracias por tu paciencia.'
                            );
                            break;
                        default:
                            setModalMessage(
                                'Se produjo un error desconocido. Por favor, contacta al soporte.'
                            );
                            break;
                    }

                    setShowModal(true);
                } else {
                    setLoginError(response.error);
                }

                setSendingLogin(false);
                return;
            }

            // Limpiar errores y resetear formulario
            setLoginError('');
            setEmail('');
            setPassword('');
            setAreInputsValids(false);

            // Guardar el token
            if (response.token) {
                Cookies.set('authToken', response.token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
            }

            // Redirigir a la página principal
            router.push('/my');
        } catch (err) {
            console.error('Unexpected error during login:', err);
            setLoginError('Ocurrió un error inesperado. Intenta nuevamente.');
        } finally {
            setSendingLogin(false);
        }
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

                <p className="text-sm text-white text-center">No tengo cuenta, <Link href="/register" className="text-[#f8b133] underline decoration-solid">Registrarme</Link></p>
            </form>

            {/* Modal de advertencia */}
            {showModal && (
                <ModalWarning
                    title={modalMessage}
                    setIsOpen={setShowModal}
                    isOpen={showModal}
                />
            )}


        </>);
}

export default Login;