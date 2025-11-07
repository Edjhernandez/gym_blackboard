import ExerciseCard from "@/components/ExerciseCard";
import { DATAFunctional, DATAWarmUp } from "@/DATA/data";
import { useI18n } from "@/lib/hooks/useI18n";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "react-native-heroicons/outline";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function CreateRoutine() {
  const { t } = useI18n();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [includeWarmup, setIncludeWarmup] = useState(false);

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [openAccordion, setOpenAccordion] = useState(false);
  const [routineType, setRoutineType] = useState<"functional" | "bodybuilding">(
    "functional"
  );
  const [bodyPart, setBodyPart] = useState<
    "chest" | "back" | "legs" | "arms" | "abs"
  >("chest");

  useEffect(() => {
    setOpenAccordion(includeWarmup);
  }, [includeWarmup]);

  return (
    <SafeAreaView className="flex-1 bg-background-primary items-center">
      {/* Header */}
      <View className="w-full flex-row items-center justify-start py-4">
        <Pressable onPress={() => router.back()} className="ml-8">
          <ArrowLeftIcon color="#E7EBDA" size={22} />
        </Pressable>
        <Text className="text-text-primary text-2xl font-bold ml-16">
          {t("routines.create_new_routine")}
        </Text>
      </View>

      {/* Name input & exercises counter */}
      <View className="w-full px-4">
        <Text className="text-white mb-2">{t("routines.name")}</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t("routines.name_placeholder")}
          placeholderTextColor="#9CA3AF"
          className="bg-background-secondary text-text-secondary rounded-lg px-4 py-3 mb-4"
        />
        <Text className="text-text-primary mb-3 text-center text-xl font-extrabold">
          {t("routines.amount_of_selected_exercises", { count: 0 })}
        </Text>
      </View>

      {/* warmup options */}
      <View
        className="w-full flex-col items-center justify-start border-y border-gray-700 px-3"
        style={{ paddingBottom: openAccordion ? insets.bottom + 220 : 0 }}
      >
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center pl-1">
            {/* icon placeholder */}
            <Switch
              value={includeWarmup}
              onValueChange={setIncludeWarmup}
              trackColor={{ false: "#595959", true: "#FFFF00" }}
              thumbColor="#fff"
              hitSlop={{ top: 15, bottom: 15, left: 10, right: 15 }}
            />
            <Text className="text-text-primary">
              {t("routines.include_warmup")}
            </Text>
          </View>
          <Pressable
            className="mb-2"
            onPress={() => setOpenAccordion(!openAccordion)}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 10 }}
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
            <View className="w-11/12 px-4 py-2 border-[0.5px] border-text-secondary rounded-lg flex justify-center mb-2">
              <FlatList
                data={DATAWarmUp}
                renderItem={({ item }) => <ExerciseCard name={item.name} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          </>
        )}
      </View>

      {/* routine type selector ===> functional or bodybuilding*/}
      <View className="mt-2 px-2 w-full flex-col justify-center items-center">
        <Text className="text-text-primary font-semibold text-base mb-2">
          {t("routines.select_routine_type")}
        </Text>
        <View className="w-full flex-row justify-between ">
          <Pressable
            onPress={() => setRoutineType("functional")}
            className={`items-center justify-end w-1/2 flex-1 rounded-s-xl border-[0.5px] border-text-secondary ${
              routineType === "functional"
                ? "bg-secondary "
                : "bg-background-secondary"
            }`}
          >
            <Text
              className={`text-base my-2 ${
                routineType === "functional"
                  ? "text-text-primary font-bold"
                  : "text-gray-600 font-semibold"
              }`}
            >
              {t("navigation.functional")}
            </Text>
            {routineType === "functional" ? (
              <View className="h-0.5 bg-primary mt-2 rounded-full w-full" />
            ) : (
              <View className="h-0.5 mt-2 w-16" />
            )}
          </Pressable>

          <Pressable
            onPress={() => setRoutineType("bodybuilding")}
            className={`items-center justify-end w-1/2 flex-1 rounded-s-xl border-[0.5px] border-text-secondary ${
              routineType === "bodybuilding"
                ? "bg-secondary "
                : "bg-background-secondary"
            }`}
          >
            <Text
              className={`text-base my-2 ${
                routineType === "bodybuilding"
                  ? "text-text-primary font-bold"
                  : "text-gray-600 font-semibold"
              }`}
            >
              {t("navigation.bodybuilding")}
            </Text>
            {routineType === "bodybuilding" ? (
              <View className="h-0.5 bg-primary mt-2 rounded-full w-full" />
            ) : (
              <View className="h-0.5 mt-2 w-20" />
            )}
          </Pressable>
        </View>
      </View>

      {/* horizontal tabs - bodyPart selectors */}
      <View className="w-full px-2">
        <View className="w-full border-[0.5px] border-text-secondary p-2">
          <View className="w-full flex-row justify-between ">
            {/* body part tabs */}
            {/*  Chest */}
            <Pressable
              onPress={() => setBodyPart("chest")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "chest"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "chest"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.chest")}
              </Text>
            </Pressable>

            {/*  Back */}
            <Pressable
              onPress={() => setBodyPart("back")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "back"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "back"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.back")}
              </Text>
            </Pressable>

            {/*  Legs */}
            <Pressable
              onPress={() => setBodyPart("legs")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "legs"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "legs"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.legs")}
              </Text>
            </Pressable>

            {/*  Arms */}
            <Pressable
              onPress={() => setBodyPart("arms")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "arms"
                  ? "border-[0.5px] border-text-secondary "
                  : "border-0"
              }`}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "arms"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.arms")}
              </Text>
            </Pressable>

            {/*  Abs */}
            <Pressable
              onPress={() => setBodyPart("abs")}
              className={`items-center justify-end w-1/2 flex-1 rounded-xl  ${
                bodyPart === "abs"
                  ? "border-[0.5px] border-text-secondary"
                  : "border-0"
              }`}
            >
              <Text
                className={`text-base my-2 ${
                  bodyPart === "abs"
                    ? "text-text-primary font-bold"
                    : "text-gray-600 font-semibold"
                }`}
              >
                {t("routines.body_part.abs")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Exercise list */}
      <View
        className="w-full px-2 max-h-96"
        /*  style={{ paddingBottom: insets.bottom + 285 }} */
      >
        <View className="w-full border-[0.5px] border-text-secondary max-h-screen p-4 rounded-e-xl">
          <FlatList
            data={DATAFunctional}
            renderItem={({ item }) => <ExerciseCard name={item.name} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      {/* Buttons for continue and reset */}
      <View className="w-full flex-row items-center justify-center mt-4 px-6 gap-3">
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
    </SafeAreaView>
  );
}
