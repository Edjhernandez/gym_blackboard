import AlertPopUp from "@/components/AlertPopUp";
import CategorySegmentedControl from "@/components/CategorySegmentedControl";
import SettingButton from "@/components/SettingButton";
import { useCategorySelector } from "@/lib/hooks/useChangeCategory";
import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { calculateTotalExercises } from "@/utils/amountOfExercises";
import { estimateRoutineDuration } from "@/utils/routineTime";
import { saveNewRoutine } from "@/utils/saveRoutineInDB";
import { hasInvalidSetsOrRepsInput } from "@/utils/validationInput";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SettingRoutineScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useI18n();
  const {
    routine,
    setName,
    resetRoutine,
    setCategory,
    setExercisesAmount,
    setDurationMinutes,
  } = useRoutineStore();
  const [visibleAlertEmptyName, setVisibleAlertEmptyName] = useState(false);
  const [visibleAlertEmptyInput, setVisibleAlertEmptyInput] = useState(false);
  const [routineCategory, setRoutineCategory] = useState<
    "functional" | "bodybuilding"
  >(routine.category || "functional");

  const handleDiscard = () => {
    resetRoutine(); // Reset routine store to initial state
    router.push("/(tabs)/home"); // Navigate back to home
  };

  const handleSave = () => {
    //validate any sets or reps is invalid into warmup
    const isThereAnyInvalidSetsOrRepsIntoWarmup = hasInvalidSetsOrRepsInput(
      routine.warmup
    );
    //validate any sets or reps is invalid into blocks
    const isThereAnyInvalidSetsOrRepsIntoBlocks = hasInvalidSetsOrRepsInput(
      routine.blocks.flatMap((block) => block.exercises)
    );

    //validate name is not empty and only letters and spaces
    if (
      routine.name.trim() === "" ||
      !/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(routine.name)
    ) {
      setVisibleAlertEmptyName(true);
    } else if (
      isThereAnyInvalidSetsOrRepsIntoWarmup ||
      isThereAnyInvalidSetsOrRepsIntoBlocks
    ) {
      //validate any sets or reps is invalid
      setVisibleAlertEmptyInput(true);
    } else {
      // Here save the routine to persistent storage or backend
      setExercisesAmount(calculateTotalExercises(routine.blocks));
      setDurationMinutes(estimateRoutineDuration(routine));
      //router.push("/(tabs)/blackboard");
      saveNewRoutine(routine)
        .then(() => {
          resetRoutine(); // Reset routine store to initial state
          router.push("/(tabs)/home"); // Navigate back to home
        })
        .catch((error) => {
          console.error("Error saving routine:", error);
          // Optionally show an error alert to the user
        });
    }
  };

  const handleCategoryChange = useCategorySelector(
    setCategory,
    setRoutineCategory
  );

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="w-full flex-col items-center mt-4 border-b-[0.5px] border-secondary">
        <Text className="text-text-primary text-xl font-semibold">
          {t("routines.settings_routine_screen.title")}
        </Text>
        <View className="w-full flex-col items-center justify-center py-2 border-t-[0.5px] border-secondary mt-2">
          <TextInput
            className="bg-background-secondary pl-3 text-xl font-bold text-text-primary border-[0.5px] border-text-secondary rounded-md w-3/4"
            value={routine.name}
            onChangeText={(text) => setName(text)}
          ></TextInput>
          <Text className="text-text-secondary text-sm mt-2">
            {t("routines.name")}
          </Text>
        </View>
      </View>

      {/* Routine category selection */}
      <CategorySegmentedControl
        routineCategory={routineCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <View className="w-full flex-col justify-center items-center">
        {/* Navigate to Warmup Settings Screen, this is static */}
        <Pressable
          onPress={() => router.push("/setting-warmup")}
          accessibilityRole="button"
          accessibilityLabel={t("accessibility.warmup_label")}
          className="w-full border-y-[0.5px] border-secondary py-5"
        >
          <Text className="text-text-primary text-xl font-bold my-3 text-center">
            {t("routines.warmup")}
          </Text>
        </Pressable>

        {/* Navigate to Blocks Settings Screen */}
        <FlatList
          data={routine.blocks}
          renderItem={({ item }) => (
            <SettingButton title={item.title} id={item.id} />
          )}
          className="w-full"
          style={{ paddingBlockEnd: 1 }}
        />
      </View>

      {/* save or delete buttons */}
      <View
        style={{ paddingBottom: insets.bottom }}
        className="absolute left-0 right-0 bottom-0 px-4 py-3 border-t-[0.5px] border-text-secondary bg-background-primary"
      >
        <View className="flex-row justify-between items-center gap-3">
          <Pressable
            className="flex-1 rounded-md border border-primary px-4 py-3 items-center justify-center bg-transparent"
            accessibilityLabel={t("accessibility.discard_label")}
            onPress={handleDiscard}
          >
            <Text className="text-primary text-base font-medium">
              {t("routines.settings_routine_screen.discard_routine")}
            </Text>
          </Pressable>

          <Pressable
            className="flex-1 rounded-md px-4 py-3 items-center justify-center bg-primary"
            accessibilityLabel={t("accessibility.save_routine_label")}
            onPress={handleSave}
          >
            <Text className="font-semibold text-secondary text-base">
              {t("routines.settings_routine_screen.save_routine")}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Alert PopUp for empty routine name */}
      <AlertPopUp
        visible={visibleAlertEmptyName}
        alertTitle={t("alerts.error")}
        alertDetails={t("alerts.empty_name_error")}
        setVisible={setVisibleAlertEmptyName}
      />

      {/* Alert PopUp for empty input */}
      <AlertPopUp
        visible={visibleAlertEmptyInput}
        alertTitle={t("alerts.error")}
        alertDetails={t("alerts.invalid_input_error")}
        setVisible={setVisibleAlertEmptyInput}
      />
    </SafeAreaView>
  );
}
