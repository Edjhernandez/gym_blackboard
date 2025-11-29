import { useI18n } from "@/lib/hooks/useI18n";
import React from "react";
import { Pressable, Text, View } from "react-native";

type TypeCategorySegmentedControlProps = {
  routineCategory: "functional" | "bodybuilding";
  handleFunctionalCategory: () => void;
  handleBodybuildingCategory: () => void;
};

export default function CategorySegmentedControl({
  routineCategory,
  handleFunctionalCategory,
  handleBodybuildingCategory,
}: TypeCategorySegmentedControlProps) {
  const { t } = useI18n();
  return (
    <View className="rounded-lg py-3 border-b-[0.5px] border-secondary w-full flex-col justify-center items-start">
      <Text className="text-text-primary mb-2 ml-4">
        {t("routines.select_category")}
      </Text>
      {/* Segmented control */}
      <View className="w-3/4 flex-row justify-center rounded-md bg-transparent overflow-hidden border-[0.5px] border-text-secondary mx-auto">
        <Pressable
          onPress={handleFunctionalCategory}
          className={`w-1/2 py-2 ${routineCategory === "functional" ? "bg-primary" : ""}`}
          accessibilityRole="button"
          accessibilityState={{
            selected: routineCategory === "functional",
          }}
        >
          <Text
            className={`text-center ${routineCategory === "functional" ? "text-gray-900 font-medium" : "text-gray-600"}`}
          >
            {t("navigation.functional")}
          </Text>
        </Pressable>
        <Pressable
          onPress={handleBodybuildingCategory}
          className={`w-1/2 py-2 ${routineCategory === "bodybuilding" ? "bg-primary" : ""}`}
          accessibilityRole="button"
          accessibilityState={{
            selected: routineCategory === "bodybuilding",
          }}
        >
          <Text
            className={`text-center ${routineCategory === "bodybuilding" ? "text-gray-900 font-medium" : "text-gray-600"}`}
          >
            {t("navigation.bodybuilding")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
