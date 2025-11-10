import { DATAWarmUp } from "@/DATA/data";
import ExerciseCard from "@/components/ExerciseCard";
import React from "react";
import { FlatList, View } from "react-native";

export default function warmUpExercises() {
  return (
    <View className="w-11/12 px-4 py-2 border-[0.5px] border-text-secondary rounded-lg flex justify-center mb-2">
      <FlatList
        data={DATAWarmUp}
        renderItem={({ item }) => <ExerciseCard name={item.name} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
