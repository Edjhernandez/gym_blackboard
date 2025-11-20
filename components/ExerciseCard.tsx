import { Exercise } from "@/types/types";
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { CheckIcon, MinusIcon } from "react-native-heroicons/outline";

type TypeExerciseCardProps = {
  exercise: Exercise;
  setSelectedExercises?: React.Dispatch<React.SetStateAction<any[]>>;
  isSelected: boolean;
  selectedExercises: Exercise[];
};

export default function ExerciseCard(props: TypeExerciseCardProps) {
  const { exercise, setSelectedExercises, isSelected, selectedExercises } =
    props;
  const [isChecked, setIsChecked] = React.useState(isSelected);

  const isAlreadyAdded = selectedExercises.some(
    (item) => item.id === exercise.id
  );

  useEffect(() => {
    if (isChecked) {
      if (!isAlreadyAdded) {
        setSelectedExercises?.((prev) => [...prev, exercise]);
      }
    } else {
      if (isAlreadyAdded) {
        setSelectedExercises?.((prev) =>
          prev.filter((item) => item.name !== exercise.name)
        );
      }
    }
  }, [isChecked]);

  return (
    <Pressable
      className={`w-full p-3 rounded-xl overflow-hidden my-2 flex-row justify-start items-center  ${isChecked ? "bg-secondary" : "bg-background-secondary"}`}
      onPress={() => setIsChecked(!isChecked)}
    >
      {isChecked ? (
        <CheckIcon size={24} color="#34D399" />
      ) : (
        <MinusIcon size={24} color="#6B7280" />
      )}
      <Text
        className={`text-lg ml-3 ${isChecked ? "text-text-primary font-semibold" : "text-text-secondary font-normal"}`}
      >
        {exercise.name}
      </Text>
    </Pressable>
  );
}
