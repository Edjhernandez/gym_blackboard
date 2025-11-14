import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type ThemeMode = "system" | "light" | "dark";
type Lang = "es" | "en";

type Props = {
  // datos perfil (puedes extraerlos desde tu store/context)
  avatarUri?: string;
  coachName?: string;
  coachRoleLabel?: string;

  onThemeChange?: (mode: ThemeMode) => void;
  onLanguageChange?: (lang: Lang) => void;
  onLogout?: () => Promise<void> | void;
  onNavigateProfile?: () => void;
  onNavigateAbout?: () => void;

  // valores iniciales (si los gestionas desde aquí)
  initialTheme?: ThemeMode;
  initialLang?: Lang;
  // optional: indicates current theme to pick correct background text colors, otherwise component uses neutral classes
  darkModeActive?: boolean;
};

export default function SettingsScreen({
  avatarUri,
  coachName = "Coach Nombre Apellido",
  coachRoleLabel = "Tu Coach",
  onThemeChange,
  onLanguageChange,
  onLogout,
  onNavigateProfile,
  onNavigateAbout,
  initialTheme = "system",
  initialLang = "es",
  darkModeActive = false,
}: Props) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  // Local state (can mirror global state via handlers)
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    // call external handler if provided
    if (onThemeChange) onThemeChange(themeMode);
  }, [themeMode, onThemeChange]);

  useEffect(() => {
    if (onLanguageChange) onLanguageChange(lang);
  }, [lang, onLanguageChange]);

  async function handleConfirmLogout() {
    try {
      if (onLogout) {
        await onLogout();
      }
      // If onLogout doesn't navigate, you can navigate from parent handler.
    } catch (err) {
      // opcional: mostrar snackbar/toast
      console.error("Logout error:", err);
    } finally {
      setLogoutModalVisible(false);
    }
  }

  // UI helpers
  const accentText = darkModeActive ? "text-yellow-400" : "text-yellow-500";
  const cardBg = darkModeActive ? "bg-gray-800" : "bg-white";
  const screenBg = darkModeActive ? "bg-gray-900" : "bg-gray-50";
  const sectionBorder = darkModeActive ? "border-gray-700" : "border-gray-200";
  const subtitleText = darkModeActive ? "text-gray-300" : "text-gray-600";

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="mt-5 mx-4 rounded-lg bg-background-secondary p-3 flex-row items-center">
        <Image
          source={require("../../assets/images/coach.png")}
          style={{ width: 70, height: 70 }}
          className="rounded-full"
        />

        <View className="w-full h-8 ml-4 flex-1 mt-20 bg-blue-400">
          <Text className="text-lg font-bold text-text-primary">culo</Text>
          <Text className={`text-sm ${subtitleText}`}>{coachRoleLabel}</Text>
        </View>

        <View className="ml-2">
          <Text className={`${accentText} font-medium`}>{colorScheme}</Text>
        </View>
      </View>

      {/* Body scrollable */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        className="px-4 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        {/* Appearance section */}
        <View
          className={`rounded-lg ${cardBg} border ${sectionBorder} mb-4 p-3`}
        >
          <Text
            className={`text-sm font-semibold mb-3 ${darkModeActive ? "text-white" : "text-gray-900"}`}
          >
            Apariencia
          </Text>

          <View className="flex-row items-center justify-between">
            <Text
              className={`text-base ${darkModeActive ? "text-gray-200" : "text-gray-700"}`}
            >
              Modo
            </Text>

            {/* Segmented control */}
            <View className="flex-row rounded-md bg-transparent overflow-hidden border border-gray-200 dark:border-gray-700">
              <Pressable
                onPress={() => setThemeMode("dark")}
                className={`px-3 py-2 ${themeMode === "dark" ? "bg-yellow-400" : ""}`}
                accessibilityRole="button"
                accessibilityState={{ selected: themeMode === "dark" }}
              >
                <Text
                  className={`${themeMode === "dark" ? "text-gray-900 font-medium" : "text-gray-600"}`}
                >
                  Dark
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setThemeMode("light")}
                className={`px-3 py-2 ${themeMode === "light" ? "bg-yellow-400" : ""}`}
                accessibilityRole="button"
                accessibilityState={{ selected: themeMode === "light" }}
              >
                <Text
                  className={`${themeMode === "light" ? "text-gray-900 font-medium" : "text-gray-600"}`}
                >
                  Light
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setThemeMode("system")}
                className={`px-3 py-2 ${themeMode === "system" ? "bg-yellow-400" : ""}`}
                accessibilityRole="button"
                accessibilityState={{ selected: themeMode === "system" }}
              >
                <Text
                  className={`${themeMode === "system" ? "text-gray-900 font-medium" : "text-gray-600"}`}
                >
                  System
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Language section */}
        <View
          className={`rounded-lg ${cardBg} border ${sectionBorder} mb-4 p-3`}
        >
          <Text
            className={`text-sm font-semibold mb-3 ${darkModeActive ? "text-white" : "text-gray-900"}`}
          >
            Idioma
          </Text>

          <Pressable
            onPress={() => setLanguageModalVisible(true)}
            className="flex-row items-center justify-between py-2"
            accessibilityRole="button"
            accessibilityLabel="Cambiar idioma"
          >
            <View>
              <Text
                className={`${darkModeActive ? "text-gray-200" : "text-gray-700"}`}
              >
                Idioma
              </Text>
              <Text className={`text-sm ${subtitleText}`}>
                {lang === "es" ? "Español" : "English"}
              </Text>
            </View>

            <View>
              <Text className={`${accentText} font-medium`}>Cambiar</Text>
            </View>
          </Pressable>
        </View>

        {/* Info section */}
        <View
          className={`rounded-lg ${cardBg} border ${sectionBorder} mb-6 p-3`}
        >
          <Text
            className={`text-sm font-semibold mb-3 ${darkModeActive ? "text-white" : "text-gray-900"}`}
          >
            Información
          </Text>

          <Pressable
            onPress={() => onNavigateAbout && onNavigateAbout()}
            className="flex-row items-center justify-between py-3"
            accessibilityRole="button"
          >
            <Text
              className={`${darkModeActive ? "text-gray-200" : "text-gray-700"}`}
            >
              Acerca de
            </Text>
            <Text className={`${subtitleText}`}>›</Text>
          </Pressable>
        </View>

        {/* Logout button (separado y prominente) */}
        <View className="mb-8">
          <Pressable
            onPress={() => setLogoutModalVisible(true)}
            className="w-full rounded-md border border-red-500 px-4 py-3 items-center justify-center bg-transparent"
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
          >
            <Text className="text-red-600 font-semibold">Cerrar Sesión</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Language selection modal */}
      <Modal visible={languageModalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/50 items-center justify-end">
          <View className="w-full bg-white dark:bg-gray-800 rounded-t-2xl p-4">
            <Text
              className={`text-lg font-semibold mb-4 ${darkModeActive ? "text-white" : "text-gray-900"}`}
            >
              Seleccionar idioma
            </Text>

            <TouchableOpacity
              onPress={() => {
                setLang("es");
                setLanguageModalVisible(false);
              }}
              className="py-3"
            >
              <Text
                className={`text-base ${lang === "es" ? "font-semibold " + accentText : subtitleText}`}
              >
                Español
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setLang("en");
                setLanguageModalVisible(false);
              }}
              className="py-3"
            >
              <Text
                className={`text-base ${lang === "en" ? "font-semibold " + accentText : subtitleText}`}
              >
                English
              </Text>
            </TouchableOpacity>

            <View className="mt-4">
              <Pressable
                onPress={() => setLanguageModalVisible(false)}
                className="py-3 items-center"
              >
                <Text className="text-gray-500">Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout confirmation modal (custom, not alert) */}
      <Modal visible={logoutModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 items-center justify-center px-6">
          <View className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Confirmar cierre de sesión
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              ¿Estás seguro que quieres cerrar sesión? Se cerrará tu sesión en
              este dispositivo.
            </Text>

            <View className="flex-row justify-end mt-6 space-x-3">
              <Pressable
                onPress={() => setLogoutModalVisible(false)}
                className="px-4 py-2 rounded-md border border-gray-200"
              >
                <Text className="text-gray-700">Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmLogout}
                className="px-4 py-2 rounded-md bg-red-600"
              >
                <Text className="text-white font-medium">Cerrar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
