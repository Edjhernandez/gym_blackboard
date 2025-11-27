import OptionRoutineButton from "@/components/OptionRoutineButton";
import { useI18n } from "@/lib/hooks/useI18n";
import useRoutineStore from "@/lib/stores/routineStore";
import { Block } from "@/types/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import {
  ArrowRightIcon,
  FireIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";

export default function CreateRoutine() {
  const { t } = useI18n();
  const router = useRouter();

  const { routine, setName, resetRoutine, setEmptyBlock, updateBlockArray } =
    useRoutineStore();

  const [exerciseBlocks, setExerciseBlocks] = useState<Block[]>(routine.blocks);

  // Function to add a new exercise block
  const addBlock = () => {
    const newBlock: Block = {
      id: uuidv4(),
      title: t("routines.block_name", { title: exerciseBlocks.length + 1 }), //set a block number incrementally
      exercises: [],
    };

    setExerciseBlocks([...exerciseBlocks, newBlock]);
    setEmptyBlock(newBlock);
  };

  const deleteBlock = (blockId: string) => {
    const updatedBlocks = exerciseBlocks.filter(
      (block) => block.id !== blockId
    );
    const renamedBlocks = updatedBlocks.map((block, index) => {
      return {
        ...block,
        title: t("routines.block_name", { title: index + 1 }),
      };
    });
    setExerciseBlocks(renamedBlocks);
    updateBlockArray(renamedBlocks);
  };

  const handleDiscard = () => {
    resetRoutine(); // Reset routine store to initial state
    setExerciseBlocks([]);
    router.push("/(tabs)/home"); // Navigate back to home screen
  };

  const handleContinue = () => {
    // Navigate to the routine settings screen
    updateBlockArray(exerciseBlocks);
    router.push("/setting-routine");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary items-center">
      {/* Header */}
      <View className="w-full flex-row items-center justify-center py-4">
        <Text className="text-text-primary text-2xl font-bold">
          {t("routines.create_new_routine")}
        </Text>
      </View>

      {/* Routine Name input */}
      <View className="w-full px-4 border-b-[0.5px] border-secondary">
        <Text className="text-white mb-2">{t("routines.name")}</Text>
        <TextInput
          value={routine.name}
          onChangeText={(text) => setName(text)}
          placeholder={t("routines.name_placeholder")}
          placeholderTextColor="#9CA3AF"
          className="bg-background-secondary text-text-secondary rounded-lg px-4 py-3 mb-4"
        />
      </View>

      {/* Warmup block always static */}
      <OptionRoutineButton
        title={t("routines.warmup")}
        Icon={FireIcon}
        targetRoute="/warmUpExercises"
        id="warmup"
      />
      <ScrollView className="w-full">
        {/* Dynamic rendering of exercise blocks */}
        {exerciseBlocks.map((block) => (
          <OptionRoutineButton
            key={block.id}
            id={block.id}
            title={block.title}
            targetRoute="/listOfExercises"
            Icon={XMarkIcon}
            onIconPress={() => deleteBlock(block.id)}
          />
        ))}

        {/* add new block button */}
        <Pressable
          className="w-3/4 flex-row items-center justify-center bg-background-secondary border-2 border-dashed border-text-primary/50 mt-4 p-4 rounded-xl mx-auto"
          onPress={addBlock}
          accessibilityLabel={t("accessibility.add_new_block_label")}
        >
          <PlusCircleIcon size={24} color="#E7EBDA" />
          <Text className="text-text-primary text-lg font-semibold ml-3">
            {t("routines.add_new_block")}
          </Text>
        </Pressable>
      </ScrollView>

      {/* footer */}
      <View className="w-full border-t border-background-secondary pt-4 pb-6 mt-4">
        {/* Buttons for continue and reset */}
        <View className="w-full flex-row items-center justify-center mt-2 px-6 gap-3">
          <Pressable
            className="w-1/2 flex-row items-center justify-center bg-transparent border border-primary px-4 py-3 rounded-md gap-3"
            accessibilityLabel={t("accessibility.discard_label")}
            onPress={handleDiscard}
          >
            <XMarkIcon size={24} color={"#FFFF00"} />
            <Text className="text-primary text-base font-semibold">
              {t("common.discard")}
            </Text>
          </Pressable>
          <Pressable
            className="w-1/2 flex-row items-center justify-center bg-primary px-4 py-3 rounded-md gap-3"
            onPress={handleContinue}
            accessibilityLabel={t("accessibility.continue_label")}
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
