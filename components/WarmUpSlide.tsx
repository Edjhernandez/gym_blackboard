import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Exercise } from "../types/types";

type TypeWarmUpSlideProps = {
  visible: boolean;
  items: Exercise[];
  onCollapse?: () => void;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WarmUpSlide({
  visible,
  items,
  onCollapse,
}: TypeWarmUpSlideProps) {
  const translateY = useRef(new Animated.Value(-300)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -300,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  const hasSelection = items.length > 0;

  return (
    <AnimatedView
      style={{
        transform: [{ translateY }],
        opacity,
      }}
      className="absolute top-0 left-0 right-0 z-50"
      pointerEvents={visible ? "auto" : "none"}
    >
      <View className="bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 shadow-md">
        <View className="px-4 pt-4 pb-2 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Calentamiento
          </Text>
          <Pressable
            onPress={() => onCollapse && onCollapse()}
            className={`px-3 py-1 rounded-md ${hasSelection ? "bg-blue-600" : "bg-gray-300"} `}
          >
            <Text
              className={`text-sm ${hasSelection ? "text-white" : "text-gray-700"}`}
            >
              Colapsar
            </Text>
          </Pressable>
        </View>
      </View>
    </AnimatedView>
  );
}
