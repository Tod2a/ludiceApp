import { ScoreSheetDTO } from '@/interfaces';
import Toast from 'react-native-toast-message';
import { get_API_CONFIG } from '../api';

export const fetchScore = async (gameId?: number | null) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = gameId
        ? `${API_CONFIG.BASE_URL}score/${gameId}`
        : `${API_CONFIG.BASE_URL}score`;

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

export const storeScore = async (scoreSheet: ScoreSheetDTO) => {
    try {
        const API_CONFIG = await get_API_CONFIG();
        const endpoint = `${API_CONFIG.BASE_URL}score`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: API_CONFIG.headers,
            body: JSON.stringify({
                scoreSheet
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

        Toast.show({
            type: 'success',
            text1: data.message || 'Score ajouté avec succès.',
        });

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