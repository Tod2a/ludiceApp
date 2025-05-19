import { getAuthToken } from "@/utils/auth";

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app';

export const get_API_CONFIG = async () => {
    const token = await getAuthToken();

    return {
        BASE_URL: `${apiUrl}/api/`,
        headers: {
            accept: 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
};