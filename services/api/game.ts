import { API_CONFIG } from '../api';

export const fetchGames = async ({ query }: { query: string }) => {
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