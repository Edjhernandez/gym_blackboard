import { DATAFunctional } from "@/DATA/data";
import ExerciseCard from "@/components/ExerciseCard";
import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { Exercise } from "@/types/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import {
  ArrowDownOnSquareIcon,
  ArrowPathRoundedSquareIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function listOfExercises() {
  const { routine, updateBlockById } = useRoutineStore();
  const { t } = useI18n();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [routineType, setRoutineType] = useState<"functional" | "bodybuilding">(
    "functional"
  );
  const [bodyPart, setBodyPart] = useState<
    "chest" | "back" | "legs" | "arms" | "abs"
  >("chest");
  const [selectedExercises, setSelectedExercises] = React.useState<Exercise[]>(
    []
  );

  const handleSave = () => {
    updateBlockById(params.blockId as string, selectedExercises);
    setSelectedExercises([]);
    router.push("/create-routine");
  };

  return (
    <SafeAreaView className="w-full bg-background-primary pt-4 flex-1">
      {/* exercises list */}
      <View className="mt-2 px-2 w-full flex-col justify-center items-center">
        <Text className="text-text-primary font-semibold text-xl mb-4">
          {t("routines.select_exercises")}
        </Text>
        <View className="w-full flex-row justify-between ">
          <Pressable
            onPress={() => setRoutineType("functional")}
            className={`items-center justify-end w-1/2 flex-1 rounded-s-xl border-[0.5px] border-text-secondary ${
              routineType === "functional"
                ? "bg-secondary "
                : "bg-background-secondary"
            }`}
            accessibilityRole="button"
            accessibilityState={{ selected: routineType === "functional" }}
          >
            <Text
              className={`text-base my-2 ${
                routineType === "functional"
                  ? "text-text-primary font-bold"
                  : "text-gray-600 font-semibold"
              }`}
            >
              {t("navigation.functional")}
            </Text>
            {routineType === "functional" ? (
              <View className="h-0.5 bg-primary mt-2 rounded-full w-full" />
            ) : (
              <View className="h-0.5 mt-2 w-16" />
            )}
          </Pressable>

          <Pressable
            onPress={() => setRoutineType("bodybuilding")}
            className={`items-center justify-end w-1/2 flex-1 rounded-s-xl border-[0.5px] border-text-secondary ${
              routineType === "bodybuilding"
                ? "bg-secondary "
                : "bg-background-secondary"
            }`}
            accessibilityRole="button"
            accessibilityState={{ selected: routineType === "bodybuilding" }}
          >
            <Text
              className={`text-base my-2 ${
                routineType === "bodybuilding"
                  ? "text-text-primary font-bold"
                  : "text-gray-600 font-semibold"
              }`}
            >
              {t("navigation.bodybuilding")}
            </Text>
            {routineType === "bodybuilding" ? (
              <View className="h-0.5 bg-primary mt-2 rounded-full w-full" />
            ) : (
              <View className="h-0.5 mt-2 w-20" />
            )}
          </Pressable>
        </View>
      </View>

      {/* horizontal tabs - bodyPart selectors */}
      <View className="w-full px-2">
        <View className="w-full border-[0.5px] border-text-secondary p-2">
          <View className="w-full flex-row justify-between ">
            {/* body part tabs */}
            {/*  Chest */}
            <Pressable
              onPress={() => setBodyPart("chest")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "chest"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: bodyPart === "chest" }}
              accessibilityLabel={t("accessibility.chest_body_part_label")}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "chest"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.chest")}
              </Text>
            </Pressable>

            {/*  Back */}
            <Pressable
              onPress={() => setBodyPart("back")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "back"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: bodyPart === "back" }}
              accessibilityLabel={t("accessibility.back_body_part_label")}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "back"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.back")}
              </Text>
            </Pressable>

            {/*  Legs */}
            <Pressable
              onPress={() => setBodyPart("legs")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "legs"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: bodyPart === "legs" }}
              accessibilityLabel={t("accessibility.legs_body_part_label")}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "legs"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.legs")}
              </Text>
            </Pressable>

            {/*  Arms */}
            <Pressable
              onPress={() => setBodyPart("arms")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "arms"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: bodyPart === "arms" }}
              accessibilityLabel={t("accessibility.arms_body_part_label")}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "arms"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.arms")}
              </Text>
            </Pressable>

            {/*  Abs */}
            <Pressable
              onPress={() => setBodyPart("abs")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "abs"
                  ? "border-[0.5px] border-text-secondary"
                  : "border-0"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: bodyPart === "abs" }}
              accessibilityLabel={t("accessibility.abs_body_part_label")}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "abs"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.abs")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Exercise list */}
      <View className="w-full px-2">
        <View className="w-full border-[0.5px] border-text-secondary max-h-screen p-4 rounded-e-xl">
          <FlatList
            data={DATAFunctional}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                isSelected={selectedExercises.some((ex) => ex.id === item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>

      {/* footer */}
      <View className="w-full flex-col items-center bg-background-primary mt-3">
        {/* selected exercises count */}
        <View className="w-full flex-row justify-center gap-4">
          <Text className="text-text-primary font-bold">
            {selectedExercises.length}
          </Text>
          <Text className="text-text-secondary">
            {t("warmup_exercises.selected_exercises")}
          </Text>
        </View>

        {/* Buttons for save and reset */}
        <View className="w-full flex-row items-center justify-center mt-4 px-6 gap-3 mb-2">
          <Pressable
            className="w-1/2 flex-row items-center justify-center bg-transparent border border-primary px-4 py-3 rounded-md gap-3"
            accessibilityLabel={t("accessibility.reset_label")}
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
