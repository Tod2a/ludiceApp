import { Stack, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await SecureStore.getItemAsync('auth_token');
      setToken(storedToken);
    };
    checkToken();
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView className="flex-1 bg-black">
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="games/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </>
  );
}
