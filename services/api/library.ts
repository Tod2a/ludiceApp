import { get_API_CONFIG } from '../api';

export const fetchLibraryGames = async ({ query }: { query: string }) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}library?query=${encodeURIComponent(query)}`;

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

export const storeGameLibrary = async ({ gameId }: { gameId: number }) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}library/${gameId}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: API_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch games ${endpoint}: ${response.statusText}`);
    }
}