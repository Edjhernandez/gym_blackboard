import { Exercise } from "@/types/types";
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { CheckIcon, MinusIcon } from "react-native-heroicons/outline";

type TypeExerciseCardProps = {
  exercise: Exercise;
  setSelectedExercises?: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function ExerciseCard(props: TypeExerciseCardProps) {
  const { exercise, setSelectedExercises } = props;
  const [isChecked, setIsChecked] = React.useState(false);

  useEffect(() => {
    isChecked ? console.log("checked") : console.log("not checked");
    if (isChecked) {
      setSelectedExercises?.((prev) => [...prev, exercise]);
    } else {
      setSelectedExercises?.((prev) =>
        prev.filter((item) => item.name !== exercise.name)
      );
    }
  }, [isChecked]);

  const handlePress = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    /* if (isChecked) {
      selectedExercises?.length === 0
        ? console.log("no exercises selected")
        : setSelectedExercises?.((prev) =>
            prev.filter((item) => item.name !== exercise.name)
          );
    } else {
      setSelectedExercises?.((prev) => [...prev, exercise]);
    } */
  };

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
