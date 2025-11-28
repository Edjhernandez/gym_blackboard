import RoutineCard from "@/components/RoutineCard";
import { routines } from "@/DATA/data";
import { useI18n } from "@/lib/hooks/useI18n";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const home = () => {
  const { t } = useI18n();
  const router = useRouter();
  const favoriteRoutines = routines.filter((routine) => routine.isFavorite);
  const [tab, setTab] = React.useState<"functional" | "bodybuilding">(
    "functional"
  );
  const filteredRoutines = favoriteRoutines.filter(
    (routine) => routine.category === tab
  );

  return (
    <View className="bg-background-primary flex-1 flex-col justify-start w-full items-center px-4">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between mt-10">
        <Text className="text-text-primary text-xl font-semibold ml-4">
          {t("home.greeting", { name: "Jose Cano" })}
        </Text>
        <Image
          source={require("../../assets/images/coach.png")}
          style={{ width: 70, height: 70 }}
          className="rounded-full"
        />
      </View>

      {/* Title */}
      <Text className="text-text-primary text-2xl font-bold mb-4 mx-auto">
        {t("home.your_most_used_routines")}
      </Text>

      {/* Tabs */}
      <View className="w-full flex-row justify-between">
        <Pressable
          onPress={() => setTab("functional")}
          className={`items-center justify-end w-1/2 flex-1 rounded-s-xl border-[0.5px] border-text-secondary ${
            tab === "functional" ? "bg-secondary " : "bg-background-secondary"
          }`}
        >
          <Text
            className={`text-base my-2 ${
              tab === "functional"
                ? "text-text-primary font-bold"
                : "text-gray-600 font-semibold"
            }`}
          >
            {t("navigation.functional")}
          </Text>
          {tab === "functional" ? (
            <View className="h-0.5 bg-primary mt-2 rounded-full w-full" />
          ) : (
            <View className="h-0.5 mt-2 w-16" />
          )}
        </Pressable>

        <Pressable
          onPress={() => setTab("bodybuilding")}
          className={`items-center justify-end w-1/2 flex-1 rounded-s-xl border-[0.5px] border-text-secondary ${
            tab === "bodybuilding" ? "bg-secondary " : "bg-background-secondary"
          }`}
        >
          <Text
            className={`text-base my-2 ${
              tab === "bodybuilding"
                ? "text-text-primary font-bold"
                : "text-gray-600 font-semibold"
            }`}
          >
            {t("navigation.bodybuilding")}
          </Text>
          {tab === "bodybuilding" ? (
            <View className="h-0.5 bg-primary mt-2 rounded-full w-full" />
          ) : (
            <View className="h-0.5 mt-2 w-20" />
          )}
        </Pressable>
      </View>

      {/* Most Used Routines */}
      <View className="flex-1 px-4 mx-4 border-[0.5px] border-text-secondary rounded-b-lg mb-3 pb-2 w-full">
        {filteredRoutines.length === 0 ? (
          <Text className="text-text-primary text-center mt-10 font-extralight text-xl">
            {t("home.no_favorite_routines")}
          </Text>
        ) : (
          <FlatList
            data={filteredRoutines}
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
        className="bg-primary rounded-xl p-4 items-center w-2/3 mx-auto mb-4"
        onPress={() => router.push("/create-routine")}
      >
        <Text className="text-secondary text-2xl font-bold">
          {t("home.create_new_routine")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;
