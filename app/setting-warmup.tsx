import AlertPopUp from "@/components/AlertPopUp";
import BlockRoundsCard from "@/components/BlockRoundsCard";
import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { Exercise } from "@/types/types";
import { useRouter } from "expo-router";
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
import SettingWarmupExerciseCard from "../components/SettingWarmupExerciseCard";
import { hasInvalidRepsInput } from "../utils/validationInput";

export default function SettingWarmup() {
  const { t } = useI18n();
  const router = useRouter();
  const { routine, setWarmup } = useRoutineStore();
  const [selectedExercises, setSelectedExercises] = React.useState<Exercise[]>(
    routine.warmup.exercises,
  );
  const [visibleAlertInvalidInput, setVisibleAlertInvalidInput] =
    React.useState(false);
  const [visibleAlertEmptyExercises, setVisibleAlertEmptyExercises] =
    React.useState(false);
  const [warmupRounds, setWarmupRounds] = React.useState<number>(
    routine.warmup.rounds || 1,
  );

  useEffect(() => {
    setSelectedExercises(routine.warmup.exercises);
    setWarmupRounds(routine.warmup.rounds || 1);
  }, [routine.warmup]);

  const handleSave = () => {
    const isThereAnyInvalidRepsIntoWarmup =
      hasInvalidRepsInput(selectedExercises);

    //validate warmup exercises is not empty
    if (selectedExercises.length === 0) {
      setVisibleAlertEmptyExercises(true);
      return;
      //validate any sets or reps is invalid
    } else if (isThereAnyInvalidRepsIntoWarmup) {
      setVisibleAlertInvalidInput(true);
      return;
    } else {
      setWarmup({ exercises: selectedExercises, rounds: warmupRounds });
      router.push("/setting-routine");
      setSelectedExercises([]);
    }
  };

  const handleGoBackToTheList = () => {
    setWarmup({ exercises: selectedExercises, rounds: warmupRounds });
    setSelectedExercises([]);
    router.push({
      pathname: "/warmUpExercises",
      params: { origin: "warmupSettings" },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary px-3">
      {/* Header */}
      <View className="w-full p-4 flex-row items-center justify-around border-b border-primary mb-4">
        <Text className="text-text-primary font-semibold text-xl text-center">
          {t("routines.settings_routine_screen.warmup_settings")}
        </Text>
      </View>

      {/* Block Rounds Card */}
      <BlockRoundsCard rounds={warmupRounds} setBlockRounds={setWarmupRounds} />

      {/* Exercises List */}
      <KeyboardAvoidingView className="flex-1 pt-2" behavior="padding">
        <FlatList
          data={selectedExercises}
          renderItem={({ item }) => (
            <SettingWarmupExerciseCard
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
      {/* Alert PopUp for empty warmup exercises */}
      <AlertPopUp
        visible={visibleAlertEmptyExercises}
        alertTitle={t("alerts.error")}
        alertDetails={t("alerts.empty_warmup_exercises")}
        setVisible={setVisibleAlertEmptyExercises}
      />
      {/* Alert PopUp for invalid input */}
      <AlertPopUp
        visible={visibleAlertInvalidInput}
        alertTitle={t("alerts.error")}
        alertDetails={t("alerts.invalid_input_error")}
        setVisible={setVisibleAlertInvalidInput}
      />
    </SafeAreaView>
  );
}
