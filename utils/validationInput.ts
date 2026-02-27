import { Exercise } from "../types/types";

export const hasInvalidRepsInput = (arrayOfExercises: Exercise[]): boolean => {
  return arrayOfExercises.some((exercise) => {
    return !/^[1-9]\d*$/.test(exercise.reps?.toString() || "");
  });
};

export const hasInvalidWeightInput = (
  arrayOfExercises: Exercise[],
): boolean => {
  return arrayOfExercises.some((exercise) => {
    return !/^[0-9]\d*$/.test(exercise.weight?.toString() || "");
  });
};
