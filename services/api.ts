import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/api/';

export const API_CONFIG = {
    BASE_URL: apiUrl,
    headers: {
        accept: 'application/json',
    }
}

export const fetchGames = async ({ query }: { query: string }) => {
    const endpoint = `${API_CONFIG.BASE_URL}game?query=${encodeURIComponent(query)}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: API_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}