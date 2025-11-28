import { Exercise } from "../types/types";

export const hasInvalidSetsOrRepsInput = (
  arrayOfExercises: Exercise[]
): boolean => {
  return arrayOfExercises.some((exercise) => {
    return (
      !/^[1-9]\d*$/.test(exercise.sets?.toString() || "") ||
      !/^[1-9]\d*$/.test(exercise.reps?.toString() || "")
    );
  });
};
