import InvalidCredentialsModal from "@/components/InvalidCredentialsModal";
import { images } from "@/constants/images";
import { useI18n } from "@/lib/hooks/useI18n";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const onSubmit = async () => {
    // TODO: replace this stub with real auth (Firebase / Supabase) integration
    setLoading(true);

    try {
      router.push("/(tabs)/home");
      console.log("Signin with", { email, password }); // await signInWithEmail(email, password)
      //throw new Error("Invalid credentials"); // Simulate invalid credentials error
    } catch (err) {
      //console.error(err);
      setIsErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    // TODO: implement Google sign-in flow (Expo AuthSession / Firebase)
    //console.log("Google signin (stub)");
    setLoading(false);
  };

  const handleRecover = () => {
    setIsErrorModalVisible(false);
    // Navigate to password recovery screen or implement logic
    router.push("/forgot-password");
    console.log("Recover password");
  };

  const handleRetry = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <View className="flex-1 bg-[#1E1E1E] px-6 justify-center">
      {/* <Stack.Screen options={{ headerShown: false }} /> */}

      <View className="items-center mb-8">
        <View className="w-20 h-20 rounded-lg bg-[#545C4B] items-center justify-center">
          {/* Placeholder for logo - replace with Image if you have an asset */}
          <Text className="text-white font-bold">{t("common.logo")}</Text>
        </View>
      </View>

      <Text className="text-white text-4xl font-bold mb-6">
        {t("login.welcome")}
      </Text>

      <View className="mb-4">
        <Text className="text-gray-300 mb-2">{t("login.email")}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t("login.enter_your_email")}
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-[#181818] text-white px-4 py-3 rounded-lg"
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-300 mb-2">{t("login.password")}</Text>
        <View className="flex-row items-center bg-[#181818] rounded-lg px-4">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={t("login.enter_your_password")}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="flex-1 text-white py-3"
          />
          <TouchableOpacity
            accessibilityLabel={
              showPassword
                ? t("accessibility.hide_password_label")
                : t("accessibility.show_password_label")
            }
            onPress={() => setShowPassword(!showPassword)}
            className="p-2"
          >
            <Text className="text-gray-300">
              {showPassword
                ? t("login.hide_password")
                : t("login.show_password")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        onPress={onSubmit}
        disabled={loading}
        className="w-full bg-[#FDE047] rounded-xl py-4 items-center justify-center mt-2"
      >
        <Text className="text-black font-bold">{t("login.submit")}</Text>
      </Pressable>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-700" />
        <Text className="text-gray-400 mx-3">O</Text>
        <View className="flex-1 h-px bg-gray-700" />
      </View>

      <Pressable
        onPress={onGoogle}
        className="w-full bg-[#0F1724] border border-gray-700 rounded-xl py-3 flex-row items-center justify-center"
      >
        <Image
          source={images.google}
          style={{
            width: 60,
            height: 20,
          }}
        />
      </Pressable>

      <Link href="/forgot-password" asChild>
        <Pressable className="mt-6 items-center">
          <Text className="text-indigo-400">{t("login.forgot_password")}</Text>
        </Pressable>
      </Link>

      {/* Bottom padding to avoid being too close to device bottom */}
      <View style={{ height: 40 }} />
      <InvalidCredentialsModal
        visible={isErrorModalVisible}
        onRecover={handleRecover}
        onRetry={handleRetry}
      />
    </View>
  );
}
