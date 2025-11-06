export type WarmupExercise = {
  id: string;
  name: string;
  exerciseType: "warm-Up" | "functional" | "bodybuilding";
  videoURL?: string;
};

export type Exercise = {
  id: string;
  name: string;
  exerciseType: "warm-Up" | "functional" | "bodybuilding";
  bodyPart: "chest" | "back" | "legs" | "arms" | "abs";
  videoURL?: string;
};

export type Routine = {
  id: string;
  routineType: "functional" | "bodybuilding";
  exercises: Exercise[];
  name: string;
  details: string;
  hasWarmup: boolean;
  warmupExercises?: WarmupExercise[];
};
