import React from "react";
import { Pressable, Text } from "react-native";
import { CheckIcon, MinusIcon } from "react-native-heroicons/outline";
type TypeExerciseCardProps = {
  name: string;
};

export default function ExerciseCard(props: TypeExerciseCardProps) {
  const { name } = props;
  const [isChecked, setIsChecked] = React.useState(false);

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
        {name}
      </Text>
    </Pressable>
  );
}
