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
      //router.push("/(tabs)/home");
      console.log("Signin with", { email, password }); // await signInWithEmail(email, password)
      throw new Error("Invalid credentials"); // Simulate invalid credentials error
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
    <View className="flex-1 bg-background-primary px-6 justify-center">
      {/* <Stack.Screen options={{ headerShown: false }} /> */}

      <View className="items-center mb-8">
        <View className="w-20 h-20 rounded-lg bg-background-primary items-center justify-center">
          {/* Placeholder for logo - replace with Image if you have an asset */}
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={images.logo180}
          />
        </View>
      </View>

      <Text className="text-text-primary text-4xl font-bold mb-6">
        {t("login.welcome")}
      </Text>

      <View className="mb-4">
        <Text className="text-text-primary mb-2">{t("login.email")}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t("login.enter_your_email")}
          placeholderTextColor="#595959"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-background-secondary text-text-primary px-4 py-3 rounded-lg"
        />
      </View>

      <View className="mb-4">
        <Text className="text-text-primary mb-2">{t("login.password")}</Text>
        <View className="flex-row items-center bg-background-secondary rounded-lg px-4">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={t("login.enter_your_password")}
            placeholderTextColor="#595959"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="flex-1 text-text-primary py-3"
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
            <Text className="text-text-secondary">
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
        className="w-full bg-primary rounded-xl py-4 items-center justify-center mt-2"
      >
        <Text className="text-secondary font-bold">{t("login.submit")}</Text>
      </Pressable>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-background-secondary" />
        <Text className="text-text-secondary mx-3">{t("login.or")}</Text>
        <View className="flex-1 h-px bg-background-secondary" />
      </View>

      <Pressable
        onPress={onGoogle}
        className="w-full bg-background-primary border border-secondary rounded-xl py-3 flex-row items-center justify-center"
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
          <Text className="text-text-secondary underline">
            {t("login.forgot_password")}
          </Text>
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
