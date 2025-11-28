import { useI18n } from "@/lib/hooks/useI18n";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ArrowUturnLeftIcon, MinusIcon } from "react-native-heroicons/solid";

type AlertPopUpProps = {
  alertTitle: string;
  alertDetails: string;
  setVisible?: (visible: boolean) => void;
  visible: boolean;
};

export default function AlertPopUp(props: AlertPopUpProps) {
  const { alertTitle, alertDetails, setVisible, visible } = props;
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
          <Text className="text-primary font-bold text-2xl mt-6 mb-10">
            {alertTitle}
          </Text>
          <Text className="text-text-primary text-lg mb-4 text-center">
            {alertDetails}
          </Text>

          {/* Button go back */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.go_back_label")}
            className="w-11/12 flex-row items-center justify-center rounded-xl py-3 bg-background-secondary mt-10"
            onPress={() => setVisible?.(false)}
          >
            <ArrowUturnLeftIcon size={25} color="#D9D9D9" className="mr-4" />
            <Text className="text-text-secondary font-extrabold text-xl ml-4">
              {t("common.go_back")}
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}
