import { useI18n } from "@/lib/hooks/useI18n";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
//import { Text, View } from "react-native";
import useRoutineStore from "@/lib/stores/routineStore";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LiveWaitScreen() {
  const { t } = useI18n();
  const { routine } = useRoutineStore();
  const zustandState = JSON.stringify(routine, null, 2);
  return (
    <SafeAreaView className="flex-1 bg-background-primary justify-center">
      {/* <View className="flex-1 items-center justify-center px-6">
        <MaterialCommunityIcons
          name="television-off"
          size={120}
          color="#FFFF00"
          accessibilityLabel={t("accessibility.no_transmission_label")}
        />

        <Text className="mt-6 text-2xl font-semibold text-text-primary text-center">
          {t("blackboard_screen.no_transmission_message")}
        </Text>
      </View> */}
      <Text className="text-green-400">{zustandState}</Text>
    </SafeAreaView>
  );
}
