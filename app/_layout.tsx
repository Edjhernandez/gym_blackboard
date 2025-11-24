import { Stack } from "expo-router";
import "react-native-get-random-values";
import "../global.css";
import "../lib/i18n/config";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
}
