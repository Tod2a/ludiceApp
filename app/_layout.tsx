import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import "./globals.css";

export default function RootLayout() {

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
          <Stack.Screen
            name="(library)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="game-prep"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="score"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
      <Toast visibilityTime={1500} />
    </>
  );
}
