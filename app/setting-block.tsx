import SettingExerciseCard from "@/components/SettingExerciseCard";
import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { Exercise } from "@/types/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  ArrowDownOnSquareIcon,
  ArrowPathRoundedSquareIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingBlock() {
  const { t } = useI18n();
  const router = useRouter();
  const { routine, updateBlockById } = useRoutineStore();
  const params = useLocalSearchParams();
  const blockIndex = Number(params.blockIndex as string);
  const currentBlock = routine.blocks[blockIndex];

  const [selectedExercises, setSelectedExercises] = React.useState<Exercise[]>(
    currentBlock?.exercises || []
  );

  useEffect(() => {
    if (currentBlock) {
      setSelectedExercises(currentBlock.exercises);
    } else {
      setSelectedExercises([]);
    }
  }, [currentBlock]);

  const handleSave = () => {
    updateBlockById(currentBlock.id as string, selectedExercises);
    router.push("/setting-routine");
    setSelectedExercises([]);
  };

  const handleGoBackToTheList = () => {
    updateBlockById(currentBlock.id as string, selectedExercises);
    router.push({
      pathname: "/listOfExercises",
      params: { origin: "/setting-block", blockIndex: blockIndex },
    });
    setSelectedExercises([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="w-full p-4 flex-row items-center justify-around">
        <Text className="text-text-primary font-semibold text-xl text-center">
          {t("routines.setting_block", {
            title: currentBlock?.title,
          })}
        </Text>
      </View>

      {/* Exercises List */}
      <KeyboardAvoidingView className="flex-1 px-3 pt-2" behavior="padding">
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
      </KeyboardAvoidingView>

      <View className="w-full flex-row items-center justify-center mt-4 px-6 gap-3 mb-2">
        <Pressable
          className="w-1/2 flex-row items-center justify-center bg-transparent border border-primary px-4 py-3 rounded-md gap-3"
          accessibilityLabel={t("accessibility.reset_label")}
          onPress={handleGoBackToTheList}
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
  );
}
