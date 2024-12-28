'use client';

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";

import { RegisterFormInterface } from "@/types/form";
import { validateNames, validateLastNames, validateBirthDate, validateConfirmPassword, validateDni, validateEmail, validateOrganizerCode, validatePassword, validatePhone, validateReceiptCode, validateStudentCode, validateGender, validateUniversity } from "@/utils/registerFormValidators";
import { getUniversities } from "./actions";

const genders = [
    { id: 1, name: 'Hombre' },
    { id: 2, name: 'Mujer' },
    { id: 3, name: 'Other' }
];

const Register = () => {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const [universityID, setUniversityID] = useState<number>(-1);
    const [universities, setUniversities] = useState<university[]>([]);
    const [UNAHId, setUNAHId] = useState<number>(-1);

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


    useEffect(() => {
        const getUniversitiesFromAPI = async () => {
            const response = await getUniversities();
            if (response.error) {
                console.error('Error al obtener universidades:', response.error);
                return;
            }
    
            if (response.universities) {
                setUniversities(response.universities);
            }

            console.log('Universidades:', response.universities);
        };
/* 
                    const university = response.universities?.find((university) => university.name === "Universidad Nacional Autónoma de Honduras");

                    if (university) {
                        setUNAHId(university.id);
                        console.log('UNAH:', university);
                    } */



        getUniversitiesFromAPI().then(() => {
            const unah = universities.find((university) => university.name === "Universidad Nacional Autónoma de Honduras");
            if (unah) {
                setUNAHId(unah.id);
            }
        });


    }, []);



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
        errors.gender = validateGender(Number(e.target.value));
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
        console.log(event.target.value);
        setUniversityID(Number(event.target.value));
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
            newErrors.university =  validateUniversity(universityID);
            if (universityID === UNAHId && universityID){
                newErrors.studentCode = validateStudentCode(studentCode);
            }
            hasErrors = newErrors.studentCode !== '' || newErrors.university !== '';
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

        router.push("/register/confirm-account");

        // Aquí puedes enviar formData a donde necesites (API, etc.)
        console.log("Datos enviados:", formData);
    };


    function handleBackStep(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-white mb-2">Regístrate</h1>
            <p className="text-base text-gray-300">Un proceso sencillo y rápido</p>

            {/* Barra de progreso */}
            <section className="flex justify-between items-center gap-2 text-black font-semibold py-4">
                {[1, 2, 3, 4, 5].map(step => (
                    <div
                        key={step}
                        className={`grid place-items-center w-10 h-10 cursor-pointer rounded-full
                                ${step < currentStep ? "bg-gray-400" : ""} 
                                ${step === currentStep ? "bg-[#f8b133] w-12 h-12" : "bg-[#fff]"} 
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
                            {errors.phone && <p className="text-[#F8B133] text-sm">{errors.phone}</p>}
                        </div>

                        <div>
                            <SelectForm id="gender" options={genders} iconName="wc" legend="Selecciona tu genero" onChange={handleGenderChange} />
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
                                    checked={isStudent}
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
                                    checked={!isStudent}
                                />
                                No
                            </label>
                        </div>

                        {isStudent && (
                            <>
                                <div>
                                    {universities.length === 0 ? (
                                        <p className="text-white">Cargando universidades...</p>

                                    ) : (<SelectForm
                                        id="university"
                                        options={universities}
                                        iconName="school"
                                        legend="Selecciona tu universidad"
                                        onChange={handleUniversityChange}
                                        optionSelected={universityID}
                                    />)}

                                    {errors.university && <p className="text-[#F8B133] text-sm">{errors.university}</p>}
                                </div>
                                {universityID === UNAHId && (

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
                            {errors.password && <p className="text-[#F8B133] text-sm leading-4">{errors.password}</p>}
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
                        <div>
                            <legend>Sube tu recibo de inscripción</legend>
                            <div className="bg-transparent border-[1px] border-[#ab9a9a] rounded-md flex items-center gap-2 pl-2 active:outline-none text-white text-base">
                                <label htmlFor="file-upload" className="bg-transparent active:border-none placeholder:text-gray py-2 w-full focus:outline-none flex items-center gap-2 cursor-pointer w-full">
                                    <span className="material-symbols-outlined">upload</span>
                                    <span>Subir recibo</span>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e)
                                    }
                                />
                            </div>
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
                <div className="mt-4 flex flex-col gap-2">
                    <Button
                        text={currentStep < 5 ? "Continuar" : "Finalizar"}
                        action={() => handleNextStep}
                        variant="primary"
                        styleType="fill"
                        className="w-[100%]"
                    />
                    {currentStep > 1 && (<Button text="Retroceder" action={handleBackStep} variant="secondary" styleType="fill" className="w-[100%]" />
                    )}
                </div>

                <p className="text-sm text-white text-center">
                    Ya tengo cuenta,{" "}
                    <Link href="/login" className="text-[#f8b133] underline underline-offset-4">
                        Iniciar Sesión
                    </Link>
                </p>
            </form>
        </>

    );
};

interface university {
    id: number;
    name: string;
}


export default Register;

