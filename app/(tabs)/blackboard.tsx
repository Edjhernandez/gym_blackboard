import { useI18n } from "@/lib/hooks/useI18n";
import { Routine } from "@/types/types";
import { formatRoutineDetails } from "@/utils/formatRoutineDetails";
import { getRoutineById } from "@/utils/getRoutineById";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import GoogleCast, {
  CastButton,
  CastChannel,
  useCastSession,
} from "react-native-google-cast";

function Blackboard() {
  const deviceID = "84f575ce05f83ebb9e7721221ffe9ef6";
  const { t } = useI18n();
  const castSession = useCastSession();
  const customChannel = useRef<CastChannel>(null);
  const params = useLocalSearchParams();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(false);
  const [isThereSession, setIsThereSession] = useState(false);

  useEffect(() => {
    if (params.routineId) {
      const fetchRoutine = async () => {
        try {
          setLoading(true);
          const data = await getRoutineById(params.routineId as string);
          setRoutine(data);
        } catch (err) {
          console.error("Error fetching routine:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchRoutine();
    }
  }, [params.routineId]);

  useEffect(() => {
    const configChannel = async () => {
      try {
        customChannel.current = await CastChannel.add("urn:x-cast:1F7E2448");
      } catch (error) {
        console.error("Error connecting to device:", error);
      }
    };
    if (castSession) {
      configChannel();
      setIsThereSession(true);
    }
  }, [castSession]);

  const sendMessageFunction = async (routine: Routine) => {
    if (customChannel.current) {
      try {
        const payload = {
          text: routine,
        };
        await customChannel.current.sendMessage(payload);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
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
    setIsThereSession(false);
  };

  return (
    <View className="flex-1 w-full bg-background-primary px-4 pt-10 justify-start items-center">
      {/* Header */}
      <View className="items-center mb-4 w-full">
        <Text className="text-text-primary text-2xl font-bold">
          {t("blackboard_screen.title")}
        </Text>
      </View>

      {/* box for routine selected and cast button */}
      <View className="px-4 mx-4 border-[0.5px] border-text-secondary rounded-lg mb-3 pb-2 w-full h-72">
        {!loading && !routine && (
          <View className="w-full flex-col items-center justify-start py-4">
            <MaterialCommunityIcons
              name="television-off"
              size={120}
              color="#595959"
              accessibilityLabel={t("accessibility.no_transmission_label")}
            />
            <Text className="text-text-primary text-center text-lg mt-2">
              {t("blackboard_screen.no_transmission_message")}
            </Text>
          </View>
        )}

        {loading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFFF00" />
          </View>
        )}

        {!loading && routine && (
          <View className="w-full mt-4 flex-col items-center justify-start">
            <Text className="text-text-primary font-bold text-xl">
              {t("blackboard_screen.selected_routine_title")}
            </Text>
            <View className="w-full bg-background-secondary mt-4 rounded-lg py-5 flex-col items-center justify-center">
              <Text className="text-text-primary text-2xl">
                {routine?.name}
              </Text>
              <Text className="text-text-secondary text-xs">
                {formatRoutineDetails(
                  t,
                  routine?.exercisesAmount,
                  routine?.durationMinutes
                )}
              </Text>
            </View>
            {isThereSession ? (
              <Text className="text-primary text-2xl font-semibold text-center mt-12">
                {t("blackboard_screen.device_connected")}
              </Text>
            ) : (
              <View className="w-full flex-col justify-center items-center">
                <Text className="text-text-primary font-light text-lg mt-5 mb-3">
                  {t("blackboard_screen.connect_device")}
                </Text>
                <CastButton
                  style={{ width: 48, height: 48, tintColor: "#FFFF00" }}
                />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Buttons to disconnect and send routine */}
      {isThereSession && routine && (
        <View className="w-full flex-1 flex-col justify-start items-center">
          <Pressable
            className="bg-secondary rounded-full p-5 mt-10"
            onPress={() => sendMessageFunction(routine)}
          >
            <Text className="text-text-primary text-xl font-semibold">
              {t("blackboard_screen.send_button")}
            </Text>
          </Pressable>
          <Pressable
            className="bg-secondary rounded-full p-5 mt-10"
            onPress={handleDisconnect}
          >
            <Text className="text-text-primary text-xl font-semibold">
              {t("blackboard_screen.disconnect_button")}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
export default Blackboard;
