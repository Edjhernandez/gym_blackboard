import React from "react";
import { Text, View } from "react-native";

type TypeRoutineCardProps = {
  title: string;
  details: string;
};

const RoutineCard = (props: TypeRoutineCardProps) => {
  const { title, details } = props;

  return (
    <View className="w-full bg-background-secondary p-3 rounded-xl overflow-hidden my-2">
      <Text className="text-text-primary font-semibold text-base">{title}</Text>
      <Text className="text-text-secondary text-xs">{details}</Text>
    </View>
  );
};

export default RoutineCard;
