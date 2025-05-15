import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/api/';

export const API_CONFIG = {
    BASE_URL: 'https://tst.ludice.app/api/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer 1|eFEereP8EmTHevaCmQdb5T1UqxnkTcOcKkg6sqUraa83b4ba',
    }
}

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