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
      <View className="flex-1 justify-center items-center bg-background-primary">
        <View className="w-11/12 max-w-sm bg-background-secondary rounded-lg p-6 items-center border-[0.5px] border-text-primary">
          {/* Icon */}
          <View className="w-20 h-20 bg-primary rounded-full items-center justify-center border-2 border-background-primary mb-4">
            {<ExclamationCircleIcon size={48} color="black" />}
          </View>

          {/* Title */}
          <Text className="text-primary text-2xl font-bold text-center mb-2">
            {t("login.invalid_credentials_popUp.title")}
          </Text>

          {/* Message */}
          <Text className="text-text-primary text-center mb-6">
            {t("login.invalid_credentials_popUp.message")}
          </Text>

          {/* Buttons */}
          <TouchableOpacity
            className="bg-primary w-full py-3 rounded-lg mb-3"
            onPress={onRecover}
          >
            <Text className="text-secondary text-center font-bold text-base">
              {t("login.invalid_credentials_popUp.recover_password")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-secondary w-full py-3 rounded-lg"
            onPress={onRetry}
          >
            <Text className="text-text-primary text-center font-bold text-base">
              {t("login.invalid_credentials_popUp.try_again")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InvalidCredentialsModal;
