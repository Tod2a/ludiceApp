import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="game"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="page/[id]"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
