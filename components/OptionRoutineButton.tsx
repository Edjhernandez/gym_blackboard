import React from "react";
import { Pressable, Text, View } from "react-native";

type TypeOptionRoutineButton = {
  title: string;
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
};

export default function OptionRoutineButton(props: TypeOptionRoutineButton) {
  const { title, Icon } = props;
  return (
    <View className="w-full flex-col items-center justify-start border-y border-gray-700 p-3">
      <Pressable className="flex-row items-center justify-between w-3/4 border-[0.5px] border-primary bg-secondary rounded-xl p-4">
        <Text className="text-text-primary text-xl font-bold">{title}</Text>
        {Icon && <Icon color="#E7EBDA" size={28} />}
      </Pressable>
    </View>
  );
}
