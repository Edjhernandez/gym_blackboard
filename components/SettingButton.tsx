import { useI18n } from "@/lib/hooks/useI18n";
import React from "react";
import { Pressable, Text } from "react-native";

type TypeSettingButtonProps = {
  title: string;
};

export default function SettingButton(props: TypeSettingButtonProps) {
  const { title } = props;
  const { t } = useI18n();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("accessibility.setting_block_label", {
        "block number": title,
      })}
      className="w-full border-y-[0.5px] border-secondary py-5"
    >
      <Text className="text-text-primary text-xl font-bold my-3 text-center">
        {title}
      </Text>
    </Pressable>
  );
}
