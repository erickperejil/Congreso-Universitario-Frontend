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

        const universities: UniversityResponse[] = data.map((university: University) => {
            return { id: university.id_universidad, name: university.universidad };
        });
        
        return { universities }; 
    } catch (error) {
        console.error('get universities error:', error);
        return { error: 'Network error or server unavailable' };
    }
};

interface University {
    id_universidad: number;
    universidad: string;
    abreviatura: string;
}

interface UniversityResponse {
    id: number;
    name: string;
}

/* {
    "id_universidad": 1,
    "universidad": "Universidad Nacional Autónoma de Honduras",
    "abreviatura": "UNAH"
}, */