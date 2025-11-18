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
  const favoriteRoutines = routines.filter((routine) => routine.isFavorite);
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
          {favoriteRoutines.length === 0 ? (
            <Text className="text-text-primary text-center mt-10 font-extralight text-xl">
              {t("home.no_favorite_routines")}
            </Text>
          ) : (
            <FlatList
              data={favoriteRoutines}
              renderItem={({ item }) => (
                <RoutineCard
                  title={item.name}
                  details={`${t("home.exercises_amount", { count: item.exercisesAmount })} , ${t("home.duration_minutes", { count: item.durationMinutes })}`}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
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
