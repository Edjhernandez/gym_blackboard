export type Exercise = {
  id: string;
  name: string;
  exerciseType: "warm-Up" | "functional" | "bodybuilding";
  bodyPart?: "chest" | "back" | "legs" | "arms" | "abs";
  videoURL?: string;
  sets?: number;
  reps?: number;
};

export type Routine = {
  id: string;
  name: string;
  exercisesAmount: number;
  durationMinutes: number;
  isFavorite: boolean;
  category: "functional" | "bodybuilding";
  warmup: Exercise[];
  blocks: {
    id: string;
    exercises: Exercise[];
  }[];
};
