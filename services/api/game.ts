import { Game } from '@/interfaces';
import { get_API_CONFIG } from '../api';

export const fetchGames = async ({ query }: { query: string }) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}game?query=${encodeURIComponent(query)}`;

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

export const fetchGamesDetails = async (gameId: string): Promise<Game> => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}game/${gameId}`
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: API_CONFIG.headers,
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch games detail ${endpoint}: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}