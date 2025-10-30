import { useI18n } from "@/lib/hooks/useI18n";
import { router } from "expo-router";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";

export default function RecoveryErrorScreen() {
  const { t } = useI18n();

  const handleGoBack = () => {
    // Navigate back to the previous screen (forgot-password)
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback to login if there's no history
      router.replace("/login");
    }
  };

  const handleContactSupport = () => {
    Linking.openURL("mailto:soporte@example.com");
  };

  return (
    <View className="flex-1 bg-[#181818] px-6 justify-center items-center">
      {/* Warning Icon */}
      <View className="w-24 h-24 bg-yellow-400 rounded-full items-center justify-center border-2 border-black mb-6">
        <ExclamationCircleIcon size={48} className="text-black text-6xl" />
      </View>

      {/* Title */}
      <Text className="text-yellow-400 text-3xl font-bold text-center mb-4">
        {t("login.recovery_error_screen.title")}
      </Text>

      {/* Message */}
      <Text className="text-white text-center text-base mb-4">
        {t("login.recovery_error_screen.message")}
      </Text>

      {/* Support Contact */}
      <View className="flex-row items-center">
        <Text className="text-gray-300 text-center text-base">
          {t("login.recovery_error_screen.contact_support")}:{" "}
        </Text>
        <Pressable onPress={handleContactSupport}>
          <Text className="text-yellow-400 underline">soporte@example.com</Text>
        </Pressable>
      </View>

      {/* Back Button */}
      <Pressable
        onPress={handleGoBack}
        className="w-full bg-yellow-400 rounded-xl py-4 items-center justify-center mt-10"
      >
        <Text className="text-black font-bold text-lg">
          {t("login.recovery_error_screen.back_to_login")}
        </Text>
      </Pressable>
    </View>
  );
}
