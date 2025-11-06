import { DATAFunctional } from "@/DATA/data";
import { useI18n } from "@/lib/hooks/useI18n";
import { Exercise } from "@/types/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import {
  ArrowLeftIcon,
  TrashIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
// Ajustes de UI
const HEADER_HEIGHT = 64;

export default function SettingRoutineScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useI18n();

  const [routineName, setRoutineName] = useState<string>("Nombre de la Rutina");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Modal para confirmar borrado
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<Exercise | null>(
    null
  );

  // Helpers para cambiar series/reps
  function updateExerciseField(
    id: string,
    field: "series" | "reps",
    value: string
  ) {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  }

  function promptDeleteExercise(ex: Exercise) {
    setCandidateToDelete(ex);
    setDeleteModalVisible(true);
  }

  function confirmDeleteExercise() {
    if (!candidateToDelete) return;
    setExercises((prev) => prev.filter((e) => e.id !== candidateToDelete.id));
    setCandidateToDelete(null);
    setDeleteModalVisible(false);
  }

  function cancelDelete() {
    setCandidateToDelete(null);
    setDeleteModalVisible(false);
  }

  function handleBackDiscard() {
    // Confirmar abandono si hay cambios detectados?
    // Aquí descartamos cambios y volvemos
    router.back();
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="w-full flex-row items-center justify-around py-4">
        <Pressable className="ml-4" onPress={() => router.back()}>
          <ArrowLeftIcon color="#E7EBDA" size={22} />
        </Pressable>

        <TextInput
          className="bg-background-secondary pl-3 text-xl font-bold text-text-primary border-[0.5px] border-text-secondary rounded-md w-3/4"
          value={routineName}
        ></TextInput>
      </View>

      {/* Body: ScrollView for exercises */}
      <ScrollView className="flex-col px-3 pt-2 mb-20">
        {/* component settings exercise card */}
        {DATAFunctional.map((ex) => (
          <View className="w-full bg-background-secondary rounded-xl p-3 mb-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <Text
                className="font-semibold text-text-primary text-lg bg-background-primary w-3/4 p-2 rounded-lg"
                numberOfLines={1}
              >
                {ex.name}
              </Text>
              <Pressable className="flex bg-background-primary w-11 h-11 rounded-lg items-center justify-center">
                <TrashIcon color="#E7EBDA" size={24} />
              </Pressable>
            </View>

            <View className="w-full flex-row mt-1 items-center justify-center gap-4">
              {/* Series input */}
              <View className="flex-1">
                <Text className="text-xs text-text-secondary mb-1">
                  {t("routines.settings_routine_screen.sets")}
                </Text>
                <TextInput
                  value={""}
                  keyboardType="number-pad"
                  placeholder="e.g. 3"
                  className="px-3 py-2 border border-secondary rounded-md bg-background-primary text-text-primary"
                  placeholderTextColor="#a8a29e"
                  returnKeyType="done"
                />
              </View>

              <View className="mt-4">
                <XMarkIcon color="#a8a29e" size={32} />
              </View>

              {/* Reps input */}
              <View className="flex-1">
                <Text className="text-xs text-text-secondary mb-1">
                  {t("routines.settings_routine_screen.reps")}
                </Text>
                <TextInput
                  value={""}
                  keyboardType="number-pad"
                  placeholder="e.g. 3"
                  className="px-3 py-2 border border-secondary rounded-md bg-background-primary text-text-primary"
                  placeholderTextColor="#a8a29e"
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Barra de acciones inferior fija */}
      <View
        style={{ paddingBottom: insets.bottom, backgroundColor: undefined }}
        className="absolute left-0 right-0 bottom-0 px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      >
        <View className="flex-row space-x-3">
          <Pressable
            onPress={handleBackDiscard}
            className="flex-1 rounded-md border border-yellow-400 px-4 py-3 items-center justify-center bg-transparent"
            accessibilityLabel="Volver a la lista"
          >
            <Text className="text-yellow-600 font-medium">
              Volver a la lista
            </Text>
          </Pressable>

          <Pressable
            className={`flex-1 rounded-md px-4 py-3 items-center justify-center bg-yellow-400`}
            accessibilityLabel="Guardar rutina"
          >
            <Text className={`font-semibold text-gray-900`}>
              Guardar Rutina
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
