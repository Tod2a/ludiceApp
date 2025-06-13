import { LoginCredentials } from '@/interfaces';
import * as SecureStore from 'expo-secure-store';
import { get_API_CONFIG } from '../api';

export const login = async ({ email, password }: LoginCredentials) => {
    const API_CONFIG = await get_API_CONFIG();
    const endpoint = `${API_CONFIG.BASE_URL}login`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            ...API_CONFIG.headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorText = await response.json();
        throw new Error(` ${errorText.message}`);
    }

    const data = await response.json();
    const token = data.token;
    const userId = data.user.id;
    const userName = data.user.name;

    await SecureStore.setItemAsync('auth_token', token);
    await SecureStore.setItemAsync('user_id', userId.toString());
    await SecureStore.setItemAsync('user_name', userName.toString());
};

