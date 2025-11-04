import { routines as allRoutines } from "@/DATA/data";
import { useI18n } from "@/lib/hooks/useI18n";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
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

  // For demo purposes we don't actually filter by type in DATA; keep hook for future
  const routines = useMemo(() => allRoutines, []);

  const renderItem = ({ item }: { item: (typeof allRoutines)[0] }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/`)}
        className="w-full bg-background-secondary p-4 rounded-2xl my-2 flex-row items-center"
      >
        <View className="w-12 h-12 rounded-xl bg-black items-center justify-center mr-4">
          <Image source={item.image} style={{ width: 34, height: 34 }} />
        </View>
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{item.title}</Text>
          <Text className="text-text-secondary text-xs mt-1">
            {item.details}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-black px-4 pt-10">
      {/* Header */}
      <View className="items-center mb-4">
        <Text className="text-white text-2xl font-bold">Mis Rutinas</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-center space-x-6 mb-4">
        <Pressable
          onPress={() => setTab("functional")}
          className="items-center"
        >
          <Text
            className={`text-base ${tab === "functional" ? "text-white font-semibold" : "text-gray-400"}`}
          >
            Funcional
          </Text>
          {tab === "functional" ? (
            <View className="h-0.5 bg-yellow-400 mt-2 rounded-full w-16" />
          ) : (
            <View className="h-0.5 mt-2 w-16" />
          )}
        </Pressable>

        <Pressable
          onPress={() => setTab("bodybuilding")}
          className="items-center"
        >
          <Text
            className={`text-base ${tab === "bodybuilding" ? "text-white font-semibold" : "text-gray-400"}`}
          >
            Musculación
          </Text>
          {tab === "bodybuilding" ? (
            <View className="h-0.5 bg-yellow-400 mt-2 rounded-full w-20" />
          ) : (
            <View className="h-0.5 mt-2 w-20" />
          )}
        </Pressable>
      </View>

      {/* Separator */}
      <View className="h-px bg-gray-800 mb-4" />

      {/* List */}
      <FlatList
        data={routines}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full items-center justify-center"
        style={{ backgroundColor: "#FDE047" }}
      >
        <PlusIcon color="#000" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default Routines;
