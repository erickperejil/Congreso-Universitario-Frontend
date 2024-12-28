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
    
    export function validateBirthDate(birthDate: string): string {
        if (birthDate === "") {
            return "El campo es requerido";
        }
    
        //solo fechas entre 1925 y 2010
        const birthDateObj = new Date(birthDate);
        const minDate = new Date("1925-01-01");
        const maxDate = new Date("2010-12-31");
    
        if (birthDateObj < minDate || birthDateObj > maxDate) {
            return "La fecha de nacimiento debe estar entre 1925 y 2010";
        }
    
        //mayor de 15
        const now = new Date();
        const diff = now.getTime() - birthDateObj.getTime();
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        if (age < 15) {
            return "Debes ser mayor de 15 años";
        }
    
        return "";
    }
    
    export function validateDni(dni: string): string {
        if (dni === "") {
            return "El campo es requerido";
        }
    
        if (dni.length !== 13 || !/^\d+$/.test(dni)) {
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
    
    export function validateReceiptCode(receiptCode: string): string {
        if (receiptCode === "") {
            return "El campo  es requerido";
        }
    
        if (receiptCode.length !== 11) {
            return "Numero de recibo invalido";
        }
    
        return "";
    }
    
    export function validateOrganizerCode(organizerCode: string): string {
        if (organizerCode.length && organizerCode.length !== 11) {
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

    export function validateGender(genderId: number = 0): string {
        const genderArray = ["Hombre", "Mujer"];

        if(genderId === 0){
            return "Seleccione un género";
        }

        return "";
    }

    export function validateForgotPasswordCode(code: string): string {
        if (code === "") {
            return "Digite el código";
        }

        if(code.length !== 6){
            return "El código debe tener 6 caracteres";
        }

        return "";
    }

    export function validateEmailForgotPassword(email : string): string {
        if(email.length === 0){
            return "Ingrese el correo electronico"
        }

        return "";
    }

    export function validateUniversity(universityId: number): string {
        if(universityId === -1){
            return "Seleccione una universidad";
        }

        return "";
    }