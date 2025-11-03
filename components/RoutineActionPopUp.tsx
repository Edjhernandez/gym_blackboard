import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type RoutineActionPopUpProps = {
  visible: boolean;
  routineTitle?: string;
  setVisible?: (visible: boolean) => void;
};

export default function RoutineActionPopUp(props: RoutineActionPopUpProps) {
  const { visible, routineTitle, setVisible } = props;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      className="bg-background-primary"
      backdropColor={"#000000"}
    >
      {/* Backdrop with blur */}
      <View className="flex-1">
        <View>
          {/* Press on the blurred area to close */}
          <Pressable
            onPress={() => setVisible?.(false)}
            style={{ flex: 1 }}
            accessibilityLabel="Cerrar acciones"
          />
        </View>

        {/* Bottom sheet - stacked full width buttons */}
        <View className="bg-transparent px-4 pb-6 pt-4">
          <View className="space-y-3">
            {/* Button 1: Proyectar a TV */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Proyectar a TV"
              className="flex-row items-center justify-center rounded-xl py-4 bg-primary"
            >
              <Text className="text-black font-bold text-base">
                Proyectar a TV
              </Text>
            </Pressable>

            {/* Button 2: Editar Rutina */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Editar Rutina"
              className="flex-row items-center justify-center rounded-xl py-4 border bg-primary"
            >
              <Text className="text-white font-medium text-base">
                Editar Rutina
              </Text>
            </Pressable>

            {/* Button 3: Eliminar Rutina */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Eliminar Rutina"
              className="flex-row items-center justify-center rounded-xl py-4 border bg-primary"
            >
              <Text className="text-white font-medium text-base">
                Eliminar Rutina
              </Text>
            </Pressable>

            {/* Button 4: Volver */}
            <Pressable
              onPress={() => setVisible?.(false)}
              accessibilityRole="button"
              accessibilityLabel="Volver"
              className="flex-row items-center justify-center rounded-xl py-4 bg-primary"
            >
              <Text className="text-white font-medium text-base">Volver</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
