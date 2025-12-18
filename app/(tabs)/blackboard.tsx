/* import { useI18n } from "@/lib/hooks/useI18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LiveWaitScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView className="flex-1 bg-background-primary justify-center">
      <View className="flex-1 items-center justify-center px-6">
        <MaterialCommunityIcons
          name="television-off"
          size={120}
          color="#FFFF00"
          accessibilityLabel={t("accessibility.no_transmission_label")}
        />

        <Text className="mt-6 text-2xl font-semibold text-text-primary text-center">
          {t("blackboard_screen.no_transmission_message")}
        </Text>
      </View>
    </SafeAreaView>
  );
} */

import React from "react";
import { Pressable, Text, View } from "react-native";
import GoogleCast, { CastButton, CastChannel } from "react-native-google-cast";
import { SafeAreaView } from "react-native-safe-area-context";

function MyComponent() {
  const deviceID = "84f575ce05f83ebb9e7721221ffe9ef6";

  const sendMessageFunction = async (message: string) => {
    const myChannel = await CastChannel.add("urn:x-cast:1F7E2448");
    try {
      await myChannel.sendMessage(message);
      console.log("Message sent:", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleConnect = () => {
    GoogleCast.getDiscoveryManager()
      .getDevices()

      .then((devices) => {
        console.log(devices);
      })
      .catch((error) => {
        console.error("Error starting session:", error);
      });

    GoogleCast.getSessionManager()
      .startSession(deviceID)
      .then(() => {
        console.log("Session started successfully");
      })
      .catch((error) => {
        console.error("Error starting session:", error);
      });
  };

  const handleDisconnect = () => {
    GoogleCast.getSessionManager()
      .endCurrentSession(true)
      .then(() => {
        console.log("Session ended successfully");
      })
      .catch((error) => {
        console.error("Error ending session:", error);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary justify-center items-center">
      <CastButton style={{ width: 48, height: 48, tintColor: "white" }} />
      <Pressable
        className="border border-primary p-5 mt-10"
        onPress={handleConnect}
      >
        <Text className="text-text-primary">CONECTAR</Text>
      </Pressable>
      <View style={{ marginTop: 40 }}></View>
      <Pressable
        className="border border-primary p-5"
        onPress={handleDisconnect}
      >
        <Text className="text-text-primary">DESCONECTAR</Text>
      </Pressable>
      <View style={{ marginTop: 40 }}></View>
      <Pressable
        className="border border-primary p-5"
        onPress={() => sendMessageFunction("este es un mensaje de prueba")}
      >
        <Text className="text-text-primary">ENVIAR</Text>
      </Pressable>
    </SafeAreaView>
  );
}
export default MyComponent;
