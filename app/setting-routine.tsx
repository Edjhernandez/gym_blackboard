import { DATAFunctional } from "@/DATA/data";
import { Exercise } from "@/types/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
// Ajustes de UI
const HEADER_HEIGHT = 64;

export default function SettingRoutineScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
        <Pressable className="ml-2" onPress={() => router.back()}>
          <ArrowLeftCircleIcon color="#E7EBDA" size={48} />
        </Pressable>

        <TextInput
          className="bg-background-secondary pl-3 text-xl font-bold text-text-primary border-[0.5px] border-text-secondary rounded-md w-3/4"
          value={routineName}
        ></TextInput>
      </View>

      {/* Body: ScrollView for exercises */}
      <ScrollView className="flex-col px-2">
        {DATAFunctional.map((ex) => (
          <View className="bg-background-secondary rounded-xl p-3 mb-3 border border-gray-100 dark:border-gray-700 shadow-sm">
            {/* Header del item: thumbnail + title + delete */}
            <View className="flex-row items-start">
              <View className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-md items-center justify-center overflow-hidden">
                <Text className="text-gray-400">🏋️</Text>
              </View>

              <View className="flex-1 ml-3">
                <Text className="font-semibold text-gray-800 dark:text-gray-100">
                  culo
                </Text>

                <View className="flex-row mt-3 items-center">
                  {/* Series input */}
                  <View className="flex-1 mr-2">
                    <Text className="text-xs text-gray-500 mb-1">Series</Text>
                    <TextInput
                      value={"ex.series"}
                      keyboardType="number-pad"
                      placeholder="e.g. 3"
                      className="px-3 py-2 border border-yellow-400 rounded-md bg-transparent text-gray-800 dark:text-gray-100"
                      placeholderTextColor="#a8a29e"
                      returnKeyType="done"
                    />
                  </View>

                  {/* Reps input (acepta texto) */}
                  <View className="flex-1 ml-1">
                    <Text className="text-xs text-gray-500 mb-1">Reps</Text>
                    <TextInput
                      value={""}
                      placeholder="e.g. 12 (por pierna)"
                      className="px-3 py-2 border border-yellow-400 rounded-md bg-transparent text-gray-800 dark:text-gray-100"
                      placeholderTextColor="#a8a29e"
                      returnKeyType="done"
                    />
                  </View>
                </View>
              </View>

              <Pressable className="ml-3 p-2 items-center justify-center">
                <Text className="text-yellow-500 text-lg">🗑️</Text>
              </Pressable>
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

      {/* Modal de confirmación de borrado */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View className="flex-1 bg-black/40 items-center justify-center px-6">
          <View className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-6">
            <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Eliminar ejercicio
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              ¿Estás seguro que quieres eliminar{" "}
              <Text className="font-medium">
                {candidateToDelete ? candidateToDelete.name : ""}
              </Text>{" "}
              de la rutina?
            </Text>

            <View className="flex-row justify-end mt-6 space-x-3">
              <Pressable
                onPress={cancelDelete}
                className="px-4 py-2 rounded-md border border-gray-200"
              >
                <Text className="text-gray-700">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={confirmDeleteExercise}
                className="px-4 py-2 rounded-md bg-yellow-400"
              >
                <Text className="text-gray-900 font-medium">Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
