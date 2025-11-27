import { useI18n } from "@/lib/hooks/useI18n";
import { Exercise } from "@/types/types";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { TrashIcon, XMarkIcon } from "react-native-heroicons/outline";

type TypeSettingExerciseCardProps = {
  exercise: Exercise;
  selectedExercises: Exercise[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

export default function SettingExerciseCard(
  props: TypeSettingExerciseCardProps
) {
  const { exercise, setSelectedExercises, selectedExercises } = props;
  const { t } = useI18n();
  const index = selectedExercises.findIndex((item) => exercise.id === item.id);
  const [setsInput, setSetsInput] = React.useState<string>(
    selectedExercises[index]?.sets?.toString() || ""
  );
  const [repsInput, setRepsInput] = React.useState<string>(
    selectedExercises[index]?.reps?.toString() || ""
  );

  const handleDelete = () => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((ex) => ex.id !== exercise.id)
    );
  };

  const searchIndex = (id: string) => {
    return selectedExercises.findIndex((exercise) => exercise.id === id);
  };

  const downPosition = (id: string, array: Exercise[]) => {
    const newArray = [...array];
    const index = searchIndex(id.toString());
    if (index >= newArray.length - 1) return;
    const itemToMove = newArray[index];
    newArray.splice(index, 1);
    newArray.splice(index + 1, 0, itemToMove);
    setSelectedExercises(newArray);
  };

  const upPosition = (id: string, array: Exercise[]) => {
    const newArray = [...array];
    const index = searchIndex(id.toString());
    const itemToMove = newArray[index];
    newArray.splice(index, 1);
    newArray.splice(index - 1, 0, itemToMove);
    setSelectedExercises(newArray);
  };

  useEffect(() => {
    const newArray = [...selectedExercises];
    const index = searchIndex(exercise.id);

    const updatedExercise = {
      ...newArray[index],
      sets: parseInt(setsInput, 10),
    };

    newArray[index] = updatedExercise;
    setSelectedExercises(newArray);
  }, [setsInput]);

  useEffect(() => {
    const newArray = [...selectedExercises];
    const index = searchIndex(exercise.id);

    const updatedExercise = {
      ...newArray[index],
      reps: parseInt(repsInput, 10),
    };

    newArray[index] = updatedExercise;
    setSelectedExercises(newArray);
  }, [repsInput]);

  return (
    <View className="w-full bg-background-secondary rounded-xl p-3 mb-3 shadow-sm flex-row justify-between items-center">
      <View className="flex-1 mr-4">
        <View className="flex-row items-center justify-between">
          <Text
            className="font-semibold text-text-primary text-lg bg-background-primary w-3/4 p-2 rounded-lg"
            numberOfLines={1}
          >
            {exercise.name}
          </Text>
          <Pressable
            className="flex bg-background-primary w-11 h-11 rounded-lg items-center justify-center"
            onPress={handleDelete}
          >
            <TrashIcon color="#E7EBDA" size={24} />
          </Pressable>
        </View>

        <View className="w-full flex-row mt-1 items-center justify-center gap-4">
          {/* Series input */}
          <View className="flex-1">
            <Text className="text-xs text-text-secondary mb-1">
              {t("routines.settings_routine_screen.sets")}
            </Text>
            <TextInput
              value={setsInput}
              onChangeText={(text) => setSetsInput(text)}
              keyboardType="number-pad"
              placeholder={t("common.example_sets_placeholder")}
              className="px-3 py-2 border border-secondary rounded-md bg-background-primary text-text-primary"
              placeholderTextColor="#a8a29e"
              returnKeyType="done"
            />
          </View>

          <View className="mt-4">
            <XMarkIcon color="#a8a29e" size={32} />
          </View>

          {/* Reps input */}
          <View className="flex-1">
            <Text className="text-xs text-text-secondary mb-1">
              {t("routines.settings_routine_screen.reps")}
            </Text>
            <TextInput
              value={repsInput}
              onChangeText={(text) => setRepsInput(text)}
              keyboardType="number-pad"
              placeholder={t("common.example_reps_placeholder")}
              className="px-3 py-2 border border-secondary rounded-md bg-background-primary text-text-primary"
              placeholderTextColor="#a8a29e"
              returnKeyType="done"
            />
          </View>
        </View>
      </View>
      <View className="w-11 flex-col items-end gap-4">
        <Pressable
          className="bg-background-primary rounded-md w-11 h-11 flex justify-center items-center"
          onPress={() => upPosition(exercise.id, selectedExercises)}
          disabled={searchIndex(exercise.id) === 0}
        >
          <Entypo
            name="chevron-with-circle-up"
            size={30}
            color={searchIndex(exercise.id) === 0 ? "#595959" : "#E7EBDA"}
          />
        </Pressable>
        <Pressable
          className="bg-background-primary rounded-md w-11 h-11 flex justify-center items-center"
          onPress={() => downPosition(exercise.id, selectedExercises)}
          disabled={searchIndex(exercise.id) === selectedExercises.length - 1}
        >
          <Entypo
            name="chevron-with-circle-down"
            size={30}
            color={
              searchIndex(exercise.id) === selectedExercises.length - 1
                ? "#595959"
                : "#E7EBDA"
            }
          />
        </Pressable>
      </View>
    </View>
  );
}
