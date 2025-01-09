import { Career } from "@/interfaces/Career";

export function validateNames(name: string): string {
    if (name === "") {
        return "El campo es requerido";
    }

    return "";
}

export function validateLastNames(lastName: string): string {
    if (lastName === "") {
        return "El campo es requerido";
    }

    return "";
}

export function validateBirthDate(birthDate: string | null): string {
    if (!birthDate || birthDate === "") {
        return "El campo es requerido";
    }

    const birthDateObj = new Date(birthDate);
    const minDate = new Date("1935-01-01");
    const maxDate = new Date();

    // Calcular la fecha límite para ser mayor de 16 años desde hoy
    const sixteenYearsAgo = new Date();
    sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);

    // Validar si la fecha está dentro del rango permitido
    if (birthDateObj < minDate || birthDateObj > maxDate) {
        return "Fecha de nacimiento inválida";
    }

    // Validar si la persona tiene al menos 16 años
    if (birthDateObj > sixteenYearsAgo) {
        return "Debes ser mayor de 16 años";
    }

    return "";
}


export function validateDni(dni: string): string {
    if (dni === "") {
        return "El campo es requerido";
    }

    if (dni.length > 25 || !/^\d+$/.test(dni)) {
        return "El DNI es invalido";
    }
    return "";
}

export function validatePhone(phone: string): string {
    if (phone === "") {
        return "El campo es requerido";
    }

    if (phone.length !== 8 || !/^\d+$/.test(phone)) {
        return "El teléfono es invalido";
    }
    return "";
}

export function validatePassword(password: string): string {
    if (password === "") {
        return "El campo es requerida";
    }


    //que contenga mayusculas minusculas y minimo un num
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!re.test(password)) {
        return "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
    }

    return "";
}

export function validateConfirmPassword(password: string, confirmPassword: string): string {
    if (confirmPassword === "") {
        return "El campo es requerido";
    }

    if (password !== confirmPassword) {
        return "Las contraseñas no coinciden";
    }

    return "";
}

export function validateStudentCode(studentCode: string): string {
    if (studentCode === "") {
        return "El campo es requerido";
    }

    if (studentCode.length !== 11) {
        return "Numero de cuenta invalido";
    }

    return "";
}


export function validateCareer(careers: Career[], careerInput: string): string {
    if (careerInput === "") {
        return "Seleccione una carrera";
    }

    if (careers.length === 0) {
        return "No hay carreras disponibles en este momento";
    }

    // Verifica si alguna carrera coincide con el valor ingresado
    const isValid = careers.some((career) => career.carrera_unah === careerInput);

    if (isValid) {
        return ""; // Sin errores si la carrera es válida
    }

    return "Carrera no válida";
}


export function validateReceiptCode(receiptCode: string): string {
    if (receiptCode === "") {
        return "El campo  es requerido";
    }

    if (receiptCode.length !== 2) {
        return "Numero de recibo invalido";
    }

    return "";
}

export function validateOrganizerCode(organizerCode: string): string {
    if (organizerCode.length !== 4) {
        return "Codigo de organizador invalido";
    }

    return "";
}

export function validateEmail(email: string): string {

    const re = /\S+@\S+\.\S+/;
    if (email === "") {
        return "El campo es requerido";
    }

    if (!re.test(email)) {
        return "El correo no es válido";
    }

    return "";
}

export function validateGender(genderId: number): string {
    if (genderId === -1) {
        return "Seleccione un género";
    }

    return "";
}

export function validateForgotPasswordCode(code: string): string {
    if (code === "") {
        return "Digite el código";
    }

    if (code.length !== 6) {
        return "El código debe tener 6 caracteres";
    }

    return "";
}

export function validateEmailForgotPassword(email: string): string {
    if (email.length === 0) {
        return "Ingrese el correo electronico"
    }

    return "";
}

export function validateUniversity(universityId: number): string {
    if (universityId === -1) {
        return "Seleccione una universidad";
    }

    return "";
}

export function validateReceiptImage(receipt: File | null) {
    if (!receipt) {
        return "Seleccione una imagen";
    }

    if (receipt.type !== "image/jpeg" && receipt.type !== "image/png") {
        return "Formato de imagen no válido";
    }

    if (receipt.size > 5000000) {
        return "La imagen es muy grande";
    }

    return "";
}