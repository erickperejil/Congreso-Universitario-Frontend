export const login = async (email: string, password: string): Promise<{ error?: string; token?: string; statusCode?: number }> => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo: email, contrasenia: password }),
        });

        /* si es un 403 quiero moestrar un modal */

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'An error occurred during login', statusCode: response.status };
        }
        console.log('Login response:', response);

        const data = await response.json();
        return { token: data.token }; // Assuming the backend sends a token on successful login
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Network error or server unavailable' };
    }
};
