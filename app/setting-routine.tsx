import SettingExerciseCard from "@/components/SettingExerciseCard";
import { DATAFunctional } from "@/DATA/data";
import { useI18n } from "@/lib/hooks/useI18n";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SettingRoutineScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useI18n();

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="w-full flex-row items-center justify-around py-4">
        <Pressable className="ml-4" onPress={() => router.back()}>
          <ArrowLeftIcon color="#E7EBDA" size={22} />
        </Pressable>

        <TextInput
          className="bg-background-secondary pl-3 text-xl font-bold text-text-primary border-[0.5px] border-text-secondary rounded-md w-3/4"
          value="routineName"
        ></TextInput>
      </View>

      {/* Body: ScrollView for exercises */}
      <View className="flex-col px-3 pt-2">
        {/* component settings exercise card */}
        <FlatList
          data={DATAFunctional}
          renderItem={({ item }) => <SettingExerciseCard name={item.name} />}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Barra de acciones inferior fija */}
      <View
        style={{ paddingBottom: insets.bottom }}
        className="absolute left-0 right-0 bottom-0 px-4 py-3 border-t-[0.5px] border-text-secondary bg-background-primary"
      >
        <View className="flex-row justify-between items-center gap-3">
          <Pressable
            className="flex-1 rounded-md border border-primary px-4 py-3 items-center justify-center bg-transparent"
            accessibilityLabel={t("accessibility.go_back_to_list_label")}
            onPress={() => router.back()}
          >
            <Text className="text-primary text-base font-medium">
              {t("routines.settings_routine_screen.come_back_to_list")}
            </Text>
          </Pressable>

          <Pressable
            className="flex-1 rounded-md px-4 py-3 items-center justify-center bg-primary"
            accessibilityLabel={t("accessibility.save_routine_label")}
          >
            <Text className="font-semibold text-secondary text-base">
              {t("routines.settings_routine_screen.save_routine")}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
