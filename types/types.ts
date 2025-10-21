import { ImageSourcePropType } from "react-native";

export type TypeTabIconProps = {
  icon: ImageSourcePropType;
  iconFocused: ImageSourcePropType;
  title: string;
  focused: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  exerciseType: "warm-Up" | "functional" | "bodyBuilding";
  videoURL: string;
};

export type Routine = {
  id: string;
  routineType: "functional" | "bodyBuilding";
  exercises: Exercise[];
};
