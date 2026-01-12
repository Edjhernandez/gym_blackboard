import { Timestamp } from "firebase/firestore";

export type Exercise = {
  id: string;
  name: string;
  exerciseType: "warmup" | "functional" | "bodybuilding";
  bodyPart?: "chest" | "back" | "legs" | "arms" | "abs";
  videoURL?: string;
  sets?: number;
  reps?: number;
};

export type Block = {
  id: string;
  title: string;
  exercises: Exercise[];
};

export type Routine = {
  id: string;
  name: string;
  exercisesAmount: number;
  durationMinutes: number;
  isFavorite: boolean;
  category: "functional" | "bodybuilding";
  warmup: Exercise[];
  blocks: Block[];
  userId: string;
  createdAt: Timestamp;
};

export type User = {
  id: string;
  name: string;
  photoURL: string;
};
