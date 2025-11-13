import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  title?: string;
  subtitle?: string;
  iconSize?: number;
  accentColor?: string;
  // si lo usas con expo-router, puedes aceptar params aquí si lo exportas como screen
};

export default function LiveWaitScreen({
  title = "Aún no se ha iniciado la transmisión",
  subtitle = "Cuando el coach inicie una transmisión, la verás aquí en tiempo real.",
  iconSize = 120,
  accentColor = "#F59E0B", // amarillo/dorado (ajusta al tono del proyecto)
}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center px-6">
        <MaterialCommunityIcons
          name="television-off"
          size={iconSize}
          color={accentColor}
          accessibilityLabel="Icono: transmisión no iniciada"
        />

        <Text className="mt-6 text-2xl font-semibold text-white text-center">
          {title}
        </Text>

        <Text className="mt-3 text-base text-gray-300 text-center">
          {subtitle}
        </Text>
      </View>
    </SafeAreaView>
  );
}
