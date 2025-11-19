import SettingExerciseCard from "@/components/SettingExerciseCard";
import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { Exercise } from "@/types/types";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowDownOnSquareIcon,
  ArrowLeftIcon,
  ArrowPathRoundedSquareIcon,
} from "react-native-heroicons/outline";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SettingRoutineScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useI18n();
  const { routine, setName, setWarmup } = useRoutineStore();
  const [openWarmupSettings, setOpenWarmupSettings] = React.useState(false);
  const [selectedExercises, setSelectedExercises] = React.useState<Exercise[]>(
    routine.warmup
  );

  const handleSave = () => {
    setOpenWarmupSettings(false);
    setWarmup(selectedExercises);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="w-full flex-col items-center mt-4">
        <Text className="text-text-primary text-xl font-semibold">
          {t("routines.settings_routine_screen.title")}
        </Text>
        <View className="w-full flex-row items-center justify-around py-4">
          <Pressable
            className="ml-4"
            onPress={() => router.back()}
            accessibilityLabel={t("accessibility.go_back_label")}
          >
            <ArrowLeftIcon color="#E7EBDA" size={22} />
          </Pressable>

          <TextInput
            className="bg-background-secondary pl-3 text-xl font-bold text-text-primary border-[0.5px] border-text-secondary rounded-md w-3/4"
            value={routine.name}
            onChangeText={(text) => setName(text)}
          ></TextInput>
        </View>
      </View>

      <View className="w-full flex-col justify-center items-center border-y-[0.5px] border-secondary py-5">
        <Pressable
          onPress={() => setOpenWarmupSettings(!openWarmupSettings)}
          accessibilityRole="button"
          accessibilityLabel={t("accessibility.warmup_label")}
        >
          <Text className="text-text-primary text-xl font-bold mt-4 mb-2">
            Calentamiento
          </Text>
        </Pressable>

        {/* Modal for warmup settings */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={openWarmupSettings}
        >
          <SafeAreaView className="flex-1 bg-background-primary">
            {/* Header */}
            <View className="w-full p-4 flex-row items-center justify-around">
              <Text className="text-text-primary font-semibold text-xl text-center">
                {t("routines.settings_routine_screen.warmup_settings")}
              </Text>
            </View>
            <View className="flex-1 px-3 pt-2">
              <FlatList
                data={selectedExercises}
                renderItem={({ item }) => (
                  <SettingExerciseCard
                    exercise={item}
                    setSelectedExercises={setSelectedExercises}
                    selectedExercises={selectedExercises}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>

            <View className="w-full flex-row items-center justify-center mt-4 px-6 gap-3 mb-2">
              <Pressable
                className="w-1/2 flex-row items-center justify-center bg-transparent border border-primary px-4 py-3 rounded-md gap-3"
                accessibilityLabel={t("accessibility.reset_label")}
                onPress={() => router.push("/warmUpExercises")}
              >
                <ArrowPathRoundedSquareIcon size={24} color={"#FFFF00"} />
                <Text className="text-primary text-base font-semibold">
                  {t("routines.settings_routine_screen.come_back_to_list")}
                </Text>
              </Pressable>
              <Pressable
                className="w-1/2 flex-row items-center justify-center bg-primary px-4 py-3 rounded-md gap-3"
                onPress={handleSave}
                accessibilityLabel={t("accessibility.save_label")}
              >
                <Text className="text-secondary text-base font-semibold">
                  {t("common.save")}
                </Text>
                <ArrowDownOnSquareIcon size={24} color={"#595959"} />
              </Pressable>
            </View>
          </SafeAreaView>
        </Modal>
      </View>

      {/* save or delete buttons */}
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
              {t("routines.settings_routine_screen.discard_routine")}
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
