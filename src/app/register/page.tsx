'use client';

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isStudent, setIsStudent] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState("");

    const handleNextStep = (event: React.FormEvent) => {
        event.preventDefault();
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        alert("Registro finalizado con éxito!");
    };

    const handleUniversityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUniversity(event.target.value);
    };

    return (
        <div className="flex h-screen">
            <div className="w-3/5 bg-[#2e2f7f] grid place-items-center">
                <img src="/promo.enc" alt="login ilustracion" className="w-[60%] rounded-lg shadow-[8px_8px_15px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.2)]" />
            </div>
            <div className="w-2/5 flex flex-col justify-center items-center bg-[#101017] text-white">
                 <img src="/logo_cit_blanco.webp" alt="" className="w-16" />
                <h1 className="text-4xl">¡Regístrate!</h1>
 
                {/* Barra de progreso */}
                <section className="flex justify-between gap-2 text-black font-semibold py-4">
                    {[1, 2, 3, 4, 5].map(step => (
                        <div
                            key={step}
                            className={`grid place-items-center w-10 h-10 rounded-full ${step === currentStep ? "bg-[#F8B133]" : "bg-[#fff]"
                                }`}
                        >
                            {step}
                        </div>
                    ))}
                </section>

                <form className="flex flex-col gap-4 py-8 px-2 md:w-3/5 w-3/5">
                    {/* Estado 1 */}
                    {currentStep === 1 && (
                        <div className="flex flex-col gap-4">
                            <InputForm placeholder="Primer nombre" iconName="person" type="text" id="firstName" />
                            <InputForm placeholder="Primer apellido" iconName="person" type="text" id="lastName" />
                            <InputForm placeholder="Segundo nombre" iconName="person" type="text" id="secondName" />
                            <InputForm placeholder="Segundo apellido" iconName="person" type="text" id="secondLastName" />
                        </div>
                    )}

                    {/* Estado 2 */}
                    {currentStep === 2 && (
                        <div className="flex flex-col gap-4">
                            <InputForm placeholder="Fecha de Nacimiento" iconName="calendar_today" type="date" id="birthDate" />
                            <InputForm placeholder="DNI" iconName="id_card" type="text" id="dni" />
                            <InputForm placeholder="Número de Teléfono" iconName="phone" type="tel" id="phone" />
                            <SelectForm id="gender" options={["Hombre", "Mujer", "Otro"]} iconName="wc" />
                        </div>
                    )}

                    {/* Estado 3 */}
                    {currentStep === 3 && (
                        <div className="flex flex-col gap-4">
                            <p>Eres estudiante universitario actual?</p>
                            <div className="flex gap-4">
                                <label htmlFor="student-yes" className="flex items-center">
                                    <input
                                        type="radio"
                                        name="student"
                                        id="student-yes"
                                        className="mr-2"
                                        onChange={() => setIsStudent(true)}
                                    />
                                    Sí
                                </label>
                                <label htmlFor="student-no" className="flex items-center">
                                    <input
                                        type="radio"
                                        name="student"
                                        id="student-no"
                                        className="mr-2"
                                        onChange={() => setIsStudent(false)}
                                    />
                                    No
                                </label>
                            </div>

                            {isStudent && (
                                <>
                                    <SelectForm
                                        id="university"
                                        options={[
                                            "Universidad Nacional de Ingeniería",
                                            "Universidad Nacional Mayor de San Marcos",
                                            "Universidad Nacional Agraria La Molina",
                                            "UNAH"
                                        ]}
                                        placeholder="Selecciona tu universidad"
                                        onChange={handleUniversityChange}
                                    />
                                    {selectedUniversity === "UNAH" && (
                                        <InputForm placeholder="Número de cuenta" iconName="school" type="text" id="studentCode" />
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* Estado 4 */}
                    {currentStep === 4 && (
                        <div className="flex flex-col gap-4">
                            <InputForm placeholder="Correo Electrónico" iconName="email" type="email" id="email" />
                            <InputForm placeholder="Contraseña" iconName="lock" type="password" id="password" />
                            <InputForm placeholder="Confirmar Contraseña" iconName="lock" type="password" id="confirmPassword" />

                        </div>
                    )}

                    {/* Estado 5 */}
                    {currentStep === 5 && (
                        <div className="flex flex-col gap-4">
                            <legend>Sube tu recibo de inscripción</legend>
                            <div className="bg-transparent border-2 border-[#ab9a9a] rounded-md flex items-center gap-2 pl-2 text-base text-white">
                                <span className="material-symbols-outlined">upload</span>
                                <input type="file" className="bg-transparent w-full py-2 focus:outline-none" />
                            </div>
                            <InputForm placeholder="Código de recibo" iconName="receipt" type="text" id="receiptCode" />

                            <legend>Si eres organizador digita tu codigo</legend>
                            <InputForm placeholder="Código de Organizador" iconName="pin" type="text" id="organizerCode" />

                        </div>
                    )}

                    {/* Botones de navegación */}
                    <div className="mt-4">
                        <PrimaryButton
                            text={currentStep < 5 ? "Continuar" : "Finalizar"}
                            action={handleNextStep}
                            type="primary"
                            className="w-[100%] mb-2"
                        />
                        {currentStep > 1 && (<PrimaryButton text="Cancelar" action={() => alert("Registro cancelado")} type="secondary" className="w-[100%]" />
)}
                    </div>

                    <p className="text-sm text-white text-center">
                        Ya tengo cuenta,{" "}
                        <a href="/login" className="text-[#f8b133] underline underline-offset-4">
                            Iniciar Sesión
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
