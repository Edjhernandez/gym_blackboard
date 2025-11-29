import { Exercise } from "@/types/types";
import React from "react";
import { Pressable, Text } from "react-native";
import { CheckIcon, MinusIcon } from "react-native-heroicons/outline";

type TypeExerciseCardProps = {
  exercise: Exercise;
  isSelected: boolean;
  onToggleSelect: () => void;
};

export default function ExerciseCard(props: TypeExerciseCardProps) {
  const { exercise, isSelected, onToggleSelect } = props;

  return (
    <Pressable
      className={`w-full p-3 rounded-xl overflow-hidden my-2 flex-row justify-start items-center  ${isSelected ? "bg-secondary" : "bg-background-secondary"}`}
      onPress={onToggleSelect}
    >
      {isSelected ? (
        <CheckIcon size={24} color="#34D399" />
      ) : (
        <MinusIcon size={24} color="#6B7280" />
      )}
      <Text
        className={`text-lg ml-3 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90%] ${isSelected ? "text-text-primary font-semibold" : "text-text-secondary font-normal"}`}
        numberOfLines={1}
      >
        {exercise.name}
      </Text>
    </Pressable>
  );
}
