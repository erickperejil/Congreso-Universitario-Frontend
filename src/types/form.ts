/*     const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [dni, setDni] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [receiptCode, setReceiptCode] = useState("");
    const [organizerCode, setOrganizerCode] = useState(""); */

export interface RegisterFormInterface {
    firstName: string;
    lastName: string;
    secondName: string;
    secondLastName: string;
    birthDate: Date;
    dni: string;
    phone: string;
    email: string;
    password: string;
    studentCode: string;
    receiptCode: string;
    organizerCode: string;
    gender: string;
    universityID: string;
    isStudent: boolean;
}

