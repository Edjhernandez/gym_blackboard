import { Exercise } from "../types/types";

export const hasInvalidSetsOrRepsInput = (
  arrayOfExercises: Exercise[],
): boolean => {
  return arrayOfExercises.some((exercise) => {
    return (
      !/^[0-9]\d*$/.test(exercise.weight?.toString() || "") ||
      !/^[1-9]\d*$/.test(exercise.reps?.toString() || "")
    );
  });
};
