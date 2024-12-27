export const login = async (email: string, password: string): Promise<{ error?: string; token?: string }> => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'An error occurred during login' };
        }

        const data = await response.json();
        return { token: data.token }; // Assuming the backend sends a token on successful login
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Network error or server unavailable' };
    }
};
