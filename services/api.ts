
const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app';

export const API_CONFIG = {
    BASE_URL: `${apiUrl}/api/`,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer 1|WUIoQbineSxs08bDnGuKXybxKvkOHeNPM851vVZy2071f6e6',
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