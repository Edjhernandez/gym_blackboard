import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type TypeOptionRoutineButton = {
  id: string;
  title: string;
  targetRoute: Href;
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
  onIconPress?: () => void;
};

export default function OptionRoutineButton(props: TypeOptionRoutineButton) {
  const { title, targetRoute, Icon, id, onIconPress } = props;
  const router = useRouter();
  const { routine } = useRoutineStore();
  const blockIndex = routine.blocks.findIndex((block) => block.id === id);
  const { t } = useI18n();

  const navigationPayload = {
    pathname: targetRoute,
    params: { blockIndex: blockIndex },
  };

  return (
    <View className="w-full flex-col items-center justify-start border-b-[0.5px] border-secondary py-3">
      <View className="flex-row items-center justify-between w-3/4 border-[0.5px] border-primary bg-secondary rounded-xl">
        <Pressable
          className="w-3/4 flex-row items-center justify-between py-3"
          onPress={() => router.push(navigationPayload as any)}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <Text className="text-text-primary text-xl font-bold ml-3">
            {title}
          </Text>
        </Pressable>
        <Pressable
          className="w-1/4 py-3 flex items-center justify-center"
          onPress={onIconPress}
          accessibilityRole="button"
          accessibilityLabel={t("accessibility.delete_block_label", {
            block: title,
          })}
        >
          {Icon && <Icon color="#E7EBDA" size={28} />}
        </Pressable>
      </View>
    </View>
  );
}
