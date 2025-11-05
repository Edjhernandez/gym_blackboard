import ExerciseCard from "@/components/ExerciseCard";
import { DATABodybuilding, DATAFunctional, DATAWarmUp } from "@/DATA/data";
import { useI18n } from "@/lib/hooks/useI18n";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Exercise } from "../types/types";

const GROUPS: { key: string; label: string; data: Exercise[] }[] = [
  { key: "pecho", label: "Pecho", data: DATAFunctional },
  { key: "espalda", label: "Espalda", data: DATABodybuilding },
  { key: "piernas", label: "Piernas", data: DATAFunctional },
  { key: "brazos", label: "Brazos", data: DATABodybuilding },
  { key: "abdomen", label: "Abdomen", data: DATAFunctional },
];

export default function CreateRoutine() {
  const { t } = useI18n();
  const router = useRouter();

  const [name, setName] = useState("");
  const [includeWarmup, setIncludeWarmup] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>("pecho");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [openAccordion, setOpenAccordion] = useState(false);

  useEffect(() => {
    setOpenAccordion(includeWarmup);
  }, [includeWarmup]);

  const currentGroup = useMemo(
    () => GROUPS.find((g) => g.key === activeGroup) || GROUPS[0],
    [activeGroup]
  );

  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  );

  function toggleExercise(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function renderExercise({ item }: { item: Exercise }) {
    const isChecked = !!selected[item.id];
    return (
      <TouchableOpacity
        onPress={() => toggleExercise(item.id)}
        className="flex-row items-center justify-between bg-[#0f1724] p-3 rounded-xl my-2"
      >
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => toggleExercise(item.id)}
            className={`w-7 h-7 rounded-sm items-center justify-center mr-4 ${
              isChecked ? "bg-primary" : "border border-gray-600"
            }`}
          >
            {isChecked ? (
              <CheckIcon color="#000" size={16} />
            ) : (
              <View style={{ width: 16, height: 16 }} />
            )}
          </TouchableOpacity>

          <Text
            className={`${
              isChecked ? "text-white font-semibold" : "text-white"
            }`}
          >
            {item.name}
          </Text>
        </View>

        {/* optional meta */}
        <Text className="text-text-secondary text-xs">
          {item.exerciseType || ""}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary pt-8">
      {/* Header */}
      <View className="flex-row items-center justify-start py-4">
        <Pressable onPress={() => router.back()} className="ml-8">
          <ArrowLeftIcon color="#E7EBDA" size={22} />
        </Pressable>

        <Text className="text-text-primary text-2xl font-bold ml-16">
          {t("routines.create_new_routine")}
        </Text>
      </View>

      {/* Name input & exercises counter */}
      <View className="px-4">
        <Text className="text-white mb-2">{t("routines.name")}</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t("routines.name_placeholder")}
          placeholderTextColor="#9CA3AF"
          className="bg-background-secondary text-text-secondary rounded-lg px-4 py-3 mb-4"
        />

        <Text className="text-text-primary mb-3 text-center text-xl font-extrabold">
          {t("routines.amount_of_selected_exercises", { count: selectedCount })}
        </Text>
      </View>

      {/* warmup options */}
      <View className="flex-col items-center justify-start border-y border-gray-700 px-3 ">
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center pl-1">
            {/* icon placeholder */}
            <Switch
              value={includeWarmup}
              onValueChange={setIncludeWarmup}
              trackColor={{ false: "#595959", true: "#FFFF00" }}
              thumbColor="#fff"
            />

            <Text className="text-text-primary">
              {t("routines.include_warmup")}
            </Text>
          </View>

          <Pressable
            className="mb-2"
            onPress={() => setOpenAccordion(!openAccordion)}
          >
            <View
              className={`mt-2 ${openAccordion ? "rotate-180" : "rotate-0"}`}
            >
              <ChevronDownIcon color="#E7EBDA" size={28} />
            </View>
          </Pressable>
        </View>
        {openAccordion && (
          <>
            <View className="w-11/12 h-96 px-4 py-2 border-[0.5px] border-text-secondary rounded-lg mb-2 flex justify-center">
              <FlatList
                data={DATAWarmUp}
                renderItem={({ item }) => <ExerciseCard name={item.name} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          </>
        )}
      </View>

      {/* horizontal tabs - bodyPart selectors */}
      <View className="">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
        >
          {GROUPS.map((g) => (
            <Pressable
              key={g.key}
              onPress={() => setActiveGroup(g.key)}
              className="mr-6 items-center"
            >
              <Text
                className={`${
                  activeGroup === g.key
                    ? "text-white font-semibold"
                    : "text-gray-400"
                }`}
              >
                {g.label}
              </Text>
              {activeGroup === g.key ? (
                <View className="h-0.5 bg-yellow-400 mt-2 rounded-full w-12" />
              ) : (
                <View className="h-0.5 mt-2 w-12" />
              )}
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Exercise list */}
      <View className="px-4 mt-2 flex-1">
        <FlatList
          data={currentGroup.data}
          keyExtractor={(i) => i.id}
          renderItem={renderExercise}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* bottom spacing to keep controls visible above tab bar */}
      <View style={{ height: 90 }} />
    </SafeAreaView>
  );
}
