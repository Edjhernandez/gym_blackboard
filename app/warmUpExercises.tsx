import { DATAWarmUp } from "@/DATA/data";
import ExerciseCard from "@/components/ExerciseCard";
import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { Exercise } from "@/types/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import {
  ArrowDownOnSquareIcon,
  ArrowPathRoundedSquareIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WarmUpExercises() {
  const { routine, setWarmup } = useRoutineStore();
  const { t } = useI18n();
  const router = useRouter();
  const [selectedExercises, setSelectedExercises] = React.useState<Exercise[]>(
    routine.warmup
  );
  const params = useLocalSearchParams();

  useEffect(() => {
    setSelectedExercises(routine.warmup);
  }, [routine.warmup]);

  const handleSave = () => {
    setWarmup(selectedExercises);
    setSelectedExercises([]);
    if (params.origin === "warmupSettings") {
      router.back();
    } else {
      router.push("/create-routine");
    }
  };

  const handleReset = () => {
    setSelectedExercises([]);
  };

  return (
    <SafeAreaView className="flex-1 w-full bg-background-primary flex-col items-center pt-8">
      {/* Header */}
      <View className="w-full flex-row justify-around py-1 items-center px-6 mb-2">
        <Text className="text-text-primary text-xl font-semibold ml-2">
          {t("warmup_exercises.title")}
        </Text>
      </View>

      {/* Exercise List */}
      <View className="w-11/12 px-4 py-2 border-[0.5px] border-text-secondary rounded-lg flex-1">
        <FlatList
          data={DATAWarmUp}
          renderItem={({ item }) => (
            <ExerciseCard
              exercise={item}
              setSelectedExercises={setSelectedExercises}
              isSelected={selectedExercises.some((ex) => ex.id === item.id)}
              selectedExercises={selectedExercises}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* number of selected exercises */}
      <View className="w-full flex-col items-center bg-background-primary mt-3">
        <View className="w-full flex-row justify-center gap-4">
          <Text className="text-text-primary font-bold">
            {selectedExercises.length}
          </Text>
          <Text className="text-text-secondary">
            {t("warmup_exercises.selected_exercises")}
          </Text>
        </View>
        <View className="w-full flex-row items-center justify-center mt-4 px-6 gap-3 mb-2">
          <Pressable
            className="w-1/2 flex-row items-center justify-center bg-transparent border border-primary px-4 py-3 rounded-md gap-3"
            accessibilityLabel={t("accessibility.reset_label")}
            onPress={handleReset}
          >
            <ArrowPathRoundedSquareIcon size={24} color={"#FFFF00"} />
            <Text className="text-primary text-base font-semibold">
              {t("common.reset")}
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
      </View>
    </SafeAreaView>
  );
}
