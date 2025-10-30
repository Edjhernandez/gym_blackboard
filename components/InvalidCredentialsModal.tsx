import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";
import { useI18n } from "../lib/hooks/useI18n";

interface InvalidCredentialsModalProps {
  visible: boolean;
  onRecover: () => void;
  onRetry: () => void;
}

const InvalidCredentialsModal: React.FC<InvalidCredentialsModalProps> = ({
  visible,
  onRecover,
  onRetry,
}) => {
  const { t } = useI18n();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRetry}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-11/12 max-w-sm bg-gray-900 rounded-lg p-6 items-center">
          {/* Icon */}
          <View className="w-20 h-20 bg-yellow-400 rounded-full items-center justify-center border-2 border-black mb-4">
            {<ExclamationCircleIcon size={48} color="black" />}
          </View>

          {/* Title */}
          <Text className="text-yellow-400 text-2xl font-bold text-center mb-2">
            {t("invalid_credentials_popUp.title")}
          </Text>

          {/* Message */}
          <Text className="text-white text-center mb-6">
            {t("invalid_credentials_popUp.message")}
          </Text>

          {/* Buttons */}
          <TouchableOpacity
            className="bg-yellow-400 w-full py-3 rounded-lg mb-3"
            onPress={onRecover}
          >
            <Text className="text-black text-center font-bold text-base">
              {t("invalid_credentials_popUp.recover_password")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-600 w-full py-3 rounded-lg"
            onPress={onRetry}
          >
            <Text className="text-white text-center font-bold text-base">
              {t("invalid_credentials_popUp.try_again")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InvalidCredentialsModal;
