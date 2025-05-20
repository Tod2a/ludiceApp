import Toast from 'react-native-toast-message';
import { get_API_CONFIG } from '../api';

export const fetchGuest = async ({ name }: { name: string }) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}guest?name=${encodeURIComponent(name)}`

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: API_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch games ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json();

    return data.guests;
}

export const storeGuest = async (name: string) => {
    try {
        const API_CONFIG = await get_API_CONFIG();
        const endpoint = `${API_CONFIG.BASE_URL}guest`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: API_CONFIG.headers,
            body: JSON.stringify({
                name: name
            })
        })

        const data = await response.json();

        if (response.status !== 200) {
            Toast.show({
                type: 'error',
                text1: "Erreur lors de l'ajout à votre ludothèque",
                text2: data.message || 'Erreur serveur',
            });
            return null;
        }

        return data.guest;
    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: "Erreur de connexion",
            text2: error.message || 'Erreur inconnue',
        });
        return null;
    }
}