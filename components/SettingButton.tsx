import { useI18n } from "@/lib/hooks/useI18n";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

type TypeSettingButtonProps = {
  id: string;
  title: string;
};

export default function SettingButton(props: TypeSettingButtonProps) {
  const { id, title } = props;
  const { t } = useI18n();
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("accessibility.setting_block_label", {
        "block number": title,
      })}
      className="w-full border-t-[0.5px] border-b-[0.5px] border-secondary py-5"
      onPress={() =>
        router.push({
          pathname: "/setting-block",
          params: { blockId: id },
        })
      }
    >
      <Text className="text-text-primary text-xl font-bold my-3 text-center">
        {title}
      </Text>
    </Pressable>
  );
}
