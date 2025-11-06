import RoutineCard from "@/components/RoutineCard";
import { routines } from "@/DATA/data";
import { useI18n } from "@/lib/hooks/useI18n";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const home = () => {
  const { t } = useI18n();
  const router = useRouter();
  return (
    <View className="bg-background-primary flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between mt-8 p-4">
        <Text className="text-text-primary text-xl font-semibold">
          {t("home.greeting", { name: "Jose Cano" })}
        </Text>
        <Image
          source={require("../../assets/images/coach.png")}
          style={{ width: 70, height: 70 }}
          className="rounded-full"
        />
      </View>

      {/* Most Used Routines */}
      <View className="flex items-center">
        <Text className="text-text-primary text-2xl font-bold mb-4">
          {t("home.your_most_used_routines")}
        </Text>
        <View className="w-11/12 h-3/4 px-4 border-[0.5px] border-text-secondary rounded-lg pb-1 mb-2">
          <FlatList
            data={routines}
            renderItem={({ item }) => (
              <RoutineCard title={item.title} details={item.details} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <TouchableOpacity
          className=" bg-primary rounded-xl p-4 items-center"
          onPress={() => router.push("/create-routine")}
        >
          <Text className="text-secondary text-2xl font-bold">
            {t("home.create_new_routine")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default home;
