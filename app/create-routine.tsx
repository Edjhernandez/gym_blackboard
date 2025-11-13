import OptionRoutineButton from "@/components/OptionRoutineButton";
import { useI18n } from "@/lib/hooks/useI18n";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import {
  ArrowLeftIcon,
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
  FireIcon,
  PlusCircleIcon, // Icono para el botón de agregar
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

// Definición de la estructura de un Bloque de Ejercicios
interface ExerciseBlock {
  id: number;
  title: string;
  targetRoute: string; // Ruta a la lista de ejercicios para este bloque
}

export default function CreateRoutine() {
  const { t } = useI18n();
  const router = useRouter();
  const [name, setName] = useState("");

  // 1. Estado para manejar los bloques de ejercicio
  const [exerciseBlocks, setExerciseBlocks] = useState<ExerciseBlock[]>([
    // Bloque inicial (Bloque 1)
    {
      id: 1,
      title: t("routines.block_name", { number: 1 }),
      targetRoute: "/listOfExercises",
    },
  ]);

  // 2. Lógica para agregar un nuevo bloque
  const addBlock = () => {
    const newBlockId =
      exerciseBlocks.length > 0
        ? exerciseBlocks[exerciseBlocks.length - 1].id + 1
        : 1;

    const newBlock: ExerciseBlock = {
      id: newBlockId,
      // Usamos el número de bloque para el título dinámico
      title: t("routines.block_name", { number: newBlockId }),
      targetRoute: "/listOfExercises",
    };

    // Actualizamos el estado, añadiendo el nuevo bloque al final
    setExerciseBlocks([...exerciseBlocks, newBlock]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary items-center">
      {/* Header */}
      <View className="w-full flex-row items-center justify-start py-4">
        <Pressable onPress={() => router.push("/(tabs)/home")} className="ml-8">
          <ArrowLeftIcon color="#E7EBDA" size={22} />
        </Pressable>
        <Text className="text-text-primary text-2xl font-bold ml-16">
          {t("routines.create_new_routine")}
        </Text>
      </View>

      {/* Routine Name input */}
      <View className="w-full px-4 border-b-[0.5px] border-secondary">
        <Text className="text-white mb-2">{t("routines.name")}</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t("routines.name_placeholder")}
          placeholderTextColor="#9CA3AF"
          className="bg-background-secondary text-text-secondary rounded-lg px-4 py-3 mb-4"
        />
      </View>

      {/* Bloque de Calentamiento (Siempre estático) */}
      <OptionRoutineButton
        title={t("routines.warmup")}
        Icon={FireIcon}
        targetRoute="/warmUpExercises"
      />
      <ScrollView className="w-full">
        {/* 3. Renderizado Dinámico de Bloques de Ejercicio */}
        {exerciseBlocks.map((block) => (
          <OptionRoutineButton
            key={block.id}
            title={block.title}
            // Pasamos el ID del bloque a la ruta para que la pantalla de ejercicios sepa a qué bloque pertenece
            targetRoute="/listOfExercises"
          />
        ))}

        {/* 4. Botón para Agregar Nuevo Bloque */}
        <Pressable
          className="w-3/4 flex-row items-center justify-center bg-background-secondary border-2 border-dashed border-text-primary/50 mt-4 p-4 rounded-xl mx-auto"
          onPress={addBlock}
        >
          <PlusCircleIcon size={24} color="#E7EBDA" />
          <Text className="text-text-primary text-lg font-semibold ml-3">
            {t("routines.add_new_block")}
          </Text>
        </Pressable>
      </ScrollView>

      {/* Separator y Footer (se quedan fijos fuera del ScrollView) */}
      <View className="w-full border-t border-background-secondary pt-4 pb-6 mt-4">
        {/* Buttons for continue and reset */}
        <View className="w-full flex-row items-center justify-center mt-2 px-6 gap-3">
          <Pressable className="w-1/2 flex-row items-center justify-center bg-transparent border border-primary px-4 py-3 rounded-md gap-3">
            <ArrowPathRoundedSquareIcon size={24} color={"#FFFF00"} />
            <Text className="text-primary text-base font-semibold">
              {t("common.reset")}
            </Text>
          </Pressable>
          <Pressable
            className="w-1/2 flex-row items-center justify-center bg-primary px-4 py-3 rounded-md gap-3"
            onPress={() => router.push("/setting-routine")}
          >
            <Text className="text-secondary text-base font-semibold">
              {t("common.continue")}
            </Text>
            <ArrowRightIcon size={24} color={"#595959"} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
