import { TypeTabIconProps } from "@/types/types";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = (props: TypeTabIconProps) => {
  const { title, icon, focused, iconFocused } = props;
  if (focused) {
    return (
      <View className="flex flex-col items-center justify-center w-[84px]">
        <Image source={iconFocused} width={30} />
        <Text className="text-light text-base mt-2">{title}</Text>
      </View>
    );
  }

  return (
    <View className="flex flex-col items-center justify-center w-[84px]">
      <Image source={icon} width={30} />
      <Text className="text-tabBarLetters text-sm mt-2">{title}</Text>
    </View>
  );
};

export default TabIcon;
