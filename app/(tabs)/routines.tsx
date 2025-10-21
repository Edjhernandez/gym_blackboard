import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const routines = () => {
  const router = useRouter();
  return (
    <View className="bg-dark h-full flex flex-col justify-start items-center pt-12">
      <Text className="text-light text-base">Rutinas guardadas</Text>
      <TouchableOpacity
        className="bg-buttonColor w-[75%] h-10 rounded-xl flex justify-center items-center absolute bottom-6 mx-auto"
        onPress={() => router.push("/(routines)/functional")}
      >
        <Text className="text-light text-xl font-bold">+ Crear rutina</Text>
      </TouchableOpacity>
    </View>
  );
};

export default routines;

const styles = StyleSheet.create({});
