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

import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { CastButton, useCastSession } from "react-native-google-cast";
import { SafeAreaView } from "react-native-safe-area-context";

function MyComponent() {
  const castSession = useCastSession();

  useEffect(() => {
    if (castSession) {
      const promise = castSession.getApplicationMetadata();
      promise
        .then((metadata) => {
          console.log("✅ Application Metadata:");
          console.log(metadata);
        })
        .catch((error) => {
          console.error("❌ Error fetching application metadata:", error);
        });
    }
  }, [castSession]);

  const handleTests = () => {
    console.log(castSession);
    if (castSession) {
      const promise = castSession.getApplicationMetadata();
      promise
        .then((metadata) => {
          console.log("✅ Application Metadata:");
          console.log(metadata);
        })
        .catch((error) => {
          console.error("❌ Error fetching application metadata:", error);
        });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary justify-center items-center">
      <Text className="mt-20 text-text-primary">Google Cast Button:</Text>
      <CastButton
        style={{
          width: 24,
          height: 24,
          tintColor: "#E7EBDA",
          marginBottom: 50,
        }}
      />
      <Pressable className="border border-primary" onPress={handleTests}>
        <Text className="text-text-primary">boton de pruebas</Text>
      </Pressable>
    </SafeAreaView>
  );
}
export default MyComponent;
