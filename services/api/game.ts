import { Game, RandomGameRequestParams } from '@/interfaces';
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

export async function fetchRandomGame({ requestParams }: { requestParams: RandomGameRequestParams }): Promise<Game> {
    try {
        const API_CONFIG = await get_API_CONFIG();
        var endpoint = `${API_CONFIG.BASE_URL}game/random`

        // Filter out undefined/null values before sending request
        const filteredParams: any = {};
        Object.keys(requestParams).forEach((key) => {
            const value = (requestParams as any)[key];
            if (
                value !== undefined &&
                value !== null &&
                value !== 0 &&
                (Array.isArray(value) ? value.length > 0 : true)
            ) {
                filteredParams[key] = value;
            }
        });


        const queryString = new URLSearchParams(filteredParams).toString();
        if (queryString) {
            endpoint += `?${queryString}`;
        }
        console.log(endpoint);
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: API_CONFIG.headers,
        });

        const data = await response.json();
        console.log(data);
        return data.game;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to fetch random game');
    }
}