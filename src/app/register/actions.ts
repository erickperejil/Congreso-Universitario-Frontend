import { RegisterFormInterface } from '@/interfaces/RegisterForm';
import { university, UniversityExtended } from '@/interfaces/University';
import { register as registerUser, emailExists } from '@/services/userService';

export const handleRegister = async (formData: RegisterFormInterface) => {
    try {
        const result = await registerUser(formData);
        return result; // Devuelve la respuesta para ser manejada en el componente
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Error desconocido al registrar usuario' };
    }
};

export const getUniversities = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/usuario/universidades`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Error' };
        }
        console.log('Login response:', response);

        const data = await response.json();

        const universities: university[] = data.map((university: UniversityExtended) => {
            return { id: university.id_universidad, name: university.universidad };
        });
        
        return { universities }; 
    } catch (error) {
        console.error('get universities error:', error);
        return { error: 'Network error or server unavailable' };
    }
};

export const checkEmailExists = async (email: string) => {
    try {
        const result = await emailExists(email);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Error desconocido al verificar correo' };
    }
};


