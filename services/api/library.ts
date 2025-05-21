import Toast from 'react-native-toast-message';
import { get_API_CONFIG } from '../api';

export const fetchLibraryGames = async ({ query, page = 1 }: { query: string, page: number }) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}library?query=${encodeURIComponent(query)}&page=${page}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: API_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch games ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}

export const storeGameLibrary = async (gameId: string) => {
    try {
        const API_CONFIG = await get_API_CONFIG();
        const endpoint = `${API_CONFIG.BASE_URL}library/${gameId}`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: API_CONFIG.headers,
        });

        const data = await response.json();

        if (response.status !== 200) {
            Toast.show({
                type: 'error',
                text1: "Erreur lors de l'ajout à votre ludothèque",
                text2: data.message || 'Erreur serveur',
            });
            return null;
        }

        Toast.show({
            type: 'success',
            text1: data.message || 'Jeu ajouté avec succès.',
        });

        return data;
    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: "Erreur de connexion",
            text2: error.message || 'Erreur inconnue',
        });
        return null;
    }
};

export const destroyGameLibrary = async (gameId: number) => {
    try {
        const API_CONFIG = await get_API_CONFIG();
        const endpoint = `${API_CONFIG.BASE_URL}library/${gameId}`;

        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: API_CONFIG.headers,
        });

        const data = await response.json();

        if (response.status !== 200) {
            Toast.show({
                type: 'error',
                text1: "Erreur lors de la suppression de votre ludothèque",
                text2: data.message || 'Erreur serveur',
            });
            return null;
        }

        Toast.show({
            type: 'success',
            text1: data.message || 'Jeu retiré avec succès.',
        });

        return data;
    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: "Erreur de connexion",
            text2: error.message || 'Erreur inconnue',
        });
        return null;
    }
};