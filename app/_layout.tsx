import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import Toast from 'react-native-toast-message';
import "./globals.css";

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    //NavigationBar.setBehaviorAsync("immersive"); 
  }, []);

  return (
    <>
      <StatusBar hidden={true} />

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
      <Toast visibilityTime={1500} />
    </>
  );
}
