export type Exercise = {
  id: string;
  name: string;
  exerciseType: "warm-Up" | "functional" | "bodyBuilding";
  videoURL?: string;
};

export type Routine = {
  id: string;
  routineType: "functional" | "bodyBuilding";
  exercises: Exercise[];
};
