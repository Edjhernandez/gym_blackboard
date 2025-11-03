import RoutineCard from "@/components/RoutineCard";
import { useI18n } from "@/lib/hooks/useI18n";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

// Mock Data
const routines = [
  {
    id: "1",
    title: "Día de Pecho y Tríceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "2",
    title: "Día de Pierna",
    details: "6 ejercicios, 75 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "3",
    title: "Espalda y Bíceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "4",
    title: "Día de Pecho y Tríceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "5",
    title: "Día de Pierna",
    details: "6 ejercicios, 75 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "6",
    title: "Espalda y Bíceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "7",
    title: "Día de Pecho y Tríceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "8",
    title: "Día de Pierna",
    details: "6 ejercicios, 75 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "9",
    title: "Espalda y Bíceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "10",
    title: "Día de Pecho y Tríceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "11",
    title: "Día de Pierna",
    details: "6 ejercicios, 75 min",
    image: require("../../assets/images/180logo.png"),
  },
  {
    id: "12",
    title: "Espalda y Bíceps",
    details: "5 ejercicios, 60 min",
    image: require("../../assets/images/180logo.png"),
  },
];

const home = () => {
  const { t } = useI18n();
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
          onPress={() => console.log("Crear Nueva Rutina pressed")}
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
