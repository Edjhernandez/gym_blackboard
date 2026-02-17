import RoutineCard from "@/components/RoutineCard";
import { db } from "@/firebaseConfig";
import { useI18n } from "@/lib/hooks/useI18n";
import useUserStore from "@/lib/stores/userStore";
import { Routine } from "@/types/types";
import { formatRoutineDetails } from "@/utils/formatRoutineDetails";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const home = () => {
  const { t } = useI18n();
  const router = useRouter();
  const [tab, setTab] = useState<"functional" | "bodybuilding">("functional");
  const [dataFavoriteRoutines, setDataFavoriteRoutines] = React.useState<
    Routine[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { user } = useUserStore();

  useEffect(() => {
    const q = query(collection(db, "routines"), where("userId", "==", user.id));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const routinesFromDB: Routine[] = [];
        querySnapshot.forEach((doc) => {
          routinesFromDB.push({
            ...(doc.data() as Omit<Routine, "id">),
            id: doc.id,
          });
        });

        setDataFavoriteRoutines(
          routinesFromDB.filter((routine) => routine.isFavorite),
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching routines:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const filteredRoutines = dataFavoriteRoutines.filter(
    (routine) => routine.category === tab,
  );

  const hasRoutines = filteredRoutines.length > 0;

  return (
    <View className="bg-background-primary flex-1 flex-col justify-start w-full items-center px-4">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between mt-10">
        <View className="flex-col items-start justify-center">
          <Text className="text-text-secondary text-base font-light ml-4">
            {t("home.greeting")}
          </Text>
          <Text className="text-text-primary text-2xl font-semibold ml-3">
            {user.name && user.name.trim().length > 0
              ? user.name
              : "Loading..."}
          </Text>
        </View>

        <Image
          source={user.photoURL}
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
          accessibilityRole="tab"
          accessibilityState={{ selected: tab === "functional" }}
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
          accessibilityRole="tab"
          accessibilityState={{ selected: tab === "bodybuilding" }}
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
        {loading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFFF00" />
          </View>
        )}

        {!loading && !hasRoutines && (
          <Text className="text-text-primary text-center mt-10 font-extralight text-xl">
            {t("home.no_favorite_routines")}
          </Text>
        )}

        {!loading && hasRoutines && (
          <>
            <FlatList
              data={filteredRoutines}
              renderItem={({ item }) => (
                <RoutineCard
                  id={item.id}
                  title={item.name}
                  details={formatRoutineDetails(
                    t,
                    item.exercisesAmount,
                    item.durationMinutes,
                  )}
                  isFavorite={item.isFavorite}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </>
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
