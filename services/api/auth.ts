import { LoginCredentials } from '@/interfaces';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG } from '../api';

export const login = async ({ email, password }: LoginCredentials) => {
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
        throw new Error(`Login failed ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json();
    const token = data.token;
    const userId = data.user.id;

    await SecureStore.setItemAsync('auth_token', token);
    await SecureStore.setItemAsync('user_id', userId.toString());
};
