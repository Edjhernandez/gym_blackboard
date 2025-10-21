import { Exercise } from "@/types/types";

export const DATAWarmUp: Exercise[] = [
  { name: "Jumping Jacks", id: "w1", exerciseType: "warm-Up", videoURL: "" },
  { name: "High Knees", id: "w2", exerciseType: "warm-Up", videoURL: "" },
  { name: "Torso twists", id: "w3", exerciseType: "warm-Up", videoURL: "" },
  { name: "Leg Swings", id: "w4", exerciseType: "warm-Up", videoURL: "" },
];
export const DATAFunctional: Exercise[] = [
  { name: "Squat", id: "f1", exerciseType: "functional", videoURL: "" },
  { name: "Lunge", id: "f2", exerciseType: "functional", videoURL: "" },
  { name: "Push-up", id: "f3", exerciseType: "functional", videoURL: "" },
  { name: "Plank", id: "f4", exerciseType: "functional", videoURL: "" },
];
export const DATABodybuilding: Exercise[] = [
  {
    name: "Bench Press",
    id: "b1",
    exerciseType: "bodyBuilding",
    videoURL: "",
  },
  {
    name: "Overhead Press",
    id: "b2",
    exerciseType: "bodyBuilding",
    videoURL: "",
  },
  {
    name: "Bicep Curls",
    id: "b3",
    exerciseType: "bodyBuilding",
    videoURL: "",
  },
  {
    name: "Hammer Curls",
    id: "b4",
    exerciseType: "bodyBuilding",
    videoURL: "",
  },
];

export const numberOfReps = ["1", "5", "8", "10", "12", "15", "20", "25", "30"];
