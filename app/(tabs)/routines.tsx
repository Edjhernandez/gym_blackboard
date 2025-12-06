import RoutineCard from "@/components/RoutineCard";
import { db } from "@/firebaseConfig";
import { useI18n } from "@/lib/hooks/useI18n";
import { Routine } from "@/types/types";
import { formatRoutineDetails } from "@/utils/formatRoutineDetails";
import { useRouter } from "expo-router";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";

const Routines = () => {
  const { t } = useI18n();
  const router = useRouter();
  const [tab, setTab] = useState<"functional" | "bodybuilding">("functional");
  const [dataRoutines, setDataRoutines] = React.useState<Routine[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, "routines"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const routinesFromDB: Routine[] = [];
        querySnapshot.forEach((doc) => {
          routinesFromDB.push({
            id: doc.id,
            ...(doc.data() as Omit<Routine, "id">),
          });
        });
        setDataRoutines(routinesFromDB);
        setLoading(false);
      },
      (error) => {
        console.error("Error al obtener ejercicios:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View className="flex-1 w-full bg-background-primary px-4 pt-10 justify-center items-center">
      {/* Header */}

      <View className="items-center mb-4 w-full">
        <Text className="text-text-primary text-2xl font-bold">
          {t("routines.title")}
        </Text>
      </View>

      {/* Tabs */}
      <View className="w-full flex-row justify-between ">
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

      {/* List */}
      <View className="w-full flex-1 px-4 border-[0.5px] border-text-secondary rounded-e-lg pb-1 mb-3 pt-2">
        {loading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFFF00" />
          </View>
        )}
        <FlatList
          data={dataRoutines.filter((routine) => routine.category === tab)}
          renderItem={({ item }) => (
            <RoutineCard
              title={item.name}
              details={formatRoutineDetails(
                t,
                item.exercisesAmount,
                item.durationMinutes
              )}
              isFavorite={item.isFavorite}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
        />
      </View>
      {/* Floating Action Button */}
      <TouchableOpacity
        className="w-3/4 flex-row py-4 rounded-full items-center justify-center gap-3 bg-primary mb-4"
        onPress={() => router.push("/create-routine")}
      >
        <PlusIcon color="#595959" size={30} />
        <Text className="text-secondary text-lg font-extrabold">
          {t("home.create_new_routine")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Routines;
