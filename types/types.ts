export type Exercise = {
  id: string;
  name: string;
  exerciseType: "warm-Up" | "functional" | "bodybuilding";
  bodyPart?: "chest" | "back" | "legs" | "arms" | "abs";
  videoURL?: string;
};

export type Routine = {
  id: string;
  name: string;
  details: string;
  durationMinutes: number;
  category: "functional" | "bodybuilding";
  warmup: Exercise[];
  blocks: {
    id: string;
    exercises: Exercise[];
  }[];
};
