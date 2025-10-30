import { images } from "@/constants/images";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const home = () => {
  return (
    <View className="bg-background-primary h-full flex justify-start pt-12">
      <View className="flex flex-row justify-center items-center w-full h-40 px-4">
        <Text className="text-text-primary w-1/2">Hola! nombre del coach</Text>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={images.coach}
        />
      </View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
