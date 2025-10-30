import { useI18n } from "@/lib/hooks/useI18n";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const onSendLink = () => {
    // TODO: Implement logic to send password recovery link
    console.log("Sending recovery link to:", email);
  };

  return (
    <View className="flex-1 bg-[#181818] px-6 justify-center">
      <Text className="text-white text-4xl font-bold text-center mb-4">
        {t("login.forgot_password_screen.title")}
      </Text>

      <Text className="text-gray-300 text-center mb-8">
        {t("login.forgot_password_screen.instruction")}
      </Text>

      <View className="mb-4">
        <Text className="text-gray-300 mb-2">
          {t("login.forgot_password_screen.email_input")}
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t("login.forgot_password_screen.email_placeholder")}
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-[#1E1E1E] text-white px-4 py-3 rounded-lg border border-yellow-400"
        />
      </View>

      <Pressable
        onPress={onSendLink}
        className="w-full bg-yellow-400 rounded-xl py-4 items-center justify-center mt-4"
      >
        <Text className="text-black font-bold">
          {t("login.forgot_password_screen.submit_button")}
        </Text>
      </Pressable>

      <Link href="/login" asChild>
        <Pressable className="mt-6 items-center">
          <Text className="text-yellow-400">
            {t("login.forgot_password_screen.back_to_login")}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
