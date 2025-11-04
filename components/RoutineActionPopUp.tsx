import { useI18n } from "@/lib/hooks/useI18n";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import {
  ArrowUturnLeftIcon,
  DocumentDuplicateIcon,
  MinusIcon,
  PencilSquareIcon,
  RssIcon,
  TrashIcon,
} from "react-native-heroicons/solid";

type RoutineActionPopUpProps = {
  routineTitle: string;
  routineDetails: string;
  setVisible?: (visible: boolean) => void;
  visible: boolean;
};

export default function RoutineActionPopUp(props: RoutineActionPopUpProps) {
  const { routineTitle, routineDetails, setVisible, visible } = props;
  const { t } = useI18n();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVisible?.(false)}
    >
      <BlurView
        className="absolute top-0 left-0 right-0 bottom-0"
        intensity={130}
        tint="dark"
      >
        <View className="flex-1 justify-start items-center px-6 bg-background-primary absolute top-1/2 left-0 right-0 bottom-0">
          <MinusIcon
            size={30}
            color="#9CA3AF"
            onPress={() => setVisible?.(false)}
          />
          <Text className="text-text-primary font-semibold text-lg">
            {routineTitle}
          </Text>
          <Text className="text-text-secondary text-sm mb-4">
            {routineDetails}
          </Text>
          {/* Button 1: Proyectar a TV */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.project_to_tv_label")}
            className="w-11/12 flex-row items-center justify-center rounded-xl py-3 bg-primary mb-3"
            onPress={() => setVisible?.(false)}
          >
            <RssIcon size={25} color="#595959" className="mr-4" />
            <Text className="text-secondary font-extrabold text-xl ml-4">
              {t("routine_action_popup.project_to_tv_button")}
            </Text>
          </TouchableOpacity>

          {/* Button 2: Editar Rutina */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.edit_routine_label")}
            className="w-11/12 flex-row items-center justify-center rounded-xl py-3 bg-primary mb-3"
            onPress={() => setVisible?.(false)}
          >
            <PencilSquareIcon size={25} color="#595959" className="mr-4" />
            <Text className="text-secondary font-extrabold text-xl ml-4">
              {t("routine_action_popup.edit_routine_button")}
            </Text>
          </TouchableOpacity>

          {/* Button 3: Duplicar Rutina */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.duplicate_routine_label")}
            className="w-11/12 flex-row items-center justify-center rounded-xl py-3 bg-primary mb-3"
            onPress={() => setVisible?.(false)}
          >
            <DocumentDuplicateIcon size={25} color="#595959" className="mr-4" />
            <Text className="text-secondary font-extrabold text-xl ml-4">
              {t("routine_action_popup.duplicate_routine_button")}
            </Text>
          </TouchableOpacity>

          {/* Button 4: Eliminar Rutina */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.delete_routine_label")}
            className="w-11/12 flex-row items-center justify-center rounded-xl py-3 bg-primary mb-3"
            onPress={() => setVisible?.(false)}
          >
            <TrashIcon size={25} color="#595959" className="mr-4" />
            <Text className="text-secondary font-extrabold text-xl ml-4">
              {t("routine_action_popup.delete_routine_button")}
            </Text>
          </TouchableOpacity>

          {/* Button 5: Volver */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.back_label")}
            className="w-11/12 flex-row items-center justify-center rounded-xl py-3 bg-background-secondary"
            onPress={() => setVisible?.(false)}
          >
            <ArrowUturnLeftIcon size={25} color="#D9D9D9" className="mr-4" />
            <Text className="text-text-secondary font-extrabold text-xl ml-4">
              {t("routine_action_popup.go_back_button")}
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}
