import { Routine } from "@/types/types";

export function estimateRoutineDuration(routine: Routine): number {
  const secondsPerRep = routine.category === "functional" ? 1.2 : 2.2;
  const secondsPerRest = routine.category === "functional" ? 20 : 120;
  let totalReps = 0;
  let totalRounds = 0;
  routine.blocks.forEach((block) => {
    block.exercises.forEach((exercise) => {
      totalReps += exercise.reps || 0;
    });
    totalRounds += block.rounds || 0;
  });

  const variableTimeMinutes =
    (secondsPerRep * totalReps * totalRounds + secondsPerRest * totalRounds) /
    60;

  const totalDuration = 10 + variableTimeMinutes; // 10 minutes base time for warmup and its rest

  return Math.round(totalDuration);
}
