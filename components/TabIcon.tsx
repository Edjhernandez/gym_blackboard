import { useI18n } from "@/lib/hooks/useI18n";
import React from "react";
import { Text, View } from "react-native";

export type TypeTabIconProps = {
  IconOutline: React.ComponentType<{ size?: number; color?: string }>;
  IconSolid: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  focused: boolean;
};

const TabIcon = (props: TypeTabIconProps) => {
  const { title, IconOutline, focused, IconSolid } = props;
  const { t } = useI18n();
  const translatedTitle = t(title);
  if (focused) {
    return (
      <View className="flex flex-col items-center justify-center w-[84px] mt-2">
        <IconSolid size={24} color="#FFFAF0" />
        <Text className="text-text-primary text-base mt-2">
          {translatedTitle}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex flex-col items-center justify-center w-[84px] mt-2">
      <IconOutline size={24} color="#A3A3A3" />
      <Text className="text-text-secondary text-sm mt-2">
        {translatedTitle}
      </Text>
    </View>
  );
};

export default TabIcon;
