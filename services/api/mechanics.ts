import { get_API_CONFIG } from '../api';

export const fetchMechanics = async ({ name }: { name: string }) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}mechanic?name=${encodeURIComponent(name)}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: API_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch games ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data;
}