import { Stack } from "expo-router";
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
