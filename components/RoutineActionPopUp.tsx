import { useI18n } from "@/lib/hooks/useI18n";
import { BlurView } from "expo-blur";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type RoutineActionPopUpProps = {
  routineTitle: string;
  routineDetails: string;
  setVisible?: (visible: boolean) => void;
};

export default function RoutineActionPopUp(props: RoutineActionPopUpProps) {
  const { routineTitle, routineDetails, setVisible } = props;
  const { t } = useI18n();

  return (
    <View>
      <BlurView className="flex-col justify-center items-center">
        <Text className="text-text-primary font-semibold text-lg">
          {routineTitle}
        </Text>
        <Text className="text-text-secondary text-sm">{routineDetails}</Text>
        {/* Button 1: Proyectar a TV */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("accessibility.project_to_tv_label")}
          className="flex-row items-center justify-center rounded-xl py-4 bg-primary"
          onPress={() => setVisible?.(false)}
        >
          <Text className="text-secondary font-bold text-base">
            {t("routine_action.project_to_tv")}
          </Text>
        </TouchableOpacity>

        {/* Button 2: Editar Rutina */}

        {/* Button 3: Eliminar Rutina */}

        {/* Button 4: Volver */}
      </BlurView>
    </View>
  );
}
