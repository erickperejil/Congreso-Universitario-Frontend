'use client'

import React, { useState } from "react";

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";

import { validateEmailForgotPassword, validateForgotPasswordCode } from "@/utils/registerFormValidators";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter()

    const [showInputCode, setShowInputCode] = useState(false);

    /* estados de inputs */
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const [errors, setErrors] = useState({
        email: "",
        code: "",
    });

    function handleSendEmail(e: React.FormEvent): void {
        e.preventDefault();

        const emailError = validateEmailForgotPassword(email);
        setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));

        if (emailError) return;

        setShowInputCode(true);
        alert("Email sent!");
    }

    function handleSendCode(e: React.FormEvent): void {
        e.preventDefault();

        const codeError = validateForgotPasswordCode(code);
        setErrors((prevErrors) => ({ ...prevErrors, code: codeError }));

        if (codeError) return;

        if (code === "123456") {
            alert("Code validated successfully!");
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, code: "Invalid code. Please try again." })); // Error personalizado
        }
    }

    function handleCancel(e) {
        e.preventDefault()

        router.push('/login');
    }

    return (
        <>
            <h1 className="text-4xl font-semibold">Recupera tu cuenta</h1>

            <form action="" className="flex justify-center flex-col gap-2 py-16 px-2 w-[80%] md:w-4/5 xl:w-3/5">
                {!showInputCode ? (
                    <>
                        <p className="text-sm text-white leading-4">
                            Ingresa tu correo electrónico para recibir un código de recuperación.
                        </p>

                        <div>
                            <InputForm
                                placeholder="Correo Electrónico"
                                iconName="email"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />

                            {errors.email && <p className="text-[#F8B133] text-sm">{errors.email}</p>}

                        </div>
                    </>
                ) : (
                    <div>
                        <div className="flex flex-col gap-2">
                            <p className="leading-4">Ingresa el código que acabamos de enviarte</p>
                            <InputForm
                                placeholder="Código"
                                iconName="lock"
                                type="text"
                                id="code"
                                value={code}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                            />
                        </div>
                        {errors.code && <p className="text-[#F8B133] text-sm">{errors.code}</p>}
                    </div>

                )}

                {/* Botones de navegacion */}
                <div className="flex flex-col gap-2">
                    <Button
                        text={!showInputCode ? "Enviar Correo" : "Validar Código"}
                        action={!showInputCode ? handleSendEmail : handleSendCode}
                        variant="primary"
                        styleType="fill"
                        className="w-full mt-6"
                    />
                    <Button
                        text={"Cancelar"}
                        action={handleCancel}
                        variant="secondary" // Cambiado de 'type' a 'variant'
                        styleType="fill"
                    />

                </div >

            </form >
        </>
    )
}