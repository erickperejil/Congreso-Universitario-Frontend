"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";

import { RegisterFormInterface } from "@/interfaces/RegisterForm";
import { university } from "@/interfaces/University";
import {
    validateNames,
    validateLastNames,
    validateBirthDate,
    validateConfirmPassword,
    validateDni,
    validateEmail,
    validateOrganizerCode,
    validatePassword,
    validatePhone,
    validateReceiptCode,
    validateStudentCode,
    validateReceiptImage,
    validateGender,
    validateUniversity,
} from "@/utils/registerFormValidators";
import { checkEmailExists, getUniversities, handleRegister } from "./actions";
import { genders } from "../constants/genders";

const Register = () => {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const [universities, setUniversities] = useState<university[]>([]);
    const [UNAHId, setUNAHId] = useState<number>(-1);
    const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
    const [sending, setSending] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    /* estados de inputs */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [universityID, setUniversityID] = useState<number>(-1);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [dni, setDni] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState(-1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [receiptCode, setReceiptCode] = useState("");
    const [organizerCode, setOrganizerCode] = useState("");
    const [isStudent, setIsStudent] = useState(true);
    const [rec, setRec] = useState<File | null>(null);

    /* estado para setear errores */
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        secondName: "",
        secondLastName: "",
        birthDate: "",
        dni: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        studentCode: "",
        receiptCode: "",
        organizerCode: "",
        gender: "",
        university: "",
        general: "",
        receiptImage: "",
    });

    /* Trae todas las universidades para el select */
    useEffect(() => {
        const getUniversitiesFromAPI = async () => {
            const response = await getUniversities();
            if (response.error) {
                console.error("Error al obtener universidades:", response.error);
                return;
            }

            if (response.universities) {
                setUniversities(response.universities);
                console.log("Universidades:", response.universities);
            }
        };

        getUniversitiesFromAPI();
    }, []);

    /* Setea el ID de la UNAH para exigir numero de cuenta si el estudiante selecciona UNAH */
    useEffect(() => {
        if (universities.length > 0) {
            const unah = universities.find(
                (university) =>
                    university.name === "Universidad Nacional Autónoma de Honduras"
            );
            if (unah) {
                setUNAHId(unah.id);
                console.log("UNAH encontrada:", unah);
            } else {
                console.log("UNAH no encontrada");
            }
        }
    }, [universities]);

    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setErrors((prev) => ({
            ...prev,
            firstName: validateNames(e.target.value),
        }));
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setErrors((prev) => ({
            ...prev,
            lastName: validateLastNames(e.target.value),
        }));
        setLastName(e.target.value);
    }

    function handleBirthDateChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setErrors((prev) => ({
            ...prev,
            birthDate: validateBirthDate(e.target.value),
        }));
        setBirthDate(new Date(e.target.value));
    }

    function handleDniChange(e: React.ChangeEvent<HTMLInputElement>): void {
        if (!isNaN(Number(e.target.value))) {
            setDni(e.target.value);
        }
        setErrors((prev) => ({
            ...prev,
            dni: validateDni(e.target.value),
        }));
    }

    function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        setErrors((prev) => ({
            ...prev,
            gender: validateGender(Number(e.target.value)),
        }));
        setGender(Number(e.target.value));
    }

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setErrors((prev) => ({
            ...prev,
            phone: validatePhone(e.target.value),
        }));
        if (!isNaN(Number(e.target.value))) {
            setPhone(e.target.value);
        }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setErrors((prev) => ({
            ...prev,
            email: validateEmail(e.target.value),
        }));
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setErrors((prev) => ({
            ...prev,
            password: validatePassword(e.target.value),
        }));
        setPassword(e.target.value);
    }

    function handleConfirmPasswordChange(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        setErrors((prev) => ({
            ...prev,
            confirmPassword: validateConfirmPassword(password, e.target.value),
        }));
        setConfirmPassword(e.target.value);
    }

    function handleStudentCodeChange(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        setErrors((prev) => ({
            ...prev,
            studentCode: validateStudentCode(e.target.value),
        }));
        setStudentCode(e.target.value);
    }

    function handleReceiptCodeChange(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        setErrors((prev) => ({
            ...prev,
            receiptCode: validateReceiptCode(e.target.value),
        }));
        setReceiptCode(e.target.value);
    }

    function handleOrganizerCodeChange(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        setErrors((prev) => ({
            ...prev,
            organizerCode: validateOrganizerCode(e.target.value),
        }));
        setOrganizerCode(e.target.value);
    }

    const handleUniversityChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        console.log(event.target.value);
        setUniversityID(Number(event.target.value));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file  = e.target.files ? e.target.files[0] : null;

        if (file) {
            const error = validateReceiptImage(file);
            if (error) {
                setErrors((prev) => ({ ...prev, receiptImage: error }));
                setRec(null);
                setPreview(null);
            } else {
                setErrors((prev) => ({ ...prev, receiptImage: "" }));
                setRec(file);
                setPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleNextStep = async (event: React.FormEvent) => {
        event.preventDefault();

        const newErrors = { ...errors };

        // Validaciones por paso
        const stepValidations: { [key: number]: () => Promise<void> | void } = {
            1: () => {
                newErrors.firstName = validateNames(firstName);
                newErrors.lastName = validateLastNames(lastName);
            },
            2: () => {
                newErrors.birthDate = validateBirthDate(birthDate ? birthDate.toISOString().slice(0, 10) : null);
                newErrors.dni = validateDni(dni);
                newErrors.phone = validatePhone(phone);
                newErrors.gender = validateGender(gender);
            },
            3: () => {
                if (isStudent) {
                    newErrors.university = validateUniversity(universityID);
                    if (universityID === UNAHId && universityID) {
                        newErrors.studentCode = validateStudentCode(studentCode);
                    }
                }
            },
            4: async () => {
                newErrors.email = validateEmail(email);
                if (newErrors.email) return; 
                const exists = await checkEmailExistsF(email);
                if (exists) {
                    newErrors.email = "El correo ya está registrado";
                }
                newErrors.password = validatePassword(password);
                newErrors.confirmPassword = validateConfirmPassword(password, confirmPassword);
            },
            5: () => {
                if (isOrganizer) {
                    newErrors.organizerCode = validateOrganizerCode(organizerCode);
                } else {
                    newErrors.receiptCode = validateReceiptCode(receiptCode);
                    newErrors.receiptImage = validateReceiptImage(rec);
                }
            },
        };

        // Ejecutar validaciones del paso actual
        if (stepValidations[currentStep]) {
            await stepValidations[currentStep]();
        }

        // Comprobar si hay errores solo en los campos del paso actual
        const currentStepErrors = Object.keys(newErrors)
            .filter((key): key is keyof typeof newErrors => validateFieldsForStep(currentStep).includes(key)) // Campos del paso actual
            .some((field) => newErrors[field] !== '');

        // Manejar errores o avanzar
        setErrors(newErrors);

        if (!currentStepErrors) {
            if (currentStep < 5) {
                setCurrentStep(currentStep + 1);
            } else {
                handleSubmit();
            }
        }
    };

    const validateFieldsForStep = (step: number): string[] => {
        const fieldsByStep: { [key: number]: string[] } = {
            1: ['firstName', 'lastName'],
            2: ['birthDate', 'dni', 'phone', 'gender'],
            3: ['university', 'studentCode'],
            4: ['email', 'password', 'confirmPassword'],
            5: ['organizerCode', 'receiptCode', 'receiptImage'],
        };

        return fieldsByStep[step] || [];
    };

    function handleBackStep(event: React.FormEvent): void {
        event.preventDefault(); // Detiene el envío del formulario
        console.log("Retrocediendo...", currentStep);

        setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
        console.log("Retrocediendo...", currentStep);
    }

    const handleSubmit = async () => {
        setSending(true);
        const formData: RegisterFormInterface = {
            nombres: firstName,
            apellidos: lastName,
            telefono: phone,
            dni: dni,
            fecha_nacimiento: birthDate?.toISOString() || "",
            genero: gender,
            id_universidad: universityID !== -1 ? universityID : null,
            identificador_unah: universityID === UNAHId ? studentCode : null,
            correo: email,
            contrasena: password,
            codigo_recibo: receiptCode,
            codigo_organizador: organizerCode !== "" ? organizerCode : null,
            recibo: rec || null,
        };
        console.log("Datos a enviar:", formData);

        try {
            const response = await handleRegister(formData);
            if (response.error) {
                console.error('Error al registrar usuario:', response.error);
                return;
            }

            const datos = formData.correo;
            localStorage.setItem('registerEmail', email);

            router.push(`/register/confirm-account`);
        } catch (error) {
            console.error('Error inesperado:', error);
        } finally {
            setSending(false);
        }
    };

    const checkEmailExistsF = async (email: string): Promise<boolean> => {
        try {
            const response: any = await checkEmailExists(email);

            if (response?.error) {
                console.error('Error al verificar correo:', response.error);
                return false; // Considerar como fallo en caso de error
            }

            return response.responseData.resultado;
        } catch (error) {
            console.error('Error inesperado:', error);
            return false; // Retorna false si ocurre un error inesperado
        }
    };


    const handleEmailBlur = async () => {

        errors.email = validateEmail(email);
        if (errors.email) {
            return;
        }

        await checkEmailExistsF(email);

    };

    return (
        <>
            <h1 className="text-4xl font-bold text-white mb-2">Regístrate</h1>
            <p className="text-base text-gray-300">Un proceso sencillo y rápido</p>

            {/* Barra de progreso */}
            <section className="flex justify-between items-center gap-2 text-black font-semibold py-4">
                {[1, 2, 3, 4, 5].map((step) => (
                    <div
                        key={step}
                        className={`grid place-items-center w-10 h-10 cursor-pointer rounded-full
                                ${step < currentStep ? "bg-gray-400" : ""} 
                                ${step === currentStep
                                ? "bg-[#f8b133] w-12 h-12"
                                : "bg-[#fff]"
                            } 
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

            <form
                className="flex flex-col gap-4 py-8 px-2 w-[80%] md:w-[70%] lg:w-3/5"
                onSubmit={handleNextStep}
            >
                {/* Estado 1 */}
                {currentStep === 1 && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <InputForm
                                placeholder="Nombres"
                                iconName="person"
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                            {errors.firstName && (
                                <p className="text-[#F8B133] text-sm">{errors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <InputForm
                                placeholder="Apellidos"
                                iconName="person"
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                            {errors.lastName && (
                                <p className="text-[#F8B133] text-sm">{errors.lastName}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Estado 2 */}
                {currentStep === 2 && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <InputForm
                                placeholder="Fecha de Nacimiento"
                                iconName="date_range"
                                type="date"
                                id="birthDate"
                                value={birthDate instanceof Date && !isNaN(birthDate.getTime()) ? birthDate.toISOString().slice(0, 10) : ""}
                                onChange={handleBirthDateChange}
                            />

                            {errors.birthDate && (
                                <p className="text-[#F8B133] text-sm">{errors.birthDate}</p>
                            )}
                        </div>
                        <div>
                            <InputForm
                                placeholder="DNI o (pasaporte para extranjeros)"
                                iconName="id_card"
                                type="number"
                                id="dni"
                                value={dni}
                                onChange={handleDniChange}
                            />
                            {errors.dni && (
                                <p className="text-[#F8B133] text-sm">{errors.dni}</p>
                            )}
                        </div>
                        <div>
                            <InputForm
                                placeholder="Número celular (sin separaciones)"
                                iconName="phone"
                                type="number"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                            {errors.phone && (
                                <p className="text-[#F8B133] text-sm">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <SelectForm
                                id="gender"
                                options={genders}
                                iconName="wc"
                                legend="Selecciona tu genero"
                                onChange={handleGenderChange}
                                optionSelected={gender}
                            />
                            {errors.gender && (
                                <p className="text-[#F8B133] text-sm">{errors.gender}</p>
                            )}
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
                                    onChange={() => {
                                        setIsStudent(false); setErrors((prev) => ({
                                            ...prev, university: "",
                                            studentCode: ""
                                        }))
                                    }}
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
                                    ) : (
                                        <SelectForm
                                            id="university"
                                            options={universities}
                                            iconName="school"
                                            legend="Selecciona tu universidad"
                                            onChange={handleUniversityChange}
                                            optionSelected={universityID}
                                        />
                                    )}

                                    {errors.university && (
                                        <p className="text-[#F8B133] text-sm">
                                            {errors.university}
                                        </p>
                                    )}
                                </div>
                                {universityID === UNAHId && universityID !== -1 && (
                                    <div>
                                        <InputForm
                                            placeholder="Número de cuenta"
                                            iconName="school"
                                            type="text"
                                            id="studentCode"
                                            value={studentCode}
                                            onChange={handleStudentCodeChange}
                                        />
                                        {errors.studentCode && (
                                            <p className="text-[#F8B133] text-sm">
                                                {errors.studentCode}
                                            </p>
                                        )}
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
                            <InputForm
                                placeholder="Correo Electrónico"
                                iconName="email"
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                            />
                            {errors.email && (
                                <p className="text-[#F8B133] text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <InputForm
                                placeholder="Contraseña"
                                iconName="lock"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {errors.password && (
                                <p className="text-[#F8B133] text-sm leading-4">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <InputForm
                                placeholder="Confirmar Contraseña"
                                iconName="lock"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {errors.confirmPassword && (
                                <p className="text-[#F8B133] text-sm">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Estado 5 */}
                {currentStep === 5 && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <p>¿Eres parte del equipo organizador de la conferencia?</p>
                            <div className="flex gap-4">
                                <label htmlFor="organizer-yes" className="flex items-center">
                                    <input
                                        type="radio"
                                        name="organizer"
                                        id="organizer-yes"
                                        className="mr-2"
                                        onChange={() => {setIsOrganizer(true); setErrors((prev) => ({
                                            ...prev, receiptCode: "", receiptImage: ""
                                        }))
                                        }}
                                        checked={isOrganizer}
                                    />
                                    Sí
                                </label>
                                <label htmlFor="organizer-no" className="flex items-center">
                                    <input
                                        type="radio"
                                        name="organizer"
                                        id="organizer-no"
                                        className="mr-2"
                                        onChange={() => {setIsOrganizer(false); setErrors((prev) => ({
                                            ...prev, organizerCode: ""
                                        })); setRec(null); setPreview(null)
                                        }}
                                        checked={!isOrganizer}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {isOrganizer ? (
                            <>
                                <div>
                                    <p>Ingresa el codigo que te proporcionaron</p>
                                    <InputForm
                                        placeholder="Codigo de organizador"
                                        iconName="code"
                                        type="text"
                                        id="organizerCode"
                                        value={organizerCode}
                                        onChange={handleOrganizerCodeChange}
                                    />
                                    {errors.organizerCode && (
                                        <p className="text-[#F8B133] text-sm">
                                            {errors.organizerCode}
                                        </p>
                                    )}
                                </div>
                            </>


                        ) : (
                            <>
                            <div>
                                <legend>Sube tu recibo de inscripción</legend>
                                <div className="bg-transparent border-[1px] border-[#ab9a9a] rounded-md flex items-center gap-2 pl-2 active:outline-none text-white text-base">
                                    <label
                                        htmlFor="file-upload"
                                        className="bg-transparent active:border-none placeholder:text-gray py-2 w-full focus:outline-none flex items-center gap-2 cursor-pointer w-full"
                                    >
                                        <span className="material-symbols-outlined">upload</span>
                                        <span>Subir recibo</span>
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {preview && (
                                    <div className="mt-4">
                                        <p className="text-sm text-white">Vista previa:</p>
                                        <img
                                            src={preview}
                                            alt="Vista previa del recibo"
                                            className="max-w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                                {errors.receiptImage && (
                                    <p className="text-[#F8B133] text-sm">{errors.receiptImage}</p>
                                )}
                            </div>
                            <div>
                                <InputForm
                                    placeholder="Código de recibo"
                                    iconName="numbers"
                                    type="text"
                                    id="receiptCode"
                                    value={receiptCode}
                                    onChange={handleReceiptCodeChange}
                                />
                                {errors.receiptCode && (
                                    <p className="text-[#F8B133] text-sm">{errors.receiptCode}</p>
                                )}
                            </div>
                            </>
                        )}
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
                        disabled={sending}
                    />
                    {currentStep > 1 && (
                        <Button
                            text="Retroceder"
                            type="button"
                            action={handleBackStep}
                            variant="secondary"
                            styleType="fill"
                            className="w-[100%]"
                            disabled={sending}
                        />
                    )}
                </div>

                <p className="text-sm text-white text-center">
                    Ya tengo cuenta,{" "}
                    <Link
                        href="/login"
                        className="text-[#f8b133] underline underline-offset-4"
                    >
                        Iniciar Sesión
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Register;