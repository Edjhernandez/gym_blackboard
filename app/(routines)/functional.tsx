import { DATAWarmUp } from "@/DATA/data";
import { Exercise, Routine } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const functional = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [routine, setRoutine] = useState<Routine>({
    routineType: "functional",
    id: "1",
    exercises: [],
  });
  const [selected, setSelected] = useState<Exercise[]>([]);
  const [reps, setReps] = useState(10);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    if (isEnabled) {
      setModalVisible(true);
    } else {
      setSelected([]);
    }
  }, [isEnabled]);

  const handleSelectedExercises = (exercise: Exercise) => {
    setSelected((prevState) =>
      prevState.some((existingExercise) => existingExercise.id === exercise.id)
        ? prevState.filter(
            (existingExercise) => existingExercise.id !== exercise.id
          )
        : [...prevState, exercise]
    );
  };

  return (
    <View className="bg-dark h-full flex justify-start items-center py-12">
      <Text className="text-light text-base">
        Creacion de nueva rutina de funcional
      </Text>
      <View className="flex flex-row justify-center items-center gap-3 mt-5">
        <Text className="text-light font-extralight">Calentamiento</Text>
        <Switch
          trackColor={{ false: "#99ABBD", true: "#FFFF" }}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {isEnabled && selected.length > 0 && (
        <View>
          <FlatList
            data={selected}
            renderItem={({ item }) => (
              <View className="flex flex-row justify-between items-start">
                <Text className="text-light">{item.name}</Text>
                <View className="flex flex-row justify-center items-center">
                  <TouchableOpacity
                    className="border border-1 border-light "
                    onPress={() => setReps((prevState) => prevState + 1)}
                  >
                    <Text className=" text-2xl text-light">+</Text>
                  </TouchableOpacity>
                  <TextInput value={reps.toString()} className="text-light" />
                  <TouchableOpacity
                    className="border border-1 border-light"
                    onPress={() => setReps((prevState) => prevState - 1)}
                  >
                    <Text className=" text-2xl text-light">-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="bg-dark h-full flex flex-col justify-start items-center pt-5">
          <Text className="text-light font-bold text-xl">
            Ejercicios de calentamiento
          </Text>
          <FlatList
            data={DATAWarmUp}
            contentContainerStyle={{
              gap: 8,
            }}
            renderItem={({ item }) => (
              <View>
                <Pressable
                  className={`w-full flex flex-row justify-center ${selected.some((element) => element.id === item.id) ? "bg-green-500" : "bg-dark"}`}
                  onPress={() => {
                    handleSelectedExercises(item);
                  }}
                >
                  <Text className="text-light">{item.name}</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <Pressable
            className="bg-buttonColor w-[75%] h-10 rounded-xl flex justify-center items-center absolute bottom-6 mx-auto"
            onPress={() => {
              setModalVisible(!modalVisible);
              if (selected.length === 0) setIsEnabled(false);
            }}
          >
            <Text className="text-light">Listo</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default functional;

const styles = StyleSheet.create({});
