import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="library"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
