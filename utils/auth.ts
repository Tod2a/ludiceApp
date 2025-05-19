import * as SecureStore from 'expo-secure-store';

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync('auth_token');
    return !!token;
};

export const getAuthToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('auth_token');
};

export const getUserId = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('user_id');
}

export const getUserName = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('user_name');
}

export const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    await SecureStore.deleteItemAsync('user_id');
};
