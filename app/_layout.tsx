import * as NavigationBar from "expo-navigation-bar";
import { Stack, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import Toast from 'react-native-toast-message';
import "./globals.css";

export default function RootLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setHidden(true, 'fade');
      if (Platform.OS === "android") {
        NavigationBar.setVisibilityAsync("hidden");
      }
    });
    return unsubscribe;
  }, [navigation]);

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
          name="(scan)"
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
