import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";
import { useI18n } from "../lib/hooks/useI18n";

interface SecurityQuestionBeforeActionModalProps {
  visible: boolean;
  affirmative: () => void;
  negative: () => void;
  message: string;
}

const SecurityQuestionBeforeActionModal: React.FC<
  SecurityQuestionBeforeActionModalProps
> = ({ visible, affirmative, negative, message }) => {
  const { t } = useI18n();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={negative}
    >
      <View className="flex-1 justify-center items-center bg-background-primary">
        <View className="w-11/12 max-w-sm bg-background-secondary rounded-lg p-6 items-center border-[0.5px] border-text-primary">
          {/* Icon */}
          <View className="w-20 h-20 bg-primary rounded-full items-center justify-center border-2 border-background-primary mb-4">
            {<ExclamationCircleIcon size={48} color="black" />}
          </View>

          {/* Message */}
          <Text className="text-text-primary text-center mb-6">{message}</Text>

          {/* Buttons */}
          <TouchableOpacity
            className="bg-primary w-full py-3 rounded-lg mb-3"
            onPress={affirmative}
          >
            <Text className="text-secondary text-center font-bold text-base">
              {t("alerts.affirmative_button")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-secondary w-full py-3 rounded-lg"
            onPress={negative}
          >
            <Text className="text-text-primary text-center font-bold text-base">
              {t("alerts.negative_button")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SecurityQuestionBeforeActionModal;
