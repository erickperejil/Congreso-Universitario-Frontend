'use client';

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";

import { RegisterFormInterface } from "@/types/form";
import { validateNames, validateLastNames, validateBirthDate, validateConfirmPassword, validateDni, validateEmail, validateOrganizerCode, validatePassword, validatePhone, validateReceiptCode, validateStudentCode, validateGender } from "@/utils/registerFormValidators";


const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [universityID, setUniversityID] = useState("");

    /* estados de inputs */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [dni, setDni] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [receiptCode, setReceiptCode] = useState("");
    const [organizerCode, setOrganizerCode] = useState("");
    const [isStudent, setIsStudent] = useState(true);

    /* estado para setear errores */
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        secondName: '',
        secondLastName: '',
        birthDate: '',
        dni: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentCode: '',
        receiptCode: '',
        organizerCode: '',
        gender: '',
        university: ''
    });


    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.firstName = validateNames(e.target.value);
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.lastName = validateLastNames(e.target.value);
        setLastName(e.target.value);
    }

    function handleBirthDateChange(e: React.ChangeEvent<HTMLInputElement>): void {

        setBirthDate(new Date(e.target.value));
    }
    function handleDniChange(e: React.ChangeEvent<HTMLInputElement>): void {
        if (!isNaN(Number(e.target.value))) { setDni(e.target.value); }
        errors.dni = validateDni(e.target.value);
    }

    function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        errors.gender = validateGender(e.target.value);
        setGender(e.target.value);
    }


    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.phone = validatePhone(e.target.value);
        if (!isNaN(Number(e.target.value))) { setPhone(e.target.value); }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.email = validateEmail(e.target.value);
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.password = validatePassword(e.target.value);
        setPassword(e.target.value);
    }

    function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.confirmPassword = validateConfirmPassword(password, e.target.value);
        setConfirmPassword(e.target.value);
    }

    function handleStudentCodeChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.studentCode = validateStudentCode(e.target.value);
        setStudentCode(e.target.value);
    }

    function handleReceiptCodeChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.receiptCode = validateReceiptCode(e.target.value);
        setReceiptCode(e.target.value);
    }

    function handleOrganizerCodeChange(e: React.ChangeEvent<HTMLInputElement>): void {
        errors.organizerCode = validateOrganizerCode(e.target.value);
        setOrganizerCode(e.target.value);
    }

    const handleUniversityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUniversityID(event.target.value);
    };

    const handleNextStep = (event: React.FormEvent) => {
        event.preventDefault();

        // Verificamos si hay errores en los campos actuales del step
        let hasErrors = false;
        let newErrors = { ...errors };

        /* Validación en tiempo real - Step 1 */
        if (currentStep === 1) {
            newErrors.firstName = validateNames(firstName);
            newErrors.lastName = validateLastNames(lastName);
            hasErrors = newErrors.firstName !== '' || newErrors.lastName !== '';
        }

        /* Validación en tiempo real - Step 2 */
        if (currentStep === 2) {
            newErrors.birthDate = validateBirthDate(birthDate);
            newErrors.dni = validateDni(dni);
            newErrors.phone = validatePhone(phone);
            newErrors.gender = validateGender(gender);
            hasErrors = newErrors.birthDate !== '' || newErrors.dni !== '' || newErrors.phone !== '' || newErrors.gender !== '';
        }

        /* Validación en tiempo real - Step 3 */
        if (currentStep === 3 && isStudent) {
            newErrors.university = universityID === "" ? "El campo es requerido" : "";
            newErrors.studentCode = validateStudentCode(studentCode);
            hasErrors = newErrors.studentCode !== '';
        }

        /* Validación en tiempo real - Step 4 */
        if (currentStep === 4) {
            newErrors.email = validateEmail(email);
            newErrors.password = validatePassword(password);
            newErrors.confirmPassword = validateConfirmPassword(password, confirmPassword);
            hasErrors = newErrors.email !== '' || newErrors.password !== '' || newErrors.confirmPassword !== '';
        }

        /* Validación en tiempo real - Step 5 */
        if (currentStep === 5) {
            newErrors.receiptCode = validateReceiptCode(receiptCode);
            newErrors.organizerCode = validateOrganizerCode(organizerCode);
            hasErrors = newErrors.receiptCode !== '' || newErrors.organizerCode !== '';
        }

        // Si no hay errores, avanzamos al siguiente paso
        if (!hasErrors) {
            setErrors(newErrors); // Actualizamos el estado de errores
            if (currentStep < 5) {
                setCurrentStep(currentStep + 1); // Avanzamos al siguiente paso
            } else {
                handleSubmit(); // Si estamos en el último paso, enviamos el formulario
            }
        } else {
            setErrors(newErrors); // Actualizamos el estado de errores
        }
    };

    const handleSubmit = () => {
        const formData: RegisterFormInterface = {
            firstName,
            lastName,
            secondName,
            secondLastName,
            dni,
            phone,
            birthDate: birthDate || new Date(),
            gender,
            universityID,
            isStudent,
            studentCode,
            email,
            password,
            receiptCode,
            organizerCode,
        };

        // Aquí puedes enviar formData a donde necesites (API, etc.)
        console.log("Datos enviados:", formData);
    };


    return (
        <div className="flex h-screen">
            <div className="w-full md:w-2/5 xl:w-3/5 hidden md:grid place-items-center md:bg-[url('/promo.enc')] md:bg-repeat md:bg-center md:bg-black md:brightness-75 xl:bg-[#2e2f7f] xl:bg-none z-10 h-screen">
                <img
                    src="/promo.enc"
                    alt="login ilustracion"
                    className="w-[60%] rounded-lg shadow-[8px_8px_15px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.2)]"
                />
            </div>



            <div className="w-full md:w-3/5 xl:w-2/5 flex flex-col justify-center items-center bg-[#101017] text-white">
                <img src="/logo_cit_blanco.webp" alt="" className="w-16" />
                <h1 className="text-4xl">¡Regístrate!</h1>

                {/* Barra de progreso */}
                <section className="flex justify-between items-center gap-2 text-black font-semibold py-4">
                    {[1, 2, 3, 4, 5].map(step => (
                        <div
                            key={step}
                            className={`grid place-items-center w-10 h-10 cursor-pointer rounded-full bg-white
                                ${step < currentStep ? "bg-gray-400" : ""} 
                                ${step === currentStep ? "bg-[#F9B033] w-12 h-12" : "bg-[#fff]"} 
                               `}
                            onClick={() => {
                                // Solo permitir hacer clic en pasos previos al actual
                                if (step <= currentStep) {
                                    setCurrentStep(step);
                                }
                            }}
                        >
                            {step}
                        </div>
                    ))}
                </section>


                <form className="flex flex-col gap-4 py-8 px-2 w-[80%] md:w-[70%] lg:w-3/5" onSubmit={handleNextStep}>
                    {/* Estado 1 */}
                    {currentStep === 1 && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <InputForm placeholder="Nombres" iconName="person" type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
                                {errors.firstName && <p className="text-[#F8B133] text-sm">{errors.firstName}</p>}
                            </div>

                            <div>
                                <InputForm placeholder="Apellidos" iconName="person" type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
                                {errors.lastName && <p className="text-[#F8B133] text-sm">{errors.lastName}</p>}

                            </div>
                        </div>
                    )}

                    {/* Estado 2 */}
                    {currentStep === 2 && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <InputForm placeholder="DNI" iconName="id_card" type="text" id="dni" value={dni} onChange={handleDniChange} />
                                {errors.dni && <p className="text-[#F8B133] text-sm">{errors.dni}</p>}
                            </div>
                            <div>
                                <InputForm placeholder="Número de Teléfono" iconName="phone" type="text" id="phone" value={phone} onChange={handlePhoneChange} />
                                {errors.phone && <p className="text-[#7a85bf] text-sm">{errors.phone}</p>}
                            </div>

                            <div>
                                <SelectForm id="gender" options={["Hombre", "Mujer"]} iconName="wc" legend="Selecciona tu genero" onChange={handleGenderChange} />
                                {errors.gender && <p className="text-[#F8B133] text-sm">{errors.gender}</p>}
                            </div>
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
                                        defaultChecked
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
                                    <div>
                                        <SelectForm
                                            id="university"
                                            options={[
                                                "Universidad Nacional de Ingeniería",
                                                "Universidad Nacional Mayor de San Marcos",
                                                "Universidad Nacional Agraria La Molina",
                                                "UNAH"
                                            ]}
                                            iconName="school"
                                            legend="Selecciona tu universidad"
                                            onChange={handleUniversityChange}
                                        />
                                        {errors.university && <p className="text-[#F8B133] text-sm">{errors.university}</p>}
                                    </div>
                                    {universityID === "UNAH" && (

                                        <div>
                                            <InputForm placeholder="Número de cuenta" iconName="school" type="text" id="studentCode" value={studentCode} onChange={handleStudentCodeChange} />
                                            {errors.studentCode && <p className="text-[#F8B133] text-sm">{errors.studentCode}</p>}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* Estado 4 */}
                    {currentStep === 4 && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <InputForm placeholder="Correo Electrónico" iconName="email" type="email" id="email" value={email} onChange={handleEmailChange} />
                                {errors.email && <p className="text-[#F8B133] text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <InputForm placeholder="Contraseña" iconName="lock" type="password" id="password" value={password} onChange={handlePasswordChange} />
                                {errors.password && <p className="text-[#F8B133] text-sm">{errors.password}</p>}
                            </div>

                            <div>
                                <InputForm placeholder="Confirmar Contraseña" iconName="lock" type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                {errors.confirmPassword && <p className="text-[#F8B133] text-sm">{errors.confirmPassword}</p>}
                            </div>
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

                            <div>
                                <InputForm placeholder="Código de recibo" iconName="receipt" type="text" id="receiptCode" value={receiptCode} onChange={handleReceiptCodeChange} />
                                {errors.receiptCode && <p className="text-[#F8B133] text-sm">{errors.receiptCode}</p>}
                            </div>



                            <div>
                                <legend>Si eres organizador ingresa tu codigo</legend>
                                <InputForm placeholder="Código de Organizador" iconName="pin" type="text" id="organizerCode" value={organizerCode} onChange={handleOrganizerCodeChange} />
                                {errors.organizerCode && <p className="text-[#F8B133] text-sm">{errors.organizerCode}</p>}
                            </div>

                        </div>
                    )}

                    {/* Botones de navegación */}
                    <div className="mt-4 flex flex-col gap-1">
                        <div className="flex gap-1">
                            {currentStep > 1 && (<PrimaryButton text="Retroceder" action={() => setCurrentStep(currentStep - 1)} type="secondary" className="w-[100%]" />
                            )}

                            <PrimaryButton
                                text={currentStep < 5 ? "Continuar" : "Finalizar"}
                                action={() => handleNextStep}
                                type="primary"
                                className="w-[100%]"
                            />
                        </div>


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