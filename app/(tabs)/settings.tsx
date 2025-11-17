import { useI18n } from "@/lib/hooks/useI18n";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
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
  const { t } = useI18n();

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

  const accentText = darkModeActive ? "text-yellow-400" : "text-yellow-500";

  const sectionBorder = darkModeActive ? "border-gray-700" : "border-gray-200";
  const subtitleText = darkModeActive ? "text-gray-300" : "text-gray-600";

  return (
    <SafeAreaView className="flex-1 bg-background-primary px-4">
      {/* Header */}
      <View className="mt-5 rounded-lg bg-background-secondary p-3 flex-row items-center">
        <Image
          source={require("../../assets/images/coach.png")}
          style={{ width: 70, height: 70 }}
          className="rounded-full"
        />

        <View className="w-full ml-4 flex-1">
          <Text className="text-sm font-light text-text-secondary">
            {t("common.coach")}
          </Text>
          <Text className="text-xl text-text-primary font-bold">
            Eduardo Hernandez
          </Text>
        </View>
      </View>

      {/* Appearance section */}
      <View className="bg-background-secondary rounded-lg  my-4 p-3">
        <Text className="text-text-primary">{t("settings.appearance")}</Text>

        <View className="flex-row items-center justify-end">
          {/* Segmented control */}
          <View className="flex-row rounded-md bg-transparent overflow-hidden border-[0.5px] border-text-secondary">
            <Pressable
              onPress={() => setThemeMode("dark")}
              className={`px-3 py-2 ${themeMode === "dark" ? "bg-primary" : ""}`}
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
              className={`px-3 py-2 ${themeMode === "light" ? "bg-primary" : ""}`}
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
              className={`px-3 py-2 ${themeMode === "system" ? "bg-primary" : ""}`}
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
      <View className="bg-background-secondary rounded-lg p-3">
        <Text className="text-text-primary">{t("settings.language")}</Text>
        {/* Segmented control */}
        <View className="flex-row items-center justify-end">
          <View className="flex-row rounded-md bg-transparent overflow-hidden border-[0.5px] border-text-secondary">
            <Pressable
              onPress={() => setLang("es")}
              className={`px-3 py-2 ${lang === "es" ? "bg-primary" : ""}`}
              accessibilityRole="button"
              accessibilityState={{ selected: lang === "es" }}
            >
              <Text
                className={`${lang === "es" ? "text-gray-900 font-medium" : "text-gray-600"}`}
              >
                {t("settings.spanish")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setLang("en")}
              className={`px-3 py-2 ${lang === "en" ? "bg-primary" : ""}`}
              accessibilityRole="button"
              accessibilityState={{ selected: lang === "en" }}
            >
              <Text
                className={`${lang === "en" ? "text-gray-900 font-medium" : "text-gray-600"}`}
              >
                {t("settings.english")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Info section */}
      <View className="bg-background-secondary rounded-lg mt-4 p-3 flex-row items-center justify-between">
        <Text className="text-text-primary">{t("settings.about")}</Text>

        <Pressable
          onPress={() => setLanguageModalVisible(true)}
          className="w-12 h-12 rounded-full items-center justify-center"
          accessibilityRole="button"
        >
          <Octicons name="chevron-down" size={24} color="#E7EBDA" />
        </Pressable>
      </View>

      {/* Logout button */}
      <View className="absolute bottom-4 left-0 right-0 px-4">
        <Pressable
          onPress={() => setLogoutModalVisible(true)}
          className="w-full rounded-md border border-primary px-4 py-3 items-center justify-center bg-transparent"
          accessibilityRole="button"
          accessibilityLabel="Cerrar sesión"
        >
          <Text className="text-primary font-semibold">
            {t("settings.logout")}
          </Text>
        </Pressable>
      </View>

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
        <View className="flex-1 bg-background-primary/80 items-center justify-center px-6">
          <View className="flex-col justify-center items-center w-full max-w-md rounded-lg bg-background-secondary p-6 border-[0.5px] border-text-secondary">
            <Text className="text-lg font-semibold text-text-primary">
              {t("settings.confirm_logout_title")}
            </Text>
            <Text className="text-sm text-text-secondary mt-2 text-center">
              {t("settings.confirm_logout_message")}
            </Text>

            <View className="flex-row justify-end mt-10 space-x-3 gap-4">
              <Pressable
                onPress={() => setLogoutModalVisible(false)}
                className="px-4 py-2 rounded-md border-[0.5px] border-text-secondary"
              >
                <Text className="text-text-secondary">
                  {t("common.cancel")}
                </Text>
              </Pressable>

              <Pressable className="px-4 py-2 rounded-md bg-primary">
                <Text className="text-background-secondary font-medium">
                  {t("settings.logout")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
