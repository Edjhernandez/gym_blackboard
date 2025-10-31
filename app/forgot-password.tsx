import { useI18n } from "@/lib/hooks/useI18n";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const onSendLink = () => {
    // Simulate a failure and navigate to the error screen
    console.log("Simulating failed recovery for:", email);
    router.push("/recovery-error");
  };

  return (
    <View className="flex-1 bg-background-primary px-6 justify-center">
      <Text className="text-text-primary text-4xl font-bold text-center mb-4">
        {t("login.forgot_password_screen.title")}
      </Text>

      <Text className="text-text-primary text-center mb-8">
        {t("login.forgot_password_screen.instruction")}
      </Text>

      <View className="mb-4">
        <Text className="text-text-secondary mb-2">
          {t("login.forgot_password_screen.email_input")}
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t("login.forgot_password_screen.email_placeholder")}
          placeholderTextColor="#595959"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-background-secondary text-text-primary px-4 py-3 rounded-lg border border-primary"
        />
      </View>

      <Pressable
        onPress={onSendLink}
        className="w-full bg-primary rounded-xl py-4 items-center justify-center mt-4"
      >
        <Text className="text-secondary font-bold">
          {t("login.forgot_password_screen.submit_button")}
        </Text>
      </Pressable>

      <Link href="/login" asChild>
        <Pressable className="mt-6 items-center">
          <Text className="text-text-secondary underline">
            {t("login.forgot_password_screen.back_to_login")}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
