import { useI18n } from "@/lib/hooks/useI18n";
import { usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import {
  EllipsisVerticalIcon,
  StarIcon as StarIconOutline,
} from "react-native-heroicons/outline";
import { StarIcon as StarIconSolid } from "react-native-heroicons/solid";
import RoutineActionPopUp from "./RoutineActionPopUp";

type TypeRoutineCardProps = {
  title: string;
  details: string;
  isFavorite?: boolean;
};

const RoutineCard = (props: TypeRoutineCardProps) => {
  const { title, details, isFavorite } = props;
  const [visiblePopUpOptions, setVisiblePopUpOptions] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(isFavorite); // Local state to manage favorite status, change when set BBDD
  const currentPath = usePathname();
  const { t } = useI18n();

  useEffect(() => {
    setLocalFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <>
      <View className="w-full bg-background-secondary p-3 rounded-xl overflow-hidden my-2 flex-row justify-between items-center">
        <View className="flex-col justify-start items-start">
          <Text className="text-text-primary font-semibold text-base">
            {title}
          </Text>
          <Text className="text-text-secondary text-xs">{details}</Text>
        </View>
        <View className="flex-row justify-end gap-2">
          {currentPath === "/routines" && (
            <Pressable
              onPress={() => setLocalFavorite(!localFavorite)}
              accessibilityRole="button"
              accessibilityLabel={
                localFavorite
                  ? t("accessibility.unmark_favorite_label")
                  : t("accessibility.mark_favorite_label")
              }
            >
              {!localFavorite ? (
                <StarIconOutline size={30} color="#9CA3AF" />
              ) : (
                <StarIconSolid size={30} color="#FFFF00" />
              )}
            </Pressable>
          )}
          <TouchableOpacity onPress={() => setVisiblePopUpOptions(true)}>
            <EllipsisVerticalIcon size={30} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <RoutineActionPopUp
        visible={visiblePopUpOptions}
        routineTitle={title}
        routineDetails={details}
        setVisible={setVisiblePopUpOptions}
      />
    </>
  );
};

export default RoutineCard;
