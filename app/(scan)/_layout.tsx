import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="scan"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
