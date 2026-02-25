import { Timestamp } from "firebase/firestore";

export type Exercise = {
  id: string;
  name: string;
  exerciseType: "warmup" | "functional" | "bodybuilding";
  bodyPart?: "chest" | "back" | "legs" | "arms" | "abs";
  videoURL?: string;
  weight?: number;
  reps?: number;
};

export type Block = {
  id: string;
  title: string;
  exercises: Exercise[];
  rounds: number;
};

export type Routine = {
  id: string;
  name: string;
  exercisesAmount: number;
  durationMinutes: number;
  isFavorite: boolean;
  category: "functional" | "bodybuilding";
  warmup: { exercises: Exercise[]; rounds: number };
  blocks: Block[];
  userId: string;
  createdAt: Timestamp;
  coachName: string;
  coachPhotoURL: string;
};

export type User = {
  id: string;
  name: string;
  photoURL: string;
};
