import { DATAFunctional } from "@/DATA/data";
import ExerciseCard from "@/components/ExerciseCard";
import { useI18n } from "@/lib/hooks/useI18n";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function listOfExercises() {
  const { t } = useI18n();
  const [routineType, setRoutineType] = useState<"functional" | "bodybuilding">(
    "functional"
  );
  const [bodyPart, setBodyPart] = useState<
    "chest" | "back" | "legs" | "arms" | "abs"
  >("chest");
  return (
    <SafeAreaView>
      <View className="mt-2 px-2 w-full flex-col justify-center items-center">
        <Text className="text-text-primary font-semibold text-base mb-2">
          {t("routines.select_routine_type")}
        </Text>
        <View className="w-full flex-row justify-between ">
          <Pressable
            onPress={() => setRoutineType("functional")}
            className={`items-center justify-end w-1/2 flex-1 rounded-s-xl border-[0.5px] border-text-secondary ${
              routineType === "functional"
                ? "bg-secondary "
                : "bg-background-secondary"
            }`}
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
      <View
        className="w-full px-2 max-h-96"
        /*  style={{ paddingBottom: insets.bottom + 285 }} */
      >
        <View className="w-full border-[0.5px] border-text-secondary max-h-screen p-4 rounded-e-xl">
          <FlatList
            data={DATAFunctional}
            renderItem={({ item }) => <ExerciseCard name={item.name} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
