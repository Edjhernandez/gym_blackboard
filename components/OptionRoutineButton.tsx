import useRoutineStore from "@/lib/stores/routineStore";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type TypeOptionRoutineButton = {
  id: string;
  title: string;
  targetRoute: Href;
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
};

export default function OptionRoutineButton(props: TypeOptionRoutineButton) {
  const { title, targetRoute, Icon, id } = props;
  const router = useRouter();
  const { routine } = useRoutineStore();
  const index = routine.blocks.findIndex((block) => block.id === id);

  const navigationPayload = {
    pathname: targetRoute,
    params: { blockIndex: index },
  };

  return (
    <View className="w-full flex-col items-center justify-start border-b-[0.5px] border-secondary py-3">
      <Pressable
        className="flex-row items-center justify-between w-3/4 border-[0.5px] border-primary bg-secondary rounded-xl p-4"
        onPress={() => router.push(navigationPayload as any)}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <Text className="text-text-primary text-xl font-bold">{title}</Text>
        {Icon && <Icon color="#E7EBDA" size={28} />}
      </Pressable>
    </View>
  );
}
